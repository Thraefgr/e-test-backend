import jwt from "jsonwebtoken";

async function checkRole(req, res, next) {
    const authorization = req.headers.authorization;
    const token = authorization.split(" ")[1];
    const decoded = jwt.decode(token);
    if (decoded.role!="teacher") {
        res.statusCode = 400;
        res.json({message:"You can not do that!"});
    } else {
        next()
    }
}

export default checkRole;