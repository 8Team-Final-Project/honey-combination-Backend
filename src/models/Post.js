import mongoose from "mongoose";
import User from "./User.js";
const { Schema } = mongoose;

const likeSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
});

const postSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: false,
      unique: false,
    },
    userId: {
      type: String,
      required: false,
      unique: false,
      ref: User,
    },
    userNickname: {
      type: String,
      required: false,
      unique: false,
    },
    postTitle: {
      type: String,
      required: false,
      unique: false,
    },
    postContent: {
      type: String,
      required: false,
      unique: false,
    },
    postRecipe: {
      type: String,
      required: false,
      unique: false,
    },
    postImg: {
      type: String,
      required: false,
      unique: false,
    },
    postImg1: {
      type: String,
      required: false,
      unique: false,
    },
    postImg2: {
      type: String,
      required: false,
      unique: false,
    },
    postImg3: {
      type: String,
      required: false,
      unique: false,
    },
    postImg4: {
      type: String,
      required: false,
      unique: false,
    },
    postImg5: {
      type: String,
      required: false,
      unique: false,
    },
    myPost: {
      type: Boolean,
      required: false,
      unique: false,
    },
    likeState: {
      type: Boolean,
      required: false,
      unique: false,
    },
    keepPoststate: {
      type: Boolean,
      required: false,
      unique: false,
    },
    postState: {
      type: Boolean,
      required: false,
      unique: false,
    },
    createDate: {
      type: String,
      required: false,
      unique: false,
    },
    likeUser: [{ _id: { type: String } }],

    //11/09오후7시변경
    postTag: {
      type: Array,
      required: false,
      unique: false,
    },
    likeCnt: {
      type: Number,
    },
    commentCount: {
      type: Number,
    },
    keepUser: [{ _id: { type: String } }],
    mainlist: {
      type: Boolean,
      required: false,
      unique: false,
    },
    event1list: {
      type: Boolean,
      required: false,
      unique: false,
    },
    event2list: {
      type: Boolean,
      required: false,
      unique: false,
    },
    event3list: {
      type: Boolean,
      required: false,
      unique: false,
    },
    likeStatus: {
      type: Boolean,
      required: false,
      unique: false,
    },
    keepStatus: {
      type: Boolean,
      required: false,
      unique: false,
    },
  },
  { versionKey: false }
);

postSchema.set("toJSON", {
  virtuals: true,
});

const Post = mongoose.model("Post", postSchema);
const Like = mongoose.model("Like", likeSchema);

//109번째줄 7일 새벽에 박선웅 추가
postSchema.index({ postTag: "text" });

export { Post, Like };

// router.get('/:id', function(req, res){ // 2
//   var commentForm = req.flash('commentForm')[0] || {_id: null, form: {}};
//   var commentError = req.flash('commentError')[0] || { _id:null, parentComment: null, errors:{}};

//   Promise.all([
//       Post.findOne({_id:req.params.id}).populate({ path: 'author', select: 'username' }),
//       Comment.find({post:req.params.id}).sort('createdAt').populate({ path: 'author', select: 'username' })
//     ])
//     .then(([post, comments]) => {
//       res.render('posts/show', { post:post, comments:comments, commentForm:commentForm, commentError:commentError});
//     })
//     .catch((err) => {
//       console.log('err: ', err);
//       return res.json(err);
//     });
// });
