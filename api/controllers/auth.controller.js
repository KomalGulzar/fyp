import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
// import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';


export const signup = async ( req, res, next) => {

  const { username, userlastname,  email, password, role, phone,  } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10)
  const newUser = new User({ username, userlastname, email, password: hashedPassword, role, phone, });
  

  try{
    await newUser.save();
    res.status(201).json("User Created Successfully")
  }catch(error){
     res.status(500).json(error.message)
  }
 
  // try {
  //   await newUser.save()
  //   res.status(201).json('User Created')

  // } catch (error) {
  //   next(errorHandler(500, 'error from function'));
    

  // }

}
// export const signin = async (err, req, res, next)=>{
//   const {email, password} = req.body;
//   try {
//     const validUser = await User.findOne({email})
//     if(!validUser) return next(errorHandler(404, 'User not found'));
//     const validPassword = bcryptjs.compareSync(password, validUser.password);
//     if(!validPassword) return next(errorHandler(401, 'Wrong Credentials'));
//     const token= jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
//     const {password: pass, ...rest}= validUser._doc    
//     res.cookie('access_token', token, {httpOnly: true})
//     .status(200)
//     .json(rest)

//   } catch (error) {
//     next(error)
//   }
// }

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return res.status(401).json({ success: false, message: 'Wrong Credentials' });
    }

    // const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const token = jwt.sign(
      { id: validUser._id, role: validUser.role }, // include role here
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // optional: token expiry
    );
    
    const { password: pass, ...rest } = validUser._doc;

    res.cookie('access_token', token, { httpOnly: true });
    return res.status(200).json(rest);
    
  } catch (error) {
    // return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// export const google = async (req, res, next) =>{
//   try {
//     const user = await User.findOne({email: req.body.email})
//     if(user){
//       const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
//       const {password: pass, ...rest} = user._doc;
//       res.cookie('access_token', token, {httpOnly:true}).status(200).json(rest);
//     }else{
//       const generatedPassword = Math.random().toString(36).slice(-8)
//       + Math.random().toString(36).slice(-8);
//       const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
//       const newUser = new User ({username: req.body.name.split("".json().toLowerCase() + Math.random().toString(36).slice(-8)) , email:req.body.email, password: hashedPassword, avatar : req.body.photo})
//       await newUser.save();
//       const token = jwt.sign({id: user._id}, process.env.JWT_SECRET); 
//       const {password: pass, ...rest} = user._doc;
//       res.cookie('access_token', token, {httpOnly:true}).status(200).json(rest);

//     }
//   } catch (error) {
    
//   }
// }


export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      return res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
    }

    // Generate a unique username
    const username = req.body.name.toLowerCase().replace(/\s+/g, '') + Math.random().toString(36).slice(-4);
    
    // Generate random password & hash it
    const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
    const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

    // Create new user
    const newUser = new User({
      username,
      email: req.body.email,
      password: hashedPassword,
      avatar: req.body.photo
    });

    await newUser.save();

    // Generate token for new user
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = newUser._doc;

    res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);

  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const signOut  = async (req, res, next)=>{
  try {
    res.clearCookie('access_token', { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', // Ensures it's only secure in production
      sameSite: 'strict' 
  });
  res.status(200).json('User has been logged out')
  } catch (error) {
    next(error)
  }
}
