// import React, { useState } from "react";
// import { FiUploadCloud } from "react-icons/fi";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom"

// const CreateListing = () => {
//   const [formData, setFormData] = useState({
//     p_name: "",
//     p_desc: "",
//     p_category: "",
//     p_price: "",
//     p_com_id: "",
//     p_sdesc: "",
//     p_order: "",
//     p_trade: "",
//     p_imgs: "", // Store image URL
//     image: null, // Store selected file
//   });

//   const { currentUser } = useSelector((state) => state.user);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Handle input changes
//   const handleChange = (e) => {
//     const { id, value, files } = e.target;

//     if (files) {
//       const file = files[0];
//       setFormData((prev) => ({
//         ...prev,
//         image: file, // Save the file
//       }));
//       setImagePreview(URL.createObjectURL(file)); // Preview image
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [id]: value,
//       }));
//     }
//   };

//   // Upload image and get URL
//   const handleImageUpload = async (file) => {
//     const imgForm = new FormData();
//     imgForm.append("image", file);

//     try {
//       const res = await fetch("/api/upload", {
//         method: "POST",
//         body: imgForm,
//       });
//       const data = await res.json();

//       if (data.success) {
//         return data.imageUrl; // Get uploaded image URL
//       } else {
//         throw new Error("Image upload failed");
//       }
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       return "";
//     }
//   };

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(false);

//     let imageUrl = formData.p_imgs; // Use existing URL if already uploaded

//     if (formData.image) {
//       imageUrl = await handleImageUpload(formData.image);
//       if (!imageUrl) {
//         setError("Image upload failed");
//         setLoading(false);
//         return;
//       }
//     }

//     try {
//       const res = await fetch("/api/listing/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...formData,
//           p_imgs: imageUrl, // Set uploaded image URL
//           userRef: currentUser._id,
//         }),
//       });

//       const data = await res.json();
//       setLoading(false);
//       if (data.success === false) {
//         setError(data.message);
//       } else {
//         navigate(`/listing/${data._id}`); // Move navigate here
//       }

//     } catch (error) {
//       setError(error.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
//       <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl w-full">
//         <h1 className="text-3xl font-bold text-gray-700 text-center mb-6">
//           Create New Listing
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Input Fields */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//             <input className="input-field" id="p_name" required type="text" placeholder="Product Name" maxLength="200" onChange={handleChange} value={formData.p_name} />
//             <input className="input-field" id="p_category" required type="text" placeholder="Category" maxLength="200" onChange={handleChange} value={formData.p_category} />
//             <input className="input-field" id="p_price" required type="number" placeholder="Price" onChange={handleChange} value={formData.p_price} />
//             <input className="input-field" id="p_com_id" required type="number" placeholder="Company ID" onChange={handleChange} value={formData.p_com_id} />
//             <input className="input-field" id="p_order" required type="number" placeholder="Order Number" onChange={handleChange} value={formData.p_order} />
//             <input className="input-field" id="p_trade" required type="number" placeholder="Trade Number" onChange={handleChange} value={formData.p_trade} />
//           </div>

//           {/* Textarea Fields */}
//           <textarea className="input-field w-full h-28" id="p_desc" required placeholder="Description" onChange={handleChange} value={formData.p_desc}></textarea>
//           <textarea className="input-field w-full h-16" id="p_sdesc" required placeholder="Short Description" maxLength="200" onChange={handleChange} value={formData.p_sdesc}></textarea>

//           {/* Image Upload */}
//           <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg">
//             {imagePreview ? (
//               <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg mb-2" />
//             ) : (
//               <FiUploadCloud size={40} className="text-gray-400 mb-2" />
//             )}

//             {/* Hidden file input */}
//             <input type="file" accept="image/*" id="image" className="hidden" onChange={handleChange} />

//             <button
//               type="button"
//               onClick={() => document.getElementById("image").click()}
//               className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium mt-2 hover:bg-gray-300 transition"
//             >
//               Select Image
//             </button>
//           </div>

//           {/* Submit Button */}
//           <button type="submit" className="bg-indigo-500 text-white p-3 w-full rounded-lg font-bold text-lg hover:bg-indigo-600 transition duration-300">
//             {loading ? "Creating...." : "Create Listing"}
//           </button>
//           {error && <p className="text-red-700 text-sm">{error}</p>}
//         </form>
//       </div>

//       {/* Tailwind Custom Classes */}
//       <style jsx>{`
//         .input-field {
//           border: 1px solid #d1d5db;
//           padding: 12px;
//           border-radius: 8px;
//           background: white;
//           color: #374151;
//           outline: none;
//           transition: 0.3s;
//         }
//         .input-field::placeholder {
//           color: #9ca3af;
//         }
//         .input-field:focus {
//           border-color: #6366f1;
//           box-shadow: 0 0 5px rgba(99, 102, 241, 0.5);
//         }
//       `}</style>
//     </main>
//   );
// };

// export default CreateListing;





// CreateListing.jsx
import React, { useState, useEffect } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";

