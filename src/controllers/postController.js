import { Post, Like } from "../models/Post.js";
import User from "../models/User.js";
import { Comment } from "../models/Comment.js";
import dotenv from "dotenv";
dotenv.config();
import jwtToken from "jsonwebtoken";
import express from "express";
import { authMiddleware } from "../middlewares/authMiddlewares.js";
//CREATE

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
export const postcreate = async (req, res) => {
  const post = new Post();
//11월18일 오전9시 이미지업로드 수정과 동시 수정
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
    // const postImg= req.file.transforms[0].location;
    const userId = req.user._id;
    const userNickname = req.user.userNickname;
    const myPost = false;
    const likeState = false;
    const keepPoststate = false;
    const postState = true;
    let currentDate = dateFormat(postDate);
    const likeCnt = 0;
    const newPost = await Post.create({
      userId,
      userNickname,
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
      mainlist,
      event1list,
      event2list,
      event3list,
      keepUser: { _id: "777777068ab908b096cfa86c" },
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
        // if (post) res.send()
        res.send([post, { countAllpost: countAllpost }]);
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
        res.send([post, { countAllpost: countAllpost }]);
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
        res.send([post, { countAllpost: countAllpost }]);
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
        res.send([post, { countAllpost: countAllpost }]);
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
  if (!authorization) {
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
    console.log("레스로컬", res.locals);

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
      // console.log("User.likePost",realLikepost);
      // console.log("postid",req.params.postid)

      /**
       * user.likePost.length 길이만큼 for문을 돈다.
       * id가 같은게 나올때까지 루프를 돈다.
       * 1. 같은게 나오면 true로 설정하고 리턴
       * 2. 같은게 안나오면 나올때까지 루프를 도는데
       * 2-1. 다 돌았는데 id가 같은게 안나오면?
       * 조건 1) res.status를 중복 설정하면 안된다.
       */
      const likeStatus = false;
      for (let i = 0; i < user.likePost.length; i++) {
        if (user.likePost[i]._id == req.params.postid) {
          post.likeStatus = true;

          for (let i = 0; i < user.keepPost.length; i++) {
            user.keepPost.forEach((keep) => {
              post.keepStatus =
                user.keepPost[i]._id == req.params.postid ? true : false;
            });
          }
        } else {
          // const likeStatus = false;
          post.likeStatus = false;

          for (let i = 0; i < user.keepPost.length; i++) {
            user.keepPost.forEach((keep) => {
              post.keepStatus =
                user.keepPost[i]._id == req.params.postid ? true : false;
            });
          }
        }
      }

      res.status(200).send(post);

      // 루프가 끝났을 때는 id를 찾았는지 못찾았는지 알수 있어야 함

      /**
       * if() res.status(200).send(post)
       * else res.status(201).send(post)
       */

      // console.log("글 안에 좋아요 유저", post.likeUser_id)
      // if (realLikepost == req.params.postid){
      //       likeStatus == true;
      //   }else {
      //       likeStatus == false;
      //   }
    });
  }
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
    //11월18일 오전9시 이미지업로드 수정과 동시 수정
    post.postImg1 = req.body.postImg1;
    post.postImg2 = req.body.postImg2;
    post.postImg3 = req.body.postImg3;
    post.postImg4 = req.body.postImg4;
    post.postImg5 = req.body.postImg5;
    // post.postImg = req.file.transforms[0].location;
    post.save((err) => {
      if (err) res.status(500).send({ error: "Failed to update!" });
      res.send({ message: "수정이 완료되었습니다!" });
    });
  });
};
//update 아래에 작성해주세요

//삭제 11월 10일 오후 6시
export const postdelete = async (req, res) => {
  Post.deleteOne({ _id: req.params.postid }, (err, post) => {
    if (err) return res.status(500).send({ error: "Database Failure!" });
    if (!post)
      return res
        .status(404)
        .send({ error: "해당 포스트가 존재하지 않습니다." });
    res.status(200).send({ message: "삭제가 완료되었습니다!" });
  });
};


