import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    email: { type: String, required: true, unique:true }, // Ensure email is unique
    password: { type: String, required: true },
    age: { type: Number, min: 0 }, // Ensure age is a non-negative number
    createdAt: { type: Date, default: Date.now } ,//Automatically set the creation date
    resetPasswordTokenHash: String,
    resetPasswordExpires: Date,
});

const resetPasswordTokenSchema = new mongoose.Schema({
    email: { type: String, required: true },
    token: { type: String, required: true },
    expireAt: { type: Date, required: true },
});


export const ResetPasswordToken = mongoose.model("ResetPasswordToken", resetPasswordTokenSchema);

export const User = mongoose.model("User", userSchema);

