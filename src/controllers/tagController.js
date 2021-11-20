import { Tag } from "../models/Tag.js";
import { Post } from "../models/Post.js";
const tag = new Tag();

//태그 추가
export const tagCheck = (req, res) => {
  const { tagName } = req.body; //여기는 {}로 감쌌다는걸 프론트분들께 알려줘야해!
  console.log(tagName);
  Tag.findOne({ tagName: tagName }, (err, tag) => {
    try {
      if (err) return res.status(500).send({ error: "Datebase Failure!" });
      if (!tag) {
        const tagCount = 1;
        const newTag = Tag.create({
          tagName,
          tagCount,
        });
        console.log(newTag);
        return res.status(200).send({
          success: true,
          msg: "태그가 작성되었습니다.",
          newTag: newTag,
        });
      } else {
        tag.tagCount += 1;
        tag.save();
        return res
          .status(200)
          .send({ success: true, msg: "태그가 +1 되었습니다", tag: tag });
      } //tagcount를 보내는지 봐야됨
    } catch (err) {
      console.log("태그 추가중 발생한 에러: ", err);
      return res
        .status(500)
        .send({ success: false, msg: "태그 추가중 에러가 발생했습니다" });
    }
  });
};

//상위 5개 태그 조회
export const famousTag = async (req, res) => {
  try {
    Tag.find({}, (err, tags) => {
      if (err) return res.status(500).send({ error: err });
      res.status(200).send({ success: true, tags: tags });
    })
      .sort({ tagCount: -1 })
      .limit(5);
  } catch (err) {
    console.log("태그 조회 중 발생한 에러: ", err);
    return res
      .status(500)
      .send({ success: false, msg: "태그 조회 중 에러 발생" });
  }
};

//태그 -1
export const updateTag = async (req, res) => {
  const postId = req.params.postid;
  const post = await Post.findById(postId);
  const postTag = post.postTag;
  console.log(postTag);
  try {
    Tag.findOne({ tagName: postTag }, (err, tag) => {
      if (err) return res.status(500).send({ error: err });
      tag.tagCount -= 1;
      tag.save();
      console.log(tag);
      return res
        .status(200)
        .send({ success: true, msg: "태그가 -1 되었습니다", tag: tag });
    });
  } catch (err) {
    console.log("태그 -1 중 발생한 에러: ", err);
    return res
      .status(500)
      .send({ success: false, msg: "태그 -1 중 에러 발생" });
  }
};
