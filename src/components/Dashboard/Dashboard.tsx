import React from "react";
import { Tab, Tabs } from "../Tabs";
import { RiDownload2Line } from "react-icons/ri";
import { FiDownload } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import Card from "./Card";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { PiClockCountdownLight } from "react-icons/pi";

const Dashboard : React.FC = ( )=>{
return (<div className="flex flex-wrap ">


    <div className="w-full lg:w-[67%]">


<div className="w-full flex justify-between ">

<h2 className="font-bold">Recents Results</h2>

<select className="bg-transparent mr-3 text-sm"  name="time" id="">

    <option value={"1h"}>Last 1 hour</option>
    <option value={"3h"}>Last 3 hour</option>
    <option value={"8h"}>Last 8 hour</option>
    <option value={"12h"}>Last 12 hour</option>
    <option value={"1d"}>Last 1 day</option>

</select>

</div> 

<div className="flex justify-center my-5 items-center gap-3">

<div className="w-full lg:w-1/2 rounded shadow flex justify-center items-center flex-col bg-white h-40 text-blackPrimary/55">
<div className="flex items-center"><span className="text-3xl">0</span><IoMdCheckmarkCircleOutline className="text-3xl text-green-600"/></div>
<p className="text-sm">In Progress </p>
</div>
<div className="w-full lg:w-1/2 rounded shadow flex justify-center items-center flex-col bg-white h-40 text-blackPrimary/55">

<div className="flex items-center"><span className="text-3xl">0</span><PiClockCountdownLight className="text-3xl text-blue-500"/></div>
<p className="text-sm">Finished </p>

</div>


</div>


<Tabs>
    <Tab component={<Card/>}>Recently Taken Test</Tab>
    <Tab component={<Card/>}>Available Soon</Tab>
    <Tab component={<Card/>}>Closing Soon </Tab>

</Tabs>



    </div>


    <div className="w-full px-4 py-7 lg:w-[33%]">

        <h2 className="text-black/45 border-b-[0.05rem] border-black/45 py-3 font-bold text-sm">Shortcuts</h2>

        <ul>
            <li className="mt-3"><a className="text-sky-500 font-semibold text-sm">Create a Test</a></li>
            <li className="mt-3"><a className="text-sky-500 font-semibold text-sm">Assign a Test</a></li>
        </ul>

        <h2 className="text-black/45 border-b-[0.05rem] border-black/45 py-3 font-bold text-sm mt-5">Activity</h2>

        <div className="flex justify-between mt-3 items-center">
            <p className="text-sm">Download recent activity</p> <FiDownload/>
        </div>
        <h2 className="text-black/45 border-b-[0.05rem] border-black/45 py-3 font-bold text-sm mt-5">Emails</h2>

        <div className="flex justify-between mt-3 items-center">
            <p className="text-sm"><strong>0</strong> email in queue</p> <FiDownload/>
        </div>

        <div className="flex justify-between mt-3 items-center">
            <p className="text-sm"><strong>0</strong> email sent</p> <FiDownload/>
        </div>

    </div>

    


    </div>)
}



export default Dashboard