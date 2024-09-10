import React from "react";

const Test:React.FC = ( )=>{
        return (
        <>
          <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h2 className="text-gray-600 mb-6 font-bold text-lg">Tests {">"} Question Bank {">"} Add New Questions</h2>

        <div className="mb-8">
          <h3 className="font-semibold text-gray-700 mb-3">1. Select Question Type</h3>
          <div className="grid grid-cols-3 gap-4">
            <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-100 text-left">
              <span className="font-semibold">Multiple Choice</span>
            </button>
            <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-100 text-left">
              <span className="font-semibold">True False</span>
            </button>
            <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-100 text-left">
              <span className="font-semibold">Matching</span>
            </button>
            <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-100 text-left">
              <span className="font-semibold">Free Text</span>
            </button>
            <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-100 text-left">
              <span className="font-semibold">Grammar</span>
            </button>
            <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-100 text-left">
              <span className="font-semibold">Essay</span>
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold text-gray-700 mb-3">2. Write your question</h3>
          <textarea 
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your question only, without answers."
            rows="4"
          ></textarea>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold text-gray-700 mb-3">3. Add your multiple choice answer options</h3>
          <textarea 
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Test takers will select between these answer options."
            rows="4"
          ></textarea>
        </div>

        <div className="text-sm text-blue-500">
          <a href="#" className="underline">Question Examples and Guides</a> |
          <a href="#" className="underline ml-2">Copy & Paste Symbols</a>
        </div>
      </div>
    </div>
        </>
        )
}

export default Test;