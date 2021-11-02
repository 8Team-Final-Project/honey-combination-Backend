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
        user.save();
        return res.status(200).send({ msg: "이게 되네?" });
      } else {
        user.keepPost.pull(postId);
        user.save();
        return res.status(200).send({ msg: "되냐?" });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).send({ msg: "실패" });
    }
  });
};
