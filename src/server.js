import express from "express";
import connectToDb from "./utils/connectToDb.js";
import apiRouter from "./routers/router.js";
import cors from "cors";

const app = express();

app.use(cors())
app.use(express.json());
app.use(apiRouter.signup);
app.use(apiRouter.signin);
app.use(apiRouter.profile);
app.use(apiRouter.tests);
app.use(apiRouter.inventory);
app.use(apiRouter.exam);
app.use(apiRouter.myCreation);
await connectToDb(process.env.DB_URI);
app.listen(process.env.PORT, () => {
    console.log(`Go on, I am listening on port:${process.env.PORT}`)
})