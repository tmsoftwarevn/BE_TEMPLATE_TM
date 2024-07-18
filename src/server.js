import express from "express";
import configViewEngine from "./config/viewEngine";
import initApiRouter from "./route/api";
import bodyParser from "body-parser";
import connectDB from "./config/connectDB";
const path = require("path");

const fileUpload = require("express-fileupload");
const cors = require("cors");

const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(fileUpload());
configViewEngine(app);


app.use(
  cors({
    origin: [process.env.PORT_URL],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

connectDB();
initApiRouter(app);


app.listen(PORT, () => {
  console.log("run app success , port is: ", +PORT);
});
