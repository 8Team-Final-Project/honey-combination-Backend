import express from "express";
import {eventlanding, eventlist} from "../controllers/eventController"


const eventRouter = express.Router();

eventRouter.get("/",eventlanding);
eventRouter.get("/list",eventlist);


export default eventRouter;