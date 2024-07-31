import { Op, where } from "sequelize";

const db = require("../models");

const post_template = async (data) => {
  // tạo luôn template, tạo luôn image theo id_template
  try {
    let c = await db.template.create({
      name: data.name,
      image: data.image,
      link: data.link,
      slug: data.slug,
      description: data.description,
      title: data.title,
      meta_des: data.meta_des,
      id_nganh: data.id_nganh,
    });

    c = c.get({ plain: true });

    return c;
  } catch (error) {
    console.log(error);
  }
};

const put_template = async (data, id) => {
  try {
    const u = await db.template.update(
      {
        name: data.name,
        image: data.image,
        slug: data.slug,
        link: data.link,
        description: data.description,
        title: data.title,
        meta_des: data.meta_des,
        id_nganh: data.id_nganh,
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

const get_all_template = async () => {
  try {
    let g = await db.template.findAll({
      order: [["createdAt", "desc"]],
      raw: true,
    });
    return g;
  } catch (error) {
    console.log(error);
  }
};

const get_all_template_paginate = async (page, limit) => {
  try {
    page = page ? +page : 1;
    limit = +limit;

    let total = await db.template.count({
      offset: (page - 1) * limit,
      limit: limit,
    });

    let list = await db.template.findAll({
      offset: (page - 1) * limit,
      limit: limit,

      order: [["createdAt", "desc"]],
      raw: true,
    });

    return { list, total };
  } catch (error) {
    console.log(error);
    return null;
  }
};

//////// call
const get_template_byIdNganh_paginate = async (page, limit, id) => {
  try {
    page = page ? +page : 1;
    limit = +limit;

    let total = await db.template.count({
      where: { id_nganh: id },
    });

    let list = await db.template.findAll({
      offset: (page - 1) * limit,
      limit: limit,
      where: { id_nganh: id },
      order: [["createdAt", "desc"]],
      raw: true,
    });

    return { list, total };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const delete_template = async (id) => {
  try {
    let del = await db.template.destroy({
      where: { id: id },
    });
    if (del) return { DT: "Delete success" };
  } catch (error) {
    console.log(error);
  }
};

const get_template_byidNganh = async (id) => {
  try {
    let g = await db.template.findAll({
      order: [["createdAt", "desc"]],
      where: { id_nganh: id },
      raw: true,
    });
    return g;
  } catch (error) {
    console.log(error);
  }
};

const get_list_by_arrId = async(arr)=>{
  try {
    let g = await db.template.findAll({
      order: [["createdAt", "desc"]],
      where: { id: arr },
      raw: true,
    });
    return g;
  } catch (error) {
    console.log(error);
  }
}

const get_detail_template_byslug = async (slug) => {
  try {
    let g = await db.template.findOne({
      where: { slug: slug },
      raw: true,
    });
    return g;
  } catch (error) {
    console.log(error);
  }
};

const get_template_relate_idNganh = async (id) => {
  try {
    // let g = await db.template.findAll({
    //   limit: 8, //  lấy 8 template
    //   order: [["createdAt", "desc"]],
    //   where: { id_nganh: id },
    //   raw: true,
    // });
    // return g;

    /////   tìm id cha g.parentId
    let g = await db.nganh.findOne({
      where: { id: id },
      raw: true,
    });
    // tìm tất cả con theo id cha

    let a = await db.nganh.findAll({
      where: { parentId: g.parentId },
      raw: true,
    });
    // arr con id , custom để tìm kiếm: [1,2]
    let idList = [];

    a.map((item, idx) => {
      idList.push(item.id);
    });
  
    ////
    let list = await db.template.findAll({
      limit: 8,
      order: [["createdAt", "desc"]],
      where: { id_nganh: idList },
      raw: true,
    });
    return list

  } catch (error) {
    console.log(error);
  }
};

const get_template_bySearch = async (page, limit, string) => {
  try {
    page = page ? +page : 1;
    limit = +limit;

    let total = await db.template.count({
      where: {
        name: { [Op.like]: `%${string}%` },
      },
    });

    let list = await db.template.findAll({
      offset: (page - 1) * limit,
      limit: limit,
      where: {
        name: { [Op.like]: `%${string}%` },
      },
      order: [["createdAt", "desc"]],
      raw: true,
    });

    return { list, total };
  } catch (error) {
    console.log(error);
    return null;
  }
};



export default {
  post_template,
  put_template,
  get_all_template,
  delete_template,
  get_template_byidNganh,
  get_detail_template_byslug,
  get_all_template_paginate,

  get_template_byIdNganh_paginate,
  get_template_relate_idNganh,
  get_template_bySearch,
  get_list_by_arrId
};
