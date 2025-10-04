import React, { useState } from 'react';
import MainLayout from '../../components/MainLayout';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: 'Admin',
  });

  const [success, setSuccess] = useState(false);

  const handlerChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setSuccess(true);
  };

  return (
    <MainLayout>
      <div className="p-5 max-w-5xl mx-auto">
        <div className="flex items-center justify-between  pb-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-[#0056B3] text-white p-2 rounded-full shadow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 20v-2a4 4 0 00-3-3.87M6 20v-2a4 4 0 013-3.87M12 4a4 4 0 110 8 4 4 0 010-8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-[#0056B3]">Create New User</h2>
          </div>
        </div>
        <div className="p-8 mx-auto shadow-lg rounded-xl">


          <form onSubmit={handleSubmit}>
            <label className="block text-sm text-[#0056B3] mb-1">Select user type</label>
            <select
              id="role"
              onChange={handlerChange}
              value={formData.role}
              className="w-full border-b-2 border-[#0056B3] focus:outline-none mb-8 pb-2 text-gray-700"
            >
              <option value="Admin">Admin</option>
              <option value="Buyer">Buyer</option>
              <option value="Seller">Seller</option>
            </select>

            <input
              type="text"
              id="username"
              placeholder="Username"
              onChange={handlerChange}
              value={formData.username}
              className="w-full border-b-2 border-[#0056B3] focus:border-[#0056B3] focus:outline-none mb-8 pb-2"
              required
            />

            <input
              type="email"
              id="email"
              placeholder="Email"
              onChange={handlerChange}
              value={formData.email}
              className="w-full border-b-2 border-[#0056B3] focus:border-[#0056B3] focus:outline-none mb-8 pb-2"
              required
            />

            <button
              type="submit"
              className="mt-4  
               px-6 py-2 rounded shadow hover:bg-[#003D7A] flex items-center gap-2
              bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold  shadow-lg transition duration-300 ease-in-out hover:shadow-[0_0_25px_#4A90E2,0_0_50px_#1A237E] hover:scale-105"
            >
              CREATE <span className="text-lg">{'>'}</span>
            </button>

            {success && (
              <p className="text-[#0056B3] mt-4 font-semibold">User created successfully!</p>
            )}
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateUser;
