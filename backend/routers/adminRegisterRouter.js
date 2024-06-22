import express from "express";
import { adminRegister } from "../controllers/adminRegisterController.js";

const router = express.Router();

router.post('/register', adminRegister);

export default router;
