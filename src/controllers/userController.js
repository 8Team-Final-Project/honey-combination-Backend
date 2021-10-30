import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwtToken from "jsonwebtoken";

export const signup = async (req, res) => {
  const { userEmail, userNickname, userPassword } = req.body;

  const re_userEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  const re_userNickname = /^[가-힣a-zA-Z]{2,10}$/;
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
    const token = jwtToken.sign({ _id }, "airbnb-secret-key");
    return res
      .status(200)
      .send({ result: "success", msg: "로그인 완료", token });
    // console.log(token);
  } catch (error) {
    console.log(error);
    return res
      .status(405)
      .send({ result: "failure", msg: "DB 정보 조회 실패" });
  }
};

export const checknick = (req, res) => {
  return res.send("checknick");
};
export const logincheck = (req, res) => {
  return res.send("logincheck");
};
export const logout = (req, res) => {
  return res.send("logout");
};
export const me = (req, res) => {
  return res.send("me");
};
export const profilepatch = (req, res) => {
  return res.send("profilepatch");
};
export const quitme = (req, res) => {
  return res.send("quitme");
};
