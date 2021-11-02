import { authMiddleware } from "../middlewares/authMiddlewares.js";
import { uploadSingle } from "../middlewares/imagepostMiddlewares.js";
import express from "express";
import {
  postlist,
  postcreate,
  postfind,
  postupdate,
  postdelete,
} from "../controllers/postController.js";
const postRouter = express.Router();

//multer을 어스와 post 사이에 넣기
postRouter.post(
  "/",
  authMiddleware,
  uploadSingle.single("postImg"),
  postcreate
);
postRouter.get("/", postlist);
postRouter.get("/:postid", postfind);
postRouter.patch(
  "/postupdate/:postid",
  authMiddleware,
  uploadSingle.single("postImg"),
  postupdate
);
postRouter.patch("/postdelete/:postid", authMiddleware, postdelete);

export default postRouter;
