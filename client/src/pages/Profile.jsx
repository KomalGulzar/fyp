// import React, { useState, useRef } from 'react';
// import { useSelector } from 'react-redux';
// import { updateUserFailure, updateUserSuccess, updateUserStart, deleteUserFailure, deleteUserSuccess, deleteUserstart, signOutUserstart, signOutUserFailure, signOutUserSuccess } from '../redux/user/userSlice';
// import { useDispatch } from 'react-redux';
// import { data, Link } from 'react-router-dom'
// // import { sign } from 'jsonwebtoken';

// const Profile = () => {
//   const [formData, setFormData] = useState({});
//   const { currentUser, loading, error } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const fileRef = useRef(null);
//   const [updateSuccess, setUpdateSuccess] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };
//   const [showListingsError, setShowListingsError] = useState(false);
//   const [userListings, setUserListings] = useState([])


//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     dispatch(updateUserStart());
//   //     const res = await fetch(`api/user/update/${currentUser._id}`, {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-type': 'application/json'
//   //       },
//   //       body: JSON.stringify(formData),
//   //     });
//   //     const data = await res.json();
//   //     if(data.success === false){
//   //       dispatch(updateUserFailure(data.message));
//   //       return
//   //     }
//   //     dispatch(updateUserSuccess(data));
//   //     setUpdateSuccess(true);

//   //   } catch (error) {
//   //     dispatch(updateUserFailure(error.message));
//   //   }

//   //   console.log('Updated Profile Data:', formData);
//   // };

//   // const handleDeleteUser = async  ()=>{
//   //   try {
//   //     dispatch(deleteUserstart());
//   //     const res = await fetch(`api/user/delete/${currentUser}`,{
//   //       method: 'DELETE',
//   //     });
//   //        const data = await res.json();
//   //        if(data.success === false){
//   //         dispatch(deleteUserFailure(data.message));
//   //         return;
//   //        }
//   //     dispatch(deleteUserSuccess(data));
//   //   } catch (error) {
//   //    dispatch(deleteUserFailure(error.message)) 
//   //   }
//   // }
//   const handleImageUpload = async (file) => {
//     const formData = new FormData();
//     formData.append('image', file);

//     try {
//       const res = await fetch('/api/upload', {
//         method: 'POST',
//         body: formData,
//       });
//       const data = await res.json();
//       if (data.success) {
//         return data.imageUrl; // Cloudinary image URL
//       }
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//   };

//   // const handleSubmit = async (e) => {
//   //     e.preventDefault();

//   //     let imageUrl = currentUser.avatar; // Keep the existing avatar
//   //     if (formData.image) {
//   //         imageUrl = await handleImageUpload(formData.image);
//   //     }

//   //     const updatedData = { ...formData, avatar: imageUrl };

//   //     // Send updated user data to the backend
//   //     const res = await fetch(`/api/user/update/${currentUser._id}`, {
//   //         method: 'POST',
//   //         headers: { 'Content-Type': 'application/json' },
//   //         body: JSON.stringify(updatedData),
//   //     });

//   //     console.log(await res.json());
//   // };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(updateUserStart()); // Start the update action

//       // Handle the image upload if a new image is selected
//       let imageUrl = currentUser.avatar; // Default to current user's avatar
//       if (formData.image) {
//         imageUrl = await handleImageUpload(formData.image); // Upload the new image and get the URL
//       }

//       // Prepare the updated data with the new avatar URL
//       const updatedData = { ...formData, avatar: imageUrl };

//       // Send the updated data to the backend
//       const res = await fetch(`/api/user/update/${currentUser._id}`, {
//         method: 'POST',
//         headers: {
//           'Content-type': 'application/json',
//         },
//         body: JSON.stringify(updatedData),
//       });

//       const data = await res.json();

//       // Handle response from the backend
//       if (data.success === false) {
//         dispatch(updateUserFailure(data.message)); // If the update fails, dispatch failure
//         return;
//       }

//       // Dispatch success if update is successful
//       dispatch(updateUserSuccess(data));
//       setUpdateSuccess(true); // Optionally show success message

//     } catch (error) {
//       // Dispatch failure action if there’s an error
//       dispatch(updateUserFailure(error.message));
//     }

