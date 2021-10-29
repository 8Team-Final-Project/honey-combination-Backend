import express from "express";
import { eventlanding, eventlist } from "../controllers/eventController.js";

const eventRouter = express.Router();

eventRouter.get("/",eventlanding); //이벤트 렌딩페이지
eventRouter.get("/list",eventlist); //이벤트 게시판


export default eventRouter;
