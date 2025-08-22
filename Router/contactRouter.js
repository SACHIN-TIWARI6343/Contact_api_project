import express from "express"; // Importing express for routing
import { middleware } from '../Middleware/Middleware.js'; // Importing middleware functions



const contactRouter = express.Router(); // router instance for handling routes


contactRouter.post('/new',middleware.newContact);
contactRouter.get('/all',middleware.getAllContacts);


export   default contactRouter;  