//     console.log('Updated Profile Data:', formData); // Log the updated data (for debugging)
//   };


//   const handleDeleteUser = async () => {
//     try {
//       dispatch(deleteUserstart());

//       const res = await fetch(`/api/user/delete/${currentUser._id}`, { // Fixed user ID
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       const data = await res.json();

//       if (data.success === false) {
//         dispatch(deleteUserFailure(data.message));
//         return;
//       }

//       dispatch(deleteUserSuccess(data));

//       // Optionally, log out the user or redirect to login page
//       console.log('User deleted successfully');
//     } catch (error) {
//       dispatch(deleteUserFailure(error.message));
//     }
//   };

//   const handleChangeOut = async () => {
//     try {
//       dispatch(signOutUserstart());
//       const res = await fetch('api/auth/signout');
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(signOutUserFailure(data.message));
//         return;
//       }
//       dispatch(signOutUserSuccess(data));
//     } catch (error) {
//       dispatch(signOutUserFailure(data.message));

//     }
//   };

//   const handleShowListitngs = async () => {
//     try {
//       setShowListingsError(false);
//       const res = await fetch(`/api/user/listings/${currentUser._id}`); // ✅ Fixed missing '/'
//       const data = await res.json();

//       if (!res.ok) {
//         setShowListingsError(true);
//         return;
//       }

//       setUserListings(data); // ✅ Store listings data
//     } catch (error) {
//       setShowListingsError(true);
//     }
//   };

//   const handleDeleteListing = async (listingId) => {
//     try {
//       const res = await fetch(`/api/listing/delete/${listingId}`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//       });

//       const data = await res.json(); // Correctly parse JSON
//       if (!res.ok) {
//         console.log("Error:", data.message);
//         return;
//       }

//       // ✅ Update UI by filtering out the deleted listing
//       setUserListings((prev) => prev.filter((listing) => listing._id !== listingId));
//     } catch (error) {
//       console.error("Delete Error:", error);
//     }
//   };

//   const handleUpdateListing = async (listingId, updatedData) => {
//     try {
//       const res = await fetch(`/api/listing/update/${listingId}`, {
//         method: "POST", // OR "PUT" (preferred)
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedData),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         // console.log("Error:", data.message);
//         return;
//       }

//       console.log("Listing updated successfully:", data.updatedListing);
//     } catch (error) {
//       console.error("Update Error:", error);
//     }
//   };




//   return (
//     <div className="p-3 max-w-lg mx-auto">
//       <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
//       <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//         {/* <input
//         onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
//          type="file" ref={fileRef} hidden accept="image/*" />
//         <img
//           onClick={() => fileRef.current.click() }
//           className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
//           src={currentUser.avatar}
//           alt="profile"
//         />

// <input
//    type="file"
//    accept="image/*"
//    onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
// />
// {formData.image && (
//    <img src={URL.createObjectURL(formData.image)} alt="Preview" className="w-32 h-32 object-cover mt-3" />
// )} */}

//         <input
//           type="file"
//           ref={fileRef}
//           hidden
//           accept="image/*"
//           onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
//         />
//         <img
//           onClick={() => fileRef.current.click()}
//           className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
//           src={formData.image ? URL.createObjectURL(formData.image) : currentUser.avatar}
//           alt="profile"
//         />


//         <input
//           defaultValue={currentUser.username}
//           type="text"
//           id="username"
//           placeholder="Username"
//           className="border p-3 rounded-lg"
//           onChange={handleChange}
//         />
//         <input
//           defaultValue={currentUser.email}
//           type="email"
//           id="email"
//           placeholder="Email"
//           className="border p-3 rounded-lg"
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           id="password"
//           placeholder="Password"
//           className="border p-3 rounded-lg"
//           onChange={handleChange}
//         />
//         <button
//           disabled={loading}
//           type="submit"
//           className="bg-slate-700 text-white p-3 uppercase rounded-lg hover:opacity-95 disabled:opacity-80 pointer-cursor"
//         >
//           {loading ? 'Loading...' : 'Update'}
//         </button>
//         <Link className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95' to={"/create-listing"}>
//           Create Listing
//         </Link>
//       </form>
//       <div className="flex justify-between mt-5">
//         <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete account</span>
//         <span onClick={handleChangeOut} className="text-red-700 cursor-pointer">Sign Out</span>
//       </div>
//       <p className='text-red-700'>{error ? error : ''}</p>
//       <p className='text-green-700'>{updateSuccess ? 'User is updated succesfully' : ''}</p>

