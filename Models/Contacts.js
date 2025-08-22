import mongoose from "mongoose";

// Define the schema for the Contact model
// This schema includes fields for name, email, phone, and createdAt timestamp

const contactSchema = new mongoose.Schema({

    name: { type: String, required: true }, // Ensure name is required  
    email: { type: String, required: true, index: true },  // Ensure email is indexed for faster queries 
    phone: { type: String, required: true }, // Ensure phone is unique
    createdAt: { type: Date, default: Date.now }, // Automatically set the creation date
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'} // Reference to the User model

});


export const Contact = mongoose.model("Contact", contactSchema);