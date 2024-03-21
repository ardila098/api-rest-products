import { Router } from "express";
const router = Router();

import * as garmenTypeCrtl from "../controllers/productsController/garmentType.controller";

router.post("/", garmenTypeCrtl.createGarmentType);

router.get("/", garmenTypeCrtl.getGarmenTypes);

// router.get("/:garmentTypeId", garmenTypeCrtl.getGarmenTypeById);

router.put("/:garmentTypeId", garmenTypeCrtl.updateGarmenTypeById);

router.delete("/:garmentTypeId", garmenTypeCrtl.deleteGarmentType);

export default router;
