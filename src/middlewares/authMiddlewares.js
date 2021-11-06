import jwt from "jsonwebtoken";
// import User from "../models/User.js";
import User from "../models/User.js";
import { Post } from "../models/Post.js";
// import { Event } from "../models/Event.js";

export const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  // const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({
      errorMessage: "로그인 후 사용하세요",
    });
  }

  const [tokenType, tokenValue] = authorization.split(" ");
  if (!tokenValue || tokenType !== "Bearer") {
    res.status(401).send({
      errorMessage: "로그인 후 사용하세요",
    });
    return;
  }

  try {
    const { _id } = jwt.verify(tokenValue, "honeytip-secret-key");
    const user = await User.findById(_id);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
  }
};

// 게시판 글 작성자 체크
export const authorCheck = (req, res, next) => {
  Post.findById(req.params.postid, (err, post) => {
    if (err) return res.json(err);
    if (post.userId != req.user._id)
      return res.send({ msg: "당신은 게시글 작성자가 아닙니다." });
    next();
  });
};

// 이벤트게시판 글 작성자 체크
export const eventauthorCheck = (req, res, next) => {
  Event.findById(req.params.postid, (err, post) => {
    if (err) return res.json(err);
    if (post.userId != req.user._id)
      return res.send({ msg: "당신은 게시글 작성자가 아닙니다." });
    next();
  });
};

const jwt = require("jsonwebtoken");
require("dotenv").config;

module.exports = {
  authForGuest: async (req, res, next) => {
    try {
      const token = req.cookies.user;
      if (!token) {
        res.locals.user = 13;
        next();
      } else {
        const { id } = jwt.verify(token, process.env.SECRET_KEY);
        res.locals.user = id;
        next();
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  auth: async (req, res, next) => {
    try {
      const token = req.cookies.user;
      if (!token) {
        res.status(401).json({ success: false });
      } else {
        const { id } = jwt.verify(token, process.env.SECRET_KEY);
        res.locals.user = id;
        next();
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
};
