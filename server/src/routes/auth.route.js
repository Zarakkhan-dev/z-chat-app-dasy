import express from "express";
import { Login, Signup, Logout, onboard } from "../controllers/auth.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js"
const router = express.Router();

router.post("/login", Login);
router.post("/signup", Signup);
router.post("/logout", Logout);

router.put("/onboard",protectRoute,onboard)

router.get("/me",protectRoute, (req,res) => {
    try {
        res.status(200).json({success: true, user: req.user})
    } catch (error) {
        console.log("route error", error);
        res.status(500).json({message:"Internal Error"});
    }
})
export default router
