import { createRequire } from "module";
const require = createRequire(import.meta.url);
// import globalRouter from "../src/routes/globalRouter.js";
import eventRouter from "../src/routes/eventRouter.js";
import userRouter from "../src/routes/userRouter.js";
import postRouter from "../src/routes/postRouter.js";
import likeRouter from "../src/routes/likeRouter.js";
import keepRouter from "../src/routes/keepRouter.js";

const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// const Postmodel = require("./models/Post.js"); //post스키마를 쓰겠다.
// const Post = require("./routes/post.cjs")(app, Postmodel);

app.listen(port, function () {
  console.log("Express server has started on port " + port);
});

// mongo DB connect
try {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error);
  db.once("open", function () {
    //몽고디비 서버에 연결
    console.log("Connected to mongod server");
  });
} catch (error) {
  console.log("mongo connect error : ", error);
}

// module.exports = app;

// app.use("/", globalRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/event", eventRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/like", likeRouter);
app.use("/api/v1/keep", keepRouter);
