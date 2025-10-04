// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const MegaMenu = () => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch(`/api/listing/categories`);
//         const data = await res.json();
//         if (data.success === false) {
//           console.error("No Categories Found");
//         } else {
//           setCategories(data);
//         }
//       } catch (err) {
//         console.error("Error fetching categories");
//       }
//     };

//     fetchCategories();
//   }, []);

//   return (
//     <div className="relative group z-50">
//       {/* Button */}
//       <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
//         Categories
//       </button>

//       {/* Dropdown Menu */}
//       <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg mt-1 w-48 rounded-md border border-gray-300 overflow-visible">
//         <ul className="p-2">
//           {categories.length > 0 ? (
//             categories.map((category, index) => (
//               <li key={index} className="p-2 hover:bg-gray-100">
//                 <Link to={`/category/${category}`}>{category}</Link>
//               </li>
//             ))
//           ) : (
//             <li className="p-2 text-gray-500">No Categories Found</li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default MegaMenu;



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MegaMenu = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`/api/categories`);
        const data = await res.json();
  
        if (!Array.isArray(data)) {
          console.error("Invalid categories response");
          return;
        }
  
        const uniqueCategories = [...new Set(data.filter(category => category && category.trim() !== ""))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
  
    fetchCategories();
  }, []);
  
  const columnCount = 3;
  const chunkedCategories = [];
  for (let i = 0; i < categories.length; i += Math.ceil(categories.length / columnCount)) {
    chunkedCategories.push(categories.slice(i, i + Math.ceil(categories.length / columnCount)));
  }

  return (
    <div className="relative group z-50">
      <li className="flex items-center gap-2 hover:bg-blue-100  p-7 transition-all ease-in-out active:bg-[#0056B3] active:text-white">
        Categories
        <span className="text-sm">&#x25BC;</span>
      </li>

      <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg  w-100  overflow-visible">
        <div className="grid grid-cols-1 divide-x divide-gray-300 ">
          {chunkedCategories.map((col, colIndex) => (
            <ul key={colIndex} className="space-y-1">
              {col.length > 0 ? (
                col.map((category, index) => (
                  <li key={index} className="py-3 px-6 hover:bg-gradient-to-r from-blue-500 to-blue-700 hover:text-white transition-all ease-in-out active:bg-[#0056B3] active:text-white  cursor-pointer">
                    <Link to={`/category/${encodeURIComponent(category)}`} className="block w-full h-full ">
                      {category}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-500">No Categories Found</li>
              )}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
