import {
  authMiddleware,
  authorCheck,
} from "../middlewares/authMiddlewares.js";
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
  posttagsearch,
  postlike,
} from "../controllers/postController.js";
const postRouter = express.Router();

postRouter.post("/", authMiddleware, postcreate);
postRouter.get("/", postlist);
postRouter.get("/event1list", event1list);
postRouter.get("/event2list", event2list);
postRouter.get("/event3list", event3list);
postRouter.get("/posttag", posttagsearch);
postRouter.get("/postlikes", postlike);
postRouter.get("/:postid", postfind); //이거 다음에는 왜 좋아요 순으로 나열이 안되지?

postRouter.patch(
  "/postupdate/:postid",
  authMiddleware,
  authorCheck,
  postupdate
);

postRouter.delete(
  "/postdelete/:postid",
  authMiddleware,
  authorCheck,
  postdelete
);

postRouter.post("/uploadimg", uploadSingle.array("postImg", 30), postuploadimg);

export default postRouter;