//       <button onClick={handleShowListitngs} className='text-green-700 w-full'>Show Listings</button>

//       <p className='text-red-700 mt-5'>{showListingsError ? 'Error showing in listing' : ""}</p>
//       {userListings && userListings.length > 0 &&

//         <div className='flex flex-col gap-4'>
//           <h1 className='text-center mt-7 text-3xl font-semibold'>Your listings</h1>
//           {userListings.map((listing) => (
//             <div key={listing._id} className=' rounded-lg p-3 flex justify-between items-center gap-4'>
//               <Link to={`/listing/${listing._id}`}>
//                 <img src={listing.p_imgs} alt="listing cover" className="h-16 w-16 object-contain rounded-lg" />
//               </Link>
//               <Link className='truncate flex-1 font-semibold hover:underline' to={`/listing/${listing._id}`}>
//                 <p className=''>{listing.p_name}</p>
//               </Link>

//               <div className='flex flex-col items-center'>
//                 <button onClick={()=>handleDeleteListing(listing._id)} className='text-red-700 uppercase'>Delete</button>
//                 <Link to={`/update-listing/${listing._id}`}>
//                 <button className='text-green-700 uppercase'>Edit</button>
//                 </Link>
//               </div>

//             </div>
//           ))}

//         </div>}


//     </div>
//   );
// };

// export default Profile;













// import React, { useState, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   updateUserFailure,
//   updateUserSuccess,
//   updateUserStart,
//   deleteUserFailure,
//   deleteUserSuccess,
//   deleteUserstart,
//   signOutUserstart,
//   signOutUserFailure,
//   signOutUserSuccess,
// } from "../redux/user/userSlice";
// import { Link } from "react-router-dom";
// import ProfileHeader from "../components/ProfileHeader"
// import UserListings from "../components/UserListings"
// import ActionButtons from "../components/ActionButtons"
// import ProfileForm from "../components/ProfileForm"

// const Profile = () => {
//   const [formData, setFormData] = useState({});
//   const { currentUser, loading, error } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const fileRef = useRef(null);
//   const [updateSuccess, setUpdateSuccess] = useState(false);
//   const [showListingsError, setShowListingsError] = useState(false);
//   const [userListings, setUserListings] = useState([]);

//   // Handle text input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   // Helper function to upload a single image (for updating profile avatar)
//   const handleImageUpload = async (file) => {
//     const imgForm = new FormData();
//     imgForm.append("image", file);
//     try {
//       const res = await fetch("/api/upload", {
//         method: "POST",
//         body: imgForm,
//       });
//       const data = await res.json();
//       if (data.success) {
//         return data.imageUrl; // Cloudinary image URL
//       }
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   };

//   // Submit handler for updating user profile
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(updateUserStart());

//       let imageUrl = currentUser.avatar; // Use existing avatar by default
//       if (formData.image) {
//         imageUrl = await handleImageUpload(formData.image);
//       }

//       const updatedData = { ...formData, avatar: imageUrl };
//       const res = await fetch(`/api/user/update/${currentUser._id}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedData),
//       });

//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(updateUserFailure(data.message));
//         return;
//       }

//       dispatch(updateUserSuccess(data));
//       setUpdateSuccess(true);
//     } catch (error) {
//       dispatch(updateUserFailure(error.message));
//     }
//   };

//   // Delete user account
//   const handleDeleteUser = async () => {
//     try {
//       dispatch(deleteUserstart());
//       const res = await fetch(`/api/user/delete/${currentUser._id}`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(deleteUserFailure(data.message));
//         return;
//       }
//       dispatch(deleteUserSuccess(data));
//     } catch (error) {
//       dispatch(deleteUserFailure(error.message));
//     }
//   };

