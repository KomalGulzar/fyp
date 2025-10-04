import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';  // Assuming Redux for currentUser
import MainLayout from '../../components/MainLayout';

const ViewSuppliers = () => {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Get currentUser from Redux store (or wherever you're storing the current user)
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const res = await fetch('/api/admin/users'); // Adjust the URL if necessary
        const data = await res.json();

        // Filter buyers based on currentUser role
        const filteredBuyers = data.filter(user => user.role?.toLowerCase() === 'seller');

        // Only show buyers if currentUser is an admin or buyer
        if (currentUser?.role?.toLowerCase() === 'admin') {
          setBuyers(filteredBuyers); // Admin can view all buyers
        } else if (currentUser?.role?.toLowerCase() === 'buyer') {
          // If the currentUser is a buyer, you could show only their data, or restrict visibility
          setBuyers([currentUser]); // Only show the current buyer
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

        // If deletion is successful, remove the user from the list
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
        <div className="flex items-center gap-3 mb-6  pb-2">
          <div className="bg-[#0056B3] text-white p-2 rounded-full shadow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20h6M4 20h5v-2a4 4 0 00-3-3.87M16 11a4 4 0 10-8 0 4 4 0 008 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-[#0056B3]">
            All Suppliers
          </h2>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : buyers.length === 0 ? (
          <p>No buyers found.</p>
        ) : (
        <div className='p-8 mx-auto shadow-lg rounded-xl'>
          <table className="min-w-full">
            <thead className="bg-gray-100 text-justify">
              <tr>
                <th className="py-3 px-5 border-b border-gray-300 text-gray-800">#</th>
                <th className="py-3 px-5 border-b border-gray-300 text-gray-800">Username</th>
                <th className="py-3 px-5 border-b border-gray-300 text-gray-800">Email</th>
                <th className="py-3 px-5 border-b border-gray-300 text-gray-800">Action</th>
              </tr>
            </thead>
            <tbody className=''>
              {buyers.map((buyer, index) => (
                <tr key={buyer._id}>
                  <td className="py-3 px-5 border-b border-gray-300 text-gray-500">{index + 1}</td>
                  <td className="py-3 px-5 border-b border-gray-300 text-gray-500">{buyer.username}</td>
                  <td className="py-3 px-5 border-b border-gray-300 text-gray-500">{buyer.email}</td>
                  <td className="py-3 px-5 border-b border-gray-300 text-gray-500">
                    <button
                      className="flex items-center border border-blue-500 text-blue-600 px-5 py-2  rounded-full hover:bg-blue-50 hover:shadow-[0_0_25px_#4A90E2,0_0_50px_#1A237E] hover:scale-105 hover:bg-gradient-to-r from-blue-500 to-blue-700 hover:text-white"
                      onClick={() => handleDeleteUser(buyer._id)}
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

export default ViewSuppliers;
