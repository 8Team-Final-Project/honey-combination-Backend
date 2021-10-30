import jwt from "jsonwebtoken";
// import User from "../models/User.js";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).send({
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
    const { _id } = jwt.verify(tokenValue, "airbnb-secret-key");
    const user = await User.findById(_id);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
  }
};
