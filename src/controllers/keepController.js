import User from "../models/User.js";

export const keepclick = async (req, res) => {
  const userid = req.user._id;
  const postid = req.params.postid;
  const post = req.params;
  User.findOne({ _id: userid }, (err, user) => {
    try {
      if (err) return res.status(500).send({ error: "유저가 없네?" });
      if (!user.keepPost.id(postid)) {
        user.keepPost.push(post);
        user.save();
        console.log(userid);
        console.log(post);
        return res.status(200).send({ msg: "이게 되네?" });
      } else {
        user.keepPost.pull(post);
        user.save();
        return res.status(200).send({ msg: "되냐?" });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).send({ msg: "실패" });
    }
  });
};
