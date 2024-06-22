import express from "express";
import { adminSignIn } from "../controllers/adminSigninController.js";

const router = express.Router();

router.post('/signin', adminSignIn);

export default router;
