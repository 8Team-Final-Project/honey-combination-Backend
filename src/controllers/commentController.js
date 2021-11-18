import { Comment } from "../models/Comment.js";
import dotenv from "dotenv";
dotenv.config();
import jwtToken from "jsonwebtoken";

const commentDate = new Date();

function dateFormat(date) {
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  month = month >= 10 ? month : "0" + month;
  day = day >= 10 ? day : "0" + day;
  hour = hour >= 10 ? hour : "0" + hour;
  minute = minute >= 10 ? minute : "0" + minute;
  second = second >= 10 ? second : "0" + second;
  return (
    date.getFullYear() + ". " + month + ". " + day
    //+
    // " "
    // +
    // hour +
    // ":" +
    // minute +
    // ":" +
    // second
  );
}

export const commentcreate = async (req, res) => {
  const comment = new Comment();

  try {
    const { commentContent } = req.body;
    const postId = req.params.postid;
    const userId = req.user._id;
    const userNickname = req.user.userNickname;
    let currentDate = dateFormat(commentDate);
    const newComment = await Comment.create({
      postId,
      userId,
      userNickname,
      commentContent,
      createDate: currentDate,
    });
    return res.status(201).send({
      success: true,
      msg: "댓글이 작성되었습니다",
      newComment: newComment,
    });
  } catch (err) {
    console.log("댓글 등록 기능 중 발생한 에러: ", err);
    return res
      .status(500)
      .send({ success: false, msg: "댓글 등록 중 에러가 발생했습니다" });
  }
};

export const commentlist = async (req, res) => {
  Comment.find({ postId: req.params.postid }, (err, comment) => {
    if (err) return res.status(500).send({ error: err });
    res.status(200).send(comment);
  });
};

export const commentupdate = async (req, res) => {
  Comment.findOne({ _id: req.params.commentid }, (err, comment) => {
    if (err) return res.status(500).send({ error: "서버오류" });
    if (!comment)
      return res.status(404).send({ error: "해당 댓글이 존재하지 않습니다." });
    comment.commentContent = req.body.commentContent;
    comment.save((err) => {
      if (err) res.status(500).send({ error: "수정실패" });
      res.send({ message: "수정이 완료되었습니다" });
    });
  });
};

export const commentdelete = async (req, res) => {
  Comment.deleteOne({ _id: req.params.commentid }, (err, comment) => {
    if (err) return res.status(500).send({ error: "서버문제" });
    if (!comment)
      return res.status(404).send({ error: "해당 댓글이 존재하지 않습니다" });
    res.status(200).send({ message: "삭제가 완료되었습니다" });
  });
};
