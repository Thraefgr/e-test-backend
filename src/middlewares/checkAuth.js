import jwt from "jsonwebtoken";

async function checkAuth(req, res, next) {
    try {
        const authorization = req.headers.authorization
        if(!authorization) {
            res.statusCode = 400;
            res.send({message: "You are not authorized motherfucker!"})
        } else {
            const token = authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            next()
        }
    } catch (error) {
        res.statusCode = 400;
        res.send({message:`${error}`})
    }
}

export default checkAuth;