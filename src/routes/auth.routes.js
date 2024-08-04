import { Router } from "express";
const router = Router();
import { authJwt, verifySignup } from "../middlewares";

require("../controllers/auth.controller");

import * as authCtrl from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/authjwt";

router.post(
  "/signup",
  verifySignup.checkDuplicateUsernameOrEmail,
  verifySignup.checkRolesExisted,
  authCtrl.signup,
  (req, res) => {
    res.render("signup");
  }
);
router.post("/signin", authCtrl.signin, (req, res) => {
  res.render("signin");
});
router.post("/verifySession", verifyToken, (req, res) => {
  console.log(res);
  res.json({ message: "Session is valid", userId: req.userId });
});

router.post("/signup", authCtrl.signup);

export default router;
