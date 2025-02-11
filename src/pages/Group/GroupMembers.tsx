
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Footer, Header, Sidebar } from "../../components";
// import { Circles } from 'react-loader-spinner';


import AllMembers from "@/components/Group/AllMembers";
const GroupMembers = () => {

  // const navigate = useNavigate();




  


  return (
    <>
      <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
        <Sidebar />
        <div className="dark:bg-blackPrimary bg-whiteSecondary w-full   ">
          <Header />
          <div className="w-full ">
            <h2 className="text-3xl text-black pl-4 font-bold py-6">All Group Members</h2>

        <AllMembers/>
          </div>
          <Footer/>
        </div>
      </div>
    </>
  );
};

export default GroupMembers;