//   // Sign out user
//   const handleChangeOut = async () => {
//     try {
//       dispatch(signOutUserstart());
//       const res = await fetch("api/auth/signout");
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(signOutUserFailure(data.message));
//         return;
//       }
//       dispatch(signOutUserSuccess(data));
//     } catch (error) {
//       dispatch(signOutUserFailure(error.message));
//     }
//   };

//   // Fetch user's listings from the backend (Only for Sellers)
//   const handleShowListitngs = async () => {
//     if (currentUser.role !== "seller") return;
//     try {
//       setShowListingsError(false);
//       const res = await fetch(`/api/user/listings/${currentUser._id}`);
//       const data = await res.json();
//       if (!res.ok) {
//         setShowListingsError(true);
//         return;
//       }
//       setUserListings(data);
//     }
//     catch (error) {
//       setShowListingsError(true);
//     }
//   };



//   return (
//     <div className="p-3 max-w-lg mx-auto">
//       <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
//       <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//         <input
//           type="file"
//           ref={fileRef}
//           hidden
//           accept="image/*"
//           onChange={(e) =>
//             setFormData({ ...formData, image: e.target.files[0] })
//           }
//         />
//         <img
//           onClick={() => fileRef.current.click()}
//           className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
//           src={
//             formData.image
//               ? URL.createObjectURL(formData.image)
//               : currentUser.avatar
//           }
//           alt="profile"
//         />
//         <input
//           defaultValue={currentUser.username}
//           type="text"
//           id="username"
//           placeholder="Username"
//           className="border p-3 rounded-lg"
//           onChange={handleChange}
//         />
//         <input
//           defaultValue={currentUser.email}
//           type="email"
//           id="email"
//           placeholder="Email"
//           className="border p-3 rounded-lg"
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           id="password"
//           placeholder="Password"
//           className="border p-3 rounded-lg"
//           onChange={handleChange}
//         />
//         <button
//           disabled={loading}
//           type="submit"
//           className="bg-slate-700 text-white p-3 uppercase rounded-lg hover:opacity-95 disabled:opacity-80"
//         >
//           {loading ? "Loading..." : "Update"}
//         </button>
//         {currentUser && currentUser.role?.toLowerCase() === "seller" && (
//           <Link
//             className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
//             to={"/create-listing"}
//           >
//             Create Listing
//           </Link>
//         )}

//       </form>
//       <div className="flex justify-between mt-5">
//         <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">
//           Delete account
//         </span>
//         <span onClick={handleChangeOut} className="text-red-700 cursor-pointer">
//           Sign Out
//         </span>
//       </div>
//       <p className="text-red-700">{error || ""}</p>
//       <p className="text-green-700">
//         {updateSuccess ? "User is updated successfully" : ""}
//       </p>
//       {currentUser && currentUser.role?.toLowerCase() === "seller" && (
//         <button onClick={handleShowListitngs} className='text-green-700 w-full'>Show Listings</button>

//       )}


//       <p className='text-red-700 mt-5'>{showListingsError ? 'Error showing in listing' : ""}</p>
//       {userListings && userListings.length > 0 &&

//         <div className='flex flex-col gap-4'>
//           <h1 className='text-center mt-7 text-3xl font-semibold'>Your listings</h1>
//           {userListings.map((listing) => (
//             <div key={listing._id} className=' rounded-lg p-3 flex justify-between items-center gap-4'>
//               <Link to={`/listing/${listing._id}`}>
//                 <img src={listing.p_imgs} alt="listing cover" className="h-16 w-16 object-contain rounded-lg" />
//               </Link>
//               <Link className='truncate flex-1 font-semibold hover:underline' to={`/listing/${listing._id}`}>
//                 <p className=''>{listing.p_name}</p>
//               </Link>

//               <div className='flex flex-col items-center'>
//                 <button onClick={() => handleDeleteListing(listing._id)} className='text-red-700 uppercase'>Delete</button>
//                 <Link to={`/update-listing/${listing._id}`}>
//                   <button className='text-green-700 uppercase'>Edit</button>
//                 </Link>
//               </div>

//             </div>
//           ))}

//         </div>}

//     </div>

//   );
// };

// export default Profile;



// import React, { useState, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   updateUserFailure,
//   updateUserSuccess,
//   updateUserStart,
//   deleteUserFailure,
//   deleteUserSuccess,
//   deleteUserstart,
//   signOutUserstart,
//   signOutUserFailure,
//   signOutUserSuccess,
// } from "../redux/user/userSlice";
// import { Link } from "react-router-dom";
// import UserListings from "../components/UserListings"

