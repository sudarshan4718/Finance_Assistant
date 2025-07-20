import userModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new user logic
export const registerUser = async (req, res) => {
    try {

        console.log("Register endpoint hit");
  console.log("Request body:", req.body);

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "User details missing",
            });
        }

        console.log("📥 Incoming register data:", req.body);

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

        // set JWT token in cookie
        // This token will be used for authentication in subsequent requests

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'Lax',
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


// Login user logic
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

     // set JWT token in cookie

     res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 
            'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
     });

        return res.status(200).json({ success: true, message: "Login successful",
            user: {
        name: user.name,
        email: user.email,
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message});
    }
}


// Logout user logic
export const logoutUser = async (req,res) => {
    try {
        // Clear the cookie by setting it to expire in the past
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

// Get user details logic
export const getUserdetails = async (req,res) => {
    
    try {

        const {userId} = req.userId;

    const user = await userModel.findById(userId);

    if(!user)
    {
        return res.json({success: false, message:'User not authorized' });
    }

    return res.json({success: true, message: "Got user details successfully", 
        user:{
            name: user.name,
            email: user.email,
        }
    });
        
    } catch (error) {
        return res.json({success: false, message: error.message });
    }
    
}

// check if user is authenticated
export const isAuthenticated = async (req, res, next) => {
    try {

        const { userId } = req.userId;
        const user = await userModel.findById(userId);
        return res.status(200).json({ success: true, message: "User is authenticated", 
            user:{
                name: user.name,
                email: user.email,
            }
         });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

