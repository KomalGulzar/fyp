import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BuyerInquiries = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [inquiries, setInquiries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInquiries = async () => {
      if (!currentUser || !currentUser._id) {
        setError("Buyer ID is missing.");
        return;
      }

      try {
        const res = await fetch(`/api/inquiries/buyer/${currentUser._id}`);
        const data = await res.json();

        if (res.ok) {
          setInquiries(data);
        } else {
          setError(data.error || "Failed to fetch inquiries.");
        }
      } catch (err) {
        setError("Something went wrong. Try again later.");
      }
    };

    fetchInquiries();
  }, [currentUser]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Your Inquiries</h2>
      {error && <p className="text-red-500">{error}</p>}
      {inquiries.length === 0 ? (
        <p>No inquiries found.</p>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <div key={inquiry._id} className="border-b-2 py-4">
              <p><strong>Product:</strong> {inquiry.productId.p_name}</p>
              <p><strong>Buyer Message:</strong> {inquiry.message}</p>

              {/* Display the replies */}
              {inquiry.messages && inquiry.messages.length > 0 ? (
                <div>
                  <strong>Replies:</strong>
                  {inquiry.messages.map((reply, index) => (
                    <div key={index} className="p-2 bg-gray-100 rounded-lg mb-2">
                      <p><strong>{reply.senderUsername}</strong> (Seller):</p>
                      <p>{reply.message}</p>
                      <p className="text-sm text-gray-500">{new Date(reply.createdAt).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No replies yet.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BuyerInquiries;
