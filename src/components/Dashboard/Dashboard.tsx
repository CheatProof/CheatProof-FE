// import React, { useState } from "react";
// import { Tab, Tabs, Box } from "@mui/material";
// import { FiDownload } from "react-icons/fi";
// import Card from "./Card";
// import { IoMdCheckmarkCircleOutline } from "react-icons/io";
// import { PiClockCountdownLight, PiExam } from "react-icons/pi";
// import dayjs, { Dayjs } from 'dayjs';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
// import Tooltip from '@mui/material/Tooltip';
// import { MdOutlineGroup } from "react-icons/md";
// import Badge from '@mui/material/Badge';
// import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
// // import { useNavigate } from "react-router-dom";



// function getRandomNumber(min: number, max: number) {
//   return Math.round(Math.random() * (max - min) + min);
// }

// function fakeFetch(date: Dayjs, { signal }: { signal: AbortSignal }) {
//   return new Promise<{ daysToHighlight: number[] }>((resolve, reject) => {
//     const timeout = setTimeout(() => {
//       const daysInMonth = date.daysInMonth();
//       const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));

//       resolve({ daysToHighlight });
//     }, 500);

//     signal.onabort = () => {
//       clearTimeout(timeout);
//       reject(new DOMException('aborted', 'AbortError'));
//     };
//   });
// }

// const initialValue = dayjs('2022-04-17');

// // Messages for specific days
// const tooltipMessages: { [key: number]: string } = {
//   1: 'Special Event on Day 1',
//   2: 'Meeting on Day 2',
//   15: 'Deadline on Day 15',
// };

// function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) {
//   const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

//   const isHighlighted = highlightedDays.includes(day.date());
//   const message = tooltipMessages[day.date()] || '';

//   return (
//     <Tooltip
//       title={isHighlighted && message ? message : 'Hello'}
//       arrow
//       disableHoverListener={!isHighlighted}
//     >
//       <Badge
//         key={day.toString()}
//         overlap="circular"
//         badgeContent={isHighlighted ? '🌚' : undefined}
//       >
//         <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
//       </Badge>
//     </Tooltip>
//   );
// }
// const Dashboard = ({analytics}:any) => {
//   const [tabValue, setTabValue] = useState(0);

//   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//     console.log(event)
//     setTabValue(newValue);
//   };

  
//   const requestAbortController = React.useRef<AbortController | null>(null);
//   const [isLoading, setIsLoading] = React.useState(false);
//   const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);

//   const fetchHighlightedDays = (date: Dayjs) => {
//     const controller = new AbortController();
//     fakeFetch(date, {
//       signal: controller.signal,
//     })
//       .then(({ daysToHighlight }) => {
//         setHighlightedDays(daysToHighlight);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         if (error.name !== 'AbortError') {
//           throw error;
//         }
//       });

//     requestAbortController.current = controller;
//   };

//   React.useEffect(() => {
//     fetchHighlightedDays(initialValue);
//     return () => requestAbortController.current?.abort();
//   }, []);

//   const handleMonthChange = (date: Dayjs) => {
//     if (requestAbortController.current) {
//       requestAbortController.current.abort();
//     }

//     setIsLoading(true);
//     setHighlightedDays([]);
//     fetchHighlightedDays(date);
//   };

//   return (
//     <div className="flex flex-wrap">
//       <div className="w-full lg:w-[67%]">
//         <div className="w-full flex justify-between">
//           <h2 className="font-bold">Recents Results</h2>
//           <select className="bg-transparent mr-3 text-sm" name="time" id="">
//             <option value={"1h"}>Last 1 hour</option>
//             <option value={"3h"}>Last 3 hour</option>
//             <option value={"8h"}>Last 8 hour</option>
//             <option value={"12h"}>Last 12 hour</option>
//             <option value={"1d"}>Last 1 day</option>
//           </select>
//         </div>

