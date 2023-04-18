import User from "./Schema/User.js";
import bcrypt from 'bcryptjs';
import {validationResult} from "express-validator";
import jwt from 'jsonwebtoken'
import {json} from "express";



class AuthController{
    async registration(req,res){
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                return res.status(400).json({message:'Error on reg',errors})
            }
            const {username, password} = req.body;
            const candidate = await User.findOne({username})
            if(candidate){
                return res.status(400).json('{User already exist}')
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({username,password: hashPassword})
            await user.save()
           return res.json({message:'User was created'})
        }catch (e) {
            console.log(e)
            res.status(400).json({message:'Registration failed'})
        }
    }

    async login(req,res){
        try {
const {username,password} = req.body
            const user = await User.findOne({username})
            if(!user){
                res.status(400).json({message:`User ${username} not exist`})
            }
            const validPassword = bcrypt.compareSync(password,user.password)
            if (!validPassword){
                return res.status(400).json({message:`Wrong password`})
            }
            return res.json({message:'Login success'})
        }catch (e) {
            console.log(e)
            res.status(400).json({message:'Login failed'})
        }
    }
}

export default new AuthController()