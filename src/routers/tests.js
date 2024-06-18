import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import Test from "../models/Test.js";
import Buffer from "node:buffer"

const router = express.Router()

router.get("/tests", checkAuth, async (req, res) => {
    let allTests = await Test.find({}, {__v:0, questions:0});
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