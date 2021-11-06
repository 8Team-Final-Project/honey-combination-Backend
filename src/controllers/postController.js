import { Post, Like } from "../models/Post.js";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
//CREATE

export const postcreate = async (req, res) => {
  const post = new Post();

  try {
    const {
      postTitle,
      postRecipe,
      postContent,
      postTag,
      postImg,
      mainlist,
      event1list,
      event2list,
      event3list,
    } = req.body;
    // const postImg= req.file.transforms[0].location;
    const userId = req.user._id;
    const userNickname = req.user.userNickname;
    const myPost = false;
    const likeState = false;
    const keepPoststate = false;
    const postState = true;
    const postDate = new Date();
    let currentDate = postDate.toLocaleString();
    const likeCnt = 0;
    const newPost = await Post.create({
      userId,
      userNickname,
      postTitle,
      postRecipe,
      postContent,
      postImg,
      postTag,
      myPost,
      likeState,
      keepPoststate,
      postState,
      createDate: currentDate,
      likeCnt,
      mainlist,
      event1list,
      event2list,
      event3list,
    });
    console.log(event1list);
    return res.status(200).send({ success: true, newPost: newPost });
  } catch (err) {
    console.log("게시글 등록 기능 중 발생한 에러: ", err);
    return res
      .status(500)
      .send({ success: false, msg: "게시글 등록 중 에러가 발생했습니다" });
  }
};

//포스트리스트 전체 불러오기
export const postlist = async (ctx, res, next) => {
  console.log(ctx.query);
  console.log(ctx.query.postTag);
  const countAllpost = await Post.countDocuments({mainlist: true, postState: true});
  const page = parseInt(ctx.query.page || "1", 10);
  if (page < 1) {
    res.status = 400;
    return;
  }
  try {
    const posts = await Post.find(
      { mainlist: true, postState: true },
      (err, post) => {
        if (err) return res.status(500).send({ error: err });
        // if (post) res.send()
        res.send([post,{countAllpost:countAllpost}]);
      }
    )
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec();
    const postCount = await Post.countDocuments(posts).exec();
    ctx.set("Last-Page", Math.ceil(postCount / 10));
    ctx.body = posts.map((post) => ({
      post,
      body: removeHtmlAndShorten(post.body),
    }));
    
  }catch (err) {
    // console.log("게시물 조회중 발생한 에러: ", err);
    // return res
    //   .status(500)
    //   .json({ success: false, msg: "게시글 조회 중 에러가 발생했습니다" });
  }
};

//꿀조합 포스트 전체 불러오기
// export const postlist = async (req, res) => {
//   Post.find({ mainlist: true, postState: true }, (err, post) => {
//     if (err) return res.status(500).send({ error: err });
//     res.send(post);
//   }).limit(10).skip((page-1)*10).lean().exec();
// };

//이벤트1 포스트 전체 불러오기
export const event1list = async (ctx, res) => {
  console.log(ctx.query);
  const countAllpost = await Post.countDocuments({event1list: true, postState: true});
  const page = parseInt(ctx.query.page || "1", 10);
  if (page < 1) {
    res.status = 400;
    return;
  }
  try {
    const posts = await Post.find(
      { event1list: true, postState: true },
      (err, post) => {
        if (err) return res.status(500).send({ error: err });
        res.send([post,{countAllpost:countAllpost}]);
      }
    )
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec();
    const postCount = await Post.countDocuments(posts).exec();
    ctx.set("Last-Page", Math.ceil(postCount / 10));
    ctx.body = posts.map((post) => ({
      post,
      body: removeHtmlAndShorten(post.body),
    }));
  } catch (err) {
    // console.log("게시물 조회중 발생한 에러: ", err);
    // return res
    //   .status(500)
    //   .json({ success: false, msg: "게시글 조회 중 에러가 발생했습니다" });
  }
};

//이벤트2 포스트 전체 불러오기
export const event2list = async (ctx, res) => {
  console.log(ctx.query);
  const countAllpost = await Post.countDocuments({event2list: true, postState: true});
  const page = parseInt(ctx.query.page || "1", 10);
  if (page < 1) {
    res.status = 400;
    return;
  }
  try {
    const posts = await Post.find(
      { event2list: true, postState: true },
      (err, post) => {
        if (err) return res.status(500).send({ error: err });
        res.send([post,{countAllpost:countAllpost}]);
      }
    )
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec();
    const postCount = await Post.countDocuments(posts).exec();
    ctx.set("Last-Page", Math.ceil(postCount / 10));
    ctx.body = posts.map((post) => ({
      post,
      body: removeHtmlAndShorten(post.body),
    }));
  } catch (err) {
    // console.log("게시물 조회중 발생한 에러: ", err);
    // return res
    //   .status(500)
    //   .json({ success: false, msg: "게시글 조회 중 에러가 발생했습니다" });
  }
};