//         <div className="flex justify-center my-5 flex-wrap items-center gap-3">
//           <div className="w-full lg:w-[49%] rounded shadow flex justify-center items-center flex-col bg-white h-40 text-blackPrimary/55">
//             <div className="flex items-center">
//               <span className="text-4xl text-fore">{analytics?.GroupsCount}</span>
//               <MdOutlineGroup className="text-4xl text-purple-800" />
//             </div>
//             <p className="text-sm text-fore">Totals Groups </p>
//           </div>
//           <div className="w-full lg:w-[49%] rounded shadow flex justify-center items-center flex-col bg-white h-40 text-blackPrimary/55">
//             <div className="flex items-center">
//               <span className="text-4xl text-fore">{analytics?.TestsCount}</span>
//               <PiExam className="text-4xl text-red-600" />
//             </div>
//             <p className="text-sm text-fore">Total Tests </p>
//           </div>
//           <div className="w-full lg:w-[49%] rounded shadow flex justify-center items-center flex-col bg-white h-40 text-blackPrimary/55">
//             <div className="flex items-center">
//               <span className="text-4xl text-fore">{analytics?.InProgressTestsCount}</span>
//               <IoMdCheckmarkCircleOutline className="text-4xl text-green-600" />
//             </div>
//             <p className="text-sm text-fore">In Progress Test</p>
//           </div>
//           <div className="w-full lg:w-[49%] rounded shadow flex justify-center items-center flex-col bg-white h-40 text-blackPrimary/55">
//             <div className="flex items-center">
//               <span className="text-4xl text-fore">{analytics?.FinishedTestsCount}</span>
//               <PiClockCountdownLight className="text-4xl text-blue-500" />
//             </div>
//             <p className="text-sm text-fore">Finished Test</p>
//           </div>
//         </div>

//         {/* MUI Tabs */}
//         <Box sx={{ width: "100%" }}>
//           <Tabs value={tabValue} 
//           onChange={handleTabChange} 
//           aria-label="dashboard tabs" 
//          >
//             <Tab label="Recently Taken Test" />
//             <Tab label="Available Soon" />
//             <Tab label="Closing Soon" />
//           </Tabs>
         
//           <Box mt={2}>
//             {tabValue === 0 && <Card />}
//             {tabValue === 1 && <Card />}
//             {tabValue === 2 && <Card />}
//           </Box>
//         </Box>
//       </div>

//       <div className="w-full px-4 py-7 lg:w-[33%]">

//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DateCalendar
//         defaultValue={initialValue}
//         loading={isLoading}
//         onMonthChange={handleMonthChange}
//         renderLoading={() => <DayCalendarSkeleton />}
//         slots={{
//           day: ServerDay,
//         }}
//         slotProps={{
//           day: {
//             highlightedDays,
//           } as any,
//         }}
//       />
//     </LocalizationProvider>

//         <h2 className="text-black/45 border-b-[0.05rem] border-black/45 py-3 font-bold text-sm">Shortcuts</h2>
//         <ul>
//           <li className="mt-3 list-none">
//             <a className="text-color1 font-semibold text-sm hover:cursor-pointer" href="/teacher-dashboard/alltests">Create a Test</a>
//           </li>
//           <li className="mt-3 list-none">
//             <a className="text-color1 font-semibold text-sm hover:cursor-pointer" href="/teacher-dashboard/selecttest">Assign a Test</a>
//           </li>
//         </ul>

//         <h2 className="text-black/45 border-b-[0.05rem] border-black/45 py-3 font-bold text-sm mt-5">Activity</h2>
//         <div className="flex justify-between mt-3 items-center">
//           <p className="text-sm">Download recent activity</p>
//           <FiDownload />
//         </div>

//         <h2 className="text-black/45 border-b-[0.05rem] border-black/45 py-3 font-bold text-sm mt-5">Emails</h2>
//         <div className="flex justify-between mt-3 items-center">
//           <p className="text-sm">
//             <strong>0</strong> email in queue
//           </p>
//           <FiDownload />
//         </div>
//         <div className="flex justify-between mt-3 items-center">
//           <p className="text-sm">
//             <strong>0</strong> email sent
//           </p>
//           <FiDownload />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import { Users, GraduationCap, Clock, CheckCircle, Download, Mail, Plus ,Calendar as Cal  } from 'lucide-react';
import { Calendar } from "../ui/calendar";


