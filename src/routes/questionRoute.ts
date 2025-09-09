import express from "express";
import { adminOnlyMiddleware } from "../middlewares/authMiddleware.js";
import { addQuestion } from "../controller/questionController.js";

const router = express.Router();

router.post("/add",adminOnlyMiddleware,addQuestion);
// router.get("/get",getQuestion);
// router.get("/get/:id",getQuestion);
// router.put("/update/:id",adminOnlyMiddleware, updateQuestion);
// router.delete("/delete/:id",adminOnlyMiddleware, deleteQuestion);

export default router;