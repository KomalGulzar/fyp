import React, { useEffect, useState } from 'react';
import MainLayout from '../../components/MainLayout';

const ViewCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/admin/categories'); // Adjust this endpoint if needed
        const data = await res.json();

        if (!res.ok) {
          throw new Error('Failed to fetch categories');
        }

        setCategories(data);
      } catch (err) {
        setError('Failed to fetch categories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (!confirmDelete) return;
  
    try {
      const res = await fetch(`/api/admin/category/${id}`, {
        method: 'DELETE',
      });
  
      if (!res.ok) throw new Error('Failed to delete category');
  
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
      alert('Category deleted successfully.');
    } catch (err) {
      console.error(err);
      alert('Error deleting category');
    }
  };
  
  
  
  
  
  
  

  return (
    <MainLayout>
      <div className="p-5 max-w-5xl mx-auto">
      <div className="flex items-center justify-between  pb-4 mb-10">
            <div className="flex items-center gap-3">
              <div className="bg-[#0056B3] text-white p-2 rounded-full shadow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h7" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-[#0056B3]">All Categories</h2>
            </div>
          </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : categories.length === 0 ? (
          <p>No categories found.</p>
        ) : (
          <div className="overflow-x-auto p-3 mx-auto shadow-lg rounded-xl">
            <table className="min-w-full">
              <thead className="bg-gray-100 text-justify">
                <tr>
                  <th className="py-3 px-5 border-b border-gray-300 text-gray-800">#</th>
                  <th className="py-3 px-5 border-b border-gray-300 text-gray-800">Category Name</th>
                  <th className="py-3 px-5 border-b border-gray-300 text-gray-800">Action</th>
                </tr>
              </thead>
              <tbody>
              {categories.map((category, index) => (
  <tr key={category._id}>
    <td className="py-3 px-5 border-b border-gray-300 text-gray-500">{index + 1}</td>
    <td className="py-3 px-5 border-b border-gray-300 text-gray-500">{category.name}</td>
    <td className="py-3 px-5 border-b border-gray-300 text-gray-500">
      <button
        onClick={() => handleDelete(category._id)}
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

export default ViewCategory;