// //   const [updateSuccess, setUpdateSuccess] = useState(false);
// import MenuButton from "../components/MenuButton";
// import Sidebar from "../components/SideBar";

// import { User, Settings, FileText, Package, LogOut, PlusSquare , Delete  } from "lucide-react";
// import MainLayout from "../components/MainLayout";


// const Profile = () => {
//   const [formData, setFormData] = useState({});
//   const { currentUser, loading, error } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const fileRef = useRef(null);
//   const [updateSuccess, setUpdateSuccess] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);


//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

// const handleImageUpload = async (file) => {
//   const imgForm = new FormData();
//   imgForm.append("image", file);
//   try {
//     const res = await fetch("/api/upload", {
//       method: "POST",
//       body: imgForm,
//     });
//     const data = await res.json();
//     if (data.success) {
//       return data.imageUrl;
//     }
//   } catch (error) {
//     console.error("Error uploading image:", error);
//   }
// };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     dispatch(updateUserStart());
//     let imageUrl = currentUser.avatar;
//     if (formData.image) {
//       imageUrl = await handleImageUpload(formData.image);
//     }
//     const updatedData = { ...formData, avatar: imageUrl };
//     try {
//       const res = await fetch(`/api/user/update/${currentUser._id}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedData),
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(updateUserFailure(data.message));
//         return;
//       }
//       dispatch(updateUserSuccess(data));
//       setUpdateSuccess(true);
//     } catch (error) {
//       dispatch(updateUserFailure(error.message));
//     }
//   };
//     // Delete user account
//   const handleDeleteUser = async () => {
//     try {
//       dispatch(deleteUserstart());
//       const res = await fetch(`/api/user/delete/${currentUser._id}`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(deleteUserFailure(data.message));
//         return;
//       }
//       dispatch(deleteUserSuccess(data));
//     } catch (error) {
//       dispatch(deleteUserFailure(error.message));
//     }
//   };
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };



//   return (

// <MainLayout>
// {/* <div className="">
//      <div className="flex min-h-screen">
//       {isSidebarOpen && <Sidebar currentUser={currentUser} />}
//       <div className="flex-1 bg-gray-100">
//         <MenuButton onClick={toggleSidebar} />
//         <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
//       <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//         <input
//           type="file"
//           ref={fileRef}
//           hidden
//           accept="image/*"
//           onChange={(e) =>
//             setFormData({ ...formData, image: e.target.files[0] })
//           }
//         />
//         <img
//           onClick={() => fileRef.current.click()}
//           className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
//           src={
//             formData.image
//               ? URL.createObjectURL(formData.image)
//               : currentUser.avatar
//           }
//           alt="profile"
//         />
//         <input
//           defaultValue={currentUser.username}
//           type="text"
//           id="username"
//           placeholder="Username"
//           className="border p-3 rounded-lg"
//           onChange={handleChange}
//         />
//         <input
//           defaultValue={currentUser.email}
//           type="email"
//           id="email"
//           placeholder="Email"
//           className="border p-3 rounded-lg"
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           id="password"
//           placeholder="Password"
//           className="border p-3 rounded-lg"
//           onChange={handleChange}
//         />
//         <button
//           disabled={loading}
//           type="submit"
//           className="bg-slate-700 text-white p-3 uppercase rounded-lg hover:opacity-95 disabled:opacity-80"
//         >
//           {loading ? "Loading..." : "Update"}
//         </button>
//         {currentUser && currentUser.role?.toLowerCase() === "seller" && (
//           <Link
//             className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
//             to={"/create-listing"}
//           >
//             Create Listing
//           </Link>
//         )}

//       </form>
//       </div>
//      </div>
//      hloo

// </div> */}
// </MainLayout>



//   );
// };

// export default Profile;









// import React, { useState, useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateUserFailure, updateUserSuccess, updateUserStart, deleteUserFailure, deleteUserSuccess, deleteUserstart, signOutUserstart, signOutUserFailure, signOutUserSuccess } from '../redux/user/userSlice';
// import { Link } from 'react-router-dom';
// import MainLayout from '../components/MainLayout';
// import { Mail, Phone, User, Info, Edit3, Save, X } from 'lucide-react';

