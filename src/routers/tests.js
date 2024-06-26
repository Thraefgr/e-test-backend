import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import Test from "../models/Test.js";
import getPayload from "../utils/getPayload.js";
import User from "../models/User.js";

const router = express.Router()

router.get("/tests", checkAuth, async (req, res) => {
    const username = getPayload(req.headers.authorization).username;
    const user = await User.findOne({username:username}, {"inventory.testId":1});
    const testIds = [];
    user.inventory.forEach(test => testIds.push(test.testId))
    console.log(testIds)
    let allTests = await Test.find({_id:{$nin: testIds}}, {__v:0, questions:0});
    res.json(allTests)
})

router.get("/tests/:id", checkAuth, async (req, res) => {
    try {
        const id = req.params.id;
        const test = await Test.findOne({_id:id}, {__v:0, questions:0});
        if (!test) {
            res.statusCode = 400;
            res.json({message: "Enter a valid id! Or else!!"});
        } else {
            res.json(test)
        }
    } catch (error) {
        res.statusCode = 400;
        res.json({message: "Enter a valid id! Or else!!"})
    }
})

const testsRouter = router;
export default testsRouter;