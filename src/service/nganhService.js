

const db = require("../models");

const post_nganh = async (data) => {
  // tạo luôn nganh, tạo luôn image theo id_nganh
  try {
    let c = await db.nganh.create({
      name: data.name,
      image: data.image,
      slug: data.slug,
      title: data.title,
      meta_des: data.meta_des
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
       meta_des: data.meta_des
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

export default { post_nganh, put_nganh , get_all_nganh, delete_nganh};
