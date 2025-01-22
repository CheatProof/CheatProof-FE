import React from "react";
import Test from "../../components/Test/Test";
import { Footer, Header, Sidebar } from "../../components";


const CreateTestManual : React.FC = ( )=>{

    return(
    
    <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
    
    <Sidebar/>
    <div className="dark:bg-blackPrimary bg-whiteSecondary w-full ">
        <Header/>
    <div className="w-full">
    
    <Test/>

    </div>
    <Footer/>
    </div>
    
    
    </div>
    )

}

export default CreateTestManual 

