// import { errorHandler } from "./error.js";
// import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next)=>{
// const token = req.cookies.access_token;
// if(!token) return next(errorHandler(401, 'Unauthorized'))

// jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
//     if(err) return next(errorHandler(403, 'Forbidden'));
//     req.user= user; 

//     next(); 
// });
// };



import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  let token = req.cookies?.access_token;

  // ✅ Fallback: Try Authorization header if cookie is missing
  if (!token && req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return next(errorHandler(401, "Unauthorized"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"));
    req.user = user;
    next();
  });
};


export const verifyAdmin = (req, res, next) => {
  const token = req.cookies?.access_token || req.headers.authorization?.split(' ')[1];
  
  if (!token) return next(errorHandler(401, "Unauthorized"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"));

    // Log user info to verify the decoded token
    console.log("Decoded User:", user);  // Add this line to inspect the decoded payload

    // Check if the user role is admin
    if (user?.role !== 'admin') {
      return next(errorHandler(403, "Admin access required"));
    }

    req.user = user;
    next();
  });
};


// export const optionalVerifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;

//   if (!token) {
//     // User is not logged in – continue without setting req.user
//     return next();
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       // Token is invalid – continue without blocking, but don't set req.user
//       return next();
//     }

//     // Valid token – set user info
//     req.user = user;
//     next();
//   });
// };
