import bcrypt from "bcryptjs";
const db = require("../models");
const salt = bcrypt.genSaltSync(10);
const hashUserPassword = (userPassword) => {
  let hash = bcrypt.hashSync(userPassword, salt);
  return hash;
};

const registerService = async (rawData) => {
  try {
    let hashPassword = hashUserPassword(rawData.password);
    let newUser = await db.admin.create({
      name: rawData.name,
      password: hashPassword,
    });

    return {
      user: newUser,
    };
  } catch (error) {
    console.log(error);
  }
};

const loginService = async (rawData) => {
  try {
    let user = await db.admin.findOne({
      where: {
        name: rawData.name,
      },
    });

    if (user) {
      let userData = user.get({ plain: true });

      let isPassword = bcrypt.compareSync(rawData.password, userData.password);
      if (isPassword) {
        return {
          DT: 'Login success'
        };
      }
    }
    return {
      message: "Email hoặc mật khẩu chưa đúng.Hãy kiểm tra lại",
    };

  } catch (error) {
    console.log("error", error);
    return {
      message: "Something wrong from server",
    };
  }
};

const updatePasswordUser = async (name, newPass) => {
  try {
    
    let hashPassword = hashUserPassword(newPass);
    let u = await db.admin.update(
      { password: hashPassword },
      { where: { name: name } }
    );
    if (u[0] >0)
      return {
        DT: "update success",
      };
  } catch (error) {
    return {
      message: "Có lỗi xảy ra",
    };
  }
};
const checkPasswordService = async (name, pass) => {
  let user = await db.admin.findOne({
    where: {
      name: name,
    },
  });
  if (user) {
    let userData = user.get({ plain: true });
    let isPassword = bcrypt.compareSync(pass, userData.password);
    if (isPassword) {
      return true;
    }
  }
  return false;
};
export default { registerService, loginService,updatePasswordUser, checkPasswordService };
