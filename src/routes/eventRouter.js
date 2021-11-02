import { authMiddleware } from "../middlewares/authMiddlewares.js";
import express from "express";
import {
  eventlist,
  eventcreate,
  eventfind,
  eventupdate,
  eventdelete,
} from "../controllers/eventController.js";

const eventRouter = express.Router();

eventRouter.post("/", authMiddleware, eventcreate); //이벤트 렌딩페이지
eventRouter.get("/", eventlist); //이벤트 게시판
eventRouter.get("/:postid", eventfind);
eventRouter.patch("/eventupdate/:postid", authMiddleware, eventupdate);
eventRouter.patch("/eventdelete/:postid", authMiddleware, eventdelete);

export default eventRouter;
