// import { useEffect, useState } from "react";

// import Header from "../../../components/Header/Header";
// import { useParams } from "react-router-dom";
// import QuestionEditorCard from "../../../components/Question/QuestionEditorCard";
// import { getTestById, getTestForAssignment } from "../../../api/test";
// import { Circles } from 'react-loader-spinner';

//  const AddQuestionTestEditor=() =>{
//     const {id}=useParams();
 
//     const [questions, setQuestions] =useState([]);


//     const [test, setTest] = useState<any>();
//     const [loading, setLoading] = useState(true);

//     const fetchTest=async()=>{
//         // Fetch Test Data
//         // Set test state and set loading to false
//         console.log(loading)
//         const testData = await getTestById(id);
//         if(testData.code === 200){
//             console.log(testData.data);
//             setTest(testData.data);
          
//             setLoading(false);
//         }
//     }
  

//     const fetchQuestionByUser = async() =>{
//         try{
//             const data = await getTestForAssignment(id);
//             if(data.success){
//                 console.log(data.data);
//                 setQuestions(data.data);
//             }
            
//             else{

//                 console.error("Error fetching question by id", data);
    
//             }
//         }
//         catch(error){
//             console.error("Error fetching question by id", error);
//         }
//     }

    

//      useEffect(() =>{
//         fetchQuestionByUser();
//         fetchTest();
//      },[])   

//     return (
//         <>
//     <Header name={test?.testName} page={"Add Questions"} id={id} />
//         <div className="w-full max-w-4xl mx-auto my-8">
//           {
            
//             questions.map((question, index) => (
//               <QuestionEditorCard question={question} idx={index} testId={id}/>
//             ))

//             // <div dangerouslySetInnerHTML={{ __html: question.question }} />

//             // <Editor
//             //   editorState={EditorState.createWithContent(question.content)}
//             //   readOnly
//             // />

//             // <div dangerouslySetInnerHTML={{ __html: question.content }} />

//             // <h2>{question.question}</h2>
//             // <Editor
//             //   editorState={EditorState.createWithContent(question.content)}
//             //   readOnly
//             // />

//             // <div dangerouslySetInnerHTML={{ __html: question.content }} />

//             // <h2>{question.question}</h2>
//           }
//         </div>
//         </>
//     );
// }

// export default AddQuestionTestEditor;



import { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import { useParams } from "react-router-dom";
import QuestionEditorCard from "../../../components/Question/QuestionEditorCard";
import { getTestById, getTestForAssignment } from "../../../api/test";
import { Circles } from 'react-loader-spinner';


const AddQuestionTestEditor = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [test, setTest] = useState<any>();
  const [loading, setLoading] = useState(true);

  const fetchTest = async () => {
    const testData = await getTestById(id);
    if (testData.code === 200) {
      setTest(testData.data);
      setLoading(false);
    }
  };

  const fetchQuestionByUser = async () => {
    try {
      const data = await getTestForAssignment(id);
      if (data.success) {
        setQuestions(data.data);
      } else {
        console.error("Error fetching question by id", data);
      }
    } catch (error) {
      console.error("Error fetching question by id", error);
    }
  };

  useEffect(() => {
    fetchQuestionByUser();
    fetchTest();
  }, []);

  return (
    <>
      <Header name={test?.testName} page={"Add Questions"} id={id} />
      <div className="w-full max-w-4xl mx-auto my-8">
        {loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <Circles height="80" width="80" color="#152487" ariaLabel="circles-loading" />
          </div>
        ) : (
          questions.map((question, index) => (
            <QuestionEditorCard question={question} idx={index} testId={id} key={index} />
          ))
        )}
      </div>
    </>
  );
};

export default AddQuestionTestEditor;
