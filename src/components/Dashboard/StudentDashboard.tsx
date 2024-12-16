import React, { useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { PiClockCountdownLight, PiExam } from "react-icons/pi";
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import Tooltip from '@mui/material/Tooltip';
import { MdOutlineArrowRightAlt, MdOutlineGroup, MdToday } from "react-icons/md";
import Badge from '@mui/material/Badge';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { fetchStudentGroupsBySession } from "@/api/test-session";
import { group } from "console";
import { useNavigate } from "react-router-dom";

function getRandomNumber(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

function fakeFetch(date: Dayjs, { signal }: { signal: AbortSignal }) {
  return new Promise<{ daysToHighlight: number[] }>((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException('aborted', 'AbortError'));
    };
  });
}

const initialValue = dayjs('2022-04-17');

// Messages for specific days
const tooltipMessages: { [key: number]: string } = {
  1: 'Special Event on Day 1',
  2: 'Meeting on Day 2',
  15: 'Deadline on Day 15',
};

function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isHighlighted = highlightedDays.includes(day.date());
  const message = tooltipMessages[day.date()] || '';

  return (
    <Tooltip
      title={isHighlighted && message ? message : 'Hello'}
      arrow
      disableHoverListener={!isHighlighted}
    >
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent={isHighlighted ? '🌚' : undefined}
      >
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </Badge>
    </Tooltip>
  );
}



const StudentDashboard: React.FC = () => {

  const navigate = useNavigate()

  const [groups,setGroups]= useState([])

  const fetchGroups = async( )=>{
    // fetch groups data from API
    // return groups data
    const data = await fetchStudentGroupsBySession();
    setGroups(data.data)
    console.log(data.data)

  }  

  React.useEffect(() => {
    fetchGroups()
  }, [])

  
  const requestAbortController = React.useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);

  const fetchHighlightedDays = (date: Dayjs) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full lg:w-[67%]">
        <div className="w-full flex justify-between">
          <h2 className="font-bold">Groups</h2>
          <select className="bg-transparent mr-3 text-sm" name="time" id="">
            <option value={"1h"}>Last 1 hour</option>
            <option value={"3h"}>Last 3 hour</option>
            <option value={"8h"}>Last 8 hour</option>
            <option value={"12h"}>Last 12 hour</option>
            <option value={"1d"}>Last 1 day</option>
          </select>
        </div>

        <div className="flex flex-col justify-center my-5 flex-wrap items-center gap-3">

          {
          groups.map((group:any) =>(
            <div className="w-full  rounded shadow flex  items-center justify-between p-3  bg-white  text-blackPrimary/55">
            <div className="flex  items-center">
              <div className="flex items-center">
             
                <MdOutlineGroup className="text-4xl mr-1 bg-slate-100 rounded-full p-1 text-purple-800" />
              </div>
  
              <p className="text-sm">{group.groupName}</p>
              </div>
              <div className="flex items-center">
             
             <MdOutlineArrowRightAlt onClick={()=>navigate(`/student-dashboard/group-tests/${group.id}`,{
              state:{
                group: group,
              }
             })} className="text-4xl mr-1 bg-slate-100 rounded-full p-1 text-purple-800 hover:bg-slate-400 hover:text-white" />
           </div>
         </div>

          ))
          }
        
{/* 
          <div className="w-full lg:w-[49%] rounded shadow flex justify-center items-center flex-col bg-white h-40 text-blackPrimary/55">
            <div className="flex items-center">
              <span className="text-4xl">2</span>
              <PiExam className="text-4xl text-red-600" />
            </div>
            <p className="text-sm">Total Tests </p>
          </div> */}
          {/* <div className="w-full lg:w-[49%] rounded shadow flex justify-center items-center flex-col bg-white h-40 text-blackPrimary/55">
            <div className="flex items-center">
              <span className="text-4xl">0</span>
              <IoMdCheckmarkCircleOutline className="text-4xl text-green-600" />
            </div>
            <p className="text-sm">In Progress Test</p>
          </div> */}
          {/* <div className="w-full lg:w-[49%] rounded shadow flex justify-center items-center flex-col bg-white h-40 text-blackPrimary/55">
            <div className="flex items-center">
              <span className="text-4xl">0</span>
              <PiClockCountdownLight className="text-4xl text-blue-500" />
            </div>
            <p className="text-sm">Finished Test</p>
          </div> */}
        </div>

        {/* MUI Tabs */}
        {/* <Box sx={{ width: "100%" }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="dashboard tabs">
            <Tab label="Recently Taken Test" />
            <Tab label="Available Soon" />
            <Tab label="Closing Soon" />
          </Tabs>
          <Box mt={2}>
            {tabValue === 0 && <Card />}
            {tabValue === 1 && <Card />}
            {tabValue === 2 && <Card />}
          </Box>
        </Box> */}
      </div>

      <div className="w-full px-4  lg:w-[33%]">

        <p className="bg-white rounded text-black/55 text-xs p-3">
        When you are registered in multiple Groups, each Group may contain separate Tests for you to take. <br /> <br />

Change Groups to check for available Tests under each Group.
        </p>

   
        <h2 className="text-black/45 border-b-[0.05rem] border-black/45 py-3 font-bold text-xs">Today's Schedule</h2>
        {/* <p className="flex pt-1 text-sm">
          <MdToday className="text-xl mr-1" />
          {initialValue.format('dddd, MMMM Do YYYY')}
      </p> */}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={initialValue}
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          } as any,
        }}
      />
    </LocalizationProvider>

        {/* <h2 className="text-black/45 border-b-[0.05rem] border-black/45 py-3 font-bold text-sm">Shortcuts</h2>
        <ul>
          <li className="mt-3 list-none">
            <a className="text-sky-500 font-semibold text-sm">Create a Test</a>
          </li>
          <li className="mt-3 list-none">
            <a className="text-sky-500 font-semibold text-sm">Assign a Test</a>
          </li>
        </ul>

        <h2 className="text-black/45 border-b-[0.05rem] border-black/45 py-3 font-bold text-sm mt-5">Activity</h2>
        <div className="flex justify-between mt-3 items-center">
          <p className="text-sm">Download recent activity</p>
          <FiDownload />
        </div>

        <h2 className="text-black/45 border-b-[0.05rem] border-black/45 py-3 font-bold text-sm mt-5">Emails</h2>
        <div className="flex justify-between mt-3 items-center">
          <p className="text-sm">
            <strong>0</strong> email in queue
          </p>
          <FiDownload />
        </div>
        <div className="flex justify-between mt-3 items-center">
          <p className="text-sm">
            <strong>0</strong> email sent
          </p>
          <FiDownload />
        </div> */}
      </div>
    </div>
  );
};

export default StudentDashboard;
