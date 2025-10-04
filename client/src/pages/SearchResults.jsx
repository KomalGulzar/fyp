import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ListingCard from "../components/ListingCard"; // You may need to create this if not already

const SearchResults = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const [showMore, setShowMore] =  useState(false);

  // const searchParams = new URLSearchParams(location.search);
  // const searchQuery = searchParams.get("query");
  // console.log(listings)

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm')
    // if (!searchTermFromUrl) {
    //   setListings([]); // Clear listings if no search term
    //   return;
    // }
    const fetchListings = async () => {
      // try {
      //   const res = await fetch(`/api/listing/get?search=${searchQuery}`);
      //   const data = await res.json();
      //   if (data.success === false) {
      //     setError(data.message || "No results found");
      //   } else {
      //     setListings(data);
      //   }
      // } catch (err) {
      //   setError("Error fetching search results");
      // } finally {
      //   setLoading(false);
      // }
 
      const searchQuery = urlParams.get("searchTerm"); // Get the correct search term
      const res = await fetch(`/api/listing/get?search=${searchQuery}`);
      const data = await res.json();
      if(data.length > 8){
        setShowMore(true);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
   
  const ShowMoreClick = async ()=>{
    const numberOfListing = listings.length;
    const setIndex = numberOfListing;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('setIndex', setIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?search=${searchQuery}`);
    const data = await res.json();
    if(data.length<9){
      setShowMore(false);

    }
    setListings([...listings, ...data]);
  }


  return (
    <div className="max-w-6xl mx-auto py-6">
      {/* <h2 className="text-2xl font-bold mb-4">Search Results for "{searchQuery}"</h2> */}
      {listings.length === 0 ? (
        <p className="text-gray-500">No listings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
          {showMore && (
            <button className="text-green hover:underline text-lg" onClick={()=>{ShowMoreClick}}
            >Show More</button>
          )}
        </div>
      )}
      {/* <div className="flex-1">
        <h1 className="text-3xl font-semibold  p-3 text-slate-700 mt-5">Listing result: </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && 
            (<p>No Listing found!</p>)
          }
          {loading && (<p className="text-xl text-slate-700 text-center w-full">Loading...</p>)}

          {
            !loading &&  listings && listings.map((listing)=>{
              <ListingCard key={listing._id} listing={listing}/>
            })
          }
        </div>
      </div> */}
    </div>
  );
};

export default SearchResults;
