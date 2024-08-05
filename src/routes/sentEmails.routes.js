import { Router } from "express";
const router = Router();

import * as sentEmailsCrtl from "../controllers/sentEmails.controller";

router.post("/", sentEmailsCrtl.sentEmails);

// router.get("/", sentEmailsCrtl.getsentEmails);

// router.get("/:sentEmailId", sentEmailsCrtl.getsentEmailById);

// router.put("/:sentEmailId", sentEmailsCrtl.updatesentEmail);

// router.delete("/:sentEmailId", sentEmailsCrtl.deletesentEmail);

export default router;
