import { Post, Like } from "../models/Post.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwtToken from "jsonwebtoken";

export const likeclick = async (req, res) => {
  const postId = req.params.postid;
  const userId = req.user?._id;
  Post.findOne({ _id: postId }, (err, post) => {
    try {
      console.log(req.user._id)
      if (err) return res.status(500).send({ error: "Database Failure!" });
      if (!post.likeUser.id(userId)) {
        post.likeUser.push(
          new Like({
            _id: userId,
          })
        );
        post.likeCnt += 1;
        post.save();

        User.findOne({ _id: userId }, (err, user) => {
          if (err) return res.status(500).send({ error: "Datebase Failure!" });
          user.likePost.push(postId);
          user.save();
        });
        const likeCntmsg = post.likeCnt;
        const likeStatus = true;
        
        if (Post.likeUser_id == userId){
        likeStatus == true;
      }else {
        likeStatus == false;
      }
        return res.status(200).send({ likeCntmsg, msg: "좋아요성공",likeStatus: likeStatus });
      } else {
        post.likeUser.pull(userId);
        post.likeCnt -= 1;
        post.save();
        User.findOne({ _id: userId }, (err, user) => {
          if (err) return res.status(500).send({ error: "Datebase Failure!" });
          user.likePost.pull(postId);
          user.save();
        });
        const likeStatus = false;
        if (Post.likeUser_id == userId){
        likeStatus == true;
      }else {
        likeStatus == false;
      }
        return res.status(200).send({ msg: "취소성공",likeStatus: likeStatus });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).send({ msg: "실패" });
    }
  });
};



//11.11 좋아요 2차 시도


// //11.11 좋아요
// export const likePost = async (req, res) => {
//   const { authorization } = req.headers;
//   const [tokenType, tokenValue] = authorization.split(" ");
//   const { _id } = jwtToken.verify(tokenValue, "honeytip-secret-key");
//   const user = await User.findById(_id);
//   req.user = user; //token에서 유저뽑아내기
//   console.log(user)
//   const userId = user._id;
//   const { postId } = req.params.postid;
//   console.log("userId",userId)
//   console.log("postId",req.params.postid)

//   try {
//     const exists= await Post.like_array.find({ postId, like_array: userId });
//     console.log(exists)
//     console.log(postId)
//     let result = Post.like_array = [];

//     if (exists.length == 0) {
//       await Post.findOneAndUpdate(
//         { postId: postId },
//         { $push: { like_array: userId } }
//       ).lean();

//       result = await Post.find({postId, like_array: userId });
//     } else if (exists.length) {
//       res
//         .status(409)
//         .send({ message: "fail", error: "user already liked this beer" });

//       return;
//     }

//     res.json({ message: "success", likes: result[0].like_array });
//   } catch (error) {
//     res.status(400).send({ message: "fail", error });
//   }
// };




// //11.11 싫어요 백엔드에서 구현
// export const unlikePost = async (req,res) => {
//   const { authorization } = req.headers;
//   const [tokenType, tokenValue] = authorization.split(" ");
//   const { _id } = jwtToken.verify(tokenValue, "honeytip-secret-key");
//   const user = await User.findById(_id);
//   req.user = user; //token에서 유저뽑아내기

//   const userId = user._id;
//   const { postId } = req.params;

//   try {
//     const exists = await Post.like_array.find({
//       postId: postId,
//       like_array: userId,
//     });
//     let result = Post.like_array = [];
// //IBeer가 뭐지??
//     if (exists.length) {
//       await Post.findOneAndUpdate(
//         { postId: postId },
//         { $pull: { like_array: userId } }
//       ).lean();

//       result = await Beers.find({ postId: postId }).lean();
//     } else if (exists.length == 0) {
//       res
//         .status(409)
//         .send({ message: "fail", error: "user has never liked this beer" });

//       return;
//     }
//     res.json({ message: "success", likes: result[0].like_array });
//   } catch (error) {
//     res.status(400).send({ message: "fail", error });
//   }
// };

// //11.11 좋아요 유저 리스트 만들기
// export const likedPost = async (req, res) => {
//   try {
//     const { authorization } = req.headers;
//     const [tokenType, tokenValue] = authorization.split(" ");
//     const { _id } = jwtToken.verify(tokenValue, "honeytip-secret-key");
//     const user = await User.findById(_id);
//     req.user = user; //token에서 유저뽑아내기
  
//     const userId = user._id;

//     if (!userId) {
//       res.status(406).send({ message: "fail", error: "no exist user" });

//       return;
//     }

//     const likedList = await Post.like_array.find({
//       like_array: mongoose.Types.ObjectId(userId),
//     });

//     res.json({ message: "success", likedList: likedList });
//   } catch (error) {
//     res.status(400).send({ message: "fail", error });
//   }
// };