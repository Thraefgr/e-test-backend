import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import Test from "../models/Test.js";
import Buffer from "node:buffer"

const router = express.Router()

router.get("/tests", checkAuth, async (req, res) => {
    let allTests = await Test.find({}, {_id:0, __v:0, questions:0});
    res.json(allTests)
})


const testsRouter = router;
export default testsRouter;