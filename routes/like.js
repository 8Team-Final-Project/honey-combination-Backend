module.exports = (app, Post) => {
  app.post("/likeClick", async (req, res) => {
    const userId = req.body;
    const postId = req.params;
    const post = await Post.findById({ _id: postId });
    try {
      if (!post.likeUser.id(userId)) {
        post.likeUser.push(
          new Like({
            _id: userId,
          })
        );
        post.save();
        return res.status(200).json({ msg: "좋아요 성공" });
      } else {
        post.likeUser.pull(userID);
        post.save();
        return res.status(200).json({ msg: "취소 성공" });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "실패" });
    }
  });
};

module.exports = { likeClick };
