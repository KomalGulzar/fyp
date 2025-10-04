// import React from 'react'
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";


const UserListings = () => {
    const [formData, setFormData] = useState({});
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

    const handleShowListitngs = async () => {
            if (currentUser.role !== "seller") return;
            try {
              setShowListingsError(false);
              const res = await fetch(`/api/user/listings/${currentUser._id}`);
              const data = await res.json();
              if (!res.ok) {
                setShowListingsError(true);
                return;
              }
              setUserListings(data);
            }
            catch (error) {
              setShowListingsError(true);
            }
          };
        
  return (
    <div>
       
        <h1 className='text-center mt-7 text-3xl font-semibold'>Your listings</h1>
        {userListings && userListings.length > 0 &&

        <div className='flex flex-col gap-4'>
          {userListings.map((listing) => (
            <div key={listing._id} className=' rounded-lg p-3 flex justify-between items-center gap-4'>
              <Link to={`/listing/${listing._id}`}>
                <img src={listing.p_imgs} alt="listing cover" className="h-16 w-16 object-contain rounded-lg" />
              </Link>
              <Link className='truncate flex-1 font-semibold hover:underline' to={`/listing/${listing._id}`}>
                <p className=''>{listing.p_name}</p>
              </Link>

              <div className='flex flex-col items-center'>
                <button onClick={() => handleDeleteListing(listing._id)} className='text-red-700 uppercase'>Delete</button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-green-700 uppercase'>Edit</button>
                </Link>
              </div>

            </div>
          ))}

        </div>}
    </div>
  )
}

export default UserListings
