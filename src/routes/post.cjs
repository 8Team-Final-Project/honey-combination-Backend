module.exports = (app, Post) => {
  //CREATE
  app.post("/create", async (req, res) => {
    const post = new Post();
    try {
      const { postContent } = req.body;
      await Post.create({
        postContent,
      });
      return res
        .status(200)
        .json({ success: true, msg: "성공적으로 게시글이 등록되었습니다." });
    } catch (err) {
      console.log("게시글 등록 기능 중 발생한 에러: ", err);
      return res
        .status(500)
        .json({ success: false, msg: "게시글 등록 중 에러가 발생했습니다" });
    }
  });

  //_id으로 해당 포스트 찾기
  app.get("/find/:_id", async (req, res) => {
    Post.findOne({ _id: req.params._id }, (err, post) => {
      if (err) return res.status(500).json({ error: err });
      if (!post)
        return res
          .status(404)
          .json({ error: "해당 포스트가 존재하지 않습니다." });
      res.json(post);
    });
  });

  //update수정
  app.put("/update/:_id", function (req, res) {
    Post.findOne({ _id: req.params._id }, (err, post) => {
      if (err) return res.status(500).json({ error: "Database Failure!" });
      if (!post)
        return res
          .status(404)
          .json({ error: "해당 포스트가 존재하지 않습니다." });

      post.postContent = req.body.postContent;
      post.save((err) => {
        if (err) res.status(500).json({ error: "Failed to update!" });
        res.json({ message: "수정이 완료되었습니다!" });
      });
    });
  });
  //update 아래에 작성해주세요

  //삭제
  app.delete("/delete", (req, res) => {
    Post.deleteOne({ _id: req.body._id }, (err, output) => {
      if (err) return res.status(500).json({ error: "Database Failure!" });
      res.json({ message: "삭제완료" });
      res.status(204).end();
    });
  });
};
