import express from "express";
const router = express.Router()
import { addPlan } from "../controller/plan.js";
router.post('/addPlan/:id',addPlan)
export default router;