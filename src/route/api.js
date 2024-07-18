import express from "express";
import nganhController from "../controllers/nganhController";
import accountController from "../controllers/accountController";
import templateController from "../controllers/templateController";

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
  router.delete("/nganh/:id", nganhController.delete_nganh);

  // template
  router.post("/template", templateController.post_template);
  router.put("/template/:id", templateController.put_template);
  router.get("/template", templateController.get_all_template);
  router.delete("/template/:id", templateController.delete_template);

  //account
  // router.post("/register", accountController.postRegister);
  router.post("/login", accountController.postLogin);
  router.put(
    "/changepassword",
    accountController.checkPass,
    accountController.putPasswordUser
  );

  return app.use("/api/v1", router);
};

export default initApiRouter;
