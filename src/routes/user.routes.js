
import {Router} from "express";

const router = Router()

import * as userCtrl from '../controllers/user.controller';
import { authJwt, verifySignup } from "../middlewares";




router.post('/',[verifySignup.checkRolesExisted,verifySignup.checkDuplicateUsernameOrEmail],userCtrl.createUser);


router.get('/', userCtrl.getUsers);

router.get('/:userId', userCtrl.getUserById);

router.put('/:userId',verifySignup.checkRolesExisted, userCtrl.updateUserById);

router.delete('/:userId', userCtrl.deleteUserById)








export default router;