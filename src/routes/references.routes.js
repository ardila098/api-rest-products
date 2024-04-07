import { Router } from "express";
const router = Router();

import * as referencesCrtl from "../controllers/productsController/referencesController";

router.post("/", referencesCrtl.createReference);

router.get("/", referencesCrtl.getReferences);

// router.get("/:referenceId", referencesCrtl.getReferenceById);

router.put("/:referenceId", referencesCrtl.updateReference);

// router.delete("/:referenceId", referencesCrtl.deleteReference);

export default router;
