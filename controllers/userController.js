import { User, ResetPasswordToken } from '../Models/user.js'; // Adjust the path as necessary
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing
import jwt from 'jsonwebtoken';
import crypto from 'crypto'; // Import crypto for generating tokens...existing code...
import { sendEmail } from '../utils/sendEmail.js'; // ...existing code...
import dotenv from 'dotenv'; // Import dotenv to load environment variables
dotenv.config(); // Load environment variables from .env file   


export const homecontroller = (req, res) => {
    res.send("Welcome to the Home Page");
}   

export const registerUser =  async (req, res) => {

    const { name, email, password } = req.body;


    if(name=="" || email=="" || password==""){
        return res.status(400).json({ message: 'All fields are required', success: false });
    }
 
     
    const  user = await User.findOne({email});
    // Check if the user already exists
    if (user) {
        return res.status(400).json({ message: 'User already exists', success: false });
    }
  
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    user = await User.create({name: name, email: email, password: hashedPassword }).then(() => {
             return res.json({message: 'User registered successfully!', success: true });
         }).catch((error) => {
             console.error("Error saving user:",error);
             return res.status(500).json({ message:'Internal server error',success:false});
         });

    res.status(201).json({ message: 'User registered successfully!', success: true });     
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (email === "" || password === "") {
        return res.status(400).json({ message: 'All fields are required', success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'User not found', success: false });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials', success: false });
    }
    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ message: 'Login successful', success: true, token: token});
}   

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  // check user exists
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("User not found");

  // generate token
  const token = crypto.randomBytes(32).toString("hex");
  const expire = Date.now() + 15 * 60 * 1000; // 15 mins

  // save token in DB
  // send email with link
  await ResetPasswordToken.create({ email, token, expireAt: expire });
   
  // send email with link
const resetLink = `${process.env.BASE_URL}/reset-password?token=${token}`;
await sendEmail(
  email,                           // user ka email (req.body.email)
  "Reset Your Password",           // subject line
  `Click here to reset your password: ${resetLink}`  // email ka content
);

  res.send("Password reset link sent to your email");
};

export const resetPassword =  async (req, res) => {
  const token  = req.query.token; // learning from the query parameter
   
  
  const user = await ResetPasswordToken.findOne({ token: token, expireAt: { $gt: Date.now() } });

  if (!user) return res.status(400).send('Token expired or invalid Sachin Pandey');

  // Render form (HTML/EJS/React)
  res.send(`

  <form method="POST" action="/reset-password">
    <input type="hidden" name="token" value="${token}" />
    <input type="password" name="newPassword" placeholder="New password" required />
    <button type="submit">Reset</button>
  </form>

`);
}

export const resetPasswordpost  = async (req, res)=>{
    const { token, newPassword } = req.body;

    // Validate the token
    const resetToken = await ResetPasswordToken.findOne({ token: token, expireAt: { $gt: Date.now() } });
    
    if (!resetToken) {
        return res.status(400).json({ message: 'Invalid or expired token', success: false });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Update the user's password   
    await User.updateOne({ email: resetToken.email }, { password: hashedPassword });
    // Delete the reset token
    await ResetPasswordToken.deleteOne({ token: token });

    res.json({ message: 'Password reset successful', success: true });

}

  