
import {
  Footer,
  Header,
    Sidebar,    
  } from "../../components";

import QuestionBankImport from "../../components/Question/ImportQuestions";

const ImportQuestion = ()  => {


    return (
        <>
      <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      
      <Sidebar />
       <div className="dark:bg-blackPrimary bg-whiteSecondary w-full">
        <Header/>
       <div className="w-full ">
       
       <QuestionBankImport/>
        </div>
        <Footer/>
        </div>
        </div>
        </>
    );
};

export default ImportQuestion;