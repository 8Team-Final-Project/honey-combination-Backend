import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { Post } from "../models/Post.js";
import { Comment } from "../models/Comment.js";

export const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(400).send({
      errorMessage: "로그인 후 사용하세요",
    });
  }

  const [tokenType, tokenValue] = authorization.split(" ");
  if (!tokenValue || tokenType !== "Bearer") {
    res.status(400).send({
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
    res.status(400).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
  }
};

//게시글 상세페이지 좋아요 찜 상태
export const guestCheck = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    next();
  } else {
    try {
      const { _id } = jwt.verify(tokenValue, "honeytip-secret-key");
      const user = await User.findById(_id);
      req.user = user;
      next();
    } catch (err) {
      console.log(err);
      res.status(400).send({
        errorMessage: "로그인 후 이용 가능한 기능입니다.",
      });
    }
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

//댓글 작성자 체크
export const commentAuthorCheck = (req, res, next) => {
  Comment.findById(req.params.commentid, (err, comment) => {
    if (err) return res.json(err);
    if (comment.userId != req.user._id)
      return res.send({ msg: "당신은 게시글 작성자가 아닙니다." });
    next();
  });
};
