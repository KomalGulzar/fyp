import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import mc1 from "../assets/mc1.jpg";
import mc2 from "../assets/mc2.jpg";
import mc3 from "../assets/mc3.jpg";
import mc4 from "../assets/mc4.jpg";

const LatestProductsSlider = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false); // Modal state

  // Slides Data
  const slides = [
    {
      id: 1,
      title: "Why Choose Us?",
      description:
        "Learn why our marketplace is the best place for buying and selling heavy machinery.",
      buttonText: "Why Choose Us?",
      buttonLink: "#",
      image: mc1,
    },
    {
      id: 2,
      title: "Browse All Products",
      description:
        "Explore a vast collection of industrial machinery from verified suppliers. Start browsing today.",
      buttonText: "Browse Products",
      buttonLink: "/search?searchTerm=",
      image: mc2,
    },
    {
      id: 3,
      title: "Discover the Latest Machinery",
      description:
        "Stay ahead in the industry with our newest arrivals in heavy machinery from trusted suppliers.",
      buttonText: "Latest Products",
      buttonLink: "/search?searchTerm=latest",
      image: mc3,
    },
    {
      id: 4,
      title: "Heavy-Duty Machinery, Built to Last",
      description: "Explore top-tier industrial equipment for every need.",
      buttonText: "Explore Now",
      buttonLink: "/products",
      image: mc4,
    },
  ];

  return (
    <div className="relative w-full h-[85vh] overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover opacity-90"
            />

            {/* Left-Aligned Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-start text-white text-left p-12 bg-opacity-50">
              <h1 className="text-5xl font-bold mb-4">{slide.title}</h1>
              <p className="text-lg text-gray-300 mb-6 max-w-lg">{slide.description}</p>

              {/* CTA Button (Opens Modal for "Why Choose Us?") */}
              <button
                onClick={() =>
                  slide.buttonText === "Why Choose Us?"
                    ? setShowModal(true)
                    : navigate(slide.buttonLink)
                }
                className="px-8 py-4 w-56 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out hover:shadow-[0_0_25px_#4A90E2,0_0_50px_#1A237E] hover:scale-105"
              >
                {slide.buttonText}
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Why Choose Us Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg text-black">
            <h2 className="text-2xl font-bold mb-4">Why Choose Our Marketplace?</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>✅ Verified Suppliers & Buyers</li>
              <li>✅ Wide Range of Heavy Machinery</li>
              <li>✅ Secure & Transparent Dealings</li>
              <li>✅ AI-Based Smart Recommendations</li>
            </ul>
            <button
              onClick={() => setShowModal(false)}
              className="mt-5 px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestProductsSlider;
