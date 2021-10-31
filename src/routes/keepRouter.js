import { authMiddleware } from "../middlewares/authMiddlewares.js";
import express from "express";
import { keepclick } from "../controllers/keepController.js";
const keepRouter = express.Router();

keepRouter.patch("/:postid", authMiddleware, keepclick);

export default keepRouter;
