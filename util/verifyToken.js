import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../error/createError.js";

dotenv.config();
export const verifyAccessToken = (req, res, next) => {
  try {
    console.log(req.cookies);
    if (!req.cookies.access_token) {
      next(createError(400,"Please Login again.."))
    } else {
      console.log(req.cookies.access_token);
      const flag = Jwt.verify(
        req.cookies.access_token,
        process.env.ACCESS_TOKEN,(err,payload)=>{
            if(err) next(createError(400,'Unauthorize'))

            req.info = payload
        }
      );
      console.log(flag);
      next();
    }
  } catch (error) {
    next(error);
  }
};
export const verifyRefreshToken = (req, res, next) => {};
