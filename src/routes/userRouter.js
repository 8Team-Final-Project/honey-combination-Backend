import { authMiddleware } from "../middlewares/authMiddlewares.js";
import express from "express";
import {
  logincheck,
  signup,
  checkemail,
  checknick,
  login,
  logout,
  me,
  profilepatch,
  // quitme,
} from "../controllers/userController.js";
const userRouter = express.Router();
//이 url로 오면 middleware를 실행하고 logincheck함수를 실행한다.
userRouter.get("/logincheck", authMiddleware, logincheck); //로그인 인증 유지
userRouter.post("/signup", signup); //post 회원가입
userRouter.post("/checkemail", checkemail); //post 이메일중복체크
userRouter.post("/checknick", checknick); //post 닉네임중복체크
userRouter.post("/login", login); //로그인
userRouter.get("/logout", authMiddleware, logout); //post 로그아웃
userRouter.get("/me", authMiddleware, me); //프로필
userRouter.patch("/:userid", authMiddleware, profilepatch); //patch 프로필수정
// userRouter.get("/me", authMiddleware, quitme); //delete 탈퇴

export default userRouter;
//userRouter를 다른곳에서도 쓸수 있게 한다.
