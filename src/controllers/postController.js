import Post from "../models/Post.js";
// require('dotenv').config();
import dotenv from "dotenv";
dotenv.config()

import express from "express";
//CREATE
export const postcreate = async (req, res) => {
  const post = new Post();

  try {
    console.log(req.file);
    const { postTitle, postContent } = req.body;
    const postImg= req.file.transforms[0].location;
    const userId = req.user._id;
    const userNickname = req.user.userNickname;
    const myPost = false;
    const likeState = false;
    const unlikeState = false;
    const keepPoststate = false;
    const postState = true;
    const postDate = new Date();
    let currentDate = postDate.toLocaleString();
    const newPost = await Post.create({
      postImg,
      userId,
      userNickname,
      postTitle,
      postContent,
      postImg,
      // postTag,
      myPost,
      likeState,
      unlikeState,
      keepPoststate,
      postState,
      createDate: currentDate,
    });
    
    return res.status(200).send({ success: true, newPost: newPost });
  } catch (err) {
    console.log("게시글 등록 기능 중 발생한 에러: ", err);
    return res
      .status(500)
      .json({ success: false, msg: "게시글 등록 중 에러가 발생했습니다" });
  }
};

//_id으로 해당 포스트 찾기
export const postfind = async (req, res) => {
  Post.findOne({ _id: req.params.postid }, (err, post) => {
    console.log(req.params.postid);
    if (err) return res.status(500).json({ error: err });
    if (!post)
      return res
        .status(404)
        .json({ error: "해당 포스트가 존재하지 않습니다." });
    res.json(post);
  });
};

//update수정
export const postupdate = async (req, res) => {
  Post.findOne({ _id: req.params.postid }, (err, post) => {
    if (err) return res.status(500).json({ error: "Database Failure!" });
    if (!post)
      return res
        .status(404)
        .json({ error: "해당 포스트가 존재하지 않습니다." });
    post.postTitle = req.body.postTitle;
    post.postContent = req.body.postContent;
    post.postImg = req.file.transforms[0].location;
    post.save((err) => {
      if (err) res.status(500).json({ error: "Failed to update!" });
      res.json({ message: "수정이 완료되었습니다!" });
    });
  });
};
//update 아래에 작성해주세요

//삭제

export const postdelete = async (req, res) => {
  Post.findOne({ _id: req.params.postid }, (err, post) => {
    if (err) return res.status(500).json({ error: "Database Failure!" });
    if (!post)
      return res
        .status(404)
        .json({ error: "해당 포스트가 존재하지 않습니다." });
    post.postState = false;
    post.save((err) => {
      if (err) res.status(500).json({ error: "Failed to update!" });
      res.json({ message: "삭제가 완료되었습니다!" });
    });
  });
};