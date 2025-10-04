import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChevronDown, ChevronUp, Eye, EyeOff } from "lucide-react";
import MainLayout from '../components/MainLayout';

const AdminInquiries = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [inquiries, setInquiries] = useState([]);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const fetchInquiries = async () => {
      if (!currentUser || !currentUser._id) {
        setError("Seller ID is missing.");
        return;
      }

      try {
        const res = await fetch(`/api/inquiries/seller/${currentUser._id}`);
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

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <MainLayout>
      <div className="p-5 max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-700 mb-6 text-center md:text-left">Inquiry Messages</h1>

        <div className="overflow-x-auto p-3 mx-auto shadow-lg rounded-xl mt-5">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {inquiries.length === 0 ? (
            <p className="text-[#333] text-center">No inquiries received yet.</p>
          ) : (
            <div className="space-y-4">
              {inquiries.map((inquiry) => (
                <div
                  key={inquiry._id}
                  className="py-3 px-5 border-b border-gray-300 transition duration-300"
                >
                  <div className="flex justify-between items-center p-4 flex-col sm:flex-row">
                    <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    {inquiry.buyerId?.avatar ? (
  <img
    src={inquiry.buyerId.avatar}
    alt="profile"
    className="rounded-full h-10 w-10 object-cover"
  />
) : (
  <div className="bg-[#C0C0C0] rounded-full h-10 w-10 flex items-center justify-center text-white font-bold text-lg">
    {inquiry.buyerUsername?.[0]?.toUpperCase() || "U"}
  </div>
)}

                      <div>
                        <p className="text-[#333] font-semibold">{inquiry.buyerEmail}</p>
                        <p className="text-sm text-[#666] italic">{inquiry.message.slice(0, 30)}...</p>
                      </div>
                    </div>

                    {/* Upgraded View Button */}
                    <button
                      onClick={() => toggleExpand(inquiry._id)}
                      className="flex items-center gap-2 px-7 py-3 w-full sm:w-40 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out hover:shadow-[0_0_15px_#4A90E2,0_0_50px_#1A237E] hover:scale-105"
                    >
                      {expanded[inquiry._id] ? (
                        <>
                          <EyeOff size={18} />
                          Hide
                        </>
                      ) : (
                        <>
                          <Eye size={18} />
                          View
                        </>
                      )}
                    </button>
                  </div>

                  {/* Expanded Info */}
                  {expanded[inquiry._id] && (
                    <div className="px-6 pb-5 text-sm text-[#333] space-y-2">
                      <p><span className="font-semibold">Full Message:</span> {inquiry.message}</p>
                      <p><span className="font-semibold">Product:</span> {inquiry.productId?.p_name} (${inquiry.productId?.p_price})</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminInquiries;
