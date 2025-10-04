import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react"; // Optional icons

const features = [
  {
    title: "Verified Vendors",
    desc: "Every seller is screened to ensure authenticity, reliability, and performance.",
  },
  {
    title: "Heavy Machinery Expertise",
    desc: "Built from the ground up for industrial-grade commerce and manufacturing needs.",
  },
  {
    title: "Secure & Scalable",
    desc: "Robust security and scalability to support large machinery transactions seamlessly.",
  },
  {
    title: "End-to-End Support",
    desc: "From listing to post-sale, our team ensures a smooth experience for both parties.",
  },
];

const featureVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const WhyChooseUs = () => {
  return (
    <section className="relative w-full bg-gradient-to-br from-[#f8f9fb] to-white py-20 px-6">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0056B3] to-[#C0C0C0]"></div>

      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.h2
          className="text-4xl font-extrabold text-[#0056B3] tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Why Choose <span className="text-[#333]">Pak Exporters?</span>
        </motion.h2>
        <motion.p
          className="mt-4 text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          We empower industrial-scale vendors and buyers with a platform engineered for heavy-duty performance.
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            className="bg-white border border-[#C0C0C0] rounded-xl p-6 shadow-sm hover:shadow-md transition"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i}
            variants={featureVariants}
          >
            <div className="flex items-start gap-4">
              <div className="mt-1 text-blue-700">
                <CheckCircle size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#333] mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
