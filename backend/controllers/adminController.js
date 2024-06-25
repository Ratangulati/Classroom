import asyncHandler from 'express-async-handler';
import { Admin } from '../models/adminModel.js';
import { generateToken } from '../utils/generateToken.js';

function generateUniqueSchoolCode() {
    return 'SCH' + Date.now().toString(36).toUpperCase();
}

export const registerAdmin = asyncHandler(async (req, res) => {
  const { email, password, schoolName } = req.body;
  
    const adminExists = await Admin.findOne({ email });
  
    if (adminExists) {
      res.status(400);
      throw new Error('Admin already exists');
    }
  
    const schoolCode = generateUniqueSchoolCode();

    const admin = await Admin.create({
        email,
        password,
        schoolName,
        schoolCode,
    })
  
    if (admin) {
        res.status(201).json({
          _id: admin._id,
          email: admin.email,
          schoolName: admin.schoolName,
          schoolCode: admin.schoolCode,
          token: generateToken(admin._id, 'admin'),
        });
    } else {
        res.status(400);
        throw new Error('Invalid admin data');
    }
});



export const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const admin = await Admin.findOne({ email });
  
    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        email: admin.email,
        token: generateToken(admin._id, 'admin'),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
});

export const getAdminProfile = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.user._id).select('-password');
    if (admin) {
      res.json(admin);
    } else {
      res.status(404);
      throw new Error('Admin not found');
    }
  });
  
  export const updateAdminProfile = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.user._id);
  
    if (admin) {
      admin.email = req.body.email || admin.email;
      admin.schoolName = req.body.schoolName || admin.schoolName;
      if (req.body.password) {
        admin.password = req.body.password;
      }
  
      const updatedAdmin = await admin.save();
  
      res.json({
        _id: updatedAdmin._id,
        email: updatedAdmin.email,
        schoolName: updatedAdmin.schoolName,
        schoolCode: updatedAdmin.schoolCode,
      });
    } else {
      res.status(404);
      throw new Error('Admin not found');
    }
  });
  
  export const getAdminDashboard = asyncHandler(async (req, res) => {
    const schoolCode = req.user.schoolCode;
  
    const teacherCount = await Teacher.countDocuments({ schoolCode });
    const studentCount = await Student.countDocuments({ schoolCode });
    const classCount = await Class.countDocuments({ schoolCode });
    const subjectCount = await Subject.countDocuments({ schoolCode });
  
    res.json({
      teacherCount,
      studentCount,
      classCount,
      subjectCount,
    });
  });
  