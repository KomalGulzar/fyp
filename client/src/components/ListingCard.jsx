import React from "react";
import { Link } from "react-router-dom";

const ListingCard = ({ listing }) => {
  return (
    <Link
      to={`/listing/${listing._id}`}
      className="bg-white shadow-md rounded-lg flex flex-col md:flex-row items-center gap-6 p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
    >
      {/* Product Image */}
      <div className="w-[200px] h-[150px] flex-shrink-0">
        <img
          src={listing.p_imgs[0]}
          alt="listing cover"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-gray-800">{listing.p_name}</h2>
        <p className="text-gray-600 text-sm mt-2">{listing.p_desc}</p>
        <p className="text-pink-500 font-bold mt-2">Price: ${listing.p_price}/Piece</p>
        <p className="text-gray-700 font-medium">Min. Order: {listing.p_min_order} Piece</p>
      </div>

      {/* Contact Button (Still Clickable) */}
      {/* <button className="bg-black hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium pointer-events-none">
        Show Details
      </button> */}
    </Link>
  );
};

export default ListingCard;
