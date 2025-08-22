import { Contact } from "../Models/Contacts.js";



export const newContact = async (req, res) => {

    console.log("New Contact");
    const { name, email, phone } = req.body;    

    // Check if name, email, and phone are provided
    if (!name || !email || !phone) {
        return res.status(400).json({ message: 'All fields are required', success: false });
    }   

    // Create a new contact
    const contact = await Contact.create({ name, email, phone }).then(() => {
        return res.json({ message: 'Contact created successfully', success: true });
    }).catch((error) => {
        console.log("hii");
        console.error("Error saving contact:", error);
        return res.status(500).json({ message: 'Internal server error', success: false });
    });
}   

// get all contacts

export const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ message: 'Internal server error', success: false }); 
    }
}   


  