//이미지 업로드 API
export const postuploadimg = async (req, res) => {
  const post = new Post();

  try {
    // console.log(req.files);
    // console.log('트렌스폼',req.files.postImg2[0].transforms[0])
    // console.log(req.files.postImg2[0].transforms[0].location);
    // console.log("트렌스폼1",req.files[0].transforms[0].location)
    // console.log("트렌스폼2",req.files[1].transforms[0].location)
    // const postImg =  req.files[0].transforms[0].location;
    // const postImg2 =  req.files[1].transforms[0].location;
    // const postImg1 =''
    // const postImg2 =''
    if (req.files.length >= 6){
      return res.status(400).send({message:'5개까지만 사진을 업로드가 가능해요'});
    }

    if (req.files.length == 5){
      const postImg1 = String(req.files[0].transforms[0].location);
      const postImg2 = String(req.files[1].transforms[0].location);
      const postImg3 = String(req.files[2].transforms[0].location);
      const postImg4 = String(req.files[3].transforms[0].location);
      const postImg5 = String(req.files[4].transforms[0].location);

    
    const newPost = await Post.create({
      postImg: postImg1,
      postImg: postImg2,
      // postImg: postImg3,
      // postImg: postImg4,
      // postImg: postImg5,
    });
  return res.status(200).send([{postImg1:postImg1},{postImg2:postImg2},{postImg3:postImg3},{postImg4:postImg4},{postImg5:postImg5}]);
  }
  if (req.files.length == 4){
    const postImg1 = String(req.files[0].transforms[0].location);
    const postImg2 = String(req.files[1].transforms[0].location);
    const postImg3 = String(req.files[2].transforms[0].location);
    const postImg4 = String(req.files[3].transforms[0].location);
  
  return res.status(200).send([{postImg1:postImg1},{postImg2:postImg2},{postImg3:postImg3},{postImg4:postImg4}]);
  }
  if (req.files.length == 3){
    const postImg1 = String(req.files[0].transforms[0].location);
    const postImg2 = String(req.files[1].transforms[0].location);
    const postImg3 = String(req.files[2].transforms[0].location);
  
  return res.status(200).send([{postImg1:postImg1},{postImg2:postImg2},{postImg3:postImg3}]);
  }
  if (req.files.length == 2){
    const postImg1 = String(req.files[0].transforms[0].location);
    const postImg2 = String(req.files[1].transforms[0].location);
  
  return res.status(200).send([{postImg1:postImg1},{postImg2:postImg2}]);
  }
  if (req.files.length == 1){
    const postImg1 = String(req.files[0].transforms[0].location);
  return res.status(200).send([{postImg1:postImg1}]);
  }
  else{
  return res.status(400).send({message:'없음'});
  }

  //   console.log(req.files.length)
  // const postImg1 = String(req.files[0].transforms[0].location);
  // const postImg2 = String(req.files[1].transforms[0].location);

  //   const newPost = await Post.create({
  //     postImg: postImg1,
  //     postImg: postImg2,
  //     // postImg: postImg3,
  //     // postImg: postImg4,
  //     // postImg: postImg5,
  //   });
  //   console.log(req.files)
  //           return res.status(200).send([{postImg1:postImg1},{postImg2:postImg2}]);

    // const postImg = req.files.transforms[0].location;
    // const postImg = req.file.transforms[0].location;
    // if(postImg1&&postImg2){
    //   const postImg1 = String(req.files.postImg1[0].transforms[0].location);
    //   const postImg2 = String(req.files.postImg2[0].transforms[0].location);
    //     return res.status(200).send([{postImg1:postImg1},{postImg2:postImg2}]);
    // }
    // if (postImg1==''&&postImg2==''){
    //   return res
    //   .status(209)
    //   .send([{postImg1:0},{postImg2:0}]);
    // }
    // else if(postImg2==''){
    //   const postImg1 = String(req.files.postImg1[0].transforms[0].location);
    //     return res.status(200).send([{postImg1:postImg1},{postImg2:0}]);
    // }



    // if(postImg1||postImg2){
    //   const postImg1 = String(req.files.postImg1[0].transforms[0].location);
    //   const postImg2 = String(req.files.postImg2[0].transforms[0].location);
    //     return res.status(200).send([{postImg1:postImg1},{postImg2:postImg2}]);
    // }else if(postImg2==''){
    //   const postImg1 = String(req.files.postImg1[0].transforms[0].location);
    //     return res.status(200).send([{postImg1:postImg1},{postImg2:0}]);
    // }else if (postImg1==''&&postImg2==''){
    //   return res
    //   .status(209)
    //   .send([{postImg1:0},{postImg2:0}]);
    //   }
    
   // const postImg3 = String(req.files.postImg3[0].transforms[0].location);
    // const postImg4 = String(req.files.postImg4[0].transforms[0].location);
    // const postImg5 = String(req.files.postImg5[0].transforms[0].location);
    // // const postImg3 = req.file.transforms[0].location;
    // const postImg4 = req.file.transforms[0].location;
    // const postImg5 = req.file.transforms[0].location;
    // const postImg11 = postImg1.toString()
    // const postImg22 = postImg2.toString()



    // return res.status(200).send([{postImg1:postImg1},{postImg2:postImg2},{postImg3:postImg3},{postImg4:postImg4},{postImg5:postImg5}]);
    // return res.status(200).send({ postImg1: postImg1, postImg2: postImg2 });
  } catch (err) {
    console.log("게시글 등록 기능 중 발생한 에러: ", err);
    return res
      .status(500)
      .json({ success: false, msg: "게시글 등록 중 에러가 발생했습니다" });
  }
};


//검색 api 7일 새벽에 박선웅 추가
export const posttagsearch = async (ctx, res, next) => {
  console.log(ctx.query);
  const countAllpost = await Post.countDocuments({
    mainlist: true,
    postState: true,
  });
  const page = parseInt(ctx.query.page || "1", 10);
  let options = [];
  // let options2 = [];
  // let options3 = [];
  if (page < 1) {
    res.status = 400;
    return;
  }
  try {
    if (ctx.query.option == "posttag1") {
      // ,ctx.query.option2 == "posttag2",ctx.query.option3 == "posttag3"){
      //   console.log(ctx.query)
      options = [{ postTag: new RegExp(ctx.query.content) }];
      //   options2 = [{ postTag: new RegExp(ctx.query.content2) }];
      //   options3 = [{ postTag: new RegExp(ctx.query.content3) }];
      //   ctx.query.content2 = { }
      //   ctx.query.content3 = { }
      // }
      // if ((ctx.query.option2 == "posttag2", ctx.query.option == "posttag1")) {
      //   options = [
      //     { postTag: new RegExp(ctx.query.content) },
      //     { postTag: new RegExp(ctx.query.content2) },
      //   ];
      // }
      // if (ctx.query.option3 == "posttag3") {
      //   options = [
      //     { postTag: new RegExp(ctx.query.content3) },
      //     { postTag: new RegExp(ctx.query.content) },
      //     { postTag: new RegExp(ctx.query.content2) },
      //   ];
      // } else if(ctx.query.option == 'title_body'){
      //   options = [{ title: new RegExp(ctx.query.content) }, { body: new RegExp(ctx.query.content) }];
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
    // console.log("게시물 조회중 발생한 에러: ", err);
    // return res
    //   .status(500)
    //   .json({ success: false, msg: "게시글 조회 중 에러가 발생했습니다" });
  }
};
