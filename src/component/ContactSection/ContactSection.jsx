import React, { useState, useEffect } from "react";
import { FaPhone, FaTimes } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import Chatbot from "../Chatbot/Chatbot";
// Toast Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center justify-between min-w-[300px] ${
        type === 'success' 
          ? 'bg-green-100 border border-green-500 text-green-700' 
          : 'bg-red-100 border border-red-500 text-red-700'
      }`}
    >
      <div className="flex items-center">
        <div className="mr-3">
          {type === 'success' ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>
        <div>
          <h4 className="font-semibold">{type === 'success' ? 'Success!' : 'Error!'}</h4>
          <p className="text-sm">{message}</p>
        </div>
      </div>
      <button onClick={onClose} className="ml-4">
        <FaTimes className="w-4 h-4" />
      </button>
    </div>
  );
};

const ContactSection = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Update the handleSubmit function in your ContactSection.jsx:

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch('http://localhost:5000/api/send-email', { // Updated URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      showToast('Your message has been sent successfully. We\'ll get back to you soon!', 'success');
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        message: "",
      });
    } else {
      throw new Error(data.error || 'Failed to send message');
    }
  } catch (error) {
    console.error('Error sending message:', error);
    showToast(error.message || 'Failed to send message. Please try again later.', 'error');
  } finally {
    setIsSubmitting(false);
  }
};

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    { question: "Is this a paid website?", answer: "Not really! You can learn a lot from the free content." },
    { question: "Where can I find free content?", answer: "Sign in and explore the courses tab for free content." },
    {
      question: "Where is the office located?",
      answer: "Thadomal Shahani Engineering College, Bandra West, Mumbai - 400050, India.",
    },
    { question: "What services do you offer?", answer: "Technical support, consultancy, and project management." },
    {
      question: "Is there a guaranteed job if I buy a course?",
      answer: "Not guaranteed, but our partnered companies frequently hire fresh talents.",
    },
  ];

  return (
    <div className="w-screen px-4 sm:px-10">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Contact Section */}
      <div className="flex justify-between items-center flex-wrap gap-5">
        <div className="w-full lg:w-[48%]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11745.042308079857!2d72.81740610469349!3d19.064463782527984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c91130392c07%3A0x3c47bf391c8de931!2sThadomal%20Shahani%20Engineering%20College!5e1!3m2!1sen!2suk!4v1736501534742!5m2!1sen!2suk"
            className="w-full h-96 lg:h-[320px] border border-slate-400"
          ></iframe>
          <div className="mt-5">
            <div className="flex flex-col gap-3">
              <div className="flex gap-3 items-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-neutral-200">
                  <HiLocationMarker className="text-2xl" />
                </div>
                <h1 className="text-xl text-slate-900 dark:text-white">
                  Thadomal Shahani Engineering College, Bandra West, Mumbai - 400050 <br /> India
                </h1>                    
              </div>
              <div className="flex gap-3 items-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-neutral-200">
                  <FaPhone className="text-xl" />
                </div>
                <h1 className="text-xl text-slate-900 dark:text-white">
                  +91 9876543210 <br />
                  <span className="text-sm text-slate-700 dark:text-slate-300">Mobile</span>
                </h1>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full lg:w-[48%] flex flex-col gap-3 p-0 lg:p-3">
          <input
            type="text"
            name="firstName"
            placeholder="First Name *"
            required
            value={formData.firstName}
            onChange={handleInputChange}
            className="text-lg p-3 dark:text-white dark:placeholder-slate-300 w-full sm:w-[80%] border border-slate-400 bg-transparent outline-0 rounded"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name *"
            required
            value={formData.lastName}
            onChange={handleInputChange}
            className="text-lg p-3 dark:text-white dark:placeholder-slate-300 w-full sm:w-[80%] border border-slate-400 bg-transparent outline-0 rounded"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone *"
            required
            value={formData.phone}
            onChange={handleInputChange}
            className="text-lg p-3 dark:text-white dark:placeholder-slate-300 w-full sm:w-[80%] border border-slate-400 bg-transparent outline-0 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email *"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="text-lg p-3 dark:text-white dark:placeholder-slate-300 w-full sm:w-[80%] border border-slate-400 bg-transparent outline-0 rounded"
          />
          <textarea
            name="message"
            placeholder="Message *"
            required
            value={formData.message}
            onChange={handleInputChange}
            className="text-lg p-3 h-32 dark:text-white dark:placeholder-slate-300 w-full sm:w-[80%] border border-slate-400 bg-transparent outline-0 rounded"
          ></textarea>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="text-xl p-3 bg-main text-white dark:bg-sky-500 cursor-pointer w-full sm:w-[80%] outline-0 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
      <div className="mt-10">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-5">Frequently Asked Questions</h2>
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-slate-400 rounded-lg p-4 cursor-pointer"
              onClick={() => toggleFaq(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {faq.question}
                </h3>
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  {activeFaq === index ? "-" : "+"}
                </span>
              </div>
              {activeFaq === index && (
                <p className="mt-2 text-slate-700 dark:text-slate-300">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Chatbot Integration */}
      <Chatbot />
    </div>
  );
};

export default ContactSection;