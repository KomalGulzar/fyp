import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom"; // useNavigate is not directly used for rendering
import mc4 from "../assets/contact.png";

const Contact = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [sellerEmail, setSellerEmail] = useState("");
  const [listing, setListing] = useState(null);
  const [loadingListing, setLoadingListing] = useState(true);

  const { listingId } = useParams();
  const location = useLocation();

  // Effect to get listing from location state or fetch it
  useEffect(() => {
    const fetchListingData = async () => {
      setLoadingListing(true);
      let fetchedListing = null;

      if (location.state && location.state.listing) {
        // Option 1: Listing data found in navigation state
        fetchedListing = location.state.listing;
        setListing(fetchedListing);
      } else {
        // Option 2: Fallback - Fetch listing data if not in state (e.g., direct access or refresh)
        try {
          const res = await fetch(`/api/listing/get/${listingId}`);
          const data = await res.json();
          if (data.success === false) {
            setError(data.message || "Error fetching listing data for contact.");
          } else {
            fetchedListing = data;
            setListing(fetchedListing);
          }
        } catch (err) {
          setError("Error fetching listing data.");
        }
      }
      setLoadingListing(false);
    };
    fetchListingData();
  }, [location.state, listingId]); // Depend on location.state and listingId

  // Effect to set seller email once listing is available
  useEffect(() => {
    if (listing?.userRef?.email) {
      setSellerEmail(listing.userRef.email);
    } else if (listing && !listing.userRef?.email) {
        // If listing is loaded but userRef or email is missing
        setError("Seller email information is missing in the listing.");
        setSellerEmail("Unknown Email");
    }
  }, [listing]); // Depend on listing

  const handleSendInquiry = async () => {
    // Clear any previous error/success messages
    setError(null);
    setSuccess(null);

    // --- Input Validation ---
    if (!currentUser?.email) {
        setError("Your email address is required. Please log in.");
        return;
    }
    if (!message.trim()) {
      setError("Please type a message before sending your inquiry.");
      return;
    }
    if (!sellerEmail || sellerEmail === "Unknown Email") {
      setError("Seller email information is unavailable. Cannot send inquiry.");
      return;
    }
    if (!listing?._id) {
        setError("Listing information is missing. Cannot send inquiry.");
        return;
    }

    try {
      const res = await fetch("/api/inquiries/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerId: currentUser?._id,
          buyerUsername: currentUser?.username,
          buyerEmail: currentUser?.email,
          sellerEmail,
          message,
          productId: listing._id,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Inquiry sent successfully! The seller will be in touch soon.");
        setMessage(""); // Clear message field on success
      } else {
        // Backend error response
        setError(data.error || "Failed to send inquiry. Please try again.");
      }
    } catch (err) {
      // Network or unexpected error
      console.error("Fetch error:", err);
      setError("Something went wrong while sending your inquiry. Please check your connection and try again.");
    }
  };

  // --- Loading and Error States for Initial Data Fetch ---
  if (loadingListing) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading contact information...</p>
      </div>
    );
  }

  if (error && !listing) { // Show general error if listing couldn't be loaded at all
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <p className="text-red-600 text-lg">Error: {error}</p>
        </div>
    );
  }

  // If listing is null after loading and no specific error, it implies data issues
  if (!listing) {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <p className="text-red-600 text-lg">Error: Could not load listing details for contact. Please go back and try again.</p>
        </div>
    );
  }

  // --- Main Contact Form UI ---
  return (
    <div className="min-h-screen  flex items-center justify-center p-6 sm:p-10">
      <div className="bg-white shadow-xl  flex flex-col md:flex-row max-w-6xl w-full overflow-hidden">

        {/* Left Section: Image (Heavy Machinery related) */}
        <div
          className="md:w-1/2 bg-cover bg-center h-64 md:h-auto"
          // Using a high-quality Unsplash image for a professional look
          style={{ backgroundImage: `url(${mc4})` }}
        >
          {/* Optional: Add a subtle overlay for text readability if needed */}
          {/* <div className="absolute inset-0 bg-black opacity-20"></div> */}
        </div>

        {/* Right Section: Contact Form */}
        <div className="md:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[#333333] mb-6 border-b-2 border-[#C0C0C0] pb-2">Contact Form</h2>
          <p className="text-gray-700 mb-6">Have questions about our heavy machinery? Fill out the form below and we'll get back to you shortly regarding **{listing.p_name}**.</p>

          <div className="mb-4">
            <label htmlFor="yourEmail" className="block text-gray-700 text-sm font-semibold mb-2">Your Email:</label>
            <input
              type="email"
              id="yourEmail"
              value={currentUser?.email || ""}
              disabled
              className="w-full p-3 border border-[#C0C0C0] rounded-md bg-gray-100 text-gray-600 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="sellerEmail" className="block text-gray-700 text-sm font-semibold mb-2">Seller Email:</label>
            <input
              type="email"
              id="sellerEmail"
              value={sellerEmail}
              disabled
              className="w-full p-3 border border-[#C0C0C0] rounded-md bg-gray-100 text-gray-600 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 text-sm font-semibold mb-2">Your Message:</label>
            <textarea
              id="message"
              rows="5"
              placeholder="I'm interested in this heavy machinery and would like to know more about..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 border border-[#C0C0C0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0056B3] focus:border-transparent resize-y"
            ></textarea>
          </div>

          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
          {success && <p className="text-green-600 mb-4 text-sm">{success}</p>}

          <button
            onClick={handleSendInquiry}
            // Button is disabled if any critical info is missing or message is empty
            disabled={!currentUser?.email || !sellerEmail || sellerEmail === "Unknown Email" || !listing?._id || !message.trim()}
            className="px-8 py-4 w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold  shadow-lg transition duration-300 ease-in-out hover:shadow-[0_0_25px_#4A90E2,0_0_50px_#1A237E] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send Inquiry
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;