import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'; 

import { Router } from  './Router/router.js'; // Importing the routers



const app = express();


const port = process.env.PORT || 3011;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// mongoDB connection
mongoose.connect("mongodb+srv://tiwarisachin6343:ah3OmpkKEjTGLwUH@cluster0.uubymki.mongodb.net/", {
 dbName: 'Contact_api_full_Authentication',
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);   
});


// Middleware for handling routes
app.use('/', Router.userRouter);
app.use('/api/user/', Router.userRouter);
app.use('/api/contact/', Router.contactRouter);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

