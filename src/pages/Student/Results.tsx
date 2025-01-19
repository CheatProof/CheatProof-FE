import HeaderStudent from "@/components/HeaderStudent";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Student/Sidebar";
import { Footer } from "@/components";
import { useEffect, useState } from "react";
import { fetchStudentResultsBySession } from "@/api/test-session";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
// import { useRouter } from "next/router";

const StudentResults = () => {
  const [studentsResults, setStudentResults] = useState([]);
  // const router = useNavigate()
 

  const fetchStudentResults = async () => {
    const result = await fetchStudentResultsBySession();
    if (result.code === 200) {
      setStudentResults(result.data);
      console.log(result.data[0].TestResults);
    } else {
      console.error(result.error);
    }
  };


  useEffect(() => {
    fetchStudentResults(); // Fetch student results here when the component mounts.
  }, []);

  // const handleViewFullResult = (result: any) => {
  //   router(`/results/${result.id}`);
  // };

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <HeaderStudent />

          <div className="dark:bg-blackPrimary bg-whiteSecondary w-full">
            <div className="w-full px-3 py-4 flex text-center justify-center md:justify-start">
              <h1 className="text-3xl mt-12 font-semibold ml-12 lg:ml-24">Student Results</h1>
            </div>

            <div className="mx-5 p-4">
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
                        <TableCell>{result?.TestResults?.points}</TableCell>
                        <TableCell>{result?.TestResults?.totalQuestions}</TableCell>
                        <TableCell>{new Date(result?.TestResults?.duration).toISOString().substr(11, 8)}</TableCell>
                        <TableCell>{new Date(result?.TestResults?.dateStarted).toLocaleString()}</TableCell>
                        <TableCell>{new Date(result?.TestResults?.dateFinished).toLocaleString()}</TableCell>
                        <TableCell>
                          <Link
                          to={`/results/${result.id}`} // Replace this with the actual route for the full result page. Use router.push or router.navigate for navigation. For now, we'll use a simple link. For production, consider using a proper routing library.  For example, Next.js Router: https://nextjs.org/docs/api-reference/next/router#router-object
                            state={result}
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
            </div>
          </div>
          <div className="">
            <Footer />
          </div>
        </main>
      </SidebarProvider>
    </>
  );
};

export default StudentResults;