// const ProfilePage = () => {
//     const [formData, setFormData] = useState({});
//     const { currentUser, loading, error } = useSelector((state) => state.user);
//     const dispatch = useDispatch();
//     const fileRef = useRef(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [updateSuccess, setUpdateSuccess] = useState(false);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleImageUpload = async (file) => {
//         const imgForm = new FormData();
//         imgForm.append("image", file);
//         try {
//             const res = await fetch("/api/upload", {
//                 method: "POST",
//                 body: imgForm,
//             });
//             const data = await res.json();
//             if (data.success) {
//                 return data.imageUrl;
//             }
//         } catch (error) {
//             console.error("Error uploading image:", error);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             dispatch(updateUserStart());

//             let imageUrl = currentUser.avatar;
//             if (formData.image) {
//                 imageUrl = await handleImageUpload(formData.image);
//             }

//             const updatedData = { ...formData, avatar: imageUrl };
//             const res = await fetch(`/api/user/update/${currentUser._id}`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(updatedData),
//             });

//             const data = await res.json();
//             if (data.success === false) {
//                 dispatch(updateUserFailure(data.message));
//                 return;
//             }

//             dispatch(updateUserSuccess(data));
//             setUpdateSuccess(true);
//         } catch (error) {
//             dispatch(updateUserFailure(error.message));
//         }
//     };

//     const handleEditToggle = () => {
//         setIsEditing(!isEditing);
//     };

//     return (
//         <MainLayout>
//             <div className='p-5 max-w-4xl mx-auto'>
//                 <h1 className="text-4xl font-extrabold mb-6 text-gray-700">Vendor Profile</h1>
//                 <div className="p-8 mx-auto shadow-lg rounded-xl">
//                     <div className="flex items-center justify-center gap-6 p-4 rounded-xl">
//                         <div className="flex-shrink-0">
//                             <img className="h-44 w-44 rounded-full object-cover border-4 border-gray-300" src={formData.image ? URL.createObjectURL(formData.image) : currentUser.avatar} alt="Profile" onClick={() => fileRef.current.click()} />
//                             <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} />
//                         </div>
//                         <div className="p-4">
//                             {isEditing ? (
//                                 <>
//                                     <input className="block mb-2 px-3 py-2 border rounded" name="username" value={formData.username || currentUser.username} onChange={handleChange} />
//                                     <input className="block mb-2 px-3 py-2 border rounded" name="email" value={formData.email || currentUser.email} onChange={handleChange} />
//                                     <button className="mt-3 bg-green-500 text-white font-bold py-2 px-5 rounded-full hover:bg-green-600" onClick={handleSubmit}><Save className="inline-block mr-1" /> Save</button>
//                                     <button className="mt-3 bg-red-500 text-white font-bold py-2 px-5 rounded-full hover:bg-red-600 ml-2" onClick={handleEditToggle}><X className="inline-block mr-1" /> Cancel</button>
//                                 </>
//                             ) : (
//                                 <>
//                                     <h2 className="text-3xl font-semibold text-gray-700">{currentUser.username}</h2>
//                                     <p className="text-gray-600">{currentUser.email}</p>
//                                     <button className="mt-3 bg-blue-600 text-white font-bold py-2 px-5 rounded-full hover:bg-blue-700" onClick={handleEditToggle}><Edit3 className="inline-block mr-1" /> Edit</button>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                     <p className='text-red-700'>{error || ""}</p>
//                     <p className='text-green-700'>{updateSuccess ? "User is updated successfully" : ""}</p>
//                 </div>
//             </div>
//         </MainLayout>
//     );
// };

// export default ProfilePage;





import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserFailure, updateUserSuccess, updateUserStart } from '../redux/user/userSlice';
import { Link } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import { Mail, Phone, User, Info, Edit3, Save, X } from 'lucide-react';

