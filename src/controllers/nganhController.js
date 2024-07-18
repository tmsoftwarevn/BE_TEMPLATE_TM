import nganhService from "../service/nganhService";

const post_nganh = async (req, res) => {
  const data = await nganhService.post_nganh(req.body);
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

const put_nganh = async (req, res) => {
  try {
    let data = await nganhService.put_nganh(req.body, req.params.id);
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


const get_all_nganh = async (req, res) => {
  try {
    let data = await nganhService.get_all_nganh();
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

const delete_nganh = async (req, res) => {
  try {
    let data = await nganhService.delete_nganh(req.params.id);
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
export default { post_nganh, put_nganh, get_all_nganh, delete_nganh };
