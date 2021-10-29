import express from "express";
import {
  logincheck,
  signup,
  // checkemail,
  // checknick,
  login,
  logout,
  me,
  profilepatch,
  quitme,
} from "../controllers/userController"

const userRouter = express.Router();

userRouter.get("/logincheck", logincheck); //로그인 인증 유지
userRouter.post("/signup", signup); //post 회원가입
// userRouter.get("/checkemail", checkemail); //post 이메일중복체크
// userRouter.get("/checknick", checknick); //post 닉네임중복체크
userRouter.post("/login", login); //로그인
userRouter.get("/logout", logout); //post 로그아웃
userRouter.get("/me", me); //프로필
userRouter.get("/:userid", profilepatch); //patch 프로필수정
userRouter.get("/me", quitme); //delete 탈퇴



export default userRouter;