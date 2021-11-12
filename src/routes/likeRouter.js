import { authMiddleware } from "../middlewares/authMiddlewares.js";
import express from "express";
import { likeclick } from "../controllers/likeController.js";
// import {likePost, unlikePost,likedPost} from "../controllers/likeController.js"
const likeRouter = express.Router();

likeRouter.patch("/:postid", authMiddleware, likeclick);

//11월11일 좋아요 만들기
// likeRouter.put("/:postid", authMiddleware, likePost);
// likeRouter.put("/:postid", authMiddleware, unlikePost);
// likeRouter.get("/liked/:postid",authMiddleware, likedPost);
export default likeRouter;
