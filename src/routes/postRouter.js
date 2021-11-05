import { authMiddleware, authorCheck } from "../middlewares/authMiddlewares.js";
import { uploadSingle } from "../middlewares/imagepostMiddlewares.js";
import { Post } from "../models/Post.js";
import express from "express";
import {
  postlist,
  event1list,
  event2list,
  event3list,
  postcreate,
  postfind,
  postupdate,
  postdelete,
  postuploadimg,
} from "../controllers/postController.js";
const postRouter = express.Router();

//multer을 어스와 post 사이에 넣기
postRouter.post("/", authMiddleware, postcreate);
postRouter.get("/", postlist);
postRouter.get("/event1list", event1list);
postRouter.get("/event2list", event2list);
postRouter.get("/event3list", event3list);
postRouter.get("/:postid", authMiddleware, postfind);
postRouter.patch(
  "/postupdate/:postid",
  authMiddleware,
  authorCheck,
  postupdate
);
postRouter.patch(
  "/postdelete/:postid",
  authMiddleware,
  authorCheck,
  postdelete
);
postRouter.post("/uploadimg", uploadSingle.single("postImg"), postuploadimg);
// /image
//단일 url 만들고 이미지 리턴 post이미지에 그대로 url req로 다시 돌려 받는다.
export default postRouter;
