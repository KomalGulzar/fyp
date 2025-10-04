// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux';
// import { singInStart, singInSuccess, signInFailure } from '../redux/user/userSlice';
// import OAuth from '../components/OAuth';


// function SignIn() {
//   const [formData, setFormData] = useState({});
//   const {loading, error} = useSelector((state)=>state.user);
  
//   const navigate = useNavigate();
//   const dispatch = useDispatch();


//   const handlerChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,

//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(singInStart());
//       const res = await fetch('/api/auth/signin',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(formData),

//         }
//       );
//       const data = await res.json();
//       console.log(data)

//       if (data.success === false) {
//         dispatch(signInFailure(data.message));

//         return;
//       }
//       dispatch(singInSuccess(data));
      
//       navigate('/')
//     } catch (error) {
//       dispatch(signInFailure(error.message));

//     }


//   }

//   // console.log(formData)
//   return (
//     <div className='p-3 max-w-lg mx-auto'>
//       <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
//       <form onSubmit={handleSubmit} action="" className='flex flex-col gap-4 '>
//         <input type="email" placeholder='Email' className='border p-3 rounded-lg' id='email' onChange={handlerChange} />
//         <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handlerChange} />
//         <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabld:opacity-80'>{loading ? 'Loading...' : 'Sign In'}</button>
//         <OAuth/>
//       </form>
//       <div className='flex gap-2 mt-5'>
//         <p>Don't have an account?</p>
//         <Link to={"/sign-up"}>
//           <span className='text-blue-700'>Sign Up</span>
//         </Link>
//       </div>
//       {error && <p className='text-red-500'>{error}</p>}
//     </div>
//   )
// }

// export default SignIn



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { singInStart, singInSuccess, signInFailure } from '../redux/user/userSlice';
import bg4 from '../assets/bg4.jpg';
import OAuth from '../components/OAuth';

const Login = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlerChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(singInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
  
      if (!res.ok) {  // Updated error check
        dispatch(signInFailure(data.message || 'Login failed'));
        return;
      }
  
      dispatch(singInSuccess(data));
      navigate('/');  // Make sure this is the correct route
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-800 flex shadow-lg overflow-hidden">
      <div className="relative w-1/2">
        <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center" style={{
          clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)',
          backgroundImage: `url(${bg4})`,
        }}></div>
      </div>
      <div className="w-1/2 flex flex-col justify-center p-10 bg-gray-800 bg-opacity-70 rounded-r-2xl">
        <h2 className="text-white text-4xl font-bold mb-8">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="email" placeholder="Email" className="mb-4 p-3 w-80 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" id="email" onChange={handlerChange} />
          <input type="password" placeholder="Password" className="mb-6 p-3 w-80 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" id="password" onChange={handlerChange} />
          <button disabled={loading} className="w-80 p-3 px-8  bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out hover:shadow-[0_0_15px_#4A90E2,0_0_50px_#1A237E] hover:scale-105">{loading ? 'Loading...' : 'Login'}</button>
        </form>
        {/* <OAuth /> */}
        <div className="flex gap-2 mt-5">
          <p className="text-white">Don't have an account?</p>
          <Link to={'/sign-up'}>
            <span className="text-blue-400 hover:underline">Sign Up</span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
