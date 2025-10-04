import React, { useState } from 'react';
import { FaSyncAlt } from 'react-icons/fa'; // Optional spinner icon

const AiImageGenerator = () => {
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);

  const handleGenerateImage = () => {
    setLoading(true);

    // Simulating an API request (replace with actual API later)
    setTimeout(() => {
      // Simulated response from AI
      setGeneratedImage({
        name: 'Heavy Machinery Model X',
        imageUrl: 'https://via.placeholder.com/300x200.png?text=AI+Generated+Image', // Placeholder image URL
        description: 'A robust and high-performance heavy machinery model designed for construction projects.',
      });

      setLoading(false);
    }, 2000); // Simulate loading time (2 seconds)
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl space-y-8">
        {/* Form Container */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Generate Product Image</h2>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            {/* Product Name */}
            <input
              type="text"
              placeholder="Enter Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
            />
            {/* Product Type */}
            <input
              type="text"
              placeholder="Enter Product Type (optional)"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
            />
            {/* Product Description */}
            <textarea
              placeholder="Enter Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
            />
            {/* Generate Button */}
            <button
              type="button"
              onClick={handleGenerateImage}
              className="w-full py-3 bg-blue-600 text-white rounded-lg transition-all hover:bg-blue-700 disabled:bg-gray-300 flex justify-center items-center"
              disabled={loading}
            >
              {loading ? (
                <FaSyncAlt className="animate-spin mr-2" />
              ) : (
                'Generate Image'
              )}
            </button>
          </form>
        </div>

        {/* Generated Image Result */}
        {generatedImage && !loading && (
          <div className="text-center mt-8">
            <h3 className="text-xl font-semibold text-gray-800">{generatedImage.name}</h3>
            <img
              src={generatedImage.imageUrl}
              alt="Generated"
              className="mx-auto my-4 rounded-lg shadow-lg"
            />
            <p className="text-gray-600">{generatedImage.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiImageGenerator;
