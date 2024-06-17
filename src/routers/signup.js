import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/signup", async (req, res) => {
    const form = req.body;
    const user = await User.findOne({username:form.username})
    if (user) {
        res.statusCode = 400;
        res.json({message: "User already exists!"});
    } else if (form.password.length < 8) {
        res.statusCode = 400;
        res.json({message: "Your password is too short!"});
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(form.password, salt);
        const newUser = await User.insertMany([{
            email: form.email,
            username: form.username,
            password: hashedPassword,
            role: form.role
        }])
        res.json({message: "You have successfully signed up!"})
    }
})

const signUpRouter = router;
export default signUpRouter;