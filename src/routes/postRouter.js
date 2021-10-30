import { authMiddleware } from "../middlewares/authMiddlewares.js";
import express from "express";
import {
  postcreate,
  postfind,
  postupdate,
  postdelete,
} from "../controllers/postController.js";
const postRouter = express.Router();

postRouter.post("/", authMiddleware, postcreate);
postRouter.get("/:postid", postfind);
postRouter.patch("/postupdate/:postid", authMiddleware, postupdate);
postRouter.patch("/postdelete/:postid", authMiddleware, postdelete);

export default postRouter;
