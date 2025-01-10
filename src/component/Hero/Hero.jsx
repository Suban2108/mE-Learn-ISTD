import React, { useState, useEffect, useContext } from "react";
import { Images } from "../../Assets/images";
import { CourseContext } from "../../Context/CourseContextProvider/CourseContextProvider";
import { AuthenticationContext } from "../../Context/AuthenticationContextProvider/AuthenticationContextProvider";
import { ThemeContext } from "../../Context/ThemeContextProvider/ThemeContextProvider";
import SectionSkeleton from "../../Skeleton/SectionSkeleton";
import Alert from "../Alert/Alert";

const Hero = () => {
  const { isLoading } = useContext(CourseContext);
  const { alert } = useContext(AuthenticationContext);
  const { Dark } = useContext(ThemeContext);
  const [videoSrc, setVideoSrc] = useState("/videos/light-bg.mp4");

  useEffect(() => {
    // Update video source based on theme
    setVideoSrc(Dark === "dark" ? "/videos/dark-bg.mp4" : "/videos/ligt-bg.mp4");
  }, [Dark]); // Re-run effect when theme changes

  if (!videoSrc) {
    return null;
  }

  return (
    <div className="relative w-full min-h-screen">
      {/* Background Video */}
      <video
        key={videoSrc} // Add key to force video reload when source changes
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1] blur-sm"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {isLoading ? (
        <SectionSkeleton
          m="mb-14"
          p="py-44"
          h="h-[400px]"
          w="w-[500px]"
          h2={true}
          mt={true}
        />
      ) : (
        <>
          {alert && (
            <Alert
              abs={true}
              text="You've successfully logged out of SomTac. Come back soon i.a!"
            />
          )}

          <div className="w-screen py-56 sm:py-32 flex-wrap px-4 sm:px-10 flex justify-between items-center">
            <div className="w-full lg:w-[48%]">
              <h1 className="font-base text-4xl dark:text-white text-center lg:text-left lg:text-6xl sm:text-5xl">
                Learn from <span className="font-bold">Nothing</span> <br />
                to be{" "}
                <span className="font-bold text-sky-900 dark:text-sky-500">
                  Something
                </span>{" "}
                <br />
              </h1>
              <p className="text-gray-1000 dark:text-gray-200 text-center lg:text-left mt-8 text-lg font-base w-full lg:w-[470px]">
                mELearn is an online learning and teaching marketplace with over
                100+ courses that can improve your skill better
              </p>
            </div>
            <div className="mt-10 md:mt-0 w-full lg:w-[50%] flex justify-center lg:justify-end">
              <img src={Images && Images.Hero} className="w-full" alt="" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Hero;