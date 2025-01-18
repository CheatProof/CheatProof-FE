import { useEffect, useState } from "react";
import multipleChoice from "../../assets/icon-multimedia-grey.png";
import falseTrue from "../../assets/icon-truefalse-grey.png";
import matching from "../../assets/icon-matching-grey.png";
import freeTex from "../../assets/icon-freetext-grey.png";
import Grammar from "../../assets/icon-grammar-grey.png";
import Essay from "../../assets/icon-essay-grey.png";
import { EditorState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw } from 'draft-js';
import { FaTrashAlt } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import draftToHtml from 'draftjs-to-html';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { createQuestion, getQuestionTypes } from '../../api/question';
import toast, { Toaster } from 'react-hot-toast';
import { Circles } from "react-loader-spinner";


import MCQCard from "../PreviewCards/MCQCard";
import TrueFalseCard from "../PreviewCards/TrueFalseCard";
import FreeTextCard from "../PreviewCards/FreeTextCard";
import GrammarCard from "../PreviewCards/GrammarCard";
import EssayCard from "../PreviewCards/EssayCard";
import MatchingCard from "../PreviewCards/MatchingCard";
import { getAllChildCategories } from "../../api/child-category";
import { getAllParentCategories } from "../../api/parent-category";
import { useNavigate, useLocation } from "react-router-dom";



