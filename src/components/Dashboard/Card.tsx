import React from "react";
import { AiOutlineFileSearch } from "react-icons/ai";


const Card:React.FC = ()=>{
    return (
    <div className="bg-white flex flex-col justify-center items-center min-h-56 my-4 text-color2 rounded">
        <AiOutlineFileSearch className="text-6xl"/>
        <p className="">No Tests completed in the last 1 hour</p>
    </div>)
}


export default Card ; 