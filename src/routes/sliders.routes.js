import { Router } from "express";
const router = Router();

import * as slidersCrtl from "../controllers/sliders.controller";

//importamos los midelwares para la utenticacion de tokens

import { authJwt } from "../middlewares";
import uploadArray from "../controllers/upload";

//creamos el enrutador a travez del metodo get , cuando visiten la ruta tienen una respuesta

//pongo primero el verifytoken para verificarlo

// sliders.routes.js

router.post("/", uploadArray, slidersCrtl.createSlider);

router.get("/", slidersCrtl.getSliders);

router.get("/:sliderId", slidersCrtl.getSliderById);

router.put("/:sliderId", slidersCrtl.updateSliderById);

router.delete("/:sliderId", slidersCrtl.deleteSlider);

export default router;
