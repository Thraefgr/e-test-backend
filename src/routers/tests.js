import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import Test from "../models/Test.js";
import Buffer from "node:buffer"
import checkRole from "../middlewares/checkRole.js";
import getPayload from "../utils/getPayload.js";

const router = express.Router()

router.get("/tests", checkAuth, async (req, res) => {
    let allTests = await Test.find({}, {__v:0, questions:0});
    res.json(allTests)
})


router.get("/tests/mycreation", checkAuth, checkRole, async (req, res) => {
    const username = getPayload(req.headers.authorization).username;
    const tests = await Test.find({creator:username});
    res.json(tests)
})

router.post("/tests/mycreation", checkAuth, checkRole, async (req, res) => {
    try {
        const username = getPayload(req.headers.authorization).username;
        const test = req.body;
        test.creator = username;
        const newTest = new Test(test);
        await Test.insertMany([newTest]);
        res.json({message:"You've successfully added a new test!!"});
    } catch (error) {
        res.statusCode = 400;
        res.json({error:`Your test is invalid! ${error}`});
    }

})

router.delete("/tests/mycreation", checkAuth, checkRole, async (req, res) => {
    try {
        const username = getPayload(req.headers.authorization).username;
        const testId = req.body.testId;
        const deletedTest = await Test.findOneAndDelete({_id:testId, creator:username});
        if(deletedTest) {
            res.json({message:"You've successfully deleted the test that none solved..."})
        } else {
            res.statusCode = 400
            res.json({error:"The test you are trying to delete is either already gone or you are trying to access someone elses test!! You cheeky bastard."})
        }
    } catch (error) {
        res.statusCode = 400
        res.json({error:"Send a proper request first! Then we can handle your situation."})
    }


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