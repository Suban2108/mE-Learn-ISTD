import React from 'react';
import { FaCalendarCheck, FaBookmark, FaPlayCircle } from 'react-icons/fa';
import { BsFire } from 'react-icons/bs';
import ContributionCalendar from './ContributionCalendar';

const UserDashboard = ({ user }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-20 px-4 sm:px-6 lg:px-8">
      {/* Profile Header */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-6 mt-3">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-main dark:bg-sky-500 rounded-full flex items-center justify-center text-4xl text-white font-bold">
              {user?.username?.[0]?.toUpperCase()}
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user?.username}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">{user?.email}</p>
            </div>
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
                  7 days
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
                  3
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
                  12.5
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <ContributionCalendar />
        </div>

        {/* Recent Activity and Saved Roadmaps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <div className="h-10 w-10 bg-gray-200 dark:bg-slate-600 rounded flex items-center justify-center">
                    <FaPlayCircle className="h-5 w-5 text-main dark:text-sky-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Introduction to React Hooks
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Watched 2 hours ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Saved Roadmaps */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Saved Roadmaps
            </h2>
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <div className="h-10 w-10 bg-gray-200 dark:bg-slate-600 rounded flex items-center justify-center">
                    <FaBookmark className="h-5 w-5 text-main dark:text-sky-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Full Stack Development
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      15 courses • 40 hours
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;