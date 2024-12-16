import  { AppSidebar}  from "../../components/Student/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import HeaderStudent from "@/components/HeaderStudent";
import SD  from "@/components/Dashboard/StudentDashboard";
import { Footer } from "@/components";
// import { Footer } from "react-day-picker";


// TabPanel component for displaying content based on the active tab


const StudentDashboard: React.FC = () => {


  return (
    <SidebarProvider>
         <AppSidebar />
    <main className="w-full">
    <HeaderStudent />
     
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full  ">
        <div className="w-full px-3 py-4">
        <SD />
        </div>
      </div>
      <Footer />
    </main>
   
    </SidebarProvider>
  );
};

export default StudentDashboard;
