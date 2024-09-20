import { raw } from "body-parser";
import { literal, where } from "sequelize";
const db = require("../models");

const post_nganh = async (data) => {
  // tạo luôn nganh, tạo luôn image theo id_nganh
  try {
    let c = await db.nganh.create({
      name: data.name,
      image: data.image,
      slug: data.slug,
      title: data.title,
      meta_des: data.meta_des,
      parentId: data.parentId,
    });

    c = c.get({ plain: true });

    return c;
  } catch (error) {
    console.log(error);
  }
};

const put_nganh = async (data, id) => {
  try {
    const u = await db.nganh.update(
      {
        name: data.name,
        image: data.image,
        slug: data.slug,
        title: data.title,
        meta_des: data.meta_des,
        parentId: data.parentId,
      },
      {
        where: { id: id },
      }
    );

    if (u[0] > 0)
      return {
        DT: "update success",
      };
  } catch (error) {
    console.log(error);
  }
};

const get_all_nganh = async () => {
  try {
    let g = await db.nganh.findAll({
      order: [["createdAt", "desc"]],
      raw: true,
    });
    return g;
  } catch (error) {
    console.log(error);
  }
};
const delete_nganh = async (id) => {
  try {
    let del = await db.nganh.destroy({
      where: { id: id },
    });
    if (del) return { DT: "Delete success" };
  } catch (error) {
    console.log(error);
  }
};
//
const get_nameNganh_fromId = async (id) => {
  try {
    // let name = await db.nganh.findOne({
    //   where: { id: id },
    //   raw: true,
    // });
    // return name;
    
    let f = await db.template.findOne({
      where: { id: id },
      raw: true,
    });
    //console.log('ffff', f)

    if (f.id) {
      let n = await db.nganh.findOne({
        where: { id: f.id_nganh },
        raw: true,
      });
      let name = await db.nganh.findOne({
        where: { id: n.parentId },
        raw: true,
      });

      //console.log("nnnn", name);
      return name;
    }

    return null;

  } catch (error) {
    console.log(error);
  }
};

// custom menu
const get_nganh_parent_home = async () => {
  try {
    let list = await db.nganh.findAll({
      attributes: {
        include: [
          [literal("CAST(id AS CHAR)"), "value"], // Alias 'id' to 'key'
          ["name", "label"], // Alias 'category' to 'label'
          "parentId",
          "image",
          "slug",
        ],
      },
      raw: true,
    });

    let custom = getNestedChildren(list, 0);
    return {
      EC: 1,
      data: custom,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getNestedChildren = (arr, parentId) => {
  var out = [];
  for (var i in arr) {
    if (arr[i].parentId == parentId) {
      var children = getNestedChildren(arr, arr[i].id);

      if (children.length) {
        arr[i].children = children;
      }
      out.push(arr[i]);
    }
  }
  return out;
};
// get template khi click cha, hiển thị tất cả mẫu mà con có
const get_idChildren_from_parent = async (page, limit, id) => {
  try {
    page = page ? +page : 1;
    limit = +limit;

    /////   tìm cha có những id con nào
    let g = await db.nganh.findAll({
      where: { parentId: id },
      raw: true,
    });
    // arr con id , custom để tìm kiếm: [1,2]
    let idList = [];

    g.map((item, idx) => {
      idList.push(item.id);
    });
    ///////
    let total = await db.template.count({
      where: { id_nganh: idList },
    });

    ////
    let list = await db.template.findAll({
      offset: (page - 1) * limit,
      limit: limit,

      order: [["createdAt", "desc"]],
      where: { id_nganh: idList },
      raw: true,
    });

    //return d;
    return { list, total };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  post_nganh,
  put_nganh,
  get_all_nganh,
  delete_nganh,
  get_nganh_parent_home,
  get_nameNganh_fromId,
  get_idChildren_from_parent,
};
