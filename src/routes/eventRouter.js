import {
  authMiddleware,
  eventauthorCheck,
} from "../middlewares/authMiddlewares.js";
import { uploadSingle } from "../middlewares/imagepostMiddlewares.js";
import express from "express";
import {
  eventlist,
  eventcreate,
  eventfind,
  eventupdate,
  eventdelete,
} from "../controllers/eventController.js";

import { postuploadimg } from "../controllers/postController.js";
const eventRouter = express.Router();

eventRouter.post(
  "/",
  authMiddleware,
  // uploadSingle.single("postImg"),
  eventcreate
); //이벤트 렌딩페이지
eventRouter.get("/", authMiddleware, eventlist); //이벤트 게시판
eventRouter.get("/:postid", eventfind);
eventRouter.patch(
  "/eventupdate/:postid",
  authMiddleware,
  eventauthorCheck,
  // uploadSingle.single("postImg"),
  eventupdate
);
eventRouter.patch(
  "/eventdelete/:postid",
  authMiddleware,
  eventauthorCheck,
  eventdelete
);
eventRouter.post("/uploadimg", uploadSingle.single("postImg"), postuploadimg);

export default eventRouter;