// Fake analytics data
// const analyticsData = {
//   groupsCount: 12,
//   testsCount: 45,
//   inProgressTestsCount: 8,
//   finishedTestsCount: 37
// };

// Fake recent tests data


const recentTests = [
  { id: 1, name: 'Final Mathematics Exam', class: 'Grade 12A', date: '2024-03-15', status: 'completed', submissions: 28 },
  { id: 2, name: 'Physics Mid-term', class: 'Grade 11B', date: '2024-03-14', status: 'in-progress', submissions: 15 },
  { id: 3, name: 'Chemistry Quiz', class: 'Grade 10C', date: '2024-03-13', status: 'upcoming', submissions: 0 }
];




function App({analyticsData}:any) {
  const [activeTab, setActiveTab] = useState('recent');
  // const [currentDate, setCurrentDate] = useState(dayjs());
    const [date, setDate] = React.useState<Date | undefined>(new Date())
  







// Messages for specific days







 


  // Simulate loading calendar events
  useEffect(() => {
    // This would normally fetch real data
  }, []);

  const StatCard = ({ icon, value, label, color }:any) => (
    <div className="bg-white rounded-xl shadow-sm p-6 flex items-center space-x-4">
      <div className={`p-3 rounded-lg ${color}`}>
        {/* <Icon className="w-6 h-6 text-white" /> */}
        {icon}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen m-0 bg-gray-50">
      {/* Header */}
      {/* <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
            </div>
          </div>
        </div>
      </header> */}

      <main className="max-w-7xl mx-auto  sm:px-6  py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={<Users/>} 
            value={analyticsData?.GroupsCount} 
            label="Total Groups"
            color="bg-color1/20"
          />
          <StatCard 
            icon={<GraduationCap/>} 
            value={analyticsData?.TestsCount} 
            label="Total Tests"
            color="bg-color1/20"
          />
          <StatCard 
            icon={<Clock/>} 
            value={analyticsData?.InProgressTestsCount} 
            label="In Progress"
            color="bg-color1/20"
          />
          <StatCard 
            icon={<CheckCircle/>} 
            value={analyticsData?.FinishedTestsCount} 
            label="Completed"
            color="bg-color1/20"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="space-x-4">
                  <button 
                    onClick={() => setActiveTab('recent')}
                    className={`px-4 py-2 rounded-lg ${
                      activeTab === 'recent' 
                        ? 'bg-indigo-50 text-indigo-600' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Recent Tests
                  </button>
                  <button 
                    onClick={() => setActiveTab('upcoming')}
                    className={`px-4 py-2 rounded-lg ${
                      activeTab === 'upcoming' 
                        ? 'bg-indigo-50 text-indigo-600' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Upcoming
                  </button>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  <Plus className="w-4 h-4" />
                  <span>New Test</span>
                </button>
              </div>

              <div className="space-y-4">
                {recentTests.map(test => (
                  <div key={test.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{test.name}</h3>
                        <p className="text-sm text-gray-500">{test.class}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        test.status === 'completed' ? 'bg-green-100 text-green-800' :
                        test.status === 'in-progress' ? 'bg-amber-100 text-amber-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <Cal className="w-4 h-4 mr-2" />
                      {test.date}
                      <span className="mx-2">•</span>
                      <Users className="w-4 h-4 mr-2" />
                      {test.submissions} submissions
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Calendar Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Calendar</h2>
              <div className="border rounded-lg p-4">
                {/* Calendar component would go here */}
                   <Calendar
                           mode="single"
                           selected={date}
                           onSelect={setDate}
                           className="rounded-md w-fit mx-auto"
                       />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-4">
                <button className="w-full text-left px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Test
                </button>
                <button className="w-full text-left px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Groups
                </button>
                <button className="w-full text-left px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Download Reports
                </button>
              </div>
            </div>

            {/* Email Status */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Email Status</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    Emails in Queue
                  </div>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Emails Sent Today
                  </div>
                  <span className="font-semibold">12</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;