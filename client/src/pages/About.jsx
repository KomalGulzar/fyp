import React from "react";
import { motion } from "framer-motion";
import {
  FaTools,
  FaLightbulb,
  FaUserGraduate,
  FaCodeBranch,
  FaGlobe,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";
import v1 from "../assets/v1.mp4";

const FeatureBox = ({ icon, title, text }) => (
  <motion.div
    className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-blue-500"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
    viewport={{ once: true }}
  >
    <div className="flex items-center space-x-4 mb-4">
      {icon}
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
  </motion.div>
);

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* 🔥 Hero Video Background Section */}
      <div className="relative h-[400px] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
          src={v1}
        />
        <div className="absolute inset-0 bg-opacity-60 flex items-center justify-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            About Exporters 🌍
          </motion.h1>
        </div>
      </div>

      {/* 🔹 Intro Text */}
      <div className="max-w-5xl mx-auto p-8">
        <motion.p
          className="text-lg text-center text-gray-700 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Exporters is a modern multi-vendor platform focused on trading verified heavy machinery. It’s
          designed, built, and deployed by a solo student developer as a final year project — with the vision
          to connect sellers and buyers directly with trust and tech.
        </motion.p>

       {/* 🔹 Feature Grid */}
<div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
  <FeatureBox
    icon={<FaLightbulb className="text-yellow-500" size={40} />}
    title="Our Vision"
    text="To bridge the global gap in industrial equipment trading with transparency and innovation."
  />
  <FeatureBox
    icon={<FaTools className="text-blue-600" size={40} />}
    title="Unique Features"
    text="AI suggestions, region-based product discovery, verified machinery, and direct communication."
  />
  <FeatureBox
    icon={<FaUserGraduate className="text-purple-600" size={40} />}
    title="The Developer"
    text="Created by a solo student developer as a real-world capstone project for academic excellence."
  />
  <FeatureBox
    icon={<FaCodeBranch className="text-green-500" size={40} />}
    title="Tech Stack"
    text="React, Redux, Express, MongoDB, Node.js, Tailwind CSS, Framer Motion."
  />
</div>


        {/* 🔹 Extended Feature Set */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-blue-800 mb-4">✨ Advanced Highlights</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Beyond the basics — these features focus on global scalability, user trust, and real-world impact.
          </p>
        </motion.div>

        {/* Redesigned Feature Cards */}
        <div className="mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
          {[
            {
              icon: <FaGlobe size={28} className="text-blue-700" />,
              title: "🌐 Global Impact",
              text: "Empowering businesses in emerging economies with access to global heavy machinery markets.",
            },
            {
              icon: <FaChartLine size={28} className="text-indigo-600" />,
              title: "📈 Scalable Growth",
              text: "Future-ready architecture with support for analytics, vendor scaling, and microservices.",
            },
            {
              icon: <FaShieldAlt size={28} className="text-red-500" />,
              title: "🛡️ Security & Trust",
              text: "Verification layers, secure communication, and fraud prevention built into the system.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-blue-100 flex items-start gap-5 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-tr from-blue-200 to-white rounded-full p-3 shadow-md">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-800 mb-1">{item.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 🔹 Tech Stack */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 p-8 rounded-xl text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">💻 Tech Stack</h2>
          <p className="text-gray-200 text-lg">
            Powered by cutting-edge technologies for a seamless, scalable, and responsive experience.
          </p>
          <div className="mt-6 flex flex-wrap justify-center items-center space-x-8">
            <span className="text-white text-2xl mb-2 md:mb-0">React.js</span>
            <span className="text-white text-2xl mb-2 md:mb-0">Redux</span>
            <span className="text-white text-2xl mb-2 md:mb-0">Tailwind CSS</span>
            <span className="text-white text-2xl mb-2 md:mb-0">Node.js</span>
            <span className="text-white text-2xl mb-2 md:mb-0">Express</span>
            <span className="text-white text-2xl mb-2 md:mb-0">MongoDB</span>
            <span className="text-white text-2xl mb-2 md:mb-0">Framer Motion</span>
          </div>
        </motion.div>

        {/* 🔹 Closing Vision */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold text-blue-800">🚀 Future Vision</h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-700">
            My goal is to eventually scale this project into a full product. With more advanced AI,
            verified vendors, and global trade optimization — Exporters has the potential to grow beyond
            just a student project.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
