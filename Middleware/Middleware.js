import { loginUser,homecontroller,registerUser, forgotPassword, resetPassword, resetPasswordpost} from   '../controllers/userController.js';
import { newContact, getAllContacts } from  '../controllers/contactController.js';

export const middleware = { loginUser,homecontroller, registerUser, forgotPassword, resetPassword, resetPasswordpost, newContact, getAllContacts };