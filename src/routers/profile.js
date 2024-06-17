import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

router.get("/profile", checkAuth, async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token, process.env.SECRET_KEY)
    const userProfile = await User.findOne({username:decoded.username}, {_id:0, password:0, __v:0})
    if(!userProfile) {
        res.statusCode = 400;
        res.json({message:"This user doesn't exist."});
    } else {
        res.json(userProfile)
    }

})

router.delete("/profile", checkAuth, async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token, process.env.SECRET_KEY);
    const userProfile = await User.findOneAndDelete({username:decoded.username});
    res.json({message:"Your profile is gone.Forever..."});
})

router.put("/profile", checkAuth, async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token, process.env.SECRET_KEY);
    const form = req.body;
    const updatedUser = await User.findOneAndUpdate(
                                {username:decoded.username},
                                {$set:{email:form.email, name:form.name, surname:form.surname, birthday:form.birthday, major:form.major, university:form.university}},
                                {returnOriginal:false, projection:{_id:0, __v:0, password:0}})
    res.json(updatedUser)
})

const profileRouter = router;
export default profileRouter;