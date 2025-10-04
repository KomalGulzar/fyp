// import { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'

// const Listing = () => {
//     const params = useParams();
//     const [listing, setListing] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(false)

//     useEffect(() => {
//         const fetchListing = async () => {
//             try {
//                 setLoading(false)
//                 const res = await fetch(`/api/listing/get/${params.listingId}`);
//                 const data = await res.json();
//                 if (data.success === false) {
//                     setError(true);
//                     setLoading(false);
//                     return;
//                 }
//                 setListing(data);
//             } catch (error) {
//                 setError(true);
//                 setLoading(false);
//             }
//         };
//         fetchListing();
//     }, []); // Add dependency to avoid infinite re-renders
    

//     return (
//         <div>
//             {listing && listing.p_name}
//         </div>
//     )
// }

// export default Listing


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// Remove the direct import of Contact component if it's going to be a separate route
// import Contact from "../components/Contact";
import { Link } from 'react-router-dom';

const Listing = () => {
  const { listingId } = useParams();
  const navigate = useNavigate();
  // No longer need contact state here if you're navigating
  // const [contact, setContact] = useState(false);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const token = currentUser?.token;

  const [isInWishlist, setIsInWishlist] = useState(false); // Track if the product is in the wishlist

  // Fetch listing data
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(data.message || "Error fetching listing");
        } else {
          setListing(data);
        }
      } catch (err) {
        setError("Error fetching listing");
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [listingId]);

  // Automatic Slider Effect
  useEffect(() => {
    if (listing?.p_imgs?.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === listing.p_imgs.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000); // Change image every 3 seconds
      return () => clearInterval(interval);
    }
  }, [listing]);

  // Check if the product is in the user's wishlist
  useEffect(() => {
    if (currentUser) {
      const checkWishlistStatus = async () => {
        try {
          const res = await fetch('/api/wishlist/get', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await res.json();
          const isInList = data.some((product) => product._id === listing._id);
          setIsInWishlist(isInList);
        } catch (err) {
          console.error('Error fetching wishlist:', err);
        }
      };
      checkWishlistStatus();
    }
  }, [currentUser, listing?._id, token]); // Added token to dependency array

  // Handle Add to Wishlist
  const handleAddToWishlist = async () => {
    try {
      const res = await fetch('/api/wishlist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: listing._id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to add to wishlist');
      setIsInWishlist(true);
      alert(data.message);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // Handle Remove from Wishlist
  const handleRemoveFromWishlist = async () => {
    try {
      const res = await fetch('/api/wishlist/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: listing._id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to remove from wishlist');
      setIsInWishlist(false);
      alert(data.message);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // **New Contact Handler**
  const handleContactSeller = () => {
    navigate(`/contact/${listingId}`, { state: { listing } });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-600 text-lg">Error: {error || "Listing not found"}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen  p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section - Image Slider */}
        <div className="md:col-span-2 bg-white shadow-lg p-4">
          <div className="relative w-full h-[400px] overflow-hidden">
            {listing.p_imgs && listing.p_imgs.length > 0 ? (
              <img
                src={listing.p_imgs[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <p className="text-gray-500">No Images Available</p>
              </div>
            )}
          </div>
          {/* Small Thumbnail Slider */}
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {listing.p_imgs?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-20 h-20 object-cover cursor-pointer rounded-md border-2 ${
                  currentIndex === index ? "border-indigo-500" : "border-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Right Section - Product Details */}
        <div className="bg-white shadow-lg  p-6">
          <h1 className="text-2xl font-bold text-gray-800">{listing.p_name}</h1>
          <p className="text-gray-600 text-lg mt-2">{listing.p_sdesc}</p>

          <div className="mt-4">
            <p className="text-lg font-semibold">Category: {listing.p_category}</p>
            <p className="text-lg font-semibold">Minimum Order: {listing.p_order}</p>
          </div>

          <div className="mt-4 text-2xl text-blue-600 font-bold">
            ${listing.p_price} Per piece
          </div>

          <p className="text-gray-600 mt-4">{listing.p_desc}</p>

          {/* Action Buttons */}
         <div className="mt-6 flex flex-wrap gap-4">
  {currentUser && listing.userRef !== currentUser._id && (
    <button
      onClick={handleContactSeller}
      className="
        flex-1 min-w-[150px]  text-white text-lg font-semibold rounded-lg shadow-lg
        bg-gradient-to-r from-blue-500 to-blue-700 /* Your consistent primary gradient */
        transition duration-300 ease-in-out
        hover:shadow-[0_0_25px_#4A90E2,0_0_50px_#1A237E] /* Your consistent glow effect */
        hover:scale-105 /* Your consistent scale effect */
      "
    >
      Contact Now
    </button>
  )}

  {currentUser && (
    <button
      onClick={isInWishlist ? handleRemoveFromWishlist : handleAddToWishlist}
      className={`
        flex-1 min-w-[150px]  py-2 text-lg font-semibold rounded-lg shadow-lg
        transition duration-300 ease-in-out
        hover:shadow-[0_0_25px_#4A90E2,0_0_50px_#1A237E] /* Your consistent glow effect */
        hover:scale-105 /* Your consistent scale effect */
        
        flex items-center justify-center gap-2
        
        ${
          isInWishlist
            ? "bg-gradient-to-r from-red-500 to-red-700 text-white" // Red gradient for 'Remove from Wishlist'
            : "bg-white text-[#0056B3] border border-[#0056B3] hover:border-none hover:text-red hover:bg-green" // White background, Deep Blue text & border for 'Add to Wishlist'
        }
      `}
    >
      {isInWishlist ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M11.645 20.917c-.183.13-.274.195-.357.25l-.134.095a.91.91 0 0 1-.781 0l-.134-.095c-.083-.055-.174-.12-.357-.25L9.5 20.246c-.054-.038-.105-.074-.154-.11C8.874 19.58 8.24 19.105 7.5 18.574c-1.011-.764-1.742-1.465-2.336-2.015a6.517 6.517 0 0 1-1.885-2.176c-.563-1.026-.91-2.185-.91-3.471 0-3.033 2.53-5.513 5.513-5.513 1.547 0 3.018.72 4.07 1.76.223.223.443.443.664.664a2.203 2.203 0 0 0 3.393 0c.221-.221.441-.441.664-.664 1.052-1.04 2.523-1.76 4.07-1.76 2.983 0 5.513 2.48 5.513 5.513 0 1.286-.347 2.445-.91 3.471a6.517 6.517 0 0 1-1.885 2.176c-.594.55-1.325 1.251-2.336 2.015-.049.036-.1.072-.154.11l-1.455 1.035Z" />
          </svg>
          Remove from Wishlist
        </>
      ) : (
        <>
         
          Add to Wishlist
        </>
      )}
    </button>
  )}
</div>
        </div>
      </div>

      {/* Related Products Section */}
      {/* <div className="max-w-7xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800">Our Trading Products</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
          {listing.relatedProducts?.map((product, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <p className="mt-2 text-gray-700 font-medium">{product.name}</p>
            </div>
          ))}
        </div>
      </div> */}
    </main>
  );
};

export default Listing;