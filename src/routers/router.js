import profileRouter from "./profile.js";
import signInRouter from "./signin.js";
import signUpRouter from "./signup.js";

const apiRouter = {
    signup: signUpRouter,
    signin: signInRouter,
    profile: profileRouter
}

export default apiRouter;