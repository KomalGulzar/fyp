import React, { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import { FiUploadCloud } from 'react-icons/fi';

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImageFile = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    if (!data.success) throw new Error('Image upload failed');
    return data.imageUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // 1. Upload image and get URL
      let uploadedImageUrl = '';
      if (categoryImage) {
        uploadedImageUrl = await uploadImageFile(categoryImage);
      }

      // 2. Create category with name and image URL
      const res = await fetch('/api/admin/category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: categoryName, image: uploadedImageUrl }),
      });
      const result = await res.json();

      if (result.success) {
        setSuccessMessage(result.message || 'Category created successfully!');
        setCategoryName('');
        setCategoryImage(null);
        setImagePreview('');
      } else {
        setErrorMessage(result.message || 'Failed to create category.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'An unexpected error occurred.');
    }

    setLoading(false);
  };

  return (
    <MainLayout>
      <div className="p-5 max-w-5xl mx-auto">
        <div className="flex items-center justify-between pb-4 mb-10">
          <h2 className="text-4xl font-bold text-[#0056B3]">Create Category</h2>
        </div>
        <div className="p-8 shadow-lg rounded-xl bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm text-[#0056B3]">Name</label>
              <input
                type="text"
                value={categoryName}
                onChange={handleNameChange}
                required
                className="w-full border-b-2 border-[#0056B3] focus:outline-none mb-4 pb-1"
                placeholder="Category name"
              />
            </div>
            <div className="flex flex-col items-center border-2 border-dashed border-gray-300 p-6 rounded-lg">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              ) : (
                <>
                  <FiUploadCloud size={40} className="text-gray-400 mb-2" />
                  <p className="text-gray-600">No image selected</p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="categoryImage"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => document.getElementById('categoryImage').click()}
                className="mt-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                {categoryImage ? 'Change Image' : 'Select Image'}
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg hover:scale-105 transition"
            >
              {loading ? 'Creating...' : 'Create Category'}
            </button>
            {successMessage && <p className="mt-4 text-green-600">{successMessage}</p>}
            {errorMessage && <p className="mt-4 text-red-600">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateCategory;
