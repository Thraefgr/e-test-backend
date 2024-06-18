import jwt from "jsonwebtoken";
import getPayload from "../utils/getPayload.js";

async function checkRole(req, res, next) {
    const decoded = getPayload(req.headers.authorization);
    if (decoded.role!="teacher") {
        res.statusCode = 400;
        res.json({message:"You can not do that!"});
    } else {
        next()
    }
}

export default checkRole;