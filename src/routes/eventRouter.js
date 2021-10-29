import express from "express";
import { eventlanding, eventlist } from "../controllers/eventController.js";

const eventRouter = express.Router();

eventRouter.get("/", eventlanding);
eventRouter.get("/list", eventlist);

export default eventRouter;
