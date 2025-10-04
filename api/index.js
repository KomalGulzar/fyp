// import express from 'express'
// import mongoose from 'mongoose';
// import dotenv from 'dotenv'
// import userRouter from './routes/user.route.js'
// import authRouter from './routes/auth.route.js'
// import cookieParser from 'cookie-parser';
// import listingRouter from './routes/listing.route.js'
// import uploadRoute from './routes/upload.route.js';


// dotenv.config();

// mongoose.connect(process.env.MONGO).then(()=>{
//     console.log('conntected');

// }).catch((err)=>{
//     console.log(err)
// })
// const categoryRoutes = require("./routes/categoryRoutes.js");
// app.use("/api/categories", categoryRoutes);

// const app = express();

//  app.use(express.json());

//  app.use(cookieParser());

// app.use('/api', uploadRoute);


// app.listen(5000, ()=>{
//     console.log('Server is running on the port 5000')
// });


// // app.use("/api/user", userRouter)
// // app.use("/api/auth", authRouter)

// // app.use((err, req ,res, next)=>{

// //     const statusCode = err.statusCode || 500;
// //     const message = err.message|| 'internal server error'
// //     return res.status(statusCode).json({
// //         success: false,
// //         statusCode,
// //         message,
// //     })
// // })

// // app.get('/test', (req, res)=>{
// //     res.json({
// //         "message" : "hello worlds"
// //     })
    
// // })

// app.use("/api/user", userRouter)
// app.use("/api/auth", authRouter)
// app.use("/api/listing", listingRouter)

// // app.use((err, req ,res)=>{

// //     const statusCode = err.statusCode || 500;
// //     const message = err.message|| 'internal server error'
// //     return res.status(statusCode).json({
// //         success: false,
// //         statusCode,
// //         message,
// //     })
// // })
// app.use((err, req, res, next) => { // Include 'next' as the fourth parameter
//     const statusCode = err.statusCode || 500;
//     const message = err.message || 'Internal Server Error';
//     return res.status(statusCode).json({
//         success: false,
//         statusCode,
//         message,
//     });
// });




import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Import Routes
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import uploadRoute from './routes/upload.route.js';
import categoryRoutes from './routes/categoryRoutes.js';  // ✅ Corrected Import
import inquiryRoutes from "./routes/inquiryRoutes.js";
import wishlistRoute from './routes/wishlist.route.js';
import adminRoutes from './routes/admin.route.js';


dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use('/api', uploadRoute);
app.use("/api/categories", categoryRoutes);  // ✅ Moved AFTER defining app
app.use("/api/inquiries", inquiryRoutes);
app.use('/api/admin', adminRoutes);


app.use('/api/wishlist', wishlistRoute);

// Error Handling Middleware
app.use((err, req, res, next) => { 
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

// Start Server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

