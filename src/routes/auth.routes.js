import { Router } from "express";
const router = Router();
import { authJwt, verifySignup } from "../middlewares";
import * as authCtrl from "../controllers/auth.controller";

router.post(
  "/signup",
  verifySignup.checkDuplicateUsernameOrEmail,
  verifySignup.checkRolesExisted,
  authCtrl.signup
);

router.post("/signin", authCtrl.signin);

router.post("/verifySession",authCtrl.verifySession);

router.post("/signup", authCtrl.signup);

export default router;