const Test = () => {
const navigate = useNavigate()
const location = useLocation();
const [image, setImage] = useState<File | null>(null);


  // const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";
  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
  // General
  const [parentCategories,setParentCategories] = useState([])
  const [childCategories,setChildCategories] = useState([])
  const [questionTypes, setQuestionTypes] = useState([{id:"0"}]);
  const [isSaving, setIsSaving] = useState(false); // Loader for the first button
const [isSavingAndAddingMore, setIsSavingAndAddingMore] = useState(false); // Loader for the second button
  

  const [editorState, setEditorState] = useState(EditorState.createEmpty()); // question test
  const [correctFeedback, setCorrectFeedback] = useState('');
  const [incorrectFeedback, setIncorrectFeedback] = useState('');
  const [parentCategory, setParentCategory] = useState("Generic Parent (default)");
  const [subCategory, setSubCategory] = useState("Generic (default)");
  const [points, setPoints] = useState(1);
  const [loading, setLoading] = useState(false);

    // State for selected question type
    const [selectedQuestionType, setSelectedQuestionType] = useState("multipleChoice");
    const [showPreview, setShowPreview] = useState(false); // State to control the preview rendering
  

  // MCQS
  const [options, setOptions] = useState([{ text: EditorState.createEmpty(), isCorrect: false }, { text: EditorState.createEmpty(), isCorrect: false }]);
  const [randomizeAnswers, setRandomizeAnswers] = useState(false);
  const [answerSelection, setAnswerSelection] = useState("radio");

  // True False
  const [trueFalseOption, setTrueFalseOption] = useState([{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }])


  // freeText
  const [freeText, setfreeTextAnswers] = useState([{ text: "" }])

  // correct Grammar

  const [grammarCorrect, setGrammarCorrect] = useState("")
  const [grammarText, setGrammarText] = useState("")

  // Matching

  const [incorrectPairs, setIncorrectPairs] = useState([{ text: "" }])
  const [correctPairs, setCorrectPairs] = useState([{ clue: EditorState.createEmpty(), match: "" }])

  // fetching categories data

  const fetchAllChildCategory = async() => {
    const data =await getAllChildCategories();
    setChildCategories(data.data);
    console.log(data.data);
  }

  const fetchAllParentCategory = async() => {
    const data =await getAllParentCategories();
    setParentCategories(data.data);
    console.log(data.data);
  }

  const fetchQuestionType = async () => {
    setLoading(true);

    try {
      const data = await getQuestionTypes();

      if (data.code === 200) {
        console.log("Question types fetched successfully", data.data);
        setQuestionTypes(data.data);
        console.log(questionTypes);
      } else {
        console.log("Error fetching question types");
      }
    } catch (e) {
      console.error("Error fetching question types", e);
    } finally {
      setLoading(false);
    }

  }

  const getHtmlFromEditorState = (editorState: any) => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    return draftToHtml(rawContentState);
  };


  const renderPreviewCard = () => {
    switch (selectedQuestionType) {
      case "multipleChoice":
        const convertedOption = options.map((option: any) => {
          return {
            text: getHtmlFromEditorState(option.text),
            isCorrect: option.isCorrect
          };
        });

        return <MCQCard question={getHtmlFromEditorState(editorState)} options={convertedOption} answerSelection={answerSelection} />;
      case "trueFalse":
        const convertedTrueFalseOption = trueFalseOption.map((option: any) => {
          return {
            text: option.text,
            isCorrect: option.isCorrect
          };
        });


        return <TrueFalseCard question={getHtmlFromEditorState(editorState)} options={convertedTrueFalseOption} />;


      case "freeText":
        const freeTextOption = freeText.map((option: any) => {
          return {
            text: option.text,
            isCorrect: option.isCorrect
          };
        });

        return <FreeTextCard question={getHtmlFromEditorState(editorState)} options={freeTextOption} />;

      case "grammar":
        return <GrammarCard question={grammarText} correctAnswer={grammarCorrect} />;
      case "essay":
        return <EssayCard question={getHtmlFromEditorState(editorState)} />;
      case "matching":
        const convertedOptions = correctPairs.map((p): any => {
          return {


            clue: getHtmlFromEditorState(p.clue),
            match: p.match

          }
        }
        );
        return <MatchingCard question={getHtmlFromEditorState(editorState)}
          correctPairs={convertedOptions}
          incorrectPairs={incorrectPairs} />;
      default:
        return <div>No question type selected</div>;
    }
  };

  // const handleSubmit = async () => {
  //   setLoading(true);
  //   var body;
  //   console.log("submit", image);

  //   if (selectedQuestionType === "multipleChoice") {
  //     body = {

  //       questionData: {
  //         questionTypeId: questionTypes[0]?.id,
  //         categoryId: subCategory,
  //         questionText: getHtmlFromEditorState(editorState),
  //         correctFeedback,
  //         incorrectFeedback,
  //         points
  //       },
  //       options: options.map((option: any) => ({ optionText: getHtmlFromEditorState(option.text), isAnswer: option.isCorrect })),
  //       answerSelection: answerSelection,
  //       isRandomize: randomizeAnswers,
  //     };
  //   }
  //   else if (selectedQuestionType === "trueFalse") {
  //     body = {
  //       questionData: {
  //         questionTypeId: questionTypes[1]?.id,
  //         categoryId: subCategory,
  //         questionText: getHtmlFromEditorState(editorState),
  //         questionMedia: image,
  //         correctFeedback,
  //         incorrectFeedback,
  //         points
  //       },
  //       options: trueFalseOption.map((option: any) => ({ optionText: option.text, isAnswer: option.isCorrect })),
  //     };
  //   }
  //   else if (selectedQuestionType === "freeText") {
  //     body = {
  //       questionData: {
  //         questionTypeId: questionTypes[5]?.id,
  //         questionText: getHtmlFromEditorState(editorState),
  //         correctFeedback,
  //         incorrectFeedback,
  //         categoryId:subCategory,
  //         points
  //       },
  //       options: freeText.map((value: any) => {
  //         return { correctAnswer: value.text }
  //       })
  //     }
  //   }
  //   else if (selectedQuestionType === "grammar") {
  //     body = {
  //       questionData: {
  //         questionTypeId: questionTypes[3]?.id,
  //         questionText: grammarText,
  //         correctFeedback,
  //         incorrectFeedback,
  //         categoryId:subCategory,
  //         points
  //       },
  //       options: [{ correctAnswer: grammarCorrect }],
  //     };
  //   }
  //   else if (selectedQuestionType === "essay") {
  //     body = {
  //       questionData: {
  //         questionTypeId: questionTypes[2]?.id,
  //         questionText: getHtmlFromEditorState(editorState),
  //         correctFeedback,
  //         incorrectFeedback,
       
  //         categoryId:subCategory,
  //         points
  //       },
  //     };
  //   }
  //   else if (selectedQuestionType === "matching") {
  //     body = {
  //       questionData: {
  //         questionTypeId: questionTypes[4]?.id,
  //         questionText: getHtmlFromEditorState(editorState),
  //         correctFeedback,
  //         incorrectFeedback,
       
  //         categoryId:subCategory,
  //         points
  //       },
  //       matchingOptions: correctPairs.map((value: any) => {
  //         return { clueText: getHtmlFromEditorState(value.clue), matchText: value.match,matchPoints: 1 }
  //       }),
  //       incorrectOptions: incorrectPairs.map((value) => {
  //         return { incorrectMatchText: value }
  //       })

  //     }
  //   }



  //   try {
  //     const data = await createQuestion(body);

  //     console.log(data)
  //     if (data.code == 201) {
      
  //       toast.success("Question created successfully", {
  //         position: "top-center",
  //         duration: 3000
  //       })
  //       navigate(-1);
  //     } else {
  //       toast.error("Failed to create question", {
  //         position: "top-center",
  //         duration: 3000
  //       })
  //     }




  //   } catch (error) {
  //     console.error("Login failed", error);
  //     // TODO: Handle error (e.g., show error message to user)
  //   } finally {
  //     setLoading(false); // End loading
  //   }
  // };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
  
    // console.log("submit", image);
   

  
    try {
      if (selectedQuestionType === "multipleChoice") {
        formData.append("questionData[questionTypeId]", questionTypes[0]?.id || "");
        formData.append("questionData[categoryId]", subCategory.toString());
        formData.append("questionData[questionText]", getHtmlFromEditorState(editorState));
        formData.append("questionMedia", image || "");
        formData.append("questionData[correctFeedback]", correctFeedback || "");
        formData.append("questionData[incorrectFeedback]", incorrectFeedback || "");
        formData.append("points", points.toString());
        options.forEach((option, index) => {
          formData.append(`options[${index}][optionText]`, getHtmlFromEditorState(option.text));
          formData.append(`options[${index}][isAnswer]`, option.isCorrect.toString());
        });
        formData.append("answerSelection", answerSelection || "");
        formData.append("isRandomize", randomizeAnswers.toString());
      } else if (selectedQuestionType === "trueFalse") {
        formData.append("questionData[questionTypeId]", questionTypes[1]?.id || "");
        formData.append("questionData[categoryId]", subCategory.toString());
        formData.append("questionData[questionText]", getHtmlFromEditorState(editorState));
        formData.append("questionMedia", image || "");
        formData.append("questionData[correctFeedback]", correctFeedback || "");
        formData.append("questionData[incorrectFeedback]", incorrectFeedback || "");
        formData.append("points", points.toString());
        trueFalseOption.forEach((option, index) => {
          formData.append(`options[${index}][optionText]`, option.text);
          formData.append(`options[${index}][isAnswer]`, option.isCorrect.toString());
        });
      } else if (selectedQuestionType === "freeText") {
        formData.append("questionData[questionTypeId]", questionTypes[5]?.id || "");
        formData.append("questionData[categoryId]", subCategory.toString());
        formData.append("questionData[questionText]", getHtmlFromEditorState(editorState));
        formData.append("questionMedia", image || "");
        formData.append("questionData[correctFeedback]", correctFeedback || "");
        formData.append("questionData[incorrectFeedback]", incorrectFeedback || "");
        formData.append("points", points.toString());
        freeText.forEach((value, index) => {
          formData.append(`options[${index}][correctAnswer]`, value.text);
        });
      } else if (selectedQuestionType === "grammar") {
        formData.append("questionData[questionTypeId]", questionTypes[3]?.id || "");
        formData.append("questionData[categoryId]", subCategory.toString());
        formData.append("questionData[questionText]", grammarText || "");
        formData.append("questionMedia", image || "");
        formData.append("questionData[correctFeedback]", correctFeedback || "");
        formData.append("questionData[incorrectFeedback]", incorrectFeedback || "");
        formData.append("points", points.toString());
        formData.append("options[0][correctAnswer]", grammarCorrect || "");
      } else if (selectedQuestionType === "essay") {
        formData.append("questionData[questionTypeId]", questionTypes[2]?.id || "");
        formData.append("questionData[categoryId]", subCategory.toString());
        formData.append("questionData[questionText]", getHtmlFromEditorState(editorState));
        formData.append("questionMedia", image || "");
        formData.append("questionData[correctFeedback]", correctFeedback || "");
        formData.append("questionData[incorrectFeedback]", incorrectFeedback || "");
        formData.append("points", points.toString());
      } else if (selectedQuestionType === "matching") {
        formData.append("questionData[questionTypeId]", questionTypes[4]?.id || "");
        formData.append("questionData[categoryId]", subCategory.toString());
        formData.append("questionData[questionText]", getHtmlFromEditorState(editorState));
        formData.append("questionMedia", image || "");
        formData.append("questionData[correctFeedback]", correctFeedback || "");
        formData.append("questionData[incorrectFeedback]", incorrectFeedback || "");
        formData.append("points", points.toString());
        correctPairs.forEach((value, index) => {
          formData.append(`matchingOptions[${index}][clueText]`, getHtmlFromEditorState(value.clue));
          formData.append(`matchingOptions[${index}][matchText]`, value.match);
          formData.append(`matchingOptions[${index}][matchPoints]`, "1");
        });
        incorrectPairs.forEach((value, index) => {
          formData.append(`incorrectOptions[${index}][incorrectMatchText]`, value.text);
        });
      }
  
      const data = await createQuestion(formData);
      console.log(data);
  
      if (data.code === 201) {
        toast.success("Question created successfully", {
          position: "top-center",
          duration: 3000,
        });
        navigate(-1);
      } else {
        toast.error("Failed to create question", {
          position: "top-center",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleSubmitWithSave = async () => {
    setIsSaving(true);
    try {
      await handleSubmit(); // Call your submit logic
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleSubmitWithSaveAndAddMore = async () => {
    setIsSavingAndAddingMore(true);
    try {
      await handleSubmit(); // Call your submit logic
      navigate(location.pathname, { replace: true }); // Reload the current page
    } finally {
      setIsSavingAndAddingMore(false);
    }
  };

  const hasEditorContent = (state: any) => {
    return state && state.getCurrentContent().getPlainText().trim() !== "";
  };
  
  const areFieldsValid = () => {
    switch (selectedQuestionType) {
      case "multipleChoice":
        return (
          // hasEditorContent(editorState) && // Check editor content
          // points &&
          // subCategory &&
          // options.length > 0 &&
          // options.every(
          //   (option: any) =>
          //     typeof option.text === "string" &&
          //     option.text.trim() !== "" &&
          //     option.isCorrect !== undefined
          // )


          
          // hasEditorContent(editorState) && // Editor state validation
          // points &&
          // subCategory &&
          // options.length > 0 &&
          // options.every(
          //   (option: any) =>
          //     option &&
          //     typeof option.text === "string" &&
          //     option.text.trim() !== "" &&
          //     option.isCorrect !== undefined
          // )

          editorState &&
                correctFeedback &&
                incorrectFeedback &&
                points &&
                options.length > 0 &&
                options.every((option: any) => option.text && option.isCorrect !== undefined)
        );
  
      case "trueFalse":
        return (
          hasEditorContent(editorState) && // Check editor content
          points &&
          subCategory &&
          trueFalseOption.length > 0 &&
          trueFalseOption.every(
            (option: any) =>
              typeof option.text === "string" &&
              option.text.trim() !== "" &&
              option.isCorrect !== undefined
          )
        );
  
      case "freeText":
        return (
          hasEditorContent(editorState) && // Check editor content
          points &&
          subCategory &&
          freeText.length > 0 &&
          freeText.every(
            (value: any) =>
              typeof value.text === "string" && value.text.trim() !== ""
          )
        );
  
      case "grammar":
        return (
          typeof grammarText === "string" &&
          grammarText.trim() !== "" &&
          typeof grammarCorrect === "string" &&
          grammarCorrect.trim() !== "" &&
          points &&
          subCategory
        );
  
      case "essay":
        return hasEditorContent(editorState) && points && subCategory;
  
      case "matching":
        return (
          // hasEditorContent(editorState) && // Check editor content
          // points &&
          // subCategory &&
          // correctPairs.length > 0 &&
          // correctPairs.every(
          //   (pair: any) =>
          //     typeof pair.clue === "string" &&
          //     pair.clue.trim() !== "" &&
          //     typeof pair.match === "string" &&
          //     pair.match.trim() !== ""
          // ) &&
          // incorrectPairs.every(
          //   (value: any) => typeof value === "string" && value.trim() !== ""
          // )

          editorState &&
                correctFeedback &&
                incorrectFeedback &&
                points &&
                correctPairs.length > 0 &&
                correctPairs.every((value: any) => value.clue && value.match) &&
                incorrectPairs.every((value: any) => value)
        );
  
      default:
        return false;
    }
  };
  
  // const areFieldsValid = () => {
  //   if (selectedQuestionType === "multipleChoice") {
  //     return (
  //       editorState &&
  //       correctFeedback &&
  //       incorrectFeedback &&
  //       points &&
  //       options.length > 0 &&
  //       options.every((option: any) => option.text && option.isCorrect !== undefined)
  //     );
  //   }
  //   if (selectedQuestionType === "trueFalse") {
  //     return (
  //       editorState &&
  //       correctFeedback &&
  //       incorrectFeedback &&
  //       points &&
  //       trueFalseOption.every((option: any) => option.text && option.isCorrect !== undefined)
  //     );
  //   }
  //   if (selectedQuestionType === "freeText") {
  //     return (
  //       editorState &&
  //       correctFeedback &&
  //       incorrectFeedback &&
  //       points &&
  //       freeText.length > 0 &&
  //       freeText.every((value: any) => value.text)
  //     );
  //   }
  //   if (selectedQuestionType === "grammar") {
  //     return grammarText && grammarCorrect && correctFeedback && incorrectFeedback && points;
  //   }
  //   if (selectedQuestionType === "essay") {
  //     return editorState && correctFeedback && incorrectFeedback && points;
  //   }
  //   if (selectedQuestionType === "matching") {
  //     return (
  //       editorState &&
  //       correctFeedback &&
  //       incorrectFeedback &&
  //       points &&
  //       correctPairs.length > 0 &&
  //       correctPairs.every((value: any) => value.clue && value.match) &&
  //       incorrectPairs.every((value: any) => value)
  //     );
  //   }
  //   return false; // Default false if no type selected
  // };
  

  

  useEffect(()=>{
    fetchQuestionType();
    fetchAllChildCategory();
    fetchAllParentCategory();
  },[])


  // Matching:

  //  {
  //                   "questionData": {
  //                       "questionText": "What is the capital of France?",
  //                       "QuestionTypeId": 1,
  //                        "points": 5,
  //                        "isArchive": false,
  //                        correctFeedback, 
  //                        incorrectFeedback, 
  //                        teacherFeedback
  //                        gracePoints
  //                   },
  //                   isRandomize: true,
  //                   answerSelection: 'radio' 
  //                   "matchingOptions": [
  //                       { "clueText": "Paris", "matchText": "Berlin", "matchPoints": 1 },
  //                       { "clueText": "London", "matchText": "Paris", "matchPoints": 1 },
  //                       { "clueText": "Berlin", "matchText": "Berlin", "matchPoints": 1 }
  //                   ]
  //                   "incorrectOptions": [
  //                       { "incorrectMatchText": "Paris" },
  //                       { "incorrectMatchText": "London" },
  //                       { "incorrectMatchText": "Berlin" }
  //                   ]
  //               }



  const onEditorStateChange = (editorState: any) => {
    console.log(editorState)
    setEditorState(editorState);

  };

  const handleOptionChange = (index: number, newText: any) => {
    const newOptions = [...options];
    newOptions[index].text = newText;
    setOptions(newOptions);
  };

  const handleClueChange = (index: number, newText: any) => {
    const newOptions = [...correctPairs];
    newOptions[index].clue = newText;
    setCorrectPairs(newOptions);
  };

  const handleMatchChange = (index: number, newText: any) => {
    const newOptions = [...correctPairs];
    newOptions[index].match = newText;
    setCorrectPairs(newOptions);
  };



  const handletrueFalseOptionChange = (index: number, newText: any) => {
    const newOptions = [...trueFalseOption];
    newOptions[index].text = newText;
    setTrueFalseOption(newOptions);
  };

  const handlefreeTextOptionChange = (index: number, newText: any) => {
    const newOptions = [...freeText];
    newOptions[index].text = newText;
    setfreeTextAnswers(newOptions);
  };


  const handleIncorrectPairChange = (index: number, newText: any) => {
    const newOptions = [...incorrectPairs];
    newOptions[index].text = newText;
    setIncorrectPairs(newOptions);
  };

  const handlefreeTextOptionDelete = (index: number) => {
    setfreeTextAnswers(freeText.filter((option, idx) => { option; return idx !== index }));
  };

  const handleIncorrectPairDelete = (index: number) => {
    setIncorrectPairs(incorrectPairs.filter((option, idx) => { option; return idx !== index }));
  };

  const handleCorrectPairDelete = (index: number) => {
    setCorrectPairs((prevPairs: any[]) => {
      return prevPairs.filter((_, i) => i !== index); // Remove the pair at the clicked index
    });
  };

  const handleOptionDelete = (index: number) => {

    setOptions(options.filter((option, idx) => { option; return idx !== index }));
  };


  const handleCorrectAnswerToggle = (index: number) => {

    if (selectedQuestionType === "multipleChoice") {
      const newOptions = options.map((option, i) => ({
        ...option,
        isCorrect: i === index ? !option.isCorrect : option.isCorrect,
      }));
      setOptions(newOptions);

    } else if (selectedQuestionType === "trueFalse") {
      const newOptions = trueFalseOption.map((option, i) => ({
        ...option,
        // isCorrect: i === index ? true : false,
        isCorrect: i === index ? !option.isCorrect : option.isCorrect,
      }));
      setTrueFalseOption(newOptions);
    }
  };

  const addOption = () => {
    setOptions([...options, { text: EditorState.createEmpty(), isCorrect: false }]);
  };

  const addCorrectPairs = () => {
    setCorrectPairs([...correctPairs, { clue: EditorState.createEmpty(), match: "" }]);
  };

  const addIncorrectPairs = () => {
    setIncorrectPairs([...incorrectPairs, { text: "" }]);
  };

  const addfreeTextOption = () => {
    setfreeTextAnswers([...freeText, { text: "" }]);
  };

  const handleQuestionTypeSelect = (text: string) => {
    setSelectedQuestionType(text);
  }








  const handlePreviewClick = () => {
    setShowPreview(!showPreview); // Show the preview when the button is clicked

  };

  return (
    <>
      {loading && <>loading</>}
      <div className="min-h-screen bg-gray-100 p-8">
        <Toaster />
        {!showPreview ? (<h2 className=" text-gray-700 mb-6 font-bold text-xl">
          Tests {">"} Question Bank {">"} Add New Questions
        </h2>) : (<h2 className=" text-gray-700 mb-6 font-bold text-xl">
          Question Preview
        </h2>)}

        {!showPreview ? (<div className="bg-white p-6 rounded-lg shadow-lg  mx-auto">


          <div className="mb-8">
            <h3 className="font-bold text-gray-700 mb-3 border-b-[0.05rem] border-black/25 py-3 text-lg">
              1. Select Question Type
            </h3>
            <div className="grid grid-cols-6 gap-4">
              <button
                onClick={() => handleQuestionTypeSelect("multipleChoice")}
                className={`p-4 border border-gray-300 rounded-lg text-left flex flex-col items-center justify-center h-[7rem] ${selectedQuestionType === "multipleChoice" ? "bg-blue-100 border-blue-500" : ""}`}
              >
                <img className="w-[1.8rem] m-1" src={multipleChoice} />
                <span className="font-semibold text-[0.85rem]">Multiple Choice</span>
              </button>
              <button
                onClick={() => handleQuestionTypeSelect("trueFalse")}
                className={`p-4 border border-gray-300 rounded-lg text-left flex flex-col items-center justify-center h-[7rem] ${selectedQuestionType === "trueFalse" ? "bg-blue-100 border-blue-500" : ""}`}
              >
                <img className="w-[1.8rem] m-1" src={falseTrue} />
                <span className="font-semibold text-[0.85rem]">True False</span>
              </button>
              <button
                onClick={() => handleQuestionTypeSelect("matching")}
                className={`p-4 border border-gray-300 rounded-lg text-left flex flex-col items-center justify-center h-[7rem] ${selectedQuestionType === "matching" ? "bg-blue-100 border-blue-500" : ""}`}
              >
                <img className="w-[1.6rem] m-1" src={matching} />
                <span className="font-semibold text-[0.85rem]">Matching</span>
              </button>
              <button
                onClick={() => handleQuestionTypeSelect("freeText")}
                className={`p-4 border border-gray-300 rounded-lg text-left flex flex-col items-center justify-center h-[7rem] ${selectedQuestionType === "freeText" ? "bg-blue-100 border-blue-500" : ""}`}
              >
                <img className="w-[1.8rem] m-1" src={freeTex} />
                <span className="font-semibold text-[0.85rem]">Free Text</span>
              </button>
              <button
                onClick={() => handleQuestionTypeSelect("grammar")}
                className={`p-4 border border-gray-300 rounded-lg text-left flex flex-col items-center justify-center h-[7rem] ${selectedQuestionType === "grammar" ? "bg-blue-100 border-blue-500" : ""}`}
              >
                <img className="w-[1.5rem] m-[0.35rem]" src={Grammar} />
                <span className="font-semibold text-[0.85rem]">Grammar</span>
              </button>
              <button
                onClick={() => handleQuestionTypeSelect("essay")}
                className={`p-4 border border-gray-300 rounded-lg text-left flex flex-col items-center justify-center h-[7rem] ${selectedQuestionType === "essay" ? "bg-blue-100 border-blue-500" : ""}`}
              >
                <img className="w-[1.6rem] m-2" src={Essay} />
                <span className="font-semibold text-[0.85rem]">Essay</span>
              </button>
            </div>
            {/* <PreviewQuestion selectedQuestionType={selectedQuestionType} />  */}
          </div>

          {/* <div className="mb-8">
            <h3 className="font-bold text-gray-700 mb-3 border-b-[0.05rem] border-black/25 py-3 text-lg">
              2. Write your question
            </h3>
            {selectedQuestionType === "grammar" ?
              (
                <>
                  <div className="mb-4">
                    <label className="font-semibold text-gray-700">Add a sentence with incorrect punctuation or grammar </label>
                    <input
                      value={grammarText}
                      onChange={(e) => setGrammarText(e.target.value)}
                      className="w-full p-2 mt-2 border border-gray-300 rounded"

                    />
                  </div>

                  <div className="mb-4">
                    <label className="font-semibold text-red-600">Add the Correct version to be graded against (not seen during the test) </label>
                    <input
                      value={grammarCorrect}
                      onChange={(e) => setGrammarCorrect(e.target.value)}
                      className="w-full p-2 mt-2 border border-gray-300 rounded"

                    />

                  </div>

                </>
              )
              : <div className={`border opacity-35 hover:opacity-100 duration-200`}>
                <Editor
                  editorState={editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={onEditorStateChange}
                  toolbar={{
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                    image: {
                      previewImage: true,
                      uploadCallback: (file: any) => {
                        return new Promise((resolve, reject) => {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            resolve({
                              data: {
                                url: reader.result,
                              },
                            });
                          };

                          reader.onerror = (reason) => reject(reason);

                          reader.readAsDataURL(file);
                        });
                      },
                      alt: { present: true, mandatory: true },
                    },
                  }}
                />
              </div>}
          </div> */}
           <div className="mb-8">
            <h3 className="font-bold text-gray-700 mb-3 border-b-[0.05rem] border-black/25 py-3 text-lg">
                2. Write your question
            </h3>
            <div className="mb-4">
                <label className="font-semibold text-gray-700">Upload an Image (Optional):</label>
                <input
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                            setImage(e.target.files[0]);
                        }
                    }}
                    className="w-full p-2 mt-2 border border-gray-300 rounded"
                />
            </div>
            {selectedQuestionType === "grammar" ?
              (
                <>
                  <div className="mb-4">
                    <label className="font-semibold text-gray-700">Add a sentence with incorrect punctuation or grammar </label>
                    <input
                      value={grammarText}
                      onChange={(e) => setGrammarText(e.target.value)}
                      className="w-full p-2 mt-2 border border-gray-300 rounded"

                    />
                  </div>

                  <div className="mb-4">
                    <label className="font-semibold text-red-600">Add the Correct version to be graded against (not seen during the test) </label>
                    <input
                      value={grammarCorrect}
                      onChange={(e) => setGrammarCorrect(e.target.value)}
                      className="w-full p-2 mt-2 border border-gray-300 rounded"

                    />

                  </div>

                </>
              )
              : <div className={`border opacity-35 hover:opacity-100 duration-200`}>
                <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange}
                    toolbar={{
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                        image: {
                            previewImage: true,
                            uploadCallback: (file: File) => {
                                const data = new FormData();
                                data.append("image", file);

                                return fetch(`${BASE_URL}/upload`, {
                                    method: "POST",
                                    body: data,
                                })
                                    .then((response) => response.json())
                                    .then((result) => ({
                                        data: { link: result.secure_url },
                                    }));
                            },
                            alt: { present: true, mandatory: true },
                        },
                    }}
                />
              </div>}
          </div>
            {/* <div className="mb-4">
                <label className="font-semibold text-gray-700">Upload an Image (Optional):</label>
                <input
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                            setImage(e.target.files[0]);
                        }
                    }}
                    className="w-full p-2 mt-2 border border-gray-300 rounded"
                />
            </div>
            <div className="border opacity-35 hover:opacity-100 duration-200">
                <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange}
                    toolbar={{
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                        image: {
                            previewImage: true,
                            uploadCallback: (file: File) => {
                                const data = new FormData();
                                data.append("image", file);

                                return fetch(`${BASE_URL}/upload`, {
                                    method: "POST",
                                    body: data,
                                })
                                    .then((response) => response.json())
                                    .then((result) => ({
                                        data: { link: result.secure_url },
                                    }));
                            },
                            alt: { present: true, mandatory: true },
                        },
                    }}
                />
            </div>
        </div>
   */}



          {(selectedQuestionType !== "grammar" && selectedQuestionType !== "essay") && (
            <div className="mb-8">
              <h3 className="font-bold text-gray-700 mb-3 border-b-[0.05rem] border-black/25 py-3 text-lg">
                3. {selectedQuestionType === "multipleChoice" ? "Add your multiple choice answer options" :
                  selectedQuestionType === "trueFalse" ? "Add your answer options" :
                    selectedQuestionType === "freeText" ? "Add accepted answers" :
                      selectedQuestionType === 'matching' ? "Add matching pairs" : ""}
              </h3>
              {selectedQuestionType === "multipleChoice" ? options.map((option, index) => (
                <div key={index} className="mb-4 w-4/5">
                  <div className="flex items-center mb-2">
                    <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span>
                    <label className="cl-checkbox">

                      <input
                        type="checkbox"
                        checked={option.isCorrect}
                        onChange={() => handleCorrectAnswerToggle(index)}
                        className="mr-2"
                      />
                      <span></span>
                    </label>

                    <label className=" font-medium">Set as correct answer</label>
                    {index === 0 || index === 1 ? <span className="font-semibold px-5">(Mandatory)</span> : <FaTrashAlt onClick={() => { handleOptionDelete(index) }} className="text-lg hover:cursor-pointer mx-10" />}
                  </div>


                  <div className={`border ${option.isCorrect ? "border-green-500" : 'border-gray-300'} opacity-35 hover:opacity-100 duration-200`}>
                    <Editor
                      editorState={option.text}
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                      onEditorStateChange={(value: any) => handleOptionChange(index, value)}
                      toolbar={{
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                        image: {
                          previewImage: true,
                          uploadCallback: (file: any) => {
                            return new Promise((resolve, reject) => {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                resolve({
                                  data: {
                                    url: reader.result,
                                  },
                                });
                              };

                              reader.onerror = (reason) => reject(reason);

                              reader.readAsDataURL(file);
                            });
                          },
                          alt: { present: true, mandatory: true },
                        },
                      }}

                    />
                  </div>
                </div>
              )) :
                selectedQuestionType === "trueFalse" ? trueFalseOption.map((option, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex items-center mb-2">
                      <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span>
                      <input
                        type="checkbox"
                        checked={option.isCorrect}
                        onChange={() => handleCorrectAnswerToggle(index)}
                        className="mr-2"
                      />

                      <label>This is a correct Answer</label>
                    </div>


                    <input
                      type="text"
                      value={option.text}
                      className={`p-2 mt-2 border border-gray-300 rounded outline-none hover:border-gray-700   ${option.isCorrect ? "border-2 !border-green-400" : "border-[1px] border-gray-300"}`}
                      onChange={(e) => handletrueFalseOptionChange(index, e.target.value)}


                    />
                  </div>
                )) : selectedQuestionType === "freeText" ? freeText.map((option, index) => (

                  <div key={index} className="mb-4 flex justify-start items-center gap-2">

                    <input
                      type="text"
                      value={option.text}
                      className={`p-2 mt-2 border border-gray-300 rounded outline-none hover:border-gray-700   ${false ? "border-2 !border-green-400" : "border-[1px] border-gray-300"}`}
                      onChange={(e) => handlefreeTextOptionChange(index, e.target.value)}
                    />

                    {index === 0 ? <span className="mt-2">Mandatory</span> : <FaTrashAlt onClick={() => { handlefreeTextOptionDelete(index) }} className="mt-2" />}

                  </div>
                  // )) : selectedQuestionType === "matching" ? (
                  //   <>

                  //     {correctPairs.map((option, index) => (

                  //       <div className="w-full flex items-center justify-between mb-4">

                  //         <div className="w-6/12 border">
                  //           <Editor
                  //             editorState={option.clue}
                  //             toolbarClassName="toolbarClassName"
                  //             wrapperClassName="wrapperClassName"
                  //             editorClassName="editorClassName"
                  //             onEditorStateChange={(value: any) => handleClueChange(index, value)}
                  //             toolbar={{
                  //               inline: { inDropdown: true },
                  //               list: { inDropdown: true },
                  //               textAlign: { inDropdown: true },
                  //               link: { inDropdown: true },
                  //               history: { inDropdown: true },
                  //               image: {
                  //                 previewImage: true,
                  //                 uploadCallback: (file: any) => {
                  //                   return new Promise((resolve, reject) => {
                  //                     const reader = new FileReader();
                  //                     reader.onloadend = () => {
                  //                       resolve({
                  //                         data: {
                  //                           url: reader.result,
                  //                         },
                  //                       });
                  //                     };

                  //                     reader.onerror = (reason) => reject(reason);

                  //                     reader.readAsDataURL(file);
                  //                   });
                  //                 },
                  //                 alt: { present: true, mandatory: true },
                  //               },
                  //             }}
                  //           />
                  //         </div>
                  //         <div className="w-1/12 flex justify-center"><FaArrowRightArrowLeft className='w-[2rem] h-auto' /></div>

                  //         <div className="w-5/12">
                  //           <input
                  //             type="text"
                  //             className="border-2 border-gray-400 py-1 px-5"
                  //             value={option.match}
                  //             onChange={(e) => handleMatchChange(index, e.target.value)} />
                  //         </div>

                  //       </div>))}


                  //     <button

                  //       onClick={addCorrectPairs}
                  //       className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  //     >
                  //       + Add another pair
                  //     </button>

                  //     {incorrectPairs.map((option:any, index) => (

                  //       <div key={index} className="mb-4 flex justify-start items-center gap-2">

                  //         <input
                  //           type="text"
                  //           value={option?.text}
                  //           className={`p-2 mt-2 border border-gray-300 rounded outline-none hover:border-gray-700   ${false ? "border-2 !border-green-400" : "border-[1px] border-gray-300"}`}
                  //           onChange={(e) => handleIncorrectPairChange(index, e.target.value)}
                  //         />

                  //         {index === 0 ? <span className="mt-2">Mandatory</span> : <FaTrashAlt onClick={() => { handleIncorrectPairDelete(index) }} className="mt-2" />}

                  //       </div>
                  //     ))}

                  //     <button

                  //       onClick={addIncorrectPairs}
                  //       className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  //     >
                  //       + Add another Incorrect pair
                  //     </button>
                  //   </>



                  // )
                )) : selectedQuestionType === "matching" ? (
                  <>
                    {correctPairs.map((option, index) => (
                      <div className="w-full flex items-center justify-between mb-4" key={index}>
                        <div className="w-6/12 border">
                          <Editor
                            editorState={option.clue}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={(value: any) => handleClueChange(index, value)}
                            toolbar={{
                              inline: { inDropdown: true },
                              list: { inDropdown: true },
                              textAlign: { inDropdown: true },
                              link: { inDropdown: true },
                              history: { inDropdown: true },
                              image: {
                                previewImage: true,
                                uploadCallback: (file: any) => {
                                  return new Promise((resolve, reject) => {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      resolve({
                                        data: {
                                          url: reader.result,
                                        },
                                      });
                                    };

                                    reader.onerror = (reason) => reject(reason);

                                    reader.readAsDataURL(file);
                                  });
                                },
                                alt: { present: true, mandatory: true },
                              },
                            }}
                          />
                        </div>

                        <div className="w-1/12 flex justify-center">
                          <FaArrowRightArrowLeft className="w-[2rem] h-auto" />
                        </div>

                        <div className="w-5/12">
                          <input
                            type="text"
                            className="border-2 border-gray-400 py-1 px-5"
                            value={option.match}
                            onChange={(e) => handleMatchChange(index, e.target.value)}
                          />
                        </div>


                        {index >= 2 && (
                          <div className="w-1/12 flex justify-center">
                            <FaTrashAlt
                              onClick={() => handleCorrectPairDelete(index)}
                              className="cursor-pointer text-lg"
                            />
                          </div>
                        )}
                      </div>
                    ))}

                    <button
                      onClick={addCorrectPairs}
                      className="bg-color1 text-white px-4 py-2 rounded hover:bg-fore"
                    >
                      + Add another pair
                    </button>

                    {/* Incorrect Pairs */}
                    {incorrectPairs.map((option: any, index) => (
                      <div key={index} className="mb-4 flex justify-start items-center gap-2">
                        <input
                          type="text"
                          value={option?.text}
                          className={`p-2 mt-2 border border-gray-300 rounded outline-none hover:border-gray-700   ${false ? "border-2 !border-green-400" : "border-[1px] border-gray-300"}`}
                          onChange={(e) => handleIncorrectPairChange(index, e.target.value)}
                        />


                        {index < 2 ? (
                          <span className="mt-2">Mandatory</span>
                        ) : (
                          <FaTrashAlt
                            onClick={() => handleIncorrectPairDelete(index)}
                            className="mt-2 cursor-pointer text-red-500"
                          />
                        )}
                      </div>
                    ))}

                    <button
                      onClick={addIncorrectPairs}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      + Add another Incorrect pair
                    </button>
                  </>
                ) : (<></>)
              }
              {selectedQuestionType === "multipleChoice" && <button

                onClick={addOption}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                + Add another Option
              </button>}

              {selectedQuestionType === "freeText" && <button

                onClick={addfreeTextOption}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                + Add another answer
              </button>}
            </div>
          )}


          {/* Add feedback section */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-700 mb-3 border-b-[0.05rem] border-black/25 py-3 text-lg">
              {(selectedQuestionType !== "grammar" && selectedQuestionType !== "essay") ? "4" : "3"}. Give feedback <span className="text-gray-400">(optional)</span>
            </h3>

            <div className="mb-4">
              <label className="font-semibold text-green-600">Correctly answered</label>
              <textarea
                value={correctFeedback}
                onChange={(e) => setCorrectFeedback(e.target.value)}
                className="w-full p-2 mt-2 border border-gray-300 rounded hover:border-black"
                placeholder="Feedback"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="font-semibold text-red-600">Incorrectly answered</label>
              <textarea
                value={incorrectFeedback}
                onChange={(e) => setIncorrectFeedback(e.target.value)}
                className="w-full p-2 mt-2 border border-gray-300 rounded hover:border-black"
                placeholder="Feedback"
              ></textarea>
            </div>
          </div>




          <div className="text-sm text-blue-500 mb-8">
            <a href="#" className="underline">
              Question Examples and Guides
            </a>{" "}
            |{" "}
            <a href="#" className="underline ml-2">
              Copy & Paste Symbols
            </a>
          </div>



          {/* Category Section */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-700 mb-3 border-b-[0.05rem] border-black/25 py-3 text-lg">
              {(selectedQuestionType !== "grammar" && selectedQuestionType !== "essay") ? "5" : "4"}. Category
            </h3>
            <p className="text-gray-600 mb-2">
              - Categories help you organize questions and analyze performance in your Tests.
            </p>
            <p className="text-gray-600 mb-4">
              - You can also include random questions in your Tests from your Categories.
            </p>
            <div className="mb-4">
              <select
                value={parentCategory}
                onChange={(e) => setParentCategory(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full mb-2"
              >
                <option value="Generic Parent (default)">Generic Parent (default)</option>

                {
                  parentCategories.map((category:any) => {
                  return (
                    <option className="text-black" key={category.id} value={category.id}>
                      {category.parentCategoryName} 
                    </option>
                  )
                })
                }
                {/* Add more options as needed */}
              </select>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full"
              >
                <option value="Generic (default)">Generic (default)</option>
                {
                  childCategories.filter((c:any) => { return c.ParentCategories?.id === parentCategory})
                  .map(((c:any)=>{ 
                    return (
                      <option key={c.id} value={c.id}>
                        {c.categoryName}
                      </option>
                    )
                  }))
                }
                {/* Add more options as needed */}
              </select>
            </div>
            <button className="text-blue-500 underline text-sm">
              New Category
            </button>
          </div>

          {/* Question Settings Section */}
          <div>
            <h3 className="font-bold text-gray-700 mb-3 border-b-[0.05rem] border-black/25 py-3 text-lg">
              {(selectedQuestionType !== "grammar" && selectedQuestionType !== "essay") ? "6" : "5"}. Question settings
            </h3>
            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-2">
                Points Available
              </label>
              <input
                type="number"
                min='1'
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>
            {selectedQuestionType === "multipleChoice" && <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-2">
                Randomize Answers
              </label>

              <FormControl>

                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"

                >
                  <FormControlLabel value="No" name="randomize"
                    checked={!randomizeAnswers}
                    onChange={() => setRandomizeAnswers(false)} control={<Radio />} label="No" />
                  <FormControlLabel value="Yes" name="randomize"
                    checked={randomizeAnswers}
                    onChange={() => setRandomizeAnswers(true)} control={<Radio />} label="Yes" />
                </RadioGroup>
              </FormControl>



            </div>
            }
            {selectedQuestionType === "multipleChoice" && <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Answer Selection
              </label>

              <FormControl>

                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel value="female" name="answerSelection"
                    checked={answerSelection === "radio"}
                    onChange={() => setAnswerSelection("radio")} control={<Radio />} label="Radio buttons - Only one answer option can be selected" />
                  <FormControlLabel value="male" name="answerSelection"
                    checked={answerSelection === "checkbox"}
                    onChange={() => setAnswerSelection("checkbox")} control={<Radio />} label="Checkboxes - Multiple answer options can be selected" />
                </RadioGroup>
              </FormControl>
            </div>}

          </div>



        </div>) : renderPreviewCard()}

        {/* <div className="mx-4 mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <button className="border-black bg-fore px-5 py-2 rounded-md text-white" onClick={handlePreviewClick}>{!showPreview ? "Preview" : "Edit"}</button>
          <button onClick={() => handleSubmit()} className="border-black bg-color1 px-5 py-2 rounded-md text-white">Save</button>
          <button className="border-black bg-color1 px-5 py-2 rounded-md text-white">
            Save and add more
          </button>
        </div> */}

<div className="mx-4 mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
  <button
    className={`border-black bg-fore px-5 py-2 rounded-md text-white ${
      !areFieldsValid() ? "disabled:bg-gray-400 disabled:cursor-not-allowed" : ""
    }`}
    onClick={handlePreviewClick}
    disabled={!areFieldsValid()}
  >
    {!showPreview ? "Preview" : "Edit"}
  </button>

  {/* <button
    onClick={handleSubmit}
    className={`border-black bg-color1 px-5 py-2 rounded-md text-white ${
      !areFieldsValid() ? "disabled:bg-gray-400 disabled:cursor-not-allowed" : ""
    }`}
    disabled={!areFieldsValid()}  
  >
     {loading ? (
                  <div className="flex items-center gap-2">
                    <Circles height="20" width="20" color="#fff" ariaLabel="loading-indicator" />
                    Saving...
                  </div>
                ) : (
    "Save"
              )}
  </button>

  <button
    onClick={() => {
      handleSubmit(); // Call your submit logic
      navigate(location.pathname, { replace: true });// Reload the current page
    }}
    className={`border-black bg-color1 px-5 py-2 rounded-md text-white ${
      !areFieldsValid() ? "disabled:bg-gray-400 disabled:cursor-not-allowed" : ""
    }`}
    disabled={!areFieldsValid()}
  >
     {loading ? (
                  <div className="flex items-center gap-2">
                    <Circles height="20" width="20" color="#fff" ariaLabel="loading-indicator" />
                    Saving...
                  </div>
                ) : (
    "Save & add more"
              )}
    
  </button> */}

<button
  onClick={handleSubmitWithSave}
  className={`border-black bg-color1 px-5 py-2 rounded-md text-white ${
    !areFieldsValid() ? "disabled:bg-gray-400 disabled:cursor-not-allowed" : ""
  }`}
  disabled={!areFieldsValid()}
>
  {isSaving ? (
    <div className="flex items-center gap-2">
      <Circles height="20" width="20" color="#fff" ariaLabel="loading-indicator" />
      Saving...
    </div>
  ) : (
    "Save"
  )}
</button>

<button
  onClick={handleSubmitWithSaveAndAddMore}
  className={`border-black bg-color1 px-5 py-2 rounded-md text-white ${
    !areFieldsValid() ? "disabled:bg-gray-400 disabled:cursor-not-allowed" : ""
  }`}
  disabled={!areFieldsValid()}
>
  {isSavingAndAddingMore ? (
    <div className="flex items-center gap-2">
      <Circles height="20" width="20" color="#fff" ariaLabel="loading-indicator" />
      Saving...
    </div>
  ) : (
    "Save & add more"
  )}
</button>

</div>


      </div>
    </>
  );
};

export default Test;
