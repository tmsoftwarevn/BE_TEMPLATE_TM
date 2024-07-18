
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
      id_nganh: data.id_nganh
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
        id_nganh: data.id_nganh
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

const get_all_template = async ()=>{
  try {
    let g = await db.template.findAll({
     
      raw: true,
    });
    return g;
  } catch (error) {
    console.log(error);
  }
}
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

export default { post_template, put_template , get_all_template, delete_template};
