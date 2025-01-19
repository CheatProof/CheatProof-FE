import HeaderStudent from "@/components/HeaderStudent";
// import { useAppDispatch, useAppSelector } from "@/hooks";
// import { Link, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
// import Profile from "../assets/user.png";
import { AppSidebar } from "@/components/Student/Sidebar";
import { Footer } from "@/components";
import ResultCard from "@/components/Student/ResultCard";

const StudentResults = ()=>{
    return(
        <>
        {/* <SidebarProvider>
        <HeaderStudent />
        <h1>Student Results</h1>
        </SidebarProvider> */}
        <SidebarProvider>
         <AppSidebar />
    <main className="w-full">
    <HeaderStudent />
     
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full  ">
        <div className="w-full px-3 py-4 flex text-center justify-center md:justify-start">
        <h1 className="text-3xl mt-12 font-semibold ml-12 lg:ml-24">Student Results</h1>
        </div>

          <div className="  gap-6 mx-5 p-4">
      <ResultCard />
      <ResultCard />
      <ResultCard />
      <ResultCard />
      <ResultCard />
          </div>
      </div>
      <div className="">
      <Footer />
      </div>
    </main>
   
    </SidebarProvider>
        </>
    )
}

export default StudentResults;