import { Router } from "express";
const router = Router();

import * as categorysCrtl from "../controllers/categorys.controller";

router.post("/", categorysCrtl.createCategory);

router.get("/", categorysCrtl.getCategorys);

router.get("/:categoryId", categorysCrtl.getCategoryById);

router.put("/:categoryId", categorysCrtl.updateCategoryById);

router.delete("/:categoryId", categorysCrtl.deleteCategory);

export default router;
