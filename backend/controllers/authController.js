const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

exports.registerUser = async (req,res)=>{
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            res.status(400).json({
                success:false,
                message:"Provide all the field details"
            });
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            res.status(400).json({
                success:false,
                message:"User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            name,
            email,
            password:hashedPassword
        });

        res.status(200).json({
            success:true,
            message:"User registered successfully"
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

exports.loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;
        if(!email || !password){
            res.status(400).json({
                success:false,
                message:"Provide email and password"
            });
        }

        const user = await User.findOne({email});
        if(!user){
            res.status(400).json({
                success:false,
                message:"User not found"
            });
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(400).json({
                success:false,
                message:"Invalid credentials"
            });
        }

        const token = await jwt.sign(
            {
                id:user._id,
                role:user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"7d"
            }
        );

        res.status(200).json({
            success:true,
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getProfile = async (req,res) =>{
    try {
        console.log(req.user);
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json({
            success:true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}