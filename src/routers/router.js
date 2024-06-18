import inventoryRouter from "./inventory.js";
import profileRouter from "./profile.js";
import signInRouter from "./signin.js";
import signUpRouter from "./signup.js";
import testsRouter from "./tests.js";

const apiRouter = {
    signup: signUpRouter,
    signin: signInRouter,
    profile: profileRouter,
    tests: testsRouter,
    inventory: inventoryRouter
}

export default apiRouter;