import { Post, Like } from "../models/Post.js";
import User from "../models/User.js";
// import { Event, EventLike } from "../models/Event.js";

export const likeclick = async (req, res) => {
  const postId = req.params.postid;
  const userId = req.user._id;
  Post.findOne({ _id: postId }, (err, post) => {
    try {
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
        return res.status(200).send({ msg: "좋아요 성공" });
      } else {
        post.likeUser.pull(userId);
        post.likeCnt -= 1;
        post.save();
        User.findOne({ _id: userId }, (err, user) => {
          if (err) return res.status(500).send({ error: "Datebase Failure!" });
          user.likePost.pull(postId);
          user.save();
        });
        return res.status(200).send({ msg: "취소성공" });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).send({ msg: "실패" });
    }
  });
};
