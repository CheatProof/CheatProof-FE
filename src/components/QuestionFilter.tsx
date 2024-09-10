import React, { useState } from 'react';
import { BiHide } from "react-icons/bi";

const QuestionFilter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('active');

  return (
    <div className="bg-white p-4 mr-10 mb-10 shadow-md rounded-md flex flex-col space-y-6 md:space-y-4">
     
      <div className="flex flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 border-b-2 pb-3 border-gray-200">
        
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-3 py-1 text-md font-semibold ${activeTab === 'active' ? 'text-blue-400 border-b-2 border-blue-500' : 'text-gray-500'}`}
          >
            Active <span className="bg-blue-100 text-blue-400 text-xs px-2 py-1 rounded-full ml-1">1</span>
          </button>
          <button
            onClick={() => setActiveTab('archived')}
            className={`px-3 py-1 text-md font-semibold ${activeTab === 'archived' ? 'text-blue-400 border-b-2 border-blue-500' : 'text-gray-500'}`}
          >
            Archived <span className="bg-blue-100 text-blue-400 text-xs px-2 py-1 rounded-full ml-1">0</span>
          </button>
        </div>

        
        <div className="flex space-x-4 items-center">
          <select className="w-full md:w-auto hover:cursor-pointer pl-4 py-2 border border-gray-300 rounded-lg text-sm text-black font-semibold">
            <option>Actions</option>
            <option>Edit question settings</option>
            <option>Export question</option>
          </select>

          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 md:py-2 rounded-lg text-sm">
            + Add Question
          </button>
        </div>
      </div>

      
      {/* <div className="flex flex-col md:flex-row md:space-x-4 items-center"> */}
      <div className='flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 pb-3'>
        {/* Hide Button */}
        <div className='flex space-x-4'>
        <button className="border-gray-300 rounded-lg border-2 px-2 py-2 mb-4 md:mb-0 ">
          <BiHide />
        </button>
        </div>
        <div className='flex space-x-2 md:space-x-4 items-center '>
        {/* Search Box */}
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 border hover:border-black border-gray-300 rounded-lg text-sm"
          />
          <button className="absolute right-2 top-2 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 3a5 5 0 100 10A5 5 0 008 3zM1 8a7 7 0 1112.682 4.243l4.451 4.451a1 1 0 01-1.414 1.414l-4.451-4.451A7 7 0 011 8z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

       
        <select className="w-full md:w-auto px-4 py-2 border border-gray-300 hover:border-black rounded-lg text-sm text-gray-500">
          <option>Any Status</option>
          <option>Used</option>
          <option>Unused</option>
        </select>

        
        <select className="w-full md:w-auto px-4 py-2 border border-gray-300 hover:border-black rounded-lg text-sm text-gray-500">
          <option>All Question Types</option>
          <option>Multiple Choice</option>
          <option>True False</option>
        </select>

       
        <select className="w-full md:w-auto px-4 py-2 border border-gray-300 hover:border-black rounded-lg text-sm text-gray-500">
          <option>All Categories</option>
          <option>Generic Parent</option>
        </select>

        
        <button className="px-4 py-2 bg-gray-200 text-gray-500 rounded-lg text-sm">
          Filter
        </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionFilter;