const CreateListing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    p_name: "",
    p_desc: "",
    p_category: "",
    p_price: "",
    // p_com_id: "",
    p_sdesc: "",
    p_order: "",
    // p_trade: "",
    p_imgs: [],
    images: [],
    userRef: "",
    sellerEmail: "",
    sellerUsername: "",
  });
  const [categories, setCategories] = useState([]);
  const [categoryError, setCategoryError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategoryError("Unable to load categories.");
      }
    };

    fetchCategories();
  }, []);


  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      userRef: currentUser?._id || "",
      sellerEmail: currentUser?.email || "unknown@example.com",
      sellerUsername: currentUser?.username || "Unknown Seller",
    }));
  }, [currentUser]);

  const [imagePreviews, setImagePreviews] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (files) {
      const filesArray = Array.from(files).slice(0, 5);
      setFormData((prev) => ({
        ...prev,
        images: filesArray,
      }));
      const previews = filesArray.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
      setCurrentImageIndex(0);
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleMultipleImageUpload = async (files) => {
    const imageUrls = [];
    for (let i = 0; i < files.length; i++) {
      const imgForm = new FormData();
      imgForm.append("image", files[i]);
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: imgForm,
        });
        const data = await res.json();
        if (data.success) {
          imageUrls.push(data.imageUrl);
        } else {
          throw new Error("Image upload failed");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
      }
    }
    return imageUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    let uploadedImageUrls = [];
    if (formData.images.length > 0) {
      try {
        uploadedImageUrls = await handleMultipleImageUpload(formData.images);
      } catch (error) {
        setError("Image upload failed");
        setLoading(false);
        return;
      }
    }

    try {
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          p_imgs: uploadedImageUrls, // store the array of image URLs
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      } else {
        navigate(`/listing/${data._id}`, { replace: true });
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="p-5 max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-700 mb-6  ">
          Create New Listing
        </h1>
        <div className="overflow-x-auto p-5 mx-auto shadow-lg rounded-xl bg-white border border-gray-200 mt-5">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input className="input-field" id="p_name" required type="text" placeholder="Product Name" maxLength="200" onChange={handleChange} value={formData.p_name} />
              <select
                id="p_category"
                required
                onChange={handleChange}
                value={formData.p_category}
                className="input-field"
              >
                <option value="">Select Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <input className="input-field" id="p_price" required type="number" placeholder="Price" onChange={handleChange} value={formData.p_price} />
              {/* <input className="input-field" id="p_com_id" required type="number" placeholder="Company ID" onChange={handleChange} value={formData.p_com_id} /> */}
              <input className="input-field" id="p_order" required type="number" placeholder="Order Number" onChange={handleChange} value={formData.p_order} />
              {/* <input className="input-field" id="p_trade" required type="number" placeholder="Trade Number" onChange={handleChange} value={formData.p_trade} /> */}
            </div>

            <textarea className="input-field w-full h-28" id="p_desc" required placeholder="Description" onChange={handleChange} value={formData.p_desc}></textarea>
            <textarea className="input-field w-full h-16" id="p_sdesc" required placeholder="Short Description" maxLength="200" onChange={handleChange} value={formData.p_sdesc}></textarea>

            {/* Upload Section */}
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#C0C0C0] p-6 rounded-lg">
              {imagePreviews.length > 0 ? (
                <div className="w-full relative">
                  <img src={imagePreviews[currentImageIndex]} alt={`Preview ${currentImageIndex + 1}`} className="w-full h-64 object-cover rounded-lg" />
                  {imagePreviews.length > 1 && (
                    <>
                      <button type="button" onClick={() => setCurrentImageIndex((prev) => prev === 0 ? imagePreviews.length - 1 : prev - 1)} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#333333] text-white rounded-full p-2 opacity-70 hover:opacity-100">←</button>
                      <button type="button" onClick={() => setCurrentImageIndex((prev) => prev === imagePreviews.length - 1 ? 0 : prev + 1)} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#333333] text-white rounded-full p-2 opacity-70 hover:opacity-100">→</button>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <FiUploadCloud size={40} className="text-[#C0C0C0] mb-2" />
                  <p className="text-[#333333]">No images selected</p>
                </>
              )}
              <input type="file" accept="image/*" id="images" className="hidden" onChange={handleChange} multiple />
              <button type="button" onClick={() => document.getElementById("images").click()} className="bg-[#C0C0C0] text-[#333] px-4 py-2 rounded-lg font-medium mt-2 hover:bg-[#b0b0b0] transition">Select up to 5 Images</button>
              <p className="text-[#666] text-sm mt-2">Please upload up to 5 images.</p>
            </div>

            <button type="submit" className="w-full px-4 py-3 bg-gradient-to-r from-[#0056B3] to-blue-700 text-white text-lg font-semibold rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-[0_0_25px_#4A90E2,0_0_70px_#1A237E] hover:scale-105">
              {loading ? "Creating..." : "Create Product"}
            </button>
            {error && <p className="text-red-600 text-center">{error}</p>}
          </form>
        </div>
      </div>

      {/* Input Styling */}
      <style jsx>{`
    .input-field {
      border: 1px solid #C0C0C0;
      padding: 12px;
      border-radius: 8px;
      background: white;
      color: #333333;
      outline: none;
      transition: 0.3s;
    }
    .input-field::placeholder {
      color: #9ca3af;
    }
    .input-field:focus {
      border-color: #0056B3;
      box-shadow: 0 0 5px rgba(0, 86, 179, 0.4);
    }
  `}</style>
    </MainLayout>

  );
};

export default CreateListing;
