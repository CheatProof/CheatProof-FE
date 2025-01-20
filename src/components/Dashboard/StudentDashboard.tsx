import React, { useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import Tooltip from '@mui/material/Tooltip';
import { MdOutlineArrowRightAlt, MdOutlineGroup } from "react-icons/md";
import Badge from '@mui/material/Badge';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { fetchIncompleteTestsByStudent, fetchStudentGroupsBySession, resumeTest } from "@/api/test-session";
import { useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner";
// import AssignTest from "@/pages/Test/AssignTest";

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
        badgeContent={isHighlighted ? '' : undefined}
      >
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </Badge>
    </Tooltip>
  );
}



const StudentDashboard: React.FC = () => {

  const navigate = useNavigate()

  const [groups,setGroups]= useState([])
  const [inCompleteTestSessions,setInCompleteTestSessions]=useState<any>([]);
  const [groupLoading, setGroupLoading] = useState(false)

  const fetchGroups = async( )=>{
    // fetch groups data from API
    // return groups data
    setGroupLoading(true);
    const data = await fetchStudentGroupsBySession();
    setGroups(data.data)
    setGroupLoading(false);
    console.log(data.data)
    

  }  

  // fetchIncompleteTestsByStudent
  const getIncompleteTestsByStudent = async () => {
    // fetch incomplete tests data from API
    // return incomplete tests data
    const data = await fetchIncompleteTestsByStudent();
    setInCompleteTestSessions(data.data)
    console.log(data.data)
    console.log(JSON.parse(data.data[0].test))
  }

  React.useEffect(() => {
    localStorage.removeItem('selectedAnswers');
    localStorage.removeItem('timer');
    localStorage.removeItem('currentQuestion');
    sessionStorage.removeItem('showInstructions');
    localStorage.removeItem('testStarted');
    localStorage.removeItem('tabSwitchCount');
    fetchGroups();
    getIncompleteTestsByStudent();
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
    <div className="flex flex-wrap min-h-[78vh]">
      <div className="w-full lg:w-[67%]">
        <div className="w-full flex justify-between">
          <h2 className="font-bold text-3xl ">Groups</h2>
          <select className="bg-transparent mr-3 text-sm" name="time" id="">
            <option value={"1h"}>Last 1 hour</option>
            <option value={"3h"}>Last 3 hour</option>
            <option value={"8h"}>Last 8 hour</option>
            <option value={"12h"}>Last 12 hour</option>
            <option value={"1d"}>Last 1 day</option>
          </select>
        </div>

        {groupLoading ? (
                    <div className="flex justify-center items-center h-40">
                      <Circles height="80" width="80" color="#152487" ariaLabel="loading" />
                    </div>
                  ) : (

        <div className="flex flex-col justify-center my-5 flex-wrap items-center gap-3">

          {groups.map((group:any) =>(
            <div key={group.id} className="w-full  rounded shadow flex  items-center justify-between p-3  bg-white  text-blackPrimary/55">
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
        

        </div>
                  )}
       {inCompleteTestSessions.length !== 0 && <h2 className="font-bold text-3xl my-4">Resume Test</h2>}

        {inCompleteTestSessions.map((testSession:any) =>(
            <div key={testSession.id} className="w-full  rounded shadow flex  items-center justify-between p-3  bg-white  text-blackPrimary/55">
            <div className="flex  items-center">
              <div className="flex items-center">
             
                <MdOutlineGroup className="text-4xl mr-1 bg-slate-100 rounded-full p-1 text-purple-800" />
              </div>
  
              <p className="text-sm">{testSession.AssignedTests.Tests.testName}</p>
              </div>
              <div className="flex items-center">
             
             <MdOutlineArrowRightAlt onClick={async()=>{
                  // localStorage.removeItem('selectedAnswers');
                  // localStorage.removeItem('timer');
                  // localStorage.removeItem('currentQuestion');
                  // sessionStorage.removeItem('showInstructions');
                  // localStorage.removeItem('testStarted');
                  // localStorage.removeItem('tabSwitchCount');
                  const response =await resumeTest({testSessionId:testSession.id,assignedTestId:testSession.assignedTestId})
                  if(response.code === 200){
                    console.log('Test resumed successfully')
                    sessionStorage.setItem('showInstructions',"false");
                    localStorage.setItem('testStarted',"true");
                    localStorage.setItem('tabSwitchCount',"0");
                    localStorage.setItem('Questions', JSON.stringify(JSON.parse(testSession.test).Tests.Questions));
                    localStorage.setItem('selectedAnswers', JSON.stringify(response.data.attemptedQuestions));
                    navigate(`/test-session/${testSession.assignedTestId}?sessionId=${testSession.id}`,{
                      state:{
        
                        testSession: testSession,
                        quiz:{
                          AssignedTests:JSON.parse(testSession.test)
                        }
                      }
                     })
                  }else{
                    console.log('Failed to resume test')
                  }
}} className="text-4xl mr-1 bg-slate-100 rounded-full p-1 text-purple-800 hover:bg-slate-400 hover:text-white" />
           </div>
         </div>

          ))
          }



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

   
        <h2 className="text-black/45 border-b-[0.05rem] border-black/45 py-3 font-bold text-xs">Today's Schedule (Under Development)</h2>
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
