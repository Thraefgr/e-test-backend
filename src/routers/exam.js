import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import getPayload from "../utils/getPayload.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import Test from "../models/Test.js";

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
            {$project:{_id:0}},
            {$project:{"inventory.testId.questions.answer":0}},
        ])
        res.json(result[0].inventory.testId[0]);
    } catch (error) {
        res.statusCode = 400;
        res.json({error:`Please send a better request next time. Okay?${error}`})
    }

})

router.post("/exam/:id", checkAuth, async (req, res) => {
    try {
        const username = getPayload(req.headers.authorization).username;
        const testId = req.params.id;
        const result = await User.findOne({username:username})
        const test = await Test.findOne({_id:testId});
        const userTest = req.body;
        let rightOnes = 0;
        let score = 0;
        test.questions.forEach((qu, i) => {
            if (qu.answer === userTest.questions[i].choice) {
                score += qu.points;
                rightOnes++
            }
        })
        result.inventory.forEach(test => {
            if(test.testId.toString() === testId) {
                test.rightOnes = rightOnes;
                test.score = score;
                test.finishDate = new Date();
            }
        })
        result.save()
        res.json({success:"You are the best! Let's solve another one!!"})

    } catch (error) {
        res.statusCode = 400;
        res.json({error:"Don't know, don't care."})
    }

})
const examRouter = router;
export default examRouter;