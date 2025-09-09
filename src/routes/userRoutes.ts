import express from "express";
import { signupUser, signinUser, submitQuestion } from "../controller/userController.js";
import { userAuthMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup",signupUser);
router.post("/signin",signinUser);
router.post("/submit",userAuthMiddleware,submitQuestion);

export default router;