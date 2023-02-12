import express from "express";
const router = express.Router();
import { addPlan, deletePlan, updatePlan, getPlan, getPlans } from "../controller/plan.js";

router.post("/addPlan/:id", addPlan);
router.delete("/deletePlan/:id/:planid", deletePlan);
router.put("/updatePlan/:id", updatePlan);
router.get("/getPlan/:id", getPlan);
router.get("/getPlans/:id", getPlans);

export default router;
