
import { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { Sidebar } from "../../components";
import GroupManagement from "../../components/Group/GroupManagment";

const GroupsManagement = () => {
  
  const navigate = useNavigate();


 
  useEffect(() => {

    window.scrollTo(0, 0);
  }, []);




  return (
    <>
      <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
        <Sidebar />
        <div className="dark:bg-blackPrimary bg-whiteSecondary w-full pt-6 pl-9 max-sm:pt-6 max-sm:pl-5 flex max-[1700px]:flex-wrap gap-x-10 max-[400px]:pl-2">
          <div className="w-full pl-3">
          

        <GroupManagement/>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupsManagement;

