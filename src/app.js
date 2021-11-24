import userRouter from "../src/routes/userRouter.js";
import postRouter from "../src/routes/postRouter.js";
import likeRouter from "../src/routes/likeRouter.js";
import keepRouter from "../src/routes/keepRouter.js";
import commentRouter from "../src/routes/commentRouter.js";
import tagRouter from "../src/routes/tagRouter.js";
import specs from "./modules/swagger.js";
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import mongoose from 'mongoose';

const app = express();
//스웨거 적용
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

dotenv.config();
const corsOptions = {
  origin: true,
  credentials: true,
};
const port = process.env.PORT || 8000;

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


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
// app.use("/api/v1/event", eventRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/like", likeRouter);
app.use("/api/v1/keep", keepRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/tag", tagRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
