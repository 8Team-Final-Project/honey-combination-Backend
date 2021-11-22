import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwtToken from "jsonwebtoken";
import { Post } from "../models/Post.js";

//회원가입API
export const signup = async (req, res) => {
  const { userEmail, userNickname, userPassword } = req.body;

  const re_userEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  const re_userNickname = /^[가-힣a-zA-Z0-9]{2,10}$/;
  const re_userPassword = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{5,20}$/;

  if (userEmail.search(re_userEmail) == -1) {
    return res.status(400).send({
      errorMessage: "이메일의 형식이 일치하지 않습니다.",
    });
  } else if (userNickname.search(re_userNickname) == -1) {
    return res.status(401).send({
      errorMessage: "닉네임의 형식이 일치하지 않습니다.",
    });
  } else if (userPassword.search(re_userPassword) == -1) {
    return res.status(402).send({
      errorMessage: "비밀번호의 형식이 일치하지 않습니다.",
    });
  }
  try {
    console.log(userEmail);
    const isemailExisting = await User.find({ userEmail }); //둘중 하나가 User 몽고DB에 존재하는지 여부 확인
    console.log(isemailExisting);
    const isnickExisting = await User.find({ userNickname }); //둘중 하나가 User 몽고DB에 존재하는지 여부 확인
    if (isemailExisting.length) {
      //둘중 하나라도 존재하면 1이상의 값이 나오므로 true로 처리해서 아래 값을 return
      return res.status(404).send({
        result: "failure",
        msg: "이미 가입한 이메일이 있습니다.",
      });
    } else if (isnickExisting.length) {
      return res.status(408).send({
        result: "failure",
        msg: "이미 가입한 닉네임이 있습니다.",
      });
    }
    const hashedPassword = await bcrypt.hash(userPassword, 5);

    // const string_birthDt = String(birthDt); //스트링 값으로 변환, 이미ㅣ db에는 스트링으로 저장됨
    const newUser = {
      userEmail,
      userNickname,
      userPassword: hashedPassword,
      myPost:{"postId": "aaaaaae96f7638a759d25981"},
      // myPost,
      likePost: {"_id": "aaaaaae96f7638a759d25981"},      
      keepPost: {"_id": "aaaaaae96f7638a759d25981"},
      userImg:"https://honey-tip-post-picture-upload.s3.ap-northeast-2.amazonaws.com/1637398226232pig.png"
    };
    // await User.save(newUser); //create에서 변경
    await User.create(newUser);
    console.log(newUser);
    return res
      .status(200)
      .send({ result: "success", msg: "회원가입에 성공하였습니다." });
  } catch (error) {
    console.log(error);
    return res
      .status(405)
      .send({ result: "failure", msg: "DB 정보 조회 실패" });
  }
};

//로그인API
export const login = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  console.log(userEmail, userPassword);
  try {
    const user = await User.findOne({ userEmail });
    const isPwMatched = await bcrypt.compare(userPassword, user.userPassword);
    // console.log(token);
    if (!isPwMatched)
      return res
        .status(400)
        .send({ result: "failure", msg: "아이디 혹은 비밀번호가 틀립니다." });
    const { _id } = user;
    const token = jwtToken.sign({ _id }, "honeytip-secret-key");
    return res
      .status(200)
      .send({ result: "success", msg: "로그인 완료", token });
  } catch (error) {
    console.log(error);
    return res
      .status(405)
      .send({ result: "failure", msg: "DB 정보 조회 실패" });
  }
};

//닉네임중복확인API
export const checknick = async (req, res) => {
  const { userNickname } = req.body;
  try {
    const checknick = await User.findOne({ userNickname }); //
    if (!checknick) {
      res.status(200).send({ message: "사용 가능한 닉네임 입니다." });
    } else {
      res.status(400).send({ message: "이미 사용중인 닉네임 입니다." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "알 수 없는 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
    });
  }
};

//이메일중복확인API
export const checkemail = async (req, res) => {
  const { userEmail } = req.body;
  try {
    const checkemail = await User.findOne({ userEmail }); //
    if (!checkemail) {
      res.status(200).send({ message: "사용 가능 이메일 입니다." });
    } else {
      res.status(400).send({ message: "이미 사용중인 이메일 입니다." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "알 수 없는 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
    });
  }
};
//로그인 확인 API
export const logincheck = async (req, res, next) => {
  const { authorization } = req.headers;
  const [tokenType, tokenValue] = authorization.split(" ");
  try {
    const { _id } = jwtToken.verify(tokenValue, "honeytip-secret-key");
    const user = await User.findById(_id);
    req.user = user;
    const userNickname = user.userNickname;
    res.status(200).send({ userNickname, isLogin: true });
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
  }
};

//로그아웃 API
export const logout = (req, res) => {
  try {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
      console.log(user.userNickname);
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "알 수 없는 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
    });
  }
};

