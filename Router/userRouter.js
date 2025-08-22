import express from "express"; // Importing express for routing
import { middleware } from '../Middleware/Middleware.js'; // Importing middleware functions



const UserRouter = express.Router(); // router instance for handling routes


UserRouter.get('/',middleware.homecontroller);

UserRouter.post('/register',middleware.registerUser);

UserRouter.post('/login',middleware.loginUser); 

UserRouter.post('/forgot-password',middleware.forgotPassword); 

UserRouter.get('/reset-password',middleware.resetPassword); 

UserRouter.post('/reset-password',middleware.resetPasswordpost); 

export default UserRouter;  