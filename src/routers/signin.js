import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router()

router.post("/signin", async (req, res) => {
    const form = req.body;
    const user = await User.findOne({username: form.username});
    if (form.username && form.password&& user) {
        const result = await bcrypt.compare(form.password, user.password)
        if (result) {
            const token = jwt.sign({username: user.username, role: user.role}, process.env.SECRET_KEY, {expiresIn:"7d"})
            res.json({message: "Successfully signed in!", token:token, role:user.role});
        } else {
            res.statusCode = 400;
            res.json({message: "Username or password is incorrect."});
        }
    } else {
        res.statusCode = 400;
        res.json({message: "Username or password is incorrect."});
    }
})

const signInRouter = router;
export default signInRouter;