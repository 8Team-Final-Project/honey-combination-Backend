import User from "../models/User.js";
import { Post } from "../models/Post.js";

export const keepclick = async (req, res) => {
  const userId = req.user?._id;
  const postId = req.params.postid;
  const user = await User.findById(userId);
  const post = await Post.findOne({ _id: postId });
  User.findOne({ _id: userId }, (err, user) => {
    try {
      if (err)
        return res.status(500).send({ error: "유저가 존재하지 않습니다." });
      if (!user.keepPost.id(postId)) {
        user.keepPost.push(postId);
        user.save();
        Post.findOne({ _id: postId }, (err, post) => {
          if (err) return res.status(500).send({ error: "Datebase Failure!" });
          post.keepUser.push(userId);
          post.save();
        }); //for문으로 저장되어있는 postid에 맞는 게시물 불러오기, 더미데이터라...
        return res.status(200).send({ msg: "게시물이 찜 되었습니다" });
      } else {
        user.keepPost.pull(post);
        user.save();
        Post.findOne({ _id: postId }, (err, post) => {
          if (err) return res.status(500).send({ error: "Datebase Failure!" });
          post.keepUser.pull(userId);
          post.save();
        });
        return res.status(200).send({ msg: "게시물이 찜이 취소 되었습니다" });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).send({ msg: "실패" });
    }
  });
};
