import { authMiddleware } from "../middlewares/authMiddlewares.js";
import express from "express";
import { likeclick } from "../controllers/likeController.js";
const likeRouter = express.Router();

likeRouter.patch("/:postid", authMiddleware, likeclick);

export default likeRouter;
