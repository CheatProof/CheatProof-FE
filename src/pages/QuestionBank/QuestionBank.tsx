
import { useEffect, useState } from "react";
import {
    Sidebar,    
  } from "../../components";
  import QuestionCard from "../../components/Question/QuestionCard";

import QuestionFilter from "../../components/Question/QuestionFilter";
import { getQuestionsByTeacherId } from "../../api/question";

const QuestionBank = ()  => {
  const [questions,setQuestions]= useState([])
  const getQuestions = async()=>{
    const data = await getQuestionsByTeacherId()
    if(data.code === 200){
      console.log(data.data)
      setQuestions(data.data)
    }
  }
  // TODO: Fetch questions from the server using the question API
  useEffect(() => {
    getQuestions()
    // TODO: Use effect hook to fetch questions whenever the component mounts and updates the question state
  },[])

    return (
        <>
      <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      
      <Sidebar />
       <div className="dark:bg-blackPrimary bg-whiteSecondary w-full pt-6 pl-9 max-sm:pt-6 max-sm:pl-5 flex max-[1700px]:flex-wrap gap-x-10 max-[400px]:pl-2">
       <div className="w-full pl-3">
       
            <h2 className="text-3xl text-black font-bold mb-6 py-6">Question Bank</h2>
            
       
       <QuestionFilter />
        {questions.map((question:any)=>
          (<QuestionCard question={question}/>)
          )}
        </div>
        </div>
        </div>
        </>
    );
};

export default QuestionBank;