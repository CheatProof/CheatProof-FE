import { useState } from "react";
import multipleChoice from "../../assets/icon-multimedia-grey.png";
import falseTrue from "../../assets/icon-truefalse-grey.png";
import matching from "../../assets/icon-matching-grey.png";
import freeText from "../../assets/icon-freetext-grey.png";
import Grammar from "../../assets/icon-grammar-grey.png";
import Essay from "../../assets/icon-essay-grey.png";
import { EditorState, ContentState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertFromRaw } from 'draft-js';


const Test = () => {

  // General
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [correctFeedback, setCorrectFeedback] = useState('');
  const [incorrectFeedback, setIncorrectFeedback] = useState('');
  const [parentCategory, setParentCategory] = useState("Generic Parent (default)");
  const [subCategory, setSubCategory] = useState("Generic (default)");
  const [points, setPoints] = useState(1);

  // MCQS
  const [options, setOptions] = useState([{ text: EditorState.createEmpty(), isCorrect: false }]);
  const [randomizeAnswers, setRandomizeAnswers] = useState(false);
  const [answerSelection, setAnswerSelection] = useState("radio");

  // State for selected question type
  const [selectedQuestionType, setSelectedQuestionType] = useState("multipleChoice");

  const getTrueFalseOptions = () => {
    const trueContent = ContentState.createFromText("True");
    const falseContent = ContentState.createFromText("False");

    return [
      { text: EditorState.createWithContent(trueContent), isCorrect: false },
      { text: EditorState.createWithContent(falseContent), isCorrect: false }
    ];
  };

  const onEditorStateChange = (editorState:any) => {
    console.log(editorState)
    setEditorState(editorState);

  };

  const handleOptionChange = (index:number, newText:any) => {
    const newOptions = [...options];
    newOptions[index].text = newText;
    setOptions(newOptions);
  };

  const handleCorrectAnswerToggle = (index:number) => {

    if (selectedQuestionType === "multipleChoice") {
      const newOptions = options.map((option, i) => ({
        ...option,
        isCorrect: i === index ? !option.isCorrect : option.isCorrect,
      }));
      setOptions(newOptions);

    } else if (selectedQuestionType === "trueFalse") {
      const newOptions = options.map((option, i) => ({
        ...option,
        isCorrect: i === index ? true : false,
      }));
      setOptions(newOptions);
    }
  };

  const addOption = () => {
    setOptions([...options, { text: EditorState.createEmpty(), isCorrect: false }]);
  };

  // Function to handle question type selection
  const handleQuestionTypeSelect = (type:any) => {
    setSelectedQuestionType(type);
    if (type === "trueFalse") {
      setOptions(getTrueFalseOptions());

    } else {
      setOptions([{ text: EditorState.createEmpty(), isCorrect: false }]);
    }

    
  


  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="bg-white p-6 rounded-lg shadow-lg  mx-auto">
          <h2 className="text-gray-600 mb-6 font-bold text-lg">
            Tests {">"} Question Bank {">"} Add New Questions
          </h2>

          <div className="mb-8">
            <h3 className="font-semibold text-gray-700 mb-3 border-b-[0.05rem] border-black/25 py-3">
              1. Select Question Type
            </h3>
            <div className="grid grid-cols-6 gap-4">
              <button
                onClick={() => handleQuestionTypeSelect("multipleChoice")}
                className={`p-4 border border-gray-300 rounded-lg hover:bg-gray-100 text-left flex flex-col items-center justify-center h-[7rem] ${selectedQuestionType === "multipleChoice" ? "bg-blue-100 border-blue-500" : ""}`}
              >
                <img className="w-[1.3rem] m-1" src={multipleChoice} />
                <span className="font-semibold text-[0.75rem]">Multiple Choice</span>
              </button>
              <button
                onClick={() => handleQuestionTypeSelect("trueFalse")}
                className={`p-4 border border-gray-300 rounded-lg hover:bg-gray-100 text-left flex flex-col items-center justify-center h-[7rem] ${selectedQuestionType === "trueFalse" ? "bg-blue-100 border-blue-500" : ""}`}
              >
                <img className="w-[1.3rem] m-1" src={falseTrue} />
                <span className="font-semibold text-[0.75rem]">True False</span>
              </button>
              <button
                onClick={() => handleQuestionTypeSelect("matching")}
                className={`p-4 border border-gray-300 rounded-lg hover:bg-gray-100 text-left flex flex-col items-center justify-center h-[7rem] ${selectedQuestionType === "matching" ? "bg-blue-100 border-blue-500" : ""}`}
              >
                <img className="w-[1.3rem] m-1" src={matching} />
                <span className="font-semibold text-[0.75rem]">Matching</span>
              </button>
              <button
                onClick={() => handleQuestionTypeSelect("freeText")}
                className={`p-4 border border-gray-300 rounded-lg hover:bg-gray-100 text-left flex flex-col items-center justify-center h-[7rem] ${selectedQuestionType === "freeText" ? "bg-blue-100 border-blue-500" : ""}`}
              >
                <img className="w-[1.3rem] m-1" src={freeText} />
                <span className="font-semibold text-[0.75rem]">Free Text</span>
              </button>
              <button
                onClick={() => handleQuestionTypeSelect("grammar")}
                className={`p-4 border border-gray-300 rounded-lg hover:bg-gray-100 text-left flex flex-col items-center justify-center h-[7rem] ${selectedQuestionType === "grammar" ? "bg-blue-100 border-blue-500" : ""}`}
              >
                <img className="w-[1.3rem] m-1" src={Grammar} />
                <span className="font-semibold text-[0.75rem]">Grammar</span>
              </button>
              <button
                onClick={() => handleQuestionTypeSelect("essay")}
                className={`p-4 border border-gray-300 rounded-lg hover:bg-gray-100 text-left flex flex-col items-center justify-center h-[7rem] ${selectedQuestionType === "essay" ? "bg-blue-100 border-blue-500" : ""}`}
              >
                <img className="w-[1.3rem] m-1" src={Essay} />
                <span className="font-semibold text-[0.75rem]">Essay</span>
              </button>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold text-gray-700 mb-3 border-b-[0.05rem] border-black/25 py-3">
              2. Write your question
            </h3>
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
                  uploadCallback: (file:any) => {
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

          <div className="mb-8">
            <h3 className="font-semibold text-gray-700 mb-3 border-b-[0.05rem] border-black/25 py-3">
              3. Add your multiple choice answer options
            </h3>
            {options.map((option, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center mb-2">
                  <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span>
                  <input
                    type="checkbox"
                    checked={option.isCorrect}
                    onChange={() => handleCorrectAnswerToggle(index)}
                    className="mr-2"
                  />

                  <label>Set as correct answer</label>
                </div>


                <Editor
                  editorState={option.text}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={(value:any) => handleOptionChange(index, value)}
                  toolbar={{
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                    image: {
                      previewImage: true,
                      uploadCallback: (file:any) => {
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
            ))}
          { selectedQuestionType === "multipleChoice" && <button
          
              onClick={addOption}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              + Add another answer
            </button>}
          </div>


          {/* Add feedback section */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-700 mb-3 border-b-[0.05rem] border-black/25 py-3">
              4. Give feedback <span className="text-gray-400">(optional)</span>
            </h3>

            <div className="mb-4">
              <label className="font-semibold text-green-600">Correctly answered</label>
              <textarea
                value={correctFeedback}
                onChange={(e) => setCorrectFeedback(e.target.value)}
                className="w-full p-2 mt-2 border border-gray-300 rounded"
                placeholder="How to add feedback"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="font-semibold text-red-600">Incorrectly answered</label>
              <textarea
                value={incorrectFeedback}
                onChange={(e) => setIncorrectFeedback(e.target.value)}
                className="w-full p-2 mt-2 border border-gray-300 rounded"
                placeholder="How to add feedback"
              ></textarea>
            </div>
          </div>




          <div className="text-sm text-blue-500">
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
            <h3 className="font-semibold text-gray-700 mb-3 border-b-[0.05rem] border-black/25 py-3">
              5. Category
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
                {/* Add more options as needed */}
              </select>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full"
              >
                <option value="Generic (default)">Generic (default)</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <button className="text-blue-500 underline text-sm">
              New Category
            </button>
          </div>

          {/* Question Settings Section */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3 border-b-[0.05rem] border-black/25 py-3">
              6. Question settings
            </h3>
            <div className="mb-4">
              <label className="block font-medium text-gray-700 mb-2">
                Points Available
              </label>
              <input
                type="number"
                min="1"
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>
          { selectedQuestionType === "multipleChoice" &&  <div className="mb-4">
              <label className="block font-medium text-gray-700 mb-2">
                Randomize Answers
              </label>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  name="randomize"
                  checked={!randomizeAnswers}
                  onChange={() => setRandomizeAnswers(false)}
                  className="mr-2"
                />
                <label>No</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="randomize"
                  checked={randomizeAnswers}
                  onChange={() => setRandomizeAnswers(true)}
                  className="mr-2"
                />
                <label>Yes</label>
              </div>
            </div>}
        {  selectedQuestionType === "multipleChoice" &&   <div>
              <label className="block font-medium text-gray-700 mb-2">
                Answer Selection
              </label>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  name="answerSelection"
                  checked={answerSelection === "radio"}
                  onChange={() => setAnswerSelection("radio")}
                  className="mr-2"
                />
                <label>Radio buttons - Only one answer option can be selected</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="answerSelection"
                  checked={answerSelection === "checkbox"}
                  onChange={() => setAnswerSelection("checkbox")}
                  className="mr-2"
                />
                <label>Checkboxes - Multiple answer options can be selected</label>
              </div>
            </div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
