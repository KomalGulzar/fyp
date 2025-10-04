export const errorHandler=(statusCode, message)=>{
    const error = new Error();
    error.statusCode = statusCode
    error.message = message;
    return error;
};
// export const errorHandler = (statusCode, message) => {
//     const error = new Error(message); // Pass the message directly to the Error constructor
//     error.status = statusCode; // Use `status` (standard in many Express frameworks)
//     return error; // Return the error object
//   };
  