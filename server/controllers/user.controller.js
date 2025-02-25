import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';

export const register = async (req ,res) => {
    
    try{
        const { name, email, password } = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                sucess: false,
                message: "Please fill in all fields"});
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                sucess: false,
                message: "User already exists with this emai"});
        }

        const hashedPassword = await bcrypt.hash(password , 10);

        await User.create({
            name,
            email,
            password:hashedPassword
        });

        return res.status(200).json({
            sucess : true,
            message: "User created successfully."

        })
    }

    catch (error) {
        console.log(error);
        return res.status(400).json({
            sucess: false,
            message:"Failed to reggister user"
        })
    }
}


export const login = async(req , res) => {
    try{
        const { email , password } = req.body;
        if(!email || !password){
            return res.status(400).json({
                sucess: false,
                message: "Please fill in all fields"});
        }

        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(400).json({
                sucess: false,
                message: "Incorrect email or password"});
            }
        
        const isMatch = await bcrypt.compare(password, existingUser.password);
           if(!isMatch){
            return res.status(400).json({
                sucess: false,
                message: "Incorrect email or password"});
           } 

           generateToken(req, User, `Welcome back, ${existingUser.name}!`);

        if(!password){
            return res.status(400).json({
                sucess: false,
                message: "Incorrect email or password"});
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            sucess: false,
            message:"Failed to login user"
        })
    }
}