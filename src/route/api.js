import express from "express";
import nganhController from "../controllers/nganhController";
import accountController from "../controllers/accountController";
import templateController from "../controllers/templateController";
import uploadfileController from "../controllers/uploadfileController";

const router = express.Router();
require("dotenv").config();

const initApiRouter = (app) => {
  router.get("/", (req, res) => {
    res.send("helloooooo");
  });

  // nganh
  router.post("/nganh", nganhController.post_nganh);
  router.put("/nganh/:id", nganhController.put_nganh);
  router.get("/nganh", nganhController.get_all_nganh);
  router.get("/name_nganh/:id", nganhController.get_nameNganh_fromId);
  router.delete("/nganh/:id", nganhController.delete_nganh);
  //custom list menu (con)
  router.get("/nganh_parent", nganhController.get_nganh_parent_home);
  router.get("/listchildnganh/:id", nganhController.get_idChildren_from_parent);



  // template
  router.post("/template", templateController.post_template);
  router.put("/template/:id", templateController.put_template);
  router.get("/template", templateController.get_all_template);
  router.delete("/template/:id", templateController.delete_template);
  router.get("/template_byid/:id", templateController.get_template_byid);
  router.get("/detail_template/:slug", templateController.get_detail_template_byslug);

  router.get("/paginate_template", templateController.get_all_template_paginate);
  router.get("/paginate_template_byidnganh/:id", templateController.get_template_byIdNganh_paginate);
  router.get("/relate_template/:id", templateController.get_template_relate_idNganh);

  router.get("/paginate_template_search", templateController.get_template_bySearch);


  //account
  // router.post("/register", accountController.postRegister);
  router.post("/login", accountController.postLogin);
  router.put(
    "/changepassword",
    accountController.checkPass,
    accountController.putPasswordUser
  );

  //upload
  router.post("/uploadImg", uploadfileController.postFileUploadImage);

  return app.use("/api/v1", router);
};

export default initApiRouter;
