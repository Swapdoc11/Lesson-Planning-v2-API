import { createError } from "../error/createError.js";
import Plan from "../model/plan.js";
import User from "../model/user.js";

export const addPlan = async (req, res, next) => {
  try {
    if (!req.params.id) next(createError(401, "Bad Request"));

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

export const updatePlan = async (req, res, next) => {
  try {
    if (!req.params.id) next(createError(401, "Bad Request"));

    const updatedPlan = await Plan.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ msg: "plan updated successfull", updatedPlan });
  } catch (error) {
    next(error);
  }
};

export const deletePlan = async (req, res, next) => {
  try {
    if (!req.params.id) next(createError(401, "Bad Request"));

    const deletedPlan = await Plan.findByIdAndDelete(req.params.planid);
    try {
      await User.findByIdAndUpdate(req.params.id, {
        $pull: { plans: req.params.planid },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json({
      msg: "Successfully Deleted",
      deleted_plan: deletePlan,
    });
  } catch (error) {
    next(error);
  }
};
export const getPlan = async (req, res, next) => {
  try {
    if (!req.params.id) next(createError(401, "Bad Request"));

    const singleplan = await Plan.find(req.params.id);
    res.status(200).json({ msg: "plan found", singleplan });
  } catch (error) {
    next(error);
  }
};
export const getPlans = async (req, res, next) => {
  try {
    if (!req.params.id) next(createError(401, "Bad Request"));

    const user = await User.findById(req.params.id);
    const planList = await Promise.all(
      user.plans.map((plan) => {
        return Plan.findById(plan);
      })

    );
    res.status(200).json({ msg: "list found", planList });
  } catch (error) {
    next(error);
  }
};
