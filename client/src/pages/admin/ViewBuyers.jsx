import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MainLayout from '../../components/MainLayout';

const ViewBuyers = () => {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const res = await fetch('/api/admin/users');
        const data = await res.json();

        const filteredBuyers = data.filter(user => user.role?.toLowerCase() === 'buyer');

        if (currentUser?.role?.toLowerCase() === 'admin') {
          setBuyers(filteredBuyers);
        } else if (currentUser?.role?.toLowerCase() === 'buyer') {
          setBuyers([currentUser]);
        }
      } catch (err) {
        setError('Failed to fetch buyers');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBuyers();
  }, [currentUser]);

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await fetch(`/api/admin/user/${userId}`, {
          method: 'DELETE',
        });

        if (!res.ok) {
          throw new Error('Failed to delete the user');
        }

        setBuyers(buyers.filter(buyer => buyer._id !== userId));
      } catch (err) {
        setError('Failed to delete user');
        console.error(err);
      }
    }
  };

  return (
    <MainLayout>
      <div className="p-5 max-w-5xl mx-auto">
        <div className="flex items-center gap-3  pb-4 mb-8">
          <div className="bg-[#0056B3] text-white p-2 rounded-full shadow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M6 17h12" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-[#0056B3]">
           All Buyers
          </h2>
        </div>

        {loading ? (
          <div className="text-center text-[#333333] text-lg">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-600 text-lg">{error}</div>
        ) : buyers.length === 0 ? (
          <div className="text-center text-[#333333] text-lg">No buyers found.</div>
        ) : (
          <div className=" overflow-x-auto p-3 mx-auto shadow-lg rounded-xl">
            <table className="min-w-full ">
              <thead className="bg-gray-100 text-justify">
                <tr>
                  <th className="py-3 px-5 border-b border-gray-300 text-gray-800">#</th>
                  <th className="py-3 px-5 border-b border-gray-300 text-gray-800">Username</th>
                  <th className="py-3 px-5 border-b border-gray-300 text-gray-800">Email</th>
                  <th className="py-3 px-5 border-b border-gray-300 text-gray-800">Action</th>
                </tr>
              </thead>
              <tbody className="">
                {buyers.map((buyer, index) => (
                  <tr key={buyer._id} className="hover:bg-[#f0f4f8] transition duration-200">
                    <td className="py-3 px-5 border-b border-gray-300 text-gray-500">{index + 1}</td>
                    <td className="py-3 px-5 border-b border-gray-300 text-gray-500">{buyer.username}</td>
                    <td className="py-3 px-5 border-b border-gray-300 text-gray-500">{buyer.email}</td>
                    <td className="py-3 px-5 border-b border-gray-300 text-gray-500">
                      <button
                        onClick={() => handleDeleteUser(buyer._id)}
                        className="flex items-center border border-blue-500 text-blue-600 px-5 py-2  rounded-full hover:bg-blue-50 hover:shadow-[0_0_25px_#4A90E2,0_0_50px_#1A237E] hover:scale-105 hover:bg-gradient-to-r from-blue-500 to-blue-700 hover:text-white"
                      >
                        Delete
                      </button>
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

export default ViewBuyers;
