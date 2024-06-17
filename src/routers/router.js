import signInRouter from "./signin.js";
import signUpRouter from "./signup.js";

const apiRouter = {
    signup: signUpRouter,
    signin: signInRouter
}

export default apiRouter;