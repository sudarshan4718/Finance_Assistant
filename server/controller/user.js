import userModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUSer = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "User details missing",
            });
        }

        const userExists = await userModel.findOne({ email });

        if (userExists) {
            return res.status(409).json({
                success: false,
                message: "Email already exists, please use a different email",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const loginUser = async (req,res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password)
        {
            return res.status(400).json({success: false, message: "Email and password are reuired"});
        }

        const user = await userModel.findOne({email });

        if(!user)
        {
            return res.status(404).json({succcess: false,})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch)
        {
            return res.status(401).json({ success: false, message: "Email or password is incorrect"});
        }

         const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, 
            {
             expiresIn : '7d'
        },
     );

     res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 
            'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
     });

        return res.status(200).json({ success: true, message: "Login successful"});
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message});
    }
}

export const logoutUser = async (req,res) => {
    try {
         res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 
            'none' : 'strict',
        });
        return res.status(200).json({ success: true, message: "Logout successful" });
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}

export const getUserdetails = async (req,res) => {
    
    try {

        const {userId} = req.body;

    const user = await userModel.findById(userId);

    if(!user)
    {
        return res.json({success: false, message:'User not authorized' });
    }

    return res.json({success: true, message: "Got user details successfully", user});
        
    } catch (error) {
        return res.json({success: false, message: error.message });
    }
    
}

