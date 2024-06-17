import express from "express";
import connectToDb from "./utils/connectToDb.js";
import apiRouter from "./routers/router.js";

const app = express();

app.use(express.json());
app.use(apiRouter.signup);
app.use(apiRouter.signin);
app.use(apiRouter.profile);

await connectToDb(process.env.DB_URI);
app.listen(process.env.PORT, () => {
    console.log(`Go on, I am listening on port:${process.env.PORT}`)
})