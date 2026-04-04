import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from "crypto";
import { User } from "../models/User.model.js";
import {sendEmail} from "../services/mail.service.js";
import { loginSchema,registerSchema } from '../Validation/auth.validation.js';
import { generateToken } from '../utils/jwt.js';


export const register= async (req, res) => {
  try {
    const result =registerSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten().fieldErrors,
      });
    }
    const { name, email, password } = result.data;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
} catch (error) {
    console.error("Registration Error:", error.message);
    res.status(500).json({ 
        success: false, 
        message: 'Server error during registration'
    });
  }
};

export const login=async (req, res) => {
    try{
        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: result.error.flatten().fieldErrors,
            });
        }
        const { email, password } = result.data;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        const token = generateToken(user);
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
        });
    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({
            success: false,
            message: 'Server error during login'
        });

    }   
};
 export const forgotPassword=async(req,res)=>{
    try {
      const { email } = req.body;

      if (!email) {
       return res.status(400).json({ message: "Email is required" });
      }

      const user = await User.findOne({ email });
      if (!user) {
         return res.status(404).json({ message: "User not found" });
       }
    // Generate password reset token and send email logic goes here
       const resetToken = crypto.randomBytes(32).toString('hex');
      const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

       // Save the reset token and its expiration to the user's record in the database
        user.resetPasswordToken = hashedToken; 
        user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour from now
        await user.save();
        const resetUrl = `http://localhost:3000/api/auth/reset-password?token=${resetToken}`;
       await sendEmail({
          to: user.email,
          subject: "Password Reset",
          html: `
           <p>You requested a password reset</p>
           <a href="${resetUrl}">Reset Password</a>
           <p>This link expires in 1 hour</p>
            `, 
           });
          res.status(200).json({message:"Password reset link has been sent to your email"});
        } catch (error) {
          console.error("Forgot Password Error:", error.message);
          res.status(500).json({
            success: false,
            message: "Server error during password reset request",
          });
        }   

}

 export const resetPassword = async (req, res) => {
    try {
      const  newPassword = req.body.newPassword;
      const { token } = req.query; 
      if (!token || !newPassword) {
         return res.status(400).json({ message: "Token or password missing" });
       }

     const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

     const user = await User.findOne({
         resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() }
     });

     if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }
     const salt = await bcrypt.genSalt(10);
     user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

     await user.save();

      res.status(200).json({ message: "Password reset successful" });
     } catch (error) {
      console.error("Reset Password Error:", error.message);
      res.status(500).json({
        success: false,
        message: "Server error during password reset",
      });
    }   
};
