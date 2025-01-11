import React, { useState } from 'react';
import Modal from '../Modal/Modal';

const FreeCourseItem = ({ course }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const handlePurchase = () => {
    setPurchased(true);
    setTimeout(() => {
      setShowDetails(false);
      setPurchased(false);
    }, 2000);
  };

  return (
    <>
      <div 
        onClick={() => setShowDetails(true)}
        className="basis-[48%] xl:basis-[18%] lg:basis-[23%] sm:basis-[30%] cursor-pointer 
          p-4 rounded-lg group relative 
          bg-white dark:bg-gray-800
          hover:shadow-xl transform transition-all duration-300 ease-in-out
          hover:-translate-y-2 hover:scale-105"
      >
        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 
          group-hover:opacity-20 rounded-lg transition-opacity duration-300"></div>
        
        {/* Image container with animation */}
        <div className="relative overflow-hidden rounded-full mb-4 mx-auto w-24 h-24">
          <img 
            src={course.imageUrl} 
            alt={course.title}
            className="w-full h-full object-cover 
              transform transition-transform duration-300 
              group-hover:scale-110"
          />
          {/* Overlay effect */}
          <div className="absolute inset-0 bg-blue-500 opacity-0 
            group-hover:opacity-20 transition-opacity duration-300 rounded-full"></div>
        </div>

        {/* Title with animation */}
        <p className="text-center font-medium dark:text-white relative">
          <span className="block transform transition-transform duration-300 
            group-hover:scale-105">
            {course.title}
          </span>
          {/* Animated underline */}
          <span className="block h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-500 
            mx-auto transition-all duration-300 
            group-hover:w-full"></span>
        </p>

        {/* Hover badge */}
        <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full 
          opacity-0 transform translate-y-2 transition-all duration-300
          group-hover:opacity-100 group-hover:translate-y-0 text-sm">
          Click to view
        </div>
      </div>

      <Modal isOpen={showDetails} onClose={() => setShowDetails(false)}>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold dark:text-white">{course.title}</h2>
          
          <img 
            src={course.imageUrl} 
            alt={course.title}
            className="w-full h-48 object-cover rounded-lg transform transition-transform duration-300 hover:scale-105"
          />
          
          <div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Description</h3>
            <p className="text-gray-700 dark:text-gray-300">{course.description}</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">What You'll Learn</h3>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
              {course.learningPoints.map((point, index) => (
                <li key={index} className="hover:text-blue-500 transition-colors duration-200">
                  {point}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Prerequisites</h3>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
              {course.prerequisites.map((prereq, index) => (
                <li key={index} className="hover:text-blue-500 transition-colors duration-200">
                  {prereq}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-6">
            {purchased ? (
              <div className="text-center text-green-600 font-semibold p-4 bg-green-50 
                dark:bg-green-900/20 rounded animate-pulse">
                Successfully purchased! Enjoy your course.
              </div>
            ) : (
              <button
                onClick={handlePurchase}
                className="bg-main text-center w-full py-3 text-white rounded dark:bg-sky-500 
                  transform transition-all duration-300
                  hover:scale-105 hover:shadow-lg hover:opacity-90"
              >
                Enroll Now (Free)
              </button>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FreeCourseItem;