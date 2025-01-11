import React, { useEffect, useState } from "react";
import { FaEdit, FaSave, FaUpload, FaCalendarCheck, FaBookmark, FaPlayCircle } from "react-icons/fa";
import { BsFire } from 'react-icons/bs';
import ContributionCalendar from './ContributionCalendar';
import axios from 'axios';

const UserDashboard = ({ user }) => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.username || "John Doe",
    college_name: "Thadomal Shahani Engineering College",
    bio: "Aspiring developer with a passion for learning and building impactful projects.",
    image_path: null, // Stores the uploaded image URL
    _id: user?._id,
    streak: 0,
    completedCourses: 0,
    hoursWatched: 0
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        if (!token) throw new Error("No token found");

        const response = await axios.get("http://localhost:6002/user/login-single", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(response.data);  // Set the fetched profile data
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditToggle = () => setEditMode(!editMode);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(`http://localhost:6002/user/upload-image/${profile._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const { image_path } = response.data;
        setProfile((prev) => ({ ...prev, image_path }));
      } catch (error) {
        console.error("Error uploading the profile picture:", error);
      }
    }
  };

  const handleSaveProfile = async () => {
    try {
      const response = await axios.put(`http://localhost:6002/user/profile-update/${profile._id}`, profile);

      setTimeout(() => {
        window.location.reload();
      }, 300);
      setEditMode(false); // Switch back to view mode
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Update stats
  const updateStats = async () => {
    try {
      const response = await axios.put('http://localhost:6002/user/update-stats', {
        streak: profile.streak,
        completedCourses: profile.completedCourses,
        hoursWatched: profile.hoursWatched,
      }, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });

      console.log("Stats updated:", response.data.message);
    } catch (error) {
      console.error("Error updating stats:", error);
    }
  };

  // Example to simulate an update of stats
  const handleCourseCompletion = () => {
    setProfile((prev) => ({
      ...prev,
      completedCourses: prev.completedCourses + 1,
    }));
    updateStats();
  };

  const handleWatchHours = (hours) => {
    setProfile((prev) => ({
      ...prev,
      hoursWatched: prev.hoursWatched + hours,
    }));
    updateStats();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-6 mt-3">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-main dark:bg-sky-500 rounded-full flex items-center justify-center text-4xl text-white font-bold overflow-hidden">
                {profile.image_path ? (
                  <img
                    src={`http://localhost:6002/user/image/${profile._id}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  profile.name[0].toUpperCase()
                )}
              </div>
              {editMode && (
                <label
                  htmlFor="profilePicture"
                  className="absolute bottom-0 right-0 bg-main dark:bg-sky-500 p-2 rounded-full cursor-pointer"
                >
                  <FaUpload className="text-white" />
                  <input
                    type="file"
                    id="profilePicture"
                    className="hidden"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                  />
                </label>
              )}
            </div>
            <div className="text-center sm:text-left w-full">
              {editMode ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    className="block w-full text-2xl font-bold text-gray-900 dark:text-white bg-transparent border-b border-gray-300 focus:outline-none"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    name="college_name"
                    value={profile.college_name}
                    onChange={handleInputChange}
                    className="block w-full mt-2 text-gray-600 dark:text-gray-300 bg-transparent border-b border-gray-300 focus:outline-none"
                    placeholder="College"
                  />
                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleInputChange}
                    className="block w-full mt-2 text-gray-600 dark:text-gray-300 bg-transparent border-b border-gray-300 focus:outline-none resize-none"
                    placeholder="Bio"
                    rows={3}
                  />
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {profile.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    {profile.college_name}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    {profile.bio}
                  </p>
                </>
              )}
            </div>
            <button
              onClick={editMode ? handleSaveProfile : handleEditToggle}
              className="flex items-center gap-2 px-4 py-2 bg-main text-white dark:bg-sky-500 rounded-lg shadow hover:bg-main/80 dark:hover:bg-sky-400 transition"
            >
              {editMode ? <FaSave /> : <FaEdit />}
              {editMode ? "Save" : "Edit"}
            </button>
          </div>
        </div>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Streak Card */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-main/10 dark:bg-sky-500/10 rounded-full">
                <BsFire className="h-6 w-6 text-main dark:text-sky-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Current Streak
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {profile.streak} days
                </p>
              </div>
            </div>
          </div>

          {/* Completed Courses Card */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-main/10 dark:bg-sky-500/10 rounded-full">
                <FaCalendarCheck className="h-6 w-6 text-main dark:text-sky-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Completed Courses
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {profile.completedCourses}
                </p>
              </div>
            </div>
          </div>

          {/* Hours Watched Card */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-main/10 dark:bg-sky-500/10 rounded-full">
                <FaPlayCircle className="h-6 w-6 text-main dark:text-sky-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Hours Watched
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {profile.hoursWatched} hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar (if needed) */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
          <ContributionCalendar />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5">
          {/* Recent Activity */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {Array.isArray(profile.recentActivity) && profile.recentActivity.length > 0 ? (
                profile.recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <div className="h-10 w-10 bg-gray-200 dark:bg-slate-600 rounded flex items-center justify-center">
                      <FaPlayCircle className="h-5 w-5 text-main dark:text-sky-500" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.activityName} {/* Dynamically display activity name */}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(activity.time).toLocaleString()} {/* Display formatted time */}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No recent activity</p>
              )}

            </div>
          </div>

          {/* Saved Roadmaps */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Saved Roadmaps
            </h2>
            <div className="space-y-4">
              {Array.isArray(profile.savedRoadmaps) && profile.savedRoadmaps.length > 0 ? (
                profile.savedRoadmaps.map((roadmap, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <div className="h-10 w-10 bg-gray-200 dark:bg-slate-600 rounded flex items-center justify-center">
                      <FaBookmark className="h-5 w-5 text-main dark:text-sky-500" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {roadmap} {/* Dynamically display roadmap name */}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {/* You can add more details like the number of courses if you have this information */}
                        Courses data is unavailable
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No saved roadmaps</p>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
