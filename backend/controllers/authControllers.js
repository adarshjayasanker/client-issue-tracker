import User from "../models/User.js";
import jwt from 'jsonwebtoken';

const authControllers = {

    login: async(req, res) => {
        const {email, password} = req.body;
        try{
           const user = await User.findOne({email});
           if(!user){
             return res.json({message:"No user found"});
           }
           const passwordVerification = await user.comparePassword(password);
           if(!passwordVerification) return res.json("Invalid Credentials");
           const token = user.generateToken();
           if(!token){
             console.error("There is no token");
           };
           return res.status(200).json({success: true, token, user: {
            id: user._id,
            userName: user.userName,
            email: user.email,
            role: user.role,
           }});
        }catch(error){
            console.error("Internal Server Error", error);
            return res.status(500).json({message: "Internal Server Error", error: error.message});
        }
    },

    register: async(req, res) => {
        const {userName, email, password} = req.body;
        console.log(req.body.userName);
        
        try{
            const user = await User.findOne({email});
            console.log(user);
            if(!user){
                const newUser = new User({
                    userName,
                    email,
                    password,
                });
                await newUser.save();
                const token = newUser.generateToken();
                return res.status(201).json({success: true, token, user: {
                    id: newUser._id,
                    userName: newUser.userName,
                    email: newUser.email,
                    role: newUser.role,
                }});
            } 
            return res.json({message: "User already exists."});    
        }catch(error){
            console.error(error);
            return res.status(500).json({success: false, message: "Internal Server Error", error: error.message});
        }
    },

    getMe: async(req, res) => {
        const id = req.user.id;
        try{
           const user = await User.findById(id).select("-password")
           if(!user){
            return res.json({message: "No User"});
           } 
           return res.status(200).json({success: true, user: {
            userName: user.userName,
            email: user.email,
            role: user.role,
           }})
        }catch(error){
            return res.status(500).json({success: false, message: error.message})
        }
    }

};

export default authControllers;