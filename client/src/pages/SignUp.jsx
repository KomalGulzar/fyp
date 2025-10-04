// // import React, { useState } from 'react'
// // import { Link, useNavigate } from 'react-router-dom'
// // import OAuth from '../components/OAuth';


// // function SignUp() {
// //   const [formData, setFormData] = useState({});
// //   const [error, setError] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const navigate = useNavigate();


// //   const handlerChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.id]: e.target.value,

// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       setLoading(true);
// //       const res = await fetch('/api/auth/signup',
// //         {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json'
// //           },
// //           body: JSON.stringify(formData),

// //         }
// //       );
// //       const data = await res.json();
// //       console.log(data)

// //       if (data.success === false) {
// //         setLoading(false)
// //         setError(data.message);
// //         return;
// //       }
// //       setLoading(false);
// //       setError(null)
// //       navigate('/sign-in')
// //     } catch (error) {
// //       setError(error.message);
// //       setLoading(false)
// //     }


// //   }

// //   // console.log(formData)
// //   return (
// //     <div className='p-3 max-w-lg mx-auto'>
// //       <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
// //       <form onSubmit={handleSubmit} action="" className='flex flex-col gap-4 '>
// //         <input type="text" placeholder='Username' className='border p-3 rounded-lg' id='username' onChange={handlerChange} />
// //         <input type="email" placeholder='Email' className='border p-3 rounded-lg' id='email' onChange={handlerChange} />
// //         <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handlerChange} />
// //         <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabld:opacity-80'>{loading ? 'Loading...' : 'Sign Up'}</button>
// //         <OAuth/>
// //       </form>
// //       <div className='flex gap-2 mt-5'>
// //         <p>Have an account?</p>
// //         <Link to={"/sign-in"}>
// //           <span className='text-blue-700'>Sign in</span>
// //         </Link>
// //       </div>
// //       {error && <p className='text-red-500'>{error}</p>}
// //     </div>
// //   )
// // }

// // export default SignUp



// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import OAuth from '../components/OAuth';

// function SignUp() {
//   const [formData, setFormData] = useState({ role: 'Buyer' }); // Default role as buyer
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handlerChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const res = await fetch('/api/auth/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       console.log(data);

//       if (!res.ok) {
//         setLoading(false);
//         setError(data.message || 'Signup failed');
//         return;
//       }

//       setLoading(false);
//       setError(null);
//       navigate('/sign-in');
//     } catch (error) {
//       setError(error.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='p-3 max-w-lg mx-auto'>
//       <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
//       <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
//         <input type='text' placeholder='Username' className='border p-3 rounded-lg' id='username' onChange={handlerChange} required />
//         <input type='email' placeholder='Email' className='border p-3 rounded-lg' id='email' onChange={handlerChange} required />
//         <input type='password' placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={handlerChange} required />

//         {/* Role Selection Dropdown */}
//         <select id='role' className='border p-3 rounded-lg' onChange={handlerChange} required>
//           <option value='Buyer'>Buyer</option>
//           <option value='Seller'>Seller</option>
//         </select>

//         <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
//           {loading ? 'Loading...' : 'Sign Up'}
//         </button>

//         <OAuth />
//       </form>

//       <div className='flex gap-2 mt-5'>
//         <p>Have an account?</p>
//         <Link to={'/sign-in'}>
//           <span className='text-blue-700'>Sign in</span>
//         </Link>
//       </div>
//       {error && <p className='text-red-500'>{error}</p>}
//     </div>
//   );
// }

// export default SignUp;




import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bg4 from '../assets/bg4.jpg';
import OAuth from '../components/OAuth';

const SignUp = () => {
  const [formData, setFormData] = useState({ role: 'Buyer' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlerChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {  // Updated error check
        setLoading(false);
        setError(data.message || 'Signup failed');
        return;
      }

      setLoading(false);
      setError(null);
      navigate('/sign-in');  // Ensure the route is correct
    } catch (error) {
      setError(error.message);
      setLoading(false);
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
        <h2 className="text-white text-4xl font-bold mb-8">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input type="text" placeholder="Username" className="mb-4 p-3 w-80 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" id="username" onChange={handlerChange} required />
          <input type="text" placeholder="Last Name" className="mb-4 p-3 w-80 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" id="userlastname" onChange={handlerChange} required />
          <input type="email" placeholder="Email" className="mb-4 p-3 w-80 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" id="email" onChange={handlerChange} required />
          <input type="password" placeholder="Password" className="mb-4 p-3 w-80 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" id="password" onChange={handlerChange} required />
          <input
  type="text"
  placeholder="Phone Number"
  className="mb-4 p-3 w-80 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  id="phone"
  onChange={handlerChange}
  required
  inputMode="numeric"
  pattern="[0-9]*"
  
  onKeyPress={(e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  }}
/>



          <select id="role" className="mb-4 p-3 w-80 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handlerChange} required>
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
          </select>

          <button disabled={loading} className="w-80 p-3 px-8  bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out hover:shadow-[0_0_15px_#4A90E2,0_0_50px_#1A237E] hover:scale-105">{loading ? 'Loading...' : 'Sign Up'}</button>
        </form>
        {/* <OAuth /> */}
        <div className="flex gap-2 mt-5">
          <p className="text-white">Have an account?</p>
          <Link to={'/sign-in'}>
            <span className="text-blue-400 hover:underline">Sign In</span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default SignUp;
