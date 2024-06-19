import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import getPayload from "../utils/getPayload.js";
import User from "../models/User.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/exam/:id", checkAuth, async (req, res) => {
    try {
        const username = getPayload(req.headers.authorization).username;
        const testId = new mongoose.Types.ObjectId(req.params.id);
        const result = await User.aggregate([
            {$match:{username:username}},
            {$unwind:"$inventory"},
            {$match:{"inventory.testId":testId}},
            {$set:{"inventory.startDate":new Date()}},
            {$lookup: {
                from:"tests",
                localField:"inventory.testId",
                foreignField:"_id",
                as:"inventory.testId"
            }},
            {$project:{_id:0, inventory:1, test:1}}
        ])
        res.json(result[0].inventory);
    } catch (error) {
        res.statusCode = 400;
        res.json({error:"Please send a better request next time. Okay?"})
    }

})

const examRouter = router;
export default examRouter;