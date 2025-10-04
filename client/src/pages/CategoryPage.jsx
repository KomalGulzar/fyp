import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchListings();
  }, [categoryName]);

  const fetchListings = async () => {
    // console.log("Fetching listings for:", categoryName);
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/listing/category/${categoryName}`);

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setListings(data);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Failed to load listings. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Products in {categoryName}</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && listings.length === 0 && (
        <p>No listings found in this category.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listings.map((listing) => (
          <div
            key={listing._id}
            onClick={() => navigate(`/listing/${listing._id}`)}
            className="bg-white border border-gray-300  shadow-md transition duration-300 ease-in-out cursor-pointer overflow-hidden transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-200"
          >
            <img
              src={listing.p_imgs[0]}
              alt="listing cover"
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 truncate">{listing.p_name}</h2>
              <p className="text-sm text-gray-600 mt-1 truncate">{listing.p_description}</p>
              <p className="text-sm text-gray-500 mt-1">Category: {listing.p_category}</p>
              <div className="mt-3 display-center">
              <button className="bg-blue-600 text-white py-2 w-full rounded-lg hover:bg-blue-700 shadow-md hover:shadow-xl transition-transform transform hover:scale-105 ease-in-out text-lg font-medium">
                  Contact Supplier
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
