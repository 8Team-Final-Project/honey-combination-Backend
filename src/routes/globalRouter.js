import express from "express";
import { homelending } from "../controllers/eventController.js";

const globalRouter = express.Router();

globalRouter.get("/",homelending);//홈페이지

export default globalRouter;
