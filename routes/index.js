import express from "express";
import api from "./apis.js";
import multer from "multer";
const app = express();
var upload = multer();
var type = upload.single("file");

app.get("/clone", api.clone);
app.post("/insert", type, api.insert);

export default app
