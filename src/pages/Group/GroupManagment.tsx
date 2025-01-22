
import { useEffect } from "react";
// import {  useParams } from "react-router-dom";
import { Footer, Header, Sidebar } from "../../components";
import GroupManagement from "../../components/Group/GroupManagment";

const GroupsManagement = () => {
  
  // const navigate = useNavigate();

 


 
  useEffect(() => {

    window.scrollTo(0, 0);
  }, []);




  return (
    <>
      <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
        <Sidebar />
        <div className="dark:bg-blackPrimary bg-whiteSecondary w-full">
          <Header /> 
          <div className="w-full pl-3">
          

        <GroupManagement/>
          </div>
          <Footer/>
        </div>
      </div>
    </>
  );
};

export default GroupsManagement;

