import React, { useEffect, useState, } from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import LatestProductsSlider from "../components/LatestProductsSlider";
import axios from "axios";
import CategorySection from "../components/CategorySection";
import LatestProdcutSection from "../components/LatestProdcutSection";
import WhyChooseUs from "../components/WhyChooseUs";
import AiImageGenerator from "../components/AiImageGenerator";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // fetch full category docs { _id, name, image }
    fetch('/api/categories')
      .then(r => r.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  


  return (
    <div className=" min-h-screen">

      <div>
        <LatestProductsSlider />
      </div>

      {/* 2. latest listing section*/}
      <section className="m-6 bg-white">
      <LatestProdcutSection />
      </section>

      {/* 3. Categories Section */}
      <section className="m-6 ">
        <div className="flex gap-4 overflow-x-auto">
          <CategorySection />
        </div>
      </section>


      {/* <section className="m-6">
        <AiImageGenerator/>
      </section> */}

      {/* 5. Featured Products Section */}
      {/* <section className="w-full bg-gray-100 p-6">
        <h2 className="text-xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4"><div>
      </section> */}

      {/* 6. Why Choose Us Section */}
      <section className="m-6">
        <WhyChooseUs/>
      </section>

      {/* 7. Testimonials Section */}
      {/* <section className="w-full bg-gray-100 p-6">
        <h2 className="text-xl font-bold mb-4">What Our Customers Say</h2>
        <div className="flex gap-4 overflow-x-auto"></div>
      </section> */}

      {/* 8. Newsletter Signup Section */}
      {/* <section className="w-full bg-white p-6 text-center">
        <h2 className="text-xl font-bold mb-2">Stay Updated!</h2>
        <p className="text-gray-600">Subscribe to our newsletter for the latest updates.</p>
        <div className="mt-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 border border-gray-300 rounded-l-md"
          />
          <button className="bg-red-500 text-white px-4 py-2 rounded-r-md">Subscribe</button>
        </div>
      </section> */}

      {/* 9. Footer Section */}
     
    </div>
  );
};

export default Home;
