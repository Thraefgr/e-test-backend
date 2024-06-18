import jwt from "jsonwebtoken";

function getPayload(authToken) {
    const token = authToken.split(" ")[1];
    const decoded = jwt.decode(token);
    return decoded;
}

export default getPayload;