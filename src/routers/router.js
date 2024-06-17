import profileRouter from "./profile.js";
import signInRouter from "./signin.js";
import signUpRouter from "./signup.js";
import testsRouter from "./tests.js";

const apiRouter = {
    signup: signUpRouter,
    signin: signInRouter,
    profile: profileRouter,
    tests: testsRouter
}

export default apiRouter;