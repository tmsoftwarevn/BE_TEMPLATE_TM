import accountService from "../service/accountService";

const postLogin = async (req, res) => {
  try {
    let data = await accountService.loginService(req.body);
    if (data && data.DT) {
      return res.status(200).json({
        data: "Login success",
        EC: 1,
      });
    }
    return res.status(400).json({
      EC: -1,
      message: data.message,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EC: -1,
      message: "Some thing wrong server",
    });
  }
};
const postRegister = async (req, res) => {
  try {
    let data = await accountService.registerService(req.body);
    if (data && data.user) {
      return res.status(201).json({
        data: "Đăng kí thành công",
        EC: 1,
      });
    } else {
      return res.status(400).json({
        message: data.message,
        EC: -1,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Wrong somthing at server",
      EC: -1,
    });
  }
};
const putPasswordUser = async (req, res) => {
  let data = await accountService.updatePasswordUser(
    req.body.name,
    req.body.new_password
  );
  if (data && data.DT) {
    return res.status(200).json({
      data: "Đổi mật khẩu thành công",
      EC: 1
    });
  } else {
    return res.status(400).json({
      message: "Có lỗi",
      EC: -1
    });
  }
};
const checkPass = async (req, res, next) => {
  let check = await accountService.checkPasswordService(
    req.body.name,
    req.body.password
  );
  if (check === true) {
    return next();
  } else {
    return res.status(400).json({
      message: "Tài khoản hoặc mật khẩu không chính xác",
      EC: -1
    });
  }
};
export default { postRegister, postLogin, checkPass, putPasswordUser };
