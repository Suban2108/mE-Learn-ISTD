import React, { useState, useEffect } from "react";

const AboutInfo = ({ inf = {} }) => (
  <div className="w-[46%] md:w-[30%] text-center">
    <h1 className="text-5xl text-sky-500 font-bold">
      {inf.total || '0'}
    </h1>
    <span className="text-lg font-base text-center capitalize text-slate-500 dark:text-slate-300">
      {inf.name || 'Stat'}
    </span>
  </div>
);

const About = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/iAmYaxYa/api/main/config/info.json")
      .then(response => response.json())
      .then(data => {
        setData(data);
        setIsLoading(false);
      })
      .catch(() => {
        setData([
          { id: 1, total: "300+", name: "Students" },
          { id: 2, total: "20+", name: "Courses" },
          { id: 3, total: "10+", name: "Instructors" }
        ]);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="dark:bg-slate-900 pb-20">
      {/* First Section - Image on Left */}
      <div className="w-screen pt-24 px-4 sm:px-10">
        <div className="flex justify-between items-start flex-wrap gap-8">
          <div className="w-full md:w-[50%] flex items-center justify-center">
                    <img 
            src="/images/webdevlopment.png" 
            alt="About mE-Learn"
            className="w-full max-w-[450px] rounded-lg shadow-lg"
          />

          </div>
          <div className="w-full md:w-[45%]">
            <div className="mb-12">
              <h1 className="text-4xl text-left dark:text-white mb-4">
                <span className="text-sky-500 font-medium">Who </span>
                are we?
              </h1>
              <p className="text-lg dark:text-gray-300">
                At mE-Learn, we are passionate about empowering learners to excel in the field of computer science. Our platform is a one-stop solution for students, professionals, and enthusiasts looking to build or enhance their technical skills.
              </p>
            </div>
            
            <div className="mb-12">
              <h1 className="text-4xl text-left dark:text-white mb-4">
                <span className="text-sky-500 font-medium">Our </span>
                Mission
              </h1>
              <p className="text-lg dark:text-gray-300">
                To democratize computer science education by offering high-quality, affordable, and accessible learning resources to everyone, anywhere in the world.
              </p>
            </div>

            <div className="mb-12">
              <h1 className="text-4xl text-left dark:text-white mb-4">
                <span className="text-sky-500 font-medium">Our </span>
                Vision
              </h1>
              <p className="text-lg dark:text-gray-300">
                To inspire and nurture a generation of innovators and problem-solvers by delivering a comprehensive and engaging learning experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Second Section - Image on Right */}
      <div className="w-screen px-4 sm:px-10 mt-20">
        <div className="flex flex-wrap justify-between items-start gap-8">
          <div className="w-full md:w-[45%]">
            <div className="mb-12">
              <h1 className="text-4xl text-left dark:text-white mb-4">
                <span className="text-sky-500 font-medium">What </span>
                sets us apart?
              </h1>
              <ul className="text-lg dark:text-gray-300 space-y-4">
                <li><b>Expert-Led Courses:</b> Our content is crafted and delivered by industry experts and seasoned educators.</li>
                <li><b>Hands-On Learning:</b> Practical projects, coding challenges, and real-world scenarios ensure you gain skills that matter.</li>
                <li><b>Personalized Learning Paths:</b> Tailored courses and progress tracking to meet your specific goals and interests.</li>
                <li><b>Community Support:</b> A thriving community of learners and mentors to guide and grow with you.</li>
                <li><b>State-of-the-Art Tools:</b> Access to simulators, coding sandboxes, and the latest tech trends to stay ahead of the curve.</li>
              </ul>
            </div>

            <div className="mb-12">
              <h1 className="text-4xl text-left dark:text-white mb-4">
                <span className="text-sky-500 font-medium">Why </span>
                Choose mE-Learn?
              </h1>
              <p className="text-lg dark:text-gray-300">
                Whether you're a beginner taking your first steps or a professional aiming to advance your career, mELearn is here to support your journey every step of the way. Join us today and unlock the door to endless possibilities in computer science!
              </p>
            </div>
          </div>
          <div className="w-full md:w-[50%] flex items-center justify-center">
                      <img 
              src="/images/About.png" 
              alt="About mE-Learn"
              className="w-full max-w-[450px] rounded-lg shadow-lg"
            />

          </div>
        </div>
      </div>

      
    </div>
  );
};

export default About;