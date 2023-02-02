import User from "../model/user.js";
import bcrypt from "bcrypt";
import { createError } from "../error/createError.js";
import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(401, "Invalid Credential"));

    const result = await bcrypt.compareSync(req.body.password, user.password);
    if (result === false) return next(createError(401, "Invalid Credential"));

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.ACCESS_TOKEN
    );
    const { password, ...restOfDetails } = user._doc;
    console.log(token);
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ msg: "Login Successfully", details: restOfDetails });
  } catch (error) {
    next(error);
  }
};
export const register = async (req, res, next) => {
  try {
    const password = bcrypt.hashSync(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      
      password: password,
    });
    const result = await user.save();
    if (!result) next(createError(400, "User Not Created"));
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.ACCESS_TOKEN
    );

    res.status(200).json({ msg: "Register Successfully", token: token });
  } catch (error) {
    next(error);
  }
};
export const forgotPassword = async (req, res, next) => {
  try {
    res.status(200).json({ msg: "Empty Route" });
  } catch (error) {
    next(error);
  }
};
