import express from "express";
import { homelending } from "../controllers/eventController.js";

const globalRouter = express.Router();

globalRouter.get("/", homelending);

export default globalRouter;