const ProfilePage = () => {
    const [formData, setFormData] = useState({});
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (file) => {
        const imgForm = new FormData();
        imgForm.append("image", file);
        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: imgForm,
            });
            const data = await res.json();
            if (data.success) {
                return data.imageUrl;
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart());

            let imageUrl = currentUser.avatar;
            if (formData.image) {
                imageUrl = await handleImageUpload(formData.image);
            }

            const updatedData = { ...formData, avatar: imageUrl };
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });

            const data = await res.json();
            if (data.success === false) {
                dispatch(updateUserFailure(data.message));
                return;
            }

            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true);
        } catch (error) {
            dispatch(updateUserFailure(error.message));
        }
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    return (
        <MainLayout>
            <div className='p-5 max-w-5xl mx-auto'>
                <div className="flex items-center gap-3  pb-4 mb-10">
                    <div className="bg-[#0056B3] text-white p-2 rounded-full shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.797.755 6.879 2.043M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-extrabold text-[#0056B3]">Vendor Profile</h2>
                </div>

                <div className="p-8 mx-auto shadow-lg rounded-xl">
                    <div className="flex items-center justify-center gap-6 p-4 rounded-xl">
                        <div className="flex-shrink-0">
                            <img className="h-44 w-44 rounded-full object-cover border-4 border-gray-300" src={formData.image ? URL.createObjectURL(formData.image) : currentUser.avatar} alt="Profile" onClick={() => fileRef.current.click()} />

                            <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} />

                        </div>
                        <div className="p-4">
                            {isEditing ? (
                                <>
                                    <input className="block mb-2 px-3 py-2 border rounded" name="username" value={formData.username || currentUser.username} onChange={handleChange} />
                                    <input className="block mb-2 px-3 py-2 border rounded" name="userlastname" value={formData.userlastname || currentUser.userlastname} onChange={handleChange} />
                                    <input className="block mb-2 px-3 py-2 border rounded" name="email" value={formData.email || currentUser.email} onChange={handleChange} />
                                    <textarea className="block mb-2 px-3 py-2 border rounded" name="description" placeholder="Add description" value={formData.description || currentUser.description} onChange={handleChange}></textarea>
                                    <button className="mt-3 bg-green-500 text-white font-bold py-2 px-5 rounded-full hover:bg-green-600" onClick={handleSubmit}><Save className="inline-block mr-1" /> Save</button>
                                    <button className="mt-3 bg-red-500 text-white font-bold py-2 px-5 rounded-full hover:bg-red-600 ml-2" onClick={handleEditToggle}><X className="inline-block mr-1" /> Cancel</button>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-3xl font-semibold text-gray-700">{currentUser.username} {currentUser.userlastname}</h2>
                                    <p className="text-gray-600"></p>
                                    <p className="text-gray-600">{currentUser.email}</p>

                                    <p className='text-gray-500 italic mt-2'>{currentUser.description || "No description available."}</p>
                                    <button className="mt-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold  shadow-lg transition duration-300 ease-in-out hover:shadow-[0_0_25px_#4A90E2,0_0_50px_#1A237E] hover:scale-105 py-2 px-5 rounded-full " onClick={handleEditToggle}><Edit3 className="inline-block mr-1 " /> Edit</button>
                                </>
                            )}
                        </div>
                    </div>
                    <p className='text-red-700'>{error || ""}</p>
                    <p className='text-green-700'>{updateSuccess ? "User is updated successfully" : ""}</p>
                    <div className="grid grid-cols-1 gap-2 bg-gradient-to-r from-blue-50 to-silver-50 p-8 rounded-lg shadow-inner text-gray-700 mt-4">
                        <p className="flex items-center gap-2 text-left">
                            <User className="w-5 h-5 text-blue-700" />
                            <strong>First Name:</strong> {currentUser.username}
                        </p>
                        <p className="flex items-center gap-2 text-left">
                            <User className="w-5 h-5 text-blue-700" />
                            <strong>Last Name:</strong> {currentUser.userlastname}
                        </p>
                        <p className="flex items-center gap-2 text-left">
                            <Mail className="w-5 h-5 text-blue-700" />
                            <strong>Email:</strong> {currentUser.email}
                        </p>
                        <p className="flex items-center gap-2 text-left">
                            <Phone className="w-5 h-5 text-blue-700" />
                            <strong>Phone Number:</strong> {currentUser.phone}
                        </p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default ProfilePage;
