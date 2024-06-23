import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import Test from "../models/Test.js";
import checkRole from "../middlewares/checkRole.js";
import getPayload from "../utils/getPayload.js";

const router = express.Router()

router.get("/mycreation", checkAuth, checkRole, async (req, res) => {
    const username = getPayload(req.headers.authorization).username;
    const tests = await Test.find({creator:username});
    res.json(tests)
})

router.post("/mycreation", checkAuth, checkRole, async (req, res) => {
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

router.put("/mycreation", checkAuth, checkRole, async (req, res) => {//Don't hate me on this. I was just lazy. I know it is not that robust. But it is easier!!
    try {
        const username = getPayload(req.headers.authorization).username;
        const test = req.body;
        test.creator = username;
        const upTest = new Test(test);
        const updatedTest = await Test.findOneAndReplace({creator:username, _id:test._id}, upTest, {returnOriginal:false})
        res.json({message: "Successfully updated that one test nobody solves..."})
    } catch (error) {
        res.statusCode = 400;
        res.json({message:"Something went wrong. Maybe try again?"});
    }

})

router.delete("/mycreation/:id", checkAuth, checkRole, async (req, res) => {
    try {
        const username = getPayload(req.headers.authorization).username;
        const testId = req.params.id;
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

router.get("/mycreation/:id", checkAuth, checkRole, async (req, res) => {
    try {
        const username = getPayload(req.headers.authorization).username;
        const testId = req.params.id;
        const test = await Test.findOne({_id:testId, creator:username}, {_id:0, __v:0});
        res.json(test)  
    } catch (error) {
        console.log(error)
    }
})

const myCreationRouter = router;
export default myCreationRouter;