
import { Router } from "express";
const router = Router()
import { verifySignup } from "../middlewares";

require('../controllers/auth.controller')

import * as authCtrl from '../controllers/auth.controller';

router.post('/signup',verifySignup.checkDuplicateUsernameOrEmail,verifySignup.checkRolesExisted, authCtrl.signup,(req, res)=>{res.render('signup')})
router.post('/signin',authCtrl. signin,(req, res)=>{res.render('signin')})


//router para el signup

router.post('/signup',authCtrl.signup)



export default router;