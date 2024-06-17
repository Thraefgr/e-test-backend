import express from "express";
import connectToDb from "./utils/connectToDb.js";

const app = express();

await connectToDb(process.env.DB_URI);
app.listen(process.env.PORT, () => {
    console.log(`Go on, I am listening on port:${process.env.PORT}`)
})