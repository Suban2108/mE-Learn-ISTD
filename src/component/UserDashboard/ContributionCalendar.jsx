import React from 'react';
import { format, eachDayOfInterval, startOfYear, addDays, startOfWeek } from 'date-fns';

const ContributionCalendar = () => {
  // Get starting date (1 year ago from today)
  const endDate = new Date();
  const startDate = startOfYear(endDate);

  // Generate data for the entire year
  const generateContributions = () => {
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    const data = {};
    days.forEach(date => {
      // Random contribution count between 0-4 and time watched between 30-120 minutes
      data[format(date, 'yyyy-MM-dd')] = {
        count: Math.floor(Math.random() * 5),
        timeWatched: Math.floor(Math.random() * 91) + 30 // Random minutes between 30 and 120
      };
    });
    return data;
  };

  const contributions = generateContributions();

  // Get contribution level for styling
  const getContributionLevel = (count) => {
    if (count === 0) return 'bg-gray-800';
    if (count === 1) return 'bg-green-900';
    if (count === 2) return 'bg-green-700';
    if (count === 3) return 'bg-green-500';
    return 'bg-green-300';
  };

  // Generate month labels
  const getMonthLabels = () => {
    const months = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
      months.push(format(currentDate, 'MMM'));
      currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    }
    return months;
  };

  // Generate calendar grid
  const generateCalendarData = () => {
    const weeks = [];
    const dayLabels = ['Mon', 'Wed', 'Fri'];
    let currentDate = startDate;
    
    // Adjust to start from Monday
    const firstMonday = startOfWeek(currentDate, { weekStartsOn: 1 });
    currentDate = firstMonday;

    while (currentDate <= endDate) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        const dateStr = format(currentDate, 'yyyy-MM-dd');
        week.push({
          date: dateStr,
          count: contributions[dateStr]?.count || 0,
          timeWatched: contributions[dateStr]?.timeWatched || 0
        });
        currentDate = addDays(currentDate, 1);
      }
      weeks.push(week);
    }

    return { weeks, dayLabels };
  };

  const { weeks, dayLabels } = generateCalendarData();
  const monthLabels = getMonthLabels();

  return (
    <div className="bg-slate-900 rounded-lg shadow-md p-6 overflow-x-auto">
      <h2 className="text-xl font-bold text-white mb-4">
        Contribution Activity
      </h2>
      <div className="min-w-max">
        {/* Month labels */}
        <div className="flex mb-2">
          <div className="w-8" /> {/* Spacer for day labels */}
          <div className="flex justify-between flex-1">
            {monthLabels.map((month, i) => (
              <span key={i} className="text-xs text-gray-400">{month}</span>
            ))}
          </div>
        </div>

        <div className="flex">
          {/* Day labels */}
          <div className="flex flex-col justify-around mr-2">
            {dayLabels.map((day, i) => (
              <span key={i} className="text-xs text-gray-400 h-3">{day}</span>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="flex gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-rows-7 gap-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-3 h-3 rounded-sm ${getContributionLevel(day.count)} 
                    transition-colors duration-200 hover:ring-1 hover:ring-gray-400 cursor-pointer`}
                    title={`${day.count} contributions on ${day.date}. Time watched: ${day.timeWatched} mins`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-end text-xs text-gray-400">
          <span className="mr-2">Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-gray-800 rounded-sm" />
            <div className="w-3 h-3 bg-green-900 rounded-sm" />
            <div className="w-3 h-3 bg-green-700 rounded-sm" />
            <div className="w-3 h-3 bg-green-500 rounded-sm" />
            <div className="w-3 h-3 bg-green-300 rounded-sm" />
          </div>
          <span className="ml-2">More</span>
        </div>
      </div>
    </div>
  );
};

export default ContributionCalendar;
