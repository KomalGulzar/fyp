import Listing from "../models/listing.model.js"
import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'
import Message from '../models/Message.js';

export const test =  (req, res)=>{
    res.json({
        "message" : "Router is working"
    })
    
}

export const updateUser  = async  (req, res, next)=>{
   if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can update only your account'));
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
        const updateUser = await User.findByIdAndUpdate(req.params.id,  {
            $set:{
                username: req.body.username,
                userlastname: req.body.userlastname,
                email: req.body.email,
                password: req.body.password,
               description: req.body.description,
                avatar: req.body.avatar,
            }
        },{new: true})

        const {password, ...rest } = updateUser._doc;
        res.status(200).json(rest);

    } catch (error) {
        next(error)
    }
};


// export const deleteUser = async (req, res, next)=>{
//     if(req.user.id !== req.params.id) return next(errorHandler(401, "You can only delete your own account"));
//     try {
//         await User.findByIdAndDelete(req.params.id)
//         res.clearCookie('access_token');
//         res.status(200).json('User Has been deleted')
//     } catch (error) {
//         next(error)
//     }
// }

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, "You can only delete your own account"));
    try {
        await User.findByIdAndDelete(req.params.id);
        
        // Clearing the access token cookie
        res.clearCookie('access_token', { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', // Ensures it's only secure in production
            sameSite: 'strict' 
        });

        res.status(200).json({ success: true, message: 'User has been deleted' });
    } catch (error) {
        next(error);
    }
};


export const getUserListing = async (req, res, next) => {
    if (req.user.id === req.params.id) {
      try {
        const listings = await Listing.find({ userRef: req.params.id }); // ✅ Correct field
        res.status(200).json(listings);
      } catch (error) {
        next(error);
      }
    } else {
      return next(errorHandler(401, "You can only view your listings!"));
    }
  };


  export const getUser = async (req, res, next) =>{
    try {
        const user = await User.findById(req.params.id);


    if(!user) return next(errorHandler(404, 'User not found'))


    const {password: pass, ...rest} = user._doc;
    res.status(200).json(rest);

    } catch (error) {

        next(error)
        
    }
    
  }


//   Sending messags to the Admin

export const createMessage = async (req, res) => {
    console.log("Request Body:", req.body);  // Log the request body to check the data
  
    try {
      let name, email;
  
      // 🛡️ Check if user is logged in
      if (req.user) {
        name = req.user.username;
        email = req.user.email;
      } else {
        // 🔐 For guests, get from req.body
        name = req.body.name;
        email = req.body.email;
  
        // ✅ Validate guest input
        if (!name || !email || !req.body.message || !req.body.subject) {
          return res.status(400).json({ error: 'Name, email, message, and subject are required.' });
        }
      }
  
      const subject = req.body.subject || '';  // Handle subject properly
      const message = req.body.message;
  
      const newMessage = new Message({ name, email, subject, message });
      await newMessage.save();
  
      res.status(201).json({ message: 'Message sent successfully' });
  
    } catch (err) {
      console.error("Error while sending message:", err);  // Log the error details
      res.status(500).json({ error: 'Server error while sending message.' });
    }
  };
  
  
  
  
  