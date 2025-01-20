import HeaderStudent from "@/components/HeaderStudent";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Student/Sidebar";
import { Footer } from "@/components";
import { useEffect, useState } from "react";
import { fetchStudentResultsBySession } from "@/api/test-session";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const StudentResults = () => {
  const [studentsResults, setStudentResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStudentResults = async () => {
    try {
      setLoading(true);
      const result = await fetchStudentResultsBySession();
      if (result.code === 200) {
        setStudentResults(result.data);
      } else {
        setError(result.error || "Failed to fetch results.");
      }
    } catch (err) {
      setError("An unexpected error occurred while fetching results.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentResults();
  }, []);

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <HeaderStudent />
          <div className="dark:bg-blackPrimary min-h-screen bg-whiteSecondary w-full">
            <div className="w-full px-3 py-4 pt-10 flex text-center justify-center md:justify-start mx-5">
              <span className="text-2xl font-semibold">Results {'>'} CCN Group 2024</span>
            </div>
            <div className="mx-5 p-4">
              {loading ? (
                <div className="flex justify-center items-center min-h-[300px]">
                  <CircularProgress />
                </div>
              ) : error ? (
                <div className="text-center text-red-500 min-h-[300px]">
                  {error}
                </div>
              ) : studentsResults.length === 0 ? (
                <div className="text-center text-gray-500 min-h-[300px]">
                  No results available at the moment.
                </div>
              ) : (
                <TableContainer>
                  <Table className="bg-white dark:bg-gray-800">
                    <TableHead className="bg-gray-100 dark:bg-gray-700">
                      <TableRow>
                        <TableCell className="font-bold">Test Name</TableCell>
                        <TableCell className="font-bold">Points</TableCell>
                        <TableCell className="font-bold">Total Questions</TableCell>
                        <TableCell className="font-bold">Duration</TableCell>
                        <TableCell className="font-bold">Date Started</TableCell>
                        <TableCell className="font-bold">Date Finished</TableCell>
                        <TableCell className="font-bold">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {studentsResults.map((result: any) => (
                        <TableRow key={result.id}>
                          <TableCell>{result?.test.Tests.testName}</TableCell>
                          <TableCell>
                            {result?.TestResults?.points} / {result.TestResults.totalPoints}
                          </TableCell>
                          <TableCell>{result?.TestResults?.totalQuestions}</TableCell>
                          <TableCell>
                            {new Date(result?.TestResults?.duration).toISOString().substr(11, 8)}
                          </TableCell>
                          <TableCell>
                            {new Date(result?.TestResults?.dateStarted).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            {new Date(result?.TestResults?.dateFinished).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Link
                              to={`/student-dashboard/result-details`}
                              state={{
                                result:result}}
                              className="text-white bg-color1 hover:bg-fore rounded px-4 py-2"
                            >
                              View Full Result
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </div>
          </div>
          <Footer />
        </main>
      </SidebarProvider>
    </>
  );
};

export default StudentResults;

