import {Router} from "express";
import authController from "./authController.js";
import {check} from "express-validator";

const router = new Router();



router.post('/registration',[check('username','Username can not be empty').notEmpty(),
    check('password','Pass should by greather then 4 and less than 10 symbols').isLength({min:4,max:10}),
], authController.registration)
router.post('/login', authController.login)

export default router