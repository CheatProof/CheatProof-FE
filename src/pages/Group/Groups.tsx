
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../components";
import { Circles } from 'react-loader-spinner';
import GroupsComponent from "../../components/Group/GroupComponent";

const Groups = () => {

  // const navigate = useNavigate();




  


  return (
    <>
      <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
        <Sidebar />
        <div className="dark:bg-blackPrimary bg-whiteSecondary w-full   max-sm:pt-6 max-sm:pl-5 flex max-[1700px]:flex-wrap gap-x-10 max-[400px]:pl-2">
          <div className="w-full ">
            {/* <h2 className="text-3xl text-black font-bold mb-6 py-6">All Groups</h2> */}

        <GroupsComponent/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Groups;

