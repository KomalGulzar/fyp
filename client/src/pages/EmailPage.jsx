import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const EmailPage = () => {
  const location = useLocation();
  const sellerEmail = location.state?.email || "Email not available";
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setError("Message cannot be empty");
      return;
    }

    try {
     fetch(`/api/listing/get/${listingId}`, {
  method: "GET",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: sellerEmail, message }),
});


      const data = await res.json();
      if (data.success) {
        setSuccess("Your message has been sent!");
        setError(null);
        setMessage("");
      } else {
        setError(data.message || "Failed to send email");
        setSuccess(null);
      }
    } catch (err) {
      setError("Error sending email");
      setSuccess(null);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4">Contact Seller</h2>
      <p className="mb-2">Email: <strong>{sellerEmail}</strong></p>

      {success && <p className="text-green-600">{success}</p>}
      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          className="w-full p-2 border rounded"
          rows="5"
          placeholder="Enter your requirements and message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="mt-3 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default EmailPage;
