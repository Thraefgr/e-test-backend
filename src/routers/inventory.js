import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import getPayload from "../utils/getPayload.js";
import Test from "../models/Test.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/inventory", checkAuth, async (req, res) => {
    try {
        const username = getPayload(req.headers.authorization).username;
        const user = await User.findOne({username:username})
        const owns = user.inventory.filter(test => test.testId.toString() === req.body.testId)
        if(!await Test.findOne({_id:req.body.testId})) {
            res.statusCode=400
            res.json({error:"Could not find the test you are trying to purchase."})
        } else if (owns.length) {
            res.statusCode=400
            res.json({error:"You already have this!"})
        } else {
            const purchased = {
                testId: req.body.testId,
                purchaseDate: new Date()
            }
            user.inventory.push(purchased);
            await user.save();
            res.json({success: "Purchase was successfull. You should solve it!"})
        }    
    } catch (error) {
        res.statusCode=400
        res.json({error:"Try to send a proper request next time. Oki?"})
    }

})

router.get("/inventory", checkAuth, async (req, res) => {
    try {
        const username = getPayload(req.headers.authorization).username;
        const ownedTests = await User.findOne({username:username}, {_id:0, inventory:1}).populate({path:"inventory.testId", select:"-questions"});
        res.json(ownedTests.inventory);
    } catch (error) {
        res.statusCode = 400;
        res.json({error:"Don't know, don't care."});
    }
})

router.delete("/inventory/:id", checkAuth, async (req, res) => {
    try {
        const username = getPayload(req.headers.authorization).username;
        const testId = req.params.id;
        const user = await User.updateOne({username:username}, {$pull:{"inventory": {testId:testId}}});
        res.json({success:"You have successfully removed this test from your account!"});
    } catch (error) {
        res.statusCode = 400;
        res.json({error:"Something went wrong!"})
    }

})

const inventoryRouter = router;
export default inventoryRouter;