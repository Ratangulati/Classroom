import { Admin } from "../models/adminRegisterSchema.js";

export const adminSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email, password });
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    res.status(200).json({
      success: true,
      message: "Admin signed in!",
      admin,
    });
  } catch (err) {
    next(err);
  }
};
