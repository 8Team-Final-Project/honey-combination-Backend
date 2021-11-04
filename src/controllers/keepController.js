import User from "../models/User.js";

export const keepclick = async (req, res) => {
  const userId = req.user._id;
  const postId = req.params.postid;
  const post = req.params;
  User.findOne({ _id: userId }, (err, user) => {
    try {
      if (err) return res.status(500).send({ error: "유저가 없네?" });
      if (!user.keepPost.id(postId)) {
        user.keepPost.push(postId);
        user.keepPost;
        user.save();
        console.log(userId);
        console.log(user.keepPost);
        return res.status(200).send({ msg: "게시물이 찜 되었습니다" });
      } else {
        user.keepPost.pull(postId);
        user.save();
        return res.status(200).send({ msg: "게시물이 찜이 취소 되었습니다" });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).send({ msg: "실패" });
    }
  });
};
