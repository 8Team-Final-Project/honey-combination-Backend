import express from "express";
import {
  tagCheck,
  famousTag,
  updateTag,
} from "../controllers/tagController.js";
const tagRouter = express.Router();

tagRouter.post("/", tagCheck);
tagRouter.get("/", famousTag);
tagRouter.patch("/:postid", updateTag);

export default tagRouter;
