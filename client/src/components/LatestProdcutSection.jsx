import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";


const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
      ease: "easeOut",
      duration: 0.6,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 12,
    },
  },
};

const LatestProductSection = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const fetchLatestListings = async () => {
      try {
        const res = await fetch("/api/listing/latest");
        const data = await res.json();

        if (res.ok) {
          setListings(data);
        } else {
          setError(data.error || "Failed to fetch latest listings.");
        }
      } catch (err) {
        setError("Something went wrong. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestListings();
  }, []);

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto p-7">
      <motion.h3
        className="text-3xl font-bold text-black mb-8 text-left tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Latest Products
      </motion.h3>

      {loading ? (
        <p className="text-center text-gray-500">Loading latest listings...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : listings.length === 0 ? (
        <p className="text-center text-gray-600">No listings to show.</p>
      ) : (
        <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {listings.map((item) => (
          <Link
            key={item._id}
            to={`/listing/${item._id}`}
            className="block" // ensures the whole card is clickable
          >
            <motion.div
              className="bg-white shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
              variants={cardVariants}
            >
              <img
                src={item.p_imgs?.[0] || "https://via.placeholder.com/150"}
                alt={item.p_name || "Product image"}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#333333] mb-1 truncate">
                  {item.p_name || "No name"}
                </h3>
                <p className="text-sm text-gray-500 mb-1">
                  {item.p_category || "No category"}
                </p>
                <p className="text-[#0056B3] font-bold text-base mb-1">
                  {item.p_price ? `$${item.p_price}` : "No price"}
                </p>
                <p className="text-xs text-gray-400">
                  By {item.sellerUsername}
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
      )}
    </section>
  );
};

export default LatestProductSection;
