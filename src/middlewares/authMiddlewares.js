import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  // const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({
      errorMessage: "로그인 후 사용하세요",
    });
  }

  const [tokenType, tokenValue] = authorization.split(" ");
  if (!tokenValue || tokenType !== "Bearer") {
    res.status(401).send({
      errorMessage: "로그인 후 사용하세요",
    });
    return;
  }

  try {
    const { _id } = jwt.verify(tokenValue, "honeytip-secret-key");
    const user = await User.findById(_id);
    req.user = user;
    next();
    console.log(req.user);
  } catch (err) {
    console.log(err);
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
  }
};