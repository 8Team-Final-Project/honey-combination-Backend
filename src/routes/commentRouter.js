import {
  authMiddleware,
  commentAuthorCheck,
} from "../middlewares/authMiddlewares.js";

import express from "express";
import {
  commentcreate,
  commentupdate,
  commentdelete,
  commentlist,
} from "../controllers/commentController.js";
const commentRouter = express.Router();

commentRouter.post("/:postid", authMiddleware, commentcreate);
commentRouter.get("/:postid", commentlist);
commentRouter.patch(
  "/commentupdate/:commentid",
  authMiddleware,
  commentAuthorCheck,
  commentupdate
);
commentRouter.delete(
  "/commentdelete/:commentid/:postid",
  authMiddleware,
  commentAuthorCheck,
  commentdelete
);

export default commentRouter;
