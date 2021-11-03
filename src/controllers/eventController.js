import { Event, EventLike } from "../models/Event.js";
// require('dotenv').config();
import dotenv from "dotenv";
dotenv.config();

import express from "express";
export const eventcreate = async (req, res) => {
  const event = new Event();
  try {
    const { postTitle, postContent, postTag } = req.body;
    const postImg = req.file.transforms[0].location;
    const userId = req.user._id;
    const userNickname = req.user.userNickname;
    const myPost = false;
    const likeState = false;
    const keepPoststate = false;
    const postState = true;
    const postDate = new Date();
    let currentDate = postDate.toLocaleString();
    const likeCnt = 0;
    const newEvent = await Event.create({
      userId,
      userNickname,
      postTitle,
      postContent,
      postImg,
      postTag,
      myPost,
      likeState,
      keepPoststate,
      postState,
      createDate: currentDate,
      likeCnt,
    });

    return res.status(200).send({ success: true, newEvent: newEvent });
  } catch (err) {
    console.log("게시글 등록 기능 중 발생한 에러: ", err);
    return res
      .status(500)
      .send({ success: false, msg: "게시글 등록 중 에러가 발생했습니다" });
  }
};

//이벤트 포스트 전체 불러오기
export const eventlist = async (req, res) => {
  Event.find({ postState: true }, (err, post) => {
    if (err) return res.status(500).send({ error: err });
    res.send(post);
  });
};

//_id으로 해당 포스트 찾기
export const eventfind = async (req, res) => {
  Event.findOne({ _id: req.params.postid }, (err, post) => {
    if (err) return res.status(500).send({ error: err });
    if (!post)
      return res
        .status(404)
        .send({ error: "해당 포스트가 존재하지 않습니다." });
    res.send(post);
  });
};

//update수정
export const eventupdate = async (req, res) => {
  Event.findOne({ _id: req.params.postid }, (err, post) => {
    if (err) return res.status(500).send({ error: "Database Failure!" });
    if (!post)
      return res
        .status(404)
        .send({ error: "해당 포스트가 존재하지 않습니다." });
    post.postTitle = req.body.postTitle;
    post.postContent = req.body.postContent;
    post.postImg = req.file.transforms[0].location;
    post.postTag = req.body.postTag;
    post.save((err) => {
      if (err) res.status(500).send({ error: "Failed to update!" });
      res.send({ message: "수정이 완료되었습니다!" });
    });
  });
};
//update 아래에 작성해주세요

//삭제

export const eventdelete = async (req, res) => {
  Event.findOne({ _id: req.params.postid }, (err, post) => {
    if (err) return res.status(500).send({ error: "Database Failure!" });
    if (!post)
      return res
        .status(404)
        .send({ error: "해당 포스트가 존재하지 않습니다." });
    post.postState = false;
    post.save((err) => {
      if (err) res.status(500).send({ error: "Failed to update!" });
      res.send({ message: "삭제가 완료되었습니다!" });
    });
  });
};
