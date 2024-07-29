
import { literal } from "sequelize";
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
      parentId: data.parentId
      
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
       parentId: data.parentId
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

const get_all_nganh = async ()=>{
  try {
    let g = await db.nganh.findAll({
      order: [["createdAt", "desc"]],
      raw: true,
    });
    return g;
  } catch (error) {
    console.log(error);
  }
}
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

const get_nameNganh_fromId = async(id)=>{
  try {
    let name = await db.nganh.findOne({
      where: {id: id},
      raw: true,
    });
    return name;
  } catch (error) {
    console.log(error)
  }
}

// custom menu
const get_nganh_parent_home = async() =>{
  try {
    let list = await db.nganh.findAll({
      attributes: {
        include: [
          [literal('CAST(id AS CHAR)'), 'value'],        // Alias 'id' to 'key'
          ['name', 'label'], // Alias 'category' to 'label'
          "parentId",
          "image",
          "slug"
        ],
       
      },
      raw: true,
    });
    
    let custom = getNestedChildren(list,0);
    return {
      EC: 1,
      data: custom
    }

  } catch (error) {
    console.log(error);
    return null;
  }
}

const getNestedChildren = (arr, parentId) => {
  var out = []
  for (var i in arr) {
    if (arr[i].parentId == parentId) {
      var children = getNestedChildren(arr, arr[i].id)

      if (children.length) {
        arr[i].children = children
      }
      out.push(arr[i])
    }
  }
  return out
}

export default {get_nganh_parent_home, post_nganh, put_nganh , get_all_nganh, delete_nganh, get_nameNganh_fromId};
