import templateService from "../service/templateService";

const post_template = async (req, res) => {
  const data = await templateService.post_template(req.body);
  if (data) {
    return res.status(201).json({
      data: data,
      EC: 1,
    });
  } else {
    return res.status(400).json({
      message: "Không thêm được",
      EC: -1,
    });
  }
};

const put_template = async (req, res) => {
  try {
    let data = await templateService.put_template(req.body, req.params.id);
    if (data) {
      return res.status(200).json({
        data: data.DT,
        EC: 1,
      });
    } else {
      return res.status(400).json({
        message: "Không update được",
        EC: -1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Wrong somthing",
      EC: -1,
    });
  }
};

const get_all_template = async (req, res) => {
  try {
    let data = await templateService.get_all_template();
    if (data) {
      return res.status(200).json({
        data: data,
        EC: 1,
      });
    } else {
      return res.status(400).json({
        message: "Có lỗi",
        EC: -1,
      });
    }
  } catch (error) {
    return res.status(500).json({
      EC: -1,
      message: "Wrong something",
    });
  }
};

const delete_template = async (req, res) => {
  try {
    let data = await templateService.delete_template(req.params.id);
    if (data && data.DT) {
      return res.status(200).json({
        message: "xóa thành công",
        EC: 1,
      });
    } else {
      return res.status(400).json({
        message: "Không xóa được",
        EC: -1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Wrong somthing",
      EC: -1,
    });
  }
};

const get_template_byid = async (req, res) => {
  try {
    let data = await templateService.get_template_byidNganh(req.params.id);
    if (data) {
      return res.status(200).json({
        data: data,
        EC: 1,
      });
    } else {
      return res.status(400).json({
        message: "Có lỗi",
        EC: -1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EC: -1,
      message: "Wrong something",
    });
  }
};


const get_template_relate_idNganh = async (req, res) => {
  try {
    let data = await templateService.get_template_relate_idNganh(req.params.id);
    if (data) {
      return res.status(200).json({
        data: data,
        EC: 1,
      });
    } else {
      return res.status(400).json({
        message: "Có lỗi",
        EC: -1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EC: -1,
      message: "Wrong something",
    });
  }
};

const get_detail_template_byslug = async (req, res) => {
  try {
    let data = await templateService.get_detail_template_byslug(
      req.params.slug
    );
    if (data) {
      return res.status(200).json({
        data: data,
        EC: 1,
      });
    } else {
      return res.status(400).json({
        message: "Có lỗi",
        EC: -1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EC: -1,
      message: "Wrong something",
    });
  }
};

const get_all_template_paginate = async (req, res) => {
  try {
    const { page, limit } = req.query;
    let data = await templateService.get_all_template_paginate(page, limit);
    if (data && data.list) {
      return res.status(200).json({
        EC: 1,
        data: {
          page: page,
          limit: limit,
          totalPage: Math.ceil(+data.total / +limit),
          total: data.total,
        },
        list: data.list,
        
      });
    }
    return res.status(400).json({
      EC: -1,
      message: "fail fetch",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Err server",
      EC: -1,
    });
  }
};

const get_template_byIdNganh_paginate = async (req, res) => {
  try {
    const { page, limit } = req.query;
    let data = await templateService.get_template_byIdNganh_paginate(page, limit, req.params.id);
    if (data && data.list) {
      return res.status(200).json({
        EC: 1,
        data: {
          page: page,
          limit: limit,
          totalPage: Math.ceil(+data.total / +limit),
          total: data.total,
        },
        list: data.list,
      });
    }
    return res.status(400).json({
      EC: -1,
      message: "fail fetch",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Err server",
      EC: -1,
    });
  }
};

const get_template_bySearch = async (req, res) => {
  try {
    const { page, limit, s } = req.query;
    let data = await templateService.get_template_bySearch(page, limit, s);
    if (data && data.list) {
      return res.status(200).json({
        EC: 1,
        data: {
          page: page,
          limit: limit,
          totalPage: Math.ceil(+data.total / +limit),
          total: data.total,
        },
        list: data.list,
      });
    }
    return res.status(400).json({
      EC: -1,
      message: "fail fetch",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Err server",
      EC: -1,
    });
  }
};

export default {
  post_template,
  put_template,
  get_template_byid,
  get_all_template,
  delete_template,
  get_detail_template_byslug,
  get_all_template_paginate,
  get_template_byIdNganh_paginate,
  get_template_relate_idNganh,
  get_template_bySearch
};
