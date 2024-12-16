import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import "tailwindcss/tailwind.css";
import Header from "../../../components/Header/Header";
import { useParams } from "react-router-dom";
import {
  getTestById,
  getTestQuestionById,
  updateTestById,
} from "../../../api/test";
import draftToHtml from "draftjs-to-html";
import QuestionEditorCard from "../../../components/Question/QuestionEditorCard";
import { Circles } from "react-loader-spinner";
import { toast, Toaster } from "react-hot-toast";
import Sidebar from "../../../components/Header/Header";

export default function CollapsibleEditor() {
  const { id } = useParams();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [test, setTest] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [accordionLoading, setAccordionLoading] = useState(false);

  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
  };

  const fetchTest = async () => {
    const testData = await getTestById(id);
    if (testData.code === 200) {
      setTest(testData.data);
      if (testData.data.testIntroduction) {
        setEditorState(htmlToEditorState(testData.data.testIntroduction));
      }
      setLoading(false);
    }
  };

  const updateDescription = async () => {
    setAccordionLoading(true);
    const body = {
      testIntroduction: getHtmlFromEditorState(editorState),
    };
    const response = await updateTestById(id, body);
    if (response.code === 200) {
      toast.success("Test introduction updated successfully!");
      setTest({ ...test, testIntroduction: body.testIntroduction });
    } else {
      toast.error("Failed to update test introduction!");
    }
    setAccordionLoading(false);
  };

  const fetchQuestionByTestId = async (id: any) => {
    try {
      const data = await getTestQuestionById(id);
      if (data.code === 200) {
        setQuestions(data.data);
      } else {
        console.error("Error fetching question by id", data);
      }
    } catch (error) {
      console.error("Error fetching question by id", error);
    }
  };

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    fetchQuestionByTestId(id);
    fetchTest();
  }, [id]);

  const getHtmlFromEditorState = (editorState: any) => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    return draftToHtml(rawContentState);
  };

  const htmlToEditorState = (html: any) => {
    const blocks = convertFromHTML(html);
    if (blocks) {
      const contentState = ContentState.createFromBlockArray(
        blocks.contentBlocks,
        blocks.entityMap
      );
      return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty();
  };

  return (
    <>
      <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
        <Sidebar name={test?.testName} page={"Editor"} id={id} />
        <div className="w-full max-w-4xl mx-auto my-8">
          <Toaster />
          {accordionLoading ? (
            <div className="flex justify-center items-center h-40">
              <Circles height="80" width="80" color="#152487" ariaLabel="loading" />
            </div>
          ) : (
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className="bg-gray-200"
              >
                <Typography className="font-semibold">Test Introduction</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="text-sm text-gray-500 mb-4">
                  Introduction text will be displayed before Users start this
                  Test. Introduction text is optional.
                </Typography>

                <div className="border p-4 rounded-md bg-white">
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                  />
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    className="bg-color2 hover:bg-color1 text-white px-4 py-2 rounded-lg"
                    onClick={updateDescription}
                  >
                    Update
                  </button>
                </div>
              </AccordionDetails>
            </Accordion>
          )}

          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <Circles height="80" width="80" color="blue" ariaLabel="loading" />
            </div>
          ) : (
            questions.map((question, index) => (
              <QuestionEditorCard question={question} idx={index} testId={id} key={index} />
            ))
          )}
        </div>
      </div>
    </>
  );
}









// import React, { useEffect, useState } from "react";
// import {
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography,
//   Button,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { ContentState, convertFromHTML, convertToRaw, EditorState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import "draft-js/dist/Draft.css";
// import 'tailwindcss/tailwind.css';
// import Header from "../../../components/Header/Header";
// import { useParams } from "react-router-dom";
// import { getTestById, getTestQuestionById, updateTestById } from "../../../api/test";
// import draftToHtml from "draftjs-to-html";
// import QuestionEditorCard from "../../../components/Question/QuestionEditorCard";
// import { Circles } from 'react-loader-spinner';
// import Sidebar from "../../../components/Header/Header";
// import { Toaster, toast } from "react-hot-toast";

// export default function CollapsibleEditor() {
//   const { id } = useParams();
//   const [expanded, setExpanded] = useState<string | false>(false);
//   const [questions, setQuestions] = useState<any[]>([]);
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());

//   const onEditorStateChange = (editorState: any) => {
//     setEditorState(editorState);
//   };

//   const [test, setTest] = useState<any>();
//   const [loading, setLoading] = useState(true);

//   const fetchTest = async () => {
//     const testData = await getTestById(id);
//     if (testData.code === 200) {
//       setTest(testData.data);
//       if (testData.data.testIntroduction) {
//         setEditorState(htmlToEditorState(testData.data.testIntroduction));
//       }
//       setLoading(false);
//     }
//   };

//   const updateDescription = async () => {
//     const body = {
//       testIntroduction: getHtmlFromEditorState(editorState)
//     };
//     const response = await updateTestById(id, body);
//     if (response.code === 200) {
//       toast.success("Test description updated successfully!", {
//         duration: 3000,
//         position: "top-center"
//       });
//       console.log(response.data);
//     }
//   };

//   const fetchQuestionByTestId = async (id: any) => {
//     try {
//       const data = await getTestQuestionById(id);
//       if (data.code === 200) {
//         setQuestions(data.data);
//       } else {
//         console.error("Error fetching question by id", data);
//       }
//     } catch (error) {
//       console.error("Error fetching question by id", error);
//     }
//   };

