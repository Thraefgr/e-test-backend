import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

router.get("/profile", checkAuth, async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token, process.env.SECRET_KEY)
    const userProfile = await User.findOne({username:decoded.username}, {_id:0, password:0, __v:0})
    res.json(userProfile)
})


const profileRouter = router;
export default profileRouter;