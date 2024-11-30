

import { Sidebar } from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTestByUser } from '@/api/test';


const SelectTest = () => {
     const navigate = useNavigate();
     const [tests, setTests] = useState([]); // Tests data
     const fetchUserTest = async () => {
        try {
          const data = await getTestByUser();
          if (data.code === 200 || data.code === 201) {
            setTests(data.data);
          } else {
            console.error('Error fetching user test', data);
          }
        } catch (error) {
          console.error('Error fetching user test', error);
        }
      };

      useEffect(() => {
        fetchUserTest();
      }, []);
    return (
        <>
            <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
                <Sidebar />
                <div className="dark:bg-blackPrimary bg-whiteSecondary w-full pt-6 pl-9 max-sm:pt-6 max-sm:pl-5 flex max-[1700px]:flex-wrap gap-x-10 max-[400px]:pl-2">
                    <div className="w-full pl-3">
                        {/* Add code here */}
                        <div className="flex flex-col gap-4">
                            {/* Header Steps */}
                            <div className="flex items-center justify-center">
                                <div className="flex gap-6 items-center text-gray-700 dark:text-gray-300">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center font-medium">1</div>
                                        <span>Select Test</span>
                                    </div>
                                    <hr className="border-gray-400 w-8" />
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 text-blackSecondary dark:text-white rounded-full flex items-center justify-center font-medium">2</div>
                                        <span>Assign</span>
                                    </div>
                                    <hr className="border-gray-400 w-8" />
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 text-blackSecondary dark:text-white rounded-full flex items-center justify-center font-medium">3</div>
                                        <span>Test settings</span>
                                    </div>
                                    <hr className="border-gray-400 w-8" />
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 text-blackSecondary dark:text-white rounded-full flex items-center justify-center font-medium">4</div>
                                        <span>Review</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='mt-8'>
                                <div className='text-md font-semibold mb-4'>Filter Test By Category</div>
                                <select className="w-full md:w-auto px-4 py-2 border border-gray-300 hover:border-black rounded-lg text-sm text-gray-500">
                                    <option>Show All Tests</option>
                                    <option>Generic Parent</option>
                                    
                                </select>
                            </div>

                            {/* Test List */}
                            <div className="text-lg font-semibold mb-4">Select a Test to continue</div>
                           {tests.map((test:any)=>( 
                            <div className="">
                                <div className="bg-white max-w-2xl py-5 dark:bg-gray-800 p-4 rounded-lg flex justify-between items-center hover:bg-gray-200 dark:hover:bg-gray-700">
                                    <span className="text-gray-800 dark:text-gray-200">{test.testName}</span>
                                    <Link className="text-blue-600 font-medium hover:underline" state={{test:test}} to='/teacher-dashboard/assigntest'>Assign this Test</Link>
                                </div>
                            </div>
                        ))}

                            {/* Info Section */}
                            <div className="mt-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
                                <div className="text-lg font-semibold mb-2">Why do I need to Assign Tests?</div>
                                <ul className="text-gray-700 dark:text-gray-300 list-disc list-inside">
                                    <li>Select the settings that are used when giving the Test (such as Time limits / Randomize questions)</li>
                                    <li>Select which <span className="text-blue-500">Group</span> to assign the Test to, or Create a <span className="text-blue-500">Link</span> for the Test to send out or Embed the Test on your website.</li>
                                    <li>Learn about <span className="text-blue-500">Groups and Links</span></li>
                                </ul>
                            </div>
                        </div>
                        {/* End of added code */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SelectTest;
