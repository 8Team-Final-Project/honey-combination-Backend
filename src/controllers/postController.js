import { Post, Like } from "../models/Post.js";
import User from "../models/User.js";
import { Tag } from "../models/Tag.js";
import { Comment } from "../models/Comment.js";
import dotenv from "dotenv";
dotenv.config();
import jwtToken from "jsonwebtoken";
import express from "express";
import { authMiddleware } from "../middlewares/authMiddlewares.js";

const postDate = new Date();

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
  return date.getFullYear() + ". " + month + ". " + day;
}

export const postcreate = async (req, res) => {
  const post = new Post();
  try {
    const {
      postTitle,
      postRecipe,
      postContent,
      postTag,
      postImg1,
      postImg2,
      postImg3,
      postImg4,
      postImg5,
      mainlist,
      event1list,
      event2list,
      event3list,
    } = req.body;
    const title = await Post.find({ postTitle: req.body.postTitle });
    if (title.length >= 5) {
      return res
        .status(412)
        .send({ msg: "같은 제목의 게시글은 5개가 최대입니다." });
    }
    const userId = req.user._id;
    const userNickname = req.user.userNickname;
    const userImg = req.user.userImg;
    const myPost = false;
    const likeState = false;
    const keepPoststate = false;
    const postState = true;
    let currentDate = dateFormat(postDate);
    const likeCnt = 0;
    const commentCount = 0;
    const newPost = await Post.create({
      userId,
      userNickname,
      userImg,
      postTitle,
      postRecipe,
      postContent,
      postImg1,
      postImg2,
      postImg3,
      postImg4,
      postImg5,
      postTag,
      myPost,
      likeState,
      keepPoststate,
      postState,
      createDate: currentDate,
      likeCnt,
      commentCount,
      mainlist,
      event1list,
      event2list,
      event3list,
      keepUser: { _id: "777777068ab908b096cfa86c" },
    });

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
  const countAllpost = await Post.countDocuments({
    mainlist: true,
    postState: true,
  });
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
        res.status(200).send([post, { countAllpost: countAllpost }]);
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

//이벤트1 포스트 전체 불러오기
export const event1list = async (ctx, res) => {
  console.log(ctx.query);
  const countAllpost = await Post.countDocuments({
    event1list: true,
    postState: true,
  });
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
        res.status(200).send([post, { countAllpost: countAllpost }]);
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
  const countAllpost = await Post.countDocuments({
    event2list: true,
    postState: true,
  });
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
        res.status(200).send([post, { countAllpost: countAllpost }]);
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
  const countAllpost = await Post.countDocuments({
    event3list: true,
    postState: true,
  });
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
        res.status(200).send([post, { countAllpost: countAllpost }]);
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
export const postfind = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization == "null") {
    Post.findOne({ _id: req.params.postid }, (err, post) => {
      if (err) return res.status(500).send({ error: err });
      if (!post)
        return res
          .status(404)
          .send({ error: "해당 포스트가 존재하지 않습니다." });
      post.likeStatus = false;
      post.keepStatus = false;
      res.status(200).send(post);
      next();
    });
  }
  if (authorization) {
    const [tokenType, tokenValue] = authorization.split(" ");
    const { _id } = jwtToken.verify(tokenValue, "honeytip-secret-key");
    // console.log("토큰있을때 2", res.locals);
    const user = await User.findById(_id);
    // const user = res.locals.user
    req.user = user; //token에서 유저뽑아내기
    // const realLikepost = user.likePost;
    Post.findOne({ _id: req.params.postid }, (err, post) => {
      if (err) return res.status(500).send({ error: err });
      if (!post)
        return res
          .status(404)
          .send({ error: "해당 포스트가 존재하지 않습니다." });

      // const likeStatus = false;
      // [{_id : "rtjt23iotjfgiodfgg"}, {_id : "rtjt23iotjfgiodfgg"},{_id : "rtjt23iotjfgiodfgg"}]
      post.likeStatus = false;

      user.likePost.forEach((likePost) => {
        if (likePost._id == req.params.postid) {
          // likeStatus = true;
          post.likeStatus = true;
        }
      });
      post.keepStatus = false;
      user.keepPost.forEach((keepPost) => {
        if (keepPost._id == req.params.postid) {
          post.keepStatus = true;
        }
      });
      console.log("유저상태", user);
      console.log("포스트상태", post);
      console.log("라이크상태", post.likeStatus);
      console.log("찜상태", post.keepStatus);
      res.status(200).send(post);
    });
  }
};
//이전 코드
// for (let i = 0; i < user.likePost.length; i++) {
//   if (user.likePost[i]._id == req.params.postid) {
//     post.likeStatus = true;
//     for (let i = 0; i < user.keepPost.length; i++) {
//       user.keepPost.forEach((keep) => {
//         post.keepStatus =
//           user.keepPost[i]._id == req.params.postid ? true : false;
//       });
//     }
//   } else {
//     post.likeStatus = false;
//     for (let i = 0; i < user.keepPost.length; i++) {
//       user.keepPost.forEach((keep) => {
//         post.keepStatus =
//           user.keepPost[i]._id == req.params.postid ? true : false;
//       });
//     }
//   }
// }

// post 객체안에 데이터를 넣어야 함
//   현재 로그인 한 사람이 좋아요, 찜하기를 했는지
//   isLiked, isKeeped
// //좋아요 확인
// user.likePost.forEach((likepost) => {
//   let isLiked = false;
//   if (likepost._id === req.params.postid) {
//     isLiked = true;
//   }
//   post.isLiked = isLiked;
// });
// // 찜하기 확인
// user.keepPost.forEach((keeppost) => {
//   let isKeeped = false;
//   if (keeppost._id === req.params.postid) {
//     isKeeped = true;
//   }
//   post.isKeeped = true;
// });

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
    post.postImg1 = req.body.postImg1;
    post.postImg2 = req.body.postImg2;
    post.postImg3 = req.body.postImg3;
    post.postImg4 = req.body.postImg4;
    post.postImg5 = req.body.postImg5;
    post.save((err) => {
      if (err) res.status(500).send({ error: "Failed to update!" });
      res.status(201).send({ message: "수정이 완료되었습니다!" });
    });
  });
};