//   const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   useEffect(() => {
//     fetchQuestionByTestId(id);
//     fetchTest();
//   }, [id]);

//   const getHtmlFromEditorState = (editorState: any) => {
//     const contentState = editorState.getCurrentContent();
//     const rawContentState = convertToRaw(contentState);
//     return draftToHtml(rawContentState);
//   };

//   const htmlToEditorState = (html: any) => {
//     const blocks = convertFromHTML(html);
//     if (blocks) {
//       const contentState = ContentState.createFromBlockArray(blocks.contentBlocks, blocks.entityMap);
//       return EditorState.createWithContent(contentState);
//     }
//     return EditorState.createEmpty();
//   };

//   return (
//     <>
//      <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
     
//       <Sidebar name={test?.testName} page={"Editor"} id={id} />
//       <Toaster />
//       <div className="w-full max-w-4xl mx-auto my-8">
//         <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
//           <AccordionSummary
//             expandIcon={<ExpandMoreIcon />}
//             aria-controls="panel1a-content"
//             id="panel1a-header"
//             className="bg-gray-200"
//           >
//             <Typography className="font-semibold">Test Introduction</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography className="text-sm text-gray-500 mb-4">
//               Introduction text will be displayed before Users start this Test. Introduction text is optional.
//             </Typography>

//             <div className="border p-4 rounded-md bg-white">
//               <Editor
//                 editorState={editorState}
//                 onEditorStateChange={onEditorStateChange}
//                 toolbarClassName="toolbarClassName"
//                 wrapperClassName="wrapperClassName"
//                 editorClassName="editorClassName"
//                 toolbar={{
//                   inline: { inDropdown: true },
//                   list: { inDropdown: true },
//                   textAlign: { inDropdown: true },
//                   link: { inDropdown: true },
//                   history: { inDropdown: true },
//                   image: {
//                     previewImage: true,
//                     uploadCallback: (file: any) => {
//                       return new Promise((resolve, reject) => {
//                         const reader = new FileReader();
//                         reader.onloadend = () => {
//                           resolve({
//                             data: {
//                               url: reader.result,
//                             },
//                           });
//                         };
//                         reader.onerror = (reason) => reject(reason);
//                         reader.readAsDataURL(file);
//                       });
//                     },
//                     alt: { present: true, mandatory: true },
//                   },
//                 }}
//               />
//             </div>

//             <div className="mt-4 flex justify-end">
             
//               <button
//           className="bg-color2 hover:bg-color1 text-white px-4 py-2 rounded-lg"
//           onClick={updateDescription}
//         >
//           Update
//         </button>
//             </div>
//           </AccordionDetails>
//         </Accordion>

//         {loading ? (
//           <div
//             style={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               height: '100vh',
//             }}
//           >
//             <Circles height="80" width="80" color="#152487" ariaLabel="circles-loading" />
//           </div>
//         ) : (
//           questions.map((question, index) => (
//             <QuestionEditorCard question={question} idx={index} testId={id} key={index} />
//           ))
//         )}
//       </div>
//       </div>
//     </>
//   );
// }



// return (
//   <>
//     <div className="flex h-screen dark:bg-blackPrimary bg-whiteSecondary">
//       {/* Sidebar */}
//       <div className="w-64">
//         <Sidebar name={test?.testName} page={"Editor"} id={id} />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 w-full max-w-4xl mx-auto my-8">
//         <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
//           <AccordionSummary
//             expandIcon={<ExpandMoreIcon />}
//             aria-controls="panel1a-content"
//             id="panel1a-header"
//             className="bg-gray-200"
//           >
//             <Typography className="font-semibold">Test Introduction</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography className="text-sm text-gray-500 mb-4">
//               Introduction text will be displayed before Users start this Test. Introduction text is optional.
//             </Typography>

//             <div className="border p-4 rounded-md bg-white">
//               <Editor
//                 editorState={editorState}
//                 onEditorStateChange={onEditorStateChange}
//                 toolbarClassName="toolbarClassName"
//                 wrapperClassName="wrapperClassName"
//                 editorClassName="editorClassName"
//                 toolbar={{
//                   inline: { inDropdown: true },
//                   list: { inDropdown: true },
//                   textAlign: { inDropdown: true },
//                   link: { inDropdown: true },
//                   history: { inDropdown: true },
//                   image: {
//                     previewImage: true,
//                     uploadCallback: (file: any) => {
//                       return new Promise((resolve, reject) => {
//                         const reader = new FileReader();
//                         reader.onloadend = () => {
//                           resolve({
//                             data: {
//                               url: reader.result,
//                             },
//                           });
//                         };
//                         reader.onerror = (reason) => reject(reason);
//                         reader.readAsDataURL(file);
//                       });
//                     },
//                     alt: { present: true, mandatory: true },
//                   },
//                 }}
//               />
//             </div>

//             <div className="mt-4 flex justify-end">
//               <button
//                 className="bg-color2 hover:bg-color1 text-white px-4 py-2 rounded-lg"
//                 onClick={updateDescription}
//               >
//                 Update
//               </button>
//             </div>
//           </AccordionDetails>
//         </Accordion>

//         {loading ? (
//           <div
//             style={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               height: '100vh',
//             }}
//           >
//             <Circles height="80" width="80" color="#152487" ariaLabel="circles-loading" />
//           </div>
//         ) : (
//           questions.map((question, index) => (
//             <QuestionEditorCard question={question} idx={index} testId={id} key={index} />
//           ))
//         )}
//       </div>
//     </div>
//   </>
// );
// }