//이벤트3 포스트 전체 불러오기
export const event3list = async (ctx, res) => {
  console.log(ctx.query);
  const countAllpost = await Post.countDocuments({event3list: true, postState: true});
  const page = parseInt(ctx.query.page || "1", 10);
  if (page < 1) {
    res.status = 400;
    return;
  }
  try {
    const posts = await Post.find(
      { event3list: true, postState: true },
      (err, post) => {
        if (err) return res.status(500).send({ error: err });
        res.send([post,{countAllpost:countAllpost}]);
      }
    )
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec();
    const postCount = await Post.countDocuments(posts).exec();
    ctx.set("Last-Page", Math.ceil(postCount / 10));
    ctx.body = posts.map((post) => ({
      post,
      body: removeHtmlAndShorten(post.body),
    }));
  } catch (err) {
    // console.log("게시물 조회중 발생한 에러: ", err);
    // return res
    //   .status(500)
    //   .json({ success: false, msg: "게시글 조회 중 에러가 발생했습니다" });
  }
};

//_id으로 해당 포스트 찾기
export const postfind = async (req, res) => {
  Post.findOne({ _id: req.params.postid }, (err, post) => {
    if (err) return res.status(500).send({ error: err });
    if (!post)
      return res
        .status(404)
        .send({ error: "해당 포스트가 존재하지 않습니다." });
    res.send(post);
  });
};

//update수정
export const postupdate = async (req, res) => {
  Post.findOne({ _id: req.params.postid }, (err, post) => {
    if (err) return res.status(500).send({ error: "Database Failure!" });
    if (!post)
      return res
        .status(404)
        .send({ error: "해당 포스트가 존재하지 않습니다." });
    post.postTitle = req.body.postTitle;
    post.postRecipe = req.body.postRecipe;
    post.postContent = req.body.postContent;
    post.postImg = req.body.postImg;
    // post.postImg = req.file.transforms[0].location;
    post.save((err) => {
      if (err) res.status(500).send({ error: "Failed to update!" });
      res.send({ message: "수정이 완료되었습니다!" });
    });
  });
};
//update 아래에 작성해주세요

//삭제

export const postdelete = async (req, res) => {
  Post.findOne({ _id: req.params.postid }, (err, post) => {
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

//이미지 업로드 API
export const postuploadimg = async (req, res) => {
  const post = new Post();

  try {
    console.log(req.file);
    const postImg = req.file.transforms[0].location;
    const newPost = await Post.create({
      postImg,
    });

    return res.status(200).send({ postImg: postImg });
  } catch (err) {
    console.log("게시글 등록 기능 중 발생한 에러: ", err);
    return res
      .status(500)
      .json({ success: false, msg: "게시글 등록 중 에러가 발생했습니다" });
  }
};

// //검색 api
// export const posttagsearch = async (ctx, res, next) => {
//     console.log(ctx.query);
//     const countAllpost = await Post.countDocuments({mainlist: true, postState: true});
//     const page = parseInt(ctx.query.page || "1", 10);
//     if (page < 1) {
//       res.status = 400;
//       return;
//     }
//     try {
//       const posts = await Post.find(
//         { mainlist: true, postState: true },
//         (err, post) => {
//           if (err) return res.status(500).send({ error: err });
//           res.send([post,{countAllpost:countAllpost}]);
//         }
//       )
//         .sort({ _id: -1 })
//         .limit(10)
//         .skip((page - 1) * 10)
//         .lean()
//         .exec();
//       const postCount = await Post.countDocuments(posts).exec();
//       ctx.set("Last-Page", Math.ceil(postCount / 10));
//       ctx.body = posts.map((post) => ({
//         post,
//         body: removeHtmlAndShorten(post.body),
//       }));
//     } catch (err) {
//       // console.log("게시물 조회중 발생한 에러: ", err);
//       // return res
//       //   .status(500)
//       //   .json({ success: false, msg: "게시글 조회 중 에러가 발생했습니다" });
//     }
//   };