//게시글 삭제
export const postdelete = async (req, res) => {
  Post.deleteOne({ _id: req.params.postid }, (err, post) => {
    if (err) return res.status(500).send({ error: "Database Failure!" });
    if (!post)
      return res
        .status(404)
        .send({ error: "해당 포스트가 존재하지 않습니다." });
    res.status(204).send({ message: "삭제가 완료되었습니다!" });
  });
};

//이미지 업로드 API
export const postuploadimg = async (req, res) => {
  // const post = new Post();

  try {
    if (req.files.length >= 6) {
      return res
        .status(412)
        .send({ message: "5개까지만 사진을 업로드가 가능해요" });
    }
    if (req.files.length == 5) {
      const postImg1 = String(req.files[0].transforms[0].location);
      const postImg2 = String(req.files[1].transforms[0].location);
      const postImg3 = String(req.files[2].transforms[0].location);
      const postImg4 = String(req.files[3].transforms[0].location);
      const postImg5 = String(req.files[4].transforms[0].location);

      // const newPost = await Post.create({
      //   postImg: postImg1,
      //   postImg: postImg2,
      //   // postImg: postImg3,
      //   // postImg: postImg4,
      //   // postImg: postImg5,
      // });
      return res
        .status(201)
        .send([
          { postImg1: postImg1 },
          { postImg2: postImg2 },
          { postImg3: postImg3 },
          { postImg4: postImg4 },
          { postImg5: postImg5 },
        ]);
    }
    if (req.files.length == 4) {
      const postImg1 = String(req.files[0].transforms[0].location);
      const postImg2 = String(req.files[1].transforms[0].location);
      const postImg3 = String(req.files[2].transforms[0].location);
      const postImg4 = String(req.files[3].transforms[0].location);

      return res
        .status(201)
        .send([
          { postImg1: postImg1 },
          { postImg2: postImg2 },
          { postImg3: postImg3 },
          { postImg4: postImg4 },
        ]);
    }
    if (req.files.length == 3) {
      const postImg1 = String(req.files[0].transforms[0].location);
      const postImg2 = String(req.files[1].transforms[0].location);
      const postImg3 = String(req.files[2].transforms[0].location);

      return res
        .status(201)
        .send([
          { postImg1: postImg1 },
          { postImg2: postImg2 },
          { postImg3: postImg3 },
        ]);
    }
    if (req.files.length == 2) {
      const postImg1 = String(req.files[0].transforms[0].location);
      const postImg2 = String(req.files[1].transforms[0].location);

      return res
        .status(201)
        .send([{ postImg1: postImg1 }, { postImg2: postImg2 }]);
    }
    if (req.files.length == 1) {
      const postImg1 = String(req.files[0].transforms[0].location);
      return res.status(201).send([{ postImg1: postImg1 }]);
    } else {
      return res.status(400).send({ message: "없음" });
    }
  } catch (err) {
    console.log("게시글 등록 기능 중 발생한 에러: ", err);
    return res
      .status(500)
      .json({ success: false, msg: "게시글 등록 중 에러가 발생했습니다" });
  }
};

//해시태그 검색(단일 키워드) API
export const posttagsearch = async (ctx, res, next) => {
  console.log(ctx.query);
  const countAllpost = await Post.countDocuments({
    mainlist: true,
    postState: true,
  });
  const page = parseInt(ctx.query.page || "1", 10);
  let options = [];
  if (page < 1) {
    res.status = 400;
    return;
  }
  try {
    if (ctx.query.option == "posttag1") {
      options = [{ postTag: new RegExp(ctx.query.content) }];
    } else {
      const err = new Error("검색 옵션이 없습니다.");
      err.status = 400;
      throw err;
    }
    const posts = await Post.find({ $or: options }, (err, post) => {
      if (err) return res.status(500).send({ error: err });
      res.send([post, { countAllpost: 50 }]);
    })
      .sort({ postTag: -1 })
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
    return res
      .status(500)
      .json({ success: false, msg: "게시글 조회 중 에러가 발생했습니다" });
  }
};

//좋아요 순으로 나열->이벤트 게시물만 되게끔 바꾸어야함
export const postlike = async (req, res) => {
  try {
    Post.find({}, (err, posts) => {
      if (err) return res.status(500).send({ error: err });
      res.status(200).send({ success: true, posts: posts });
    }).sort({ likeCnt: -1 });
  } catch (err) {
    console.log("좋아요 조회 중 발생한 에러: ", err);
    return res
      .status(500)
      .send({ success: false, msg: "좋아요 조회 중 에러 발생" });
  }
};
