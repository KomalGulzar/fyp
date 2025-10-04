import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import mc4 from "../assets/contactForm.png";

// Function to generate a random 5-character CAPTCHA
const generateCaptcha = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let captcha = '';
  for (let i = 0; i < 5; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
};

const ContactForm = () => {
  // Fetch the current user from Redux store
  const { currentUser } = useSelector((state) => state.user);

  const [name, setName] = useState(currentUser?.username || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [formError, setFormError] = useState(null); // State for form-specific errors
  const [formSuccess, setFormSuccess] = useState(null); // State for form-specific success

  useEffect(() => {
    // Generate CAPTCHA only if the user is not logged in
    if (!currentUser) {
      setCaptcha(generateCaptcha());
    }
  }, [currentUser]);

  const regenerateCaptcha = () => {
    setCaptcha(generateCaptcha());
    setUserCaptcha('');
    setFormError(null); // Clear CAPTCHA error on regenerate
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null); // Clear previous errors
    setFormSuccess(null); // Clear previous success messages

    // Basic validation
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setFormError('All fields are required.');
      return;
    }

    // CAPTCHA check only for guests (not logged in)
    if (!currentUser && userCaptcha !== captcha) {
      setFormError('CAPTCHA does not match. Please try again.');
      regenerateCaptcha(); // Regenerate for a new attempt
      return;
    }

    const payload = {
      name,
      email,
      message,
      subject,
    };

    try {
      const res = await fetch('/api/user/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setFormSuccess('Your message has been sent successfully! We will get back to you soon.');
        setMessage(''); // Clear message field
        setSubject(''); // Clear subject field
        if (!currentUser) { // If guest, clear their input fields and regenerate CAPTCHA
          setName('');
          setEmail('');
          regenerateCaptcha();
        }
      } else {
        setFormError(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setFormError('Something went wrong. Please check your connection and try again later.');
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-6 sm:p-10">
      <div className="bg-white shadow-xl  flex flex-col md:flex-row max-w-6xl w-full overflow-hidden">

        {/* Left Section: Image (as designed for Contact page) */}
        <div
          className="md:w-1/2 bg-cover bg-center h-64 md:h-auto"
          // Replace with your desired image for this contact form page
          style={{ backgroundImage: `url(${mc4})` }}
        >
         
        </div>

        {/* Right Section: Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="md:w-1/2 p-8 lg:p-12 flex flex-col justify-center space-y-5" // Adjusted spacing
        >
          <h2 className="text-3xl font-bold text-[#333333] mb-4 border-b-2 border-[#C0C0C0] pb-2">Contact Us</h2>
          <p className="text-gray-700 mb-4">We'd love to hear from you! Fill out the form below to get in touch with our team.</p>

          <div className="space-y-2">
            <label htmlFor="name" className="block text-gray-700 text-sm font-semibold">Your Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => !currentUser && setName(e.target.value)}
              disabled={!!currentUser} // Disabled if user is logged in
              required
              className="w-full p-3 border border-[#C0C0C0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0056B3] disabled:bg-gray-100 text-[#333333]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold">Your Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => !currentUser && setEmail(e.target.value)}
              disabled={!!currentUser} // Disabled if user is logged in
              required
              className="w-full p-3 border border-[#C0C0C0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0056B3] disabled:bg-gray-100 text-[#333333]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="block text-gray-700 text-sm font-semibold">Subject</label>
            <input
              type="text"
              id="subject"
              placeholder="Enter the subject of your message"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full p-3 border border-[#C0C0C0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0056B3] text-[#333333]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-gray-700 text-sm font-semibold">Your Message</label>
            <textarea
              id="message"
              placeholder="Write your message here..."
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full p-3 border border-[#C0C0C0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0056B3] resize-y text-[#333333]"
            ></textarea>
          </div>

          {!currentUser && ( // Show CAPTCHA only if the user is not logged in
            <div className="space-y-2">
              <label htmlFor="userCaptcha" className="block text-gray-700 text-sm font-semibold">CAPTCHA</label>
              <div className="flex items-center justify-between gap-4"> {/* Added gap */}
                <div className="bg-[#E0E0E0] text-[#333333] text-2xl font-mono tracking-widest px-5 py-3 rounded-md select-none border border-[#C0C0C0] flex-grow">
                  {captcha}
                </div>
                <button
                  type="button"
                  onClick={regenerateCaptcha}
                  className="bg-[#C0C0C0] text-[#333333] px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-400 transition"
                >
                  Refresh
                </button>
              </div>
              <input
                type="text"
                id="userCaptcha"
                placeholder="Type the CAPTCHA here"
                value={userCaptcha}
                onChange={(e) => setUserCaptcha(e.target.value)}
                required
                className="w-full mt-2 p-3 border border-[#C0C0C0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0056B3] text-[#333333]"
              />
            </div>
          )}

          {formError && <p className="text-red-500 text-sm">{formError}</p>}
          {formSuccess && <p className="text-green-600 text-sm">{formSuccess}</p>}

          <button
            type="submit"
            className="
              w-full px-8 py-4 text-white text-lg font-semibold  shadow-lg
              bg-gradient-to-r from-blue-500 to-blue-700 /* Your consistent primary gradient */
              transition duration-300 ease-in-out
              hover:shadow-[0_0_25px_#4A90E2,0_0_50px_#1A237E] /* Your consistent glow effect */
              hover:scale-105 /* Your consistent scale effect */
              mt-6 /* Add some top margin for spacing */
            "
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;