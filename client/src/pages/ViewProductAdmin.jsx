import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { updateUserFailure, updateUserSuccess, updateUserStart, deleteUserFailure, deleteUserSuccess, deleteUserstart, signOutUserstart, signOutUserFailure, signOutUserSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { data, Link } from 'react-router-dom';
import MainLayout from '../components/MainLayout';

const ViewProductAdmin = () => {
    const [formData, setFormData] = useState({});
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [showListingsError, setShowListingsError] = useState(false);
    const [userListings, setUserListings] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(null);

    useEffect(() => {
        const handleShowListings = async () => {
            try {
                setShowListingsError(false);
                const res = await fetch(`/api/user/listings/${currentUser._id}`);
                const data = await res.json();

                if (!res.ok) {
                    setShowListingsError(true);
                    return;
                }

                setUserListings(data);
            } catch (error) {
                setShowListingsError(true);
            }
        };

        handleShowListings();
    }, [currentUser._id]);

    const toggleDropdown = (id) => {
        setDropdownOpen((prev) => (prev === id ? null : id));
    };

    return (
        <MainLayout>
            <div className='p-5 max-w-5xl mx-auto'>
                <p className='text-red-700 mt-5'>{showListingsError ? 'Error showing listings' : ''}</p>
                <div className='flex justify-between items-center mb-6'>
                    <h1 className="text-4xl font-extrabold text-gray-700">Product</h1>
                    <Link to="/create-listing" className="px-7 py-3 w-40 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out hover:shadow-[0_0_15px_#4A90E2,0_0_50px_#1A237E] hover:scale-105">
                        Add Product
                    </Link>
                </div>

                {/* <h1 className="text-4xl font-extrabold mb-6 text-gray-700">Product</h1> */}
                {userListings && userListings.length > 0 && (
                    <div className='overflow-x-auto p-3 mx-auto shadow-lg rounded-xl'>

                        <table className='min-w-full '>
                            <thead className='bg-gray-100 text-justify'>
                                <tr>
                                    <th className='py-3 px-5 border-b border-gray-300 text-gray-800'>Product</th>
                                    <th className='py-3 px-5 border-b border-gray-300 text-gray-800'>Name</th>
                                    <th className='py-3 px-5 border-b border-gray-300 text-gray-800'>Price</th>
                                    <th className='py-3 px-5 border-b border-gray-300 text-gray-800'>Categories</th>
                                    <th className='py-3 px-5 border-b border-gray-300 text-gray-800'>Time</th>
                                    <th className='py-3 px-5 border-b border-gray-300 text-gray-800'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userListings.map((listing) => (
                                    <tr key={listing._id} className=''>
                                        <td className='py-3 px-5 border-b border-gray-300'>
                                            <img src={listing.p_imgs[0]} alt='Product' className='w-12 h-12 rounded-lg object-cover' />
                                        </td>
                                        <td className='py-3 px-5 border-b border-gray-300 text-gray-500 '>{listing.p_name}</td>
                                        <td className='py-3 px-5 border-b border-gray-300 text-gray-500'>${listing.p_price}</td>
                                        <td className='py-3 px-5 border-b border-gray-300 text-gray-500'>{listing.p_category}</td>
                                        <td className='py-3 px-5 border-b border-gray-300 text-gray-500'>{new Date(listing.createdAt).toLocaleString()}</td>
                                        <td className='py-3 px-5 border-b border-gray-300 relative'>
                                            <button className='flex items-center border border-blue-500 text-blue-600 px-3  rounded-full hover:bg-blue-50' onClick={() => toggleDropdown(listing._id)}>
                                                <span className='pr-2 py-1'>Info</span>
                                                <span className='border-l border-blue-600 pl-2 py-1 '>▼</span>
                                            </button>

                                            {dropdownOpen === listing._id && (
                                                <div className='p-4 absolute bg-white shadow-lg rounded-md mt-1 right-0 z-50'>
                                                    <Link to={`/profile/update-listing/${listing._id}`} className='block text-blue-700 px-3  hover:bg-gray-100'>Edit</Link>
                                                    <button className='text-red-700 px-3 py-1 hover:bg-gray-100 w-full' onClick={() => handleDeleteListing(listing._id)}>Delete</button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default ViewProductAdmin;
