import { Post, Like } from "../models/Post.js";

export const likeclick = async (req, res) => {
  const postid = req.params.postid;
  const userid = req.user._id;
  // const likeCnt = post.likeUser.length;
  Post.findOne({ _id: postid }, (err, post) => {
    try {
      if (err) return res.status(500).send({ error: "Database Failure!" });
      if (!post.likeUser.id(userid)) {
        post.likeUser.push(
          new Like({
            _id: userid,
          })
        );
        post.likeCnt += 1;
        post.likeState = true; //이건 논의 해보자
        post.save();
        return res.status(200).send({ msg: "좋아요 성공" });
      } else {
        post.likeUser.pull(userid);
        post.likeCnt -= 1;
        post.likeState = false;
        post.save();
        return res.status(200).send({ msg: "취소성공" });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).send({ msg: "실패" });
    }
  });
};
