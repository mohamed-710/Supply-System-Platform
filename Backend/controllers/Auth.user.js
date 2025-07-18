import User from "../models/Employee.model.js";
import {generateJwtAndSetcookie} from "../utils/GenerateJwtAndSetCookie.js";
import asyncHandler from "../middleware/AsyncWraper.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { full_name, email, password } = req.body;
  const role = req.path.endsWith('admin') ? 'admin' : 'user';

  if (!full_name || !email || !password) {
    return res.status(400).json({ message: "ادخل البيانات بشكل كامل" });
  }

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    return res.status(400).json({ message: "البريد الإلكتروني مسجل بالفعل" });
  }

  const newUser = await User.create({ full_name, email, password, role });
  generateJwtAndSetcookie(res, newUser.id, newUser.role);

  res.status(201).json({
    message: role === 'admin' ? "تم إنشاء المسؤول بنجاح" : "تم إنشاء المستخدم بنجاح",
    user: {
      id: newUser.id,
      full_name: newUser.full_name,
      email: newUser.email,
      role: newUser.role,
    }
  });
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "يرجى إدخال البريد الإلكتروني وكلمة المرور" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: "البيانات غير صحيحة" });
    }

    const token = generateJwtAndSetcookie(res, user.id, user.role);

    res.status(200).json({
        message: "تم تسجيل الدخول بنجاح",
        user: {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            role: user.role,
        },
        token,
    });
});
export const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "تم تسجيل الخروج بنجاح" });
});