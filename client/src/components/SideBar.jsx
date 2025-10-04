import React from 'react';
import { User, Settings, FileText, Package, PlusSquare, LogOut, Delete } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  signOutUserstart,
  signOutUserFailure,
  signOutUserSuccess,
  deleteUserstart,
  deleteUserFailure,
  deleteUserSuccess,
} from '../redux/user/userSlice';

const Sidebar = ({ currentUser }) => {
  const dispatch = useDispatch();

  // Handle user sign out
  const handleChangeOut = async () => {
    try {
      dispatch(signOutUserstart());
      const res = await fetch('api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  };

  // Handle delete user account
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserstart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));

      console.log('User deleted successfully');
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className="sticky fixed top-0 h-screen w-70 bg-gradient-to-br from-gray-700 to-blue-900 text-gray-200 flex flex-col overflow-y-auto">
      <div className="p-4 bg-gray-800">
        <Settings size={50} className="mt-4" />
        <div className="text-2xl font-bold mb-5 text-gray-200 border-b border-gray-500 pb-2 mt-5">
          Welcome, {currentUser.username}
        </div>
        <div className="text-sm mb-8 text-gray-200">{currentUser.email}</div>
      </div>

      <div className="p-4">
        {/* Conditionally render menu based on role */}
        {currentUser?.role?.toLowerCase() === 'seller' ? (

          // Seller Menu

          <>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-100">Manage Profile</h2>
              <Link to="/profile" className="block mt-3 py-4 px-3 rounded border-b border-gray-600 flex items-center gap-2">
                <User size={20} /> Profile
              </Link>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-100">Trade Info</h2>
              <Link to="/company-info" className="block mt-3 py-4 px-3 rounded border-b border-gray-600 flex items-center gap-2">
                <FileText size={20} /> Company Info
              </Link>
              <Link to="/manage-certificate" className="block py-4 px-3 rounded border-b border-gray-600 flex items-center gap-2">
                <PlusSquare size={20} /> Manage Certificate
              </Link>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-100">Create</h2>
              <Link to="/profile/create-listing" className="block mt-3 py-4 px-3 rounded border-b border-gray-600 flex items-center gap-2">
                <Package size={20} /> Product
              </Link>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-100">View</h2>
              <Link to="/profile/view-product" className="block mt-3 py-4 px-3 rounded border-b border-gray-600 flex items-center gap-2">
                <Package size={20} /> Product
              </Link>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-100">Inquiry</h2>
              <Link to="/profile/view-inquery" className="block mt-3 py-4 px-3 rounded border-b border-gray-600 flex items-center gap-2">
                <Package size={20} /> Show Inquiry
              </Link>
            </div>
          </>
        ) : currentUser?.role?.toLowerCase() === 'buyer' ? (

          // Buyer Menu

          <>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-100">Manage Profile</h2>
              <Link to="/profile" className="block mt-3 py-4 px-3 rounded border-b border-gray-600 flex items-center gap-2">
                <User size={20} /> Profile
              </Link>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-100">Account</h2>
              <Link to="/orders" className="block mt-3 py-4 px-3 rounded border-b border-gray-600 flex items-center gap-2">
                <Package size={20} /> Orders
              </Link>
              <Link to="/profile/cart" className="block py-4 px-3 rounded border-b border-gray-600 flex items-center gap-2">
                <Package size={20} /> Cart
              </Link>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-100">Inquiry</h2>
              <Link to="/buyer-reply" className="block mt-3 py-4 px-3 rounded border-b border-gray-600 flex items-center gap-2">
                <Package size={20} /> Messages
              </Link>
            </div>
          </>
        ) : currentUser?.role?.toLowerCase() === 'admin' ? (

          // Admin Menu

          <>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-100">Profile</h2>
              <Link to="/profile" className="block mt-3 py-4 px-3 rounded border-b border-gray-600 flex items-center gap-2">
                <User size={20} /> Profile
              </Link>
              
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-100">Create</h2>
              <Link to="/admin/create-user" className="block mt-3 py-4 px-3 rounded border-b border-gray-600 flex items-center gap-2">
                <User size={20} /> User
              </Link>
              <Link to="/admin/create-category" className="block py-4 px-3 rounded border-b border-gray-600 flex items-center gap-2">
                <User size={20} /> Category
              </Link>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-100">View</h2>
              <Link to="/admin/view-supplier" className="block mt-3 py-4 px-3 rounded border-b border-gray-600 flex items-center gap-2">
                <User size={20} /> Suppliers
              </Link>
              <Link to="/admin/view-buyers" className="block py-4 px-3 rounded border-b border-gray-600 flex items-center gap-2">
                <User size={20} /> Buyers
              </Link>
              <Link to="/admin/view-category" className="block py-4 px-3 rounded border-b border-gray-600 flex items-center gap-2">
                <Package size={20} /> Category
              </Link>
              <Link to="/admin/contacts" className="block py-4 px-3 rounded border-b border-gray-600 flex items-center gap-2">
                <User size={20} /> Contacts
              </Link>
              
            </div>
           
          </>
        ) : null}

        <div className="mt-3">
          <h2 className="text-lg font-semibold text-gray-100">Account</h2>
          <Link onClick={handleChangeOut} className="block mt-3 py-4 px-3 rounded border-b border-gray-600 flex items-center gap-2">
            <LogOut size={20} /> Logout
          </Link>
          <Link onClick={handleDeleteUser} className="block py-4 px-3 rounded border-b border-gray-600 flex items-center gap-2">
            <Delete size={20} /> Delete Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
