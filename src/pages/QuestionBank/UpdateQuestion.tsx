import React from "react";
import Test from "../../components/Question/UpdateQuestion";
import { Sidebar } from "../../components";
import { useParams } from "react-router-dom";


const UpdateQuestion : React.FC = ( )=>{
    const {id} = useParams(); // id is a route parameter

    return(
    
    <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
    
    <Sidebar/>
    <div className="dark:bg-blackPrimary bg-whiteSecondary w-full pt-6 pl-9 max-sm:pt-6 max-sm:pl-5 flex max-[1700px]:flex-wrap gap-x-10 max-[400px]:pl-2">
    <div className="w-full pl-3">
    
    <Test id={id}/>

    </div>
    </div>
    
    
    </div>
    )

}

export default UpdateQuestion; 

