import express from 'express';
import { verifyToken , isAdmin } from '../middleware/verifyToken.js';
import { registerUser, loginUser ,logoutUser} from '../controllers/Auth.user.js';
const router = express.Router();


router.post("/register-admin", registerUser);


router.post("/register-user",    verifyToken, isAdmin, registerUser);
router.post("/register-admin",   verifyToken, isAdmin, registerUser);

router.post("/login",  loginUser);
router.post("/logout", logoutUser);
export default router; 