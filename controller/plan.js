import { createError } from "../error/createError.js";
import Plan from "../model/plan.js";
import User from "../model/user.js";

export const addPlan = async (req, res, next) => {
  try {
    if(!req.params.id) next(createError(401,'Bad Request'))

    req.body.date = new Date();
    const myplan = new Plan(req.body);
    const savedPlan = await myplan.save();
    try {
       await User.findByIdAndUpdate(req.params.id, {
        $push: { plans: savedPlan._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json({ msg: "Plan Added Successfull", data: savedPlan });
  } catch (error) {
    next(error);
  }
};
