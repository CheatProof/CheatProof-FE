import React, { useState } from "react";
import  { Dayjs } from "dayjs";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
// import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { fetchIncompleteTestsByStudent, fetchStudentGroupsBySession, resumeTest } from "@/api/test-session";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { MdOutlineArrowRightAlt, MdOutlineGroup } from "react-icons/md";
import { Calendar } from "../ui/calendar";

const tooltipMessages: { [key: number]: string } = {
  1: "Special Event on Day 1",
  2: "Meeting on Day 2",
  15: "Deadline on Day 15",
};

export function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isHighlighted = highlightedDays.includes(day.date());
  const message = tooltipMessages[day.date()] || "";

  return (
    <Tooltip
      title={isHighlighted && message ? message : ""}
      arrow
      disableHoverListener={!isHighlighted}
    >
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent={isHighlighted ? "" : undefined}
      >
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </Badge>
    </Tooltip>
  );
}

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [groups, setGroups] = useState<any[]>([]);
  const [incompleteTestSessions, setIncompleteTestSessions] = useState<any[]>([]);
  const [groupLoading, setGroupLoading] = useState(false);
  // const [highlightedDays, setHighlightedDays] = useState<number[]>([1, 2, 15]);
  // const [isLoadingCalendar, setIsLoadingCalendar] = useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date())


  

  // const [value, onChange] = useState<Value>(new Date());

  const fetchGroups = async () => {
    setGroupLoading(true);
    const data = await fetchStudentGroupsBySession();
    setGroups(data.data || []);
    setGroupLoading(false);
  };

  const fetchIncompleteTests = async () => {
    const data = await fetchIncompleteTestsByStudent();
    setIncompleteTestSessions(data.data || []);
  };

  const handleResumeTest = async (testSession: any) => {
    const response = await resumeTest({
      testSessionId: testSession.id,
      assignedTestId: testSession.assignedTestId,
    });

    if (response.code === 200) {
      console.log("Test resumed successfully");
      sessionStorage.setItem("showInstructions", "false");
      localStorage.setItem("testStarted", "true");
      localStorage.setItem("tabSwitchCount", "0");
      localStorage.setItem("Questions", JSON.stringify(JSON.parse(testSession.test).Tests.Questions));
      localStorage.setItem(
        "selectedAnswers",
        JSON.stringify(response.data.attemptedQuestions)
      );
      localStorage.setItem(
        "timer",
        response.data.attemptedQuestions.length === 0
          ? JSON.parse(testSession.test).timeLimit* 60 
          : response.data.attemptedQuestions[response.data.attemptedQuestions.length - 1]
              .timeTaken 
      );
      navigate(`/test-session/${testSession.assignedTestId}?sessionId=${testSession.id}`, {
        state: {
          testSession: testSession,
          quiz: { AssignedTests: JSON.parse(testSession.test) },
        },
      });
    } else {
      console.log("Failed to resume test");
    }
  };

  React.useEffect(() => {
    localStorage.removeItem("selectedAnswers");
    localStorage.removeItem("timer");
    localStorage.removeItem("currentQuestion");
    sessionStorage.removeItem("showInstructions");
    localStorage.removeItem("testStarted");
    localStorage.removeItem("tabSwitchCount");

    fetchGroups();
    fetchIncompleteTests();
  }, []);

  return (
    <div className="flex lg:flex-nowrap flex-wrap  min-h-[78vh] gap-6   ">
      {/* Left Section */}
      <div className="w-full lg:w-2/3 rounded-lg p-4 shadow bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-2xl text-gray-700">Groups</h2>
        </div>

        {/* Groups Section */}
        {groupLoading ? (
          <div className="flex justify-center items-center h-40">
            <CircularProgress />
          </div>
        ) : groups.length === 0 ? (
          <p className="text-center text-gray-500">No groups available at the moment.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {groups.map((group) => (
              <div
                key={group.id}
                className="bg-white rounded-lg border border-[1] border-color1 p-4 flex justify-between items-center  transition"
              >
                <div className="flex items-center gap-4">
                  <MdOutlineGroup className="text-4xl text-color1 bg-color1/20 rounded-full p-2" />
                  <span className="font-medium text-gray-700">{group.groupName}</span>
                </div>
                <MdOutlineArrowRightAlt
                  onClick={() =>
                    navigate(`/student-dashboard/group-tests/${group.id}`, {
                      state: { group },
                    })
                  }
                  className="text-4xl text-gray-600 hover:text-white hover:bg-color1 bg-color1/10  rounded-full p-2 transition cursor-pointer"
                />
              </div>
            ))}
          </div>
        )}

        {/* Resume Tests Section */}
        {incompleteTestSessions.length > 0 && (
          <>
            <h2 className="font-bold text-2xl text-gray-700 mt-8 mb-4">Resume Test</h2>
            <div className="flex flex-col gap-4">
              {incompleteTestSessions.map((testSession) => (
                <div
                  key={testSession.id}
                  className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-4">
                    <MdOutlineGroup className="text-4xl text-purple-600 bg-purple-100 rounded-full p-2" />
                    <span className="font-medium text-gray-700">
                      {testSession.AssignedTests.Tests.testName}
                    </span>
                  </div>
                  <MdOutlineArrowRightAlt
                    onClick={() => handleResumeTest(testSession)}
                    className="text-4xl text-gray-600 hover:text-white hover:bg-purple-600 rounded-full p-2 transition cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/3">
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-sm  text-gray-600">
            When you are registered in multiple Groups, each Group may contain separate Tests for
            you to take. <br />
            <br />
            Change Groups to check for available Tests under each Group.
          </p>
        </div>
<div className="rounded-lg bg-white mt-6 p-4  shadow">
        <h2 className="text-gray-700 font-bold text-lg mb-3  pl-4 rounded-lg ">Today's Schedule</h2>
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar

            sx={{
              p: 2,
              color: "text.primary",
              borderRadius: 4,
              width: 400,
              "&:hover": {
                backgroundColor: "gray.50",
              },
            }}

            defaultValue={dayjs()}
            loading={isLoadingCalendar}
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
        </LocalizationProvider> */}
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md w-fit mx-auto"
        />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
