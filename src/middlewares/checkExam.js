import User from "../models/User.js";
import getPayload from "../utils/getPayload.js";

async function checkExam(req, res, next) {
    const username = getPayload(req.headers.authorization).username;
    const testId = req.params.id;
    const user = await User.findOne({username:username}, {inventory:1});
    const filtered = user.inventory.filter(test => test.testId.toString() === testId)
    console.log(filtered)
    if (filtered[0].finishDate) {
        res.statusCode = 400;
        res.json({error:"You have already solved this test!"});
    } else (
        next()
    )
}

export default checkExam;