//마이프로필API
export const me = async (req, res, next) => {
  const { authorization } = req.headers;
  const [tokenType, tokenValue] = authorization.split(" ");
  try {
    const { _id } = jwtToken.verify(tokenValue, "honeytip-secret-key");
    const user = await User.findById(_id);
    req.user = user; //token에서 유저뽑아내기
    const userNickname = user.userNickname;
    const userEmail = user.userEmail;
    // const myPost = user.myPost;
    const userId = user._id;
    const userImg = user.userImg;
    // const owner = await Post.findById(Post.userId).populate(User.id)
    // console.log("owner",owner)
    // console.log("userId",userId)

    // const keepPost = await Post.keepUser.find({_id: userId});
    const keepPost = user.keepPost;
    const post = await Post.find()
    
        // console.log(post[0])
    // console.log(post[0].keepUser)
    // console.log(post[0].keepUser.length)
    for(let l = 0; l < post[l].length; l++){
      console.log(l)
    for (let i = 0; i < post[i].keepUser.length; i++) {
      if (post[l].keepUser[i]._id == user._id) {
        user.keepPost.push(post)
        user.keepPost
        user.save();
        console.log(post)
        // user.keepPost.push(post.likeCnt)
      }  
    }}
    const myPost = await Post.find({ userId: userId });
    user.myPost.push(myPost);
    user.myPost;
    // user.save();
    res.status(200).send({ userNickname, userEmail, myPost, userId, keepPost,userImg });
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
  }
};

//프로필 수정 api(수정은 되나 중복검사 및 정규식 검사 안됨)
export const profilepatch = async (req, res) => {
  const { authorization } = req.headers;
  const [tokenType, tokenValue] = authorization.split(" ");
  try {
    const { _id } = jwtToken.verify(tokenValue, "honeytip-secret-key");
    const user = await User.findById(_id);
    req.user = user;
    const userNickname = user.userNickname;
    const userEmail = user.userEmail;
    const userImg = user.userImg;
    const re_userEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    const re_userNickname = /^[가-힣a-zA-Z0-9]{2,10}$/;
    // const { nicknameNew, passwordOld, passwordNew } = res.verifyBody;
    // console.log(res.verifyBody);
    const existUser = await User.findOne({ where: { _id: user._id } });
    //존재 여부 확인 if문을 여러번 사용해서 거르면서 내려오기
    const checknick = await User.findOne({ userNickname }); //
    //닉네임
    const checkemail = await User.findOne({ userEmail }); //
    //등록된 유저가 있는지 다시 한번 조회
    // if (existUser) {
    //     return err({message: "유저가 존재하지 않습니다."})
    // };
    // if (!checknick && !checkemail) {
    //     return error.status(403).send({ errorMessage: "이미 존재하는 이메일이나 닉네임 입니다" })
    // };
    // if (userEmail.search(re_userEmail) == -1 && userNickname.search(re_userNickname) == -1) {
    //     return error.status(403).send({ errorMessage: "이메일의 형식이 일치하지 않습니다." });
    // };
    //기존 비밀번호 확인
    // if (bcrypt.compareSync(passwordOld, existUser.password)) {
    //   const encryptPassword = bcrypt.hashSync(passwordNew, 10);
    if (existUser) {
      await User.updateOne(
        { _id: user._id },
        {
          $set: {
            userNickname: req.body.userNickname,
            userEmail: req.body.userEmail,
            userImg: req.body.userImg
          },
        },
        { where: { _id: user._id } }
      );
      res.status(200).send({ message: "변경 성공" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "알 수 없는 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
    });
  }
};

//탈퇴기능-부가기능
// export const quitme = (req, res) => {
//   return res.send("quitme");
// };
