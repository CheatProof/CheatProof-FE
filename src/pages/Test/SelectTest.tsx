import { Footer, Header, Sidebar } from '../../components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllTests, getTestByUser } from '@/api/test'; // Adjust API endpoint for fetching tests by category
import { getAllParentCategories } from '../../api/parent-category';
import { getAllChildCategories } from '../../api/child-category';
import {

  Select,
  MenuItem,
  FormControl,
  InputLabel,

  CircularProgress,
} from '@mui/material';

const SelectTest = () => {
  const [parentCategories, setParentCategories] = useState<any[]>([]);
  const [childCategories, setChildCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [tests, setTests] = useState<any[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingTests, setIsLoadingTests] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialTests = async () => {
      try {
        setIsLoadingTests(true);
        const data = await getTestByUser(); // Fetch all tests initially
        if (data.code === 200 || data.code === 201) {
          setTests(data.data); // Display all tests
        } else {
          console.error("Error fetching all tests", data);
        }
      } catch (error) {
        console.error("Error fetching initial tests", error);
      } finally {
        setIsLoadingTests(false);
      }
    };
  
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const parentData = await getAllParentCategories();
        const childData = await getAllChildCategories();
        if (parentData.code === 200 || parentData.code === 201) {
          setParentCategories(parentData.data);
          console.log(parentCategories)
        }
        if (childData.code === 200 || childData.code === 201) {
          setChildCategories(childData.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoadingCategories(false);
      }
    };
  
    // Fetch both categories and initial tests
    fetchCategories();
    fetchInitialTests();
  }, []);
  
  const handleCategoryChange = async (categoryId: string) => {
    setSelectedCategory(categoryId);
  
    try {
      setIsLoadingTests(true);
  
      if (categoryId === '0') {
        const data = await getTestByUser(); // Fetch all tests
        if (data.code === 200 || data.code === 201) {
          setTests(data.data); // Display all tests
        } else {
          console.error("Error fetching all tests", data);
        }
      } else {
        const data = await getTestByUser(); // Fetch tests by user
        if (data.code === 200 || data.code === 201) {
          const filteredTests = data.data.filter(
            (test: any) => test.categoryId === categoryId
          );
          setTests(filteredTests);
        } else {
          console.error("Error fetching tests by category", data);
        }
      }
    } catch (error) {
      console.error("Error fetching tests", error);
    } finally {
      setIsLoadingTests(false);
    }
  };
  

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         setIsLoadingCategories(true);
//         const parentData = await getAllParentCategories();
//         const childData = await getAllChildCategories();
//         if (parentData.code === 200 || parentData.code === 201) {
//           setParentCategories(parentData.data);
//         }
//         if (childData.code === 200 || childData.code === 201) {
//           setChildCategories(childData.data);
//         }
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       } finally {
//         setIsLoadingCategories(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleCategoryChange = async (categoryId: string) => {
//     setSelectedCategory(categoryId);
  
//     try {
//       setIsLoadingTests(true);
  
//       // Fetch all tests if "Select Category" (ID "0") is chosen
//       if (categoryId === '0') {
//         const data = await getAllTests(); // Fetch all tests
//         if (data.code === 200 || data.code === 201) {
//           setTests(data.data); // Display all tests
//         } else {
//           console.error("Error fetching all tests", data);
//         }
//       } else {
//         // Fetch tests by user and filter by the selected category
//         const data = await getTestByUser();
//         if (data.code === 200 || data.code === 201) {
//           const filteredTests = data.data.filter(
//             (test: any) => test.categoryId === categoryId
//           );
//           setTests(filteredTests);
//         } else {
//           console.error("Error fetching tests by category", data);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching tests", error);
//     } finally {
//       setIsLoadingTests(false);
//     }
//   };
  

  // Fetch tests when a category is selected
//   const handleCategoryChange = async (categoryId: string) => {
//     setSelectedCategory(categoryId);
//     if (categoryId === '0') {
//       setTests([]); 
//       return;
//     }

//     try {
//       setIsLoadingTests(true);
//       const data = await getTestByUser(); 
//       if (data.code === 200 || data.code === 201) {
        
//         const filteredTests = data.data.filter(
//           (test: any) => test.categoryId === categoryId
//         );
//         setTests(filteredTests);
//       } else {
//         console.error("Error fetching tests", data);
//       }
//     } catch (error) {
//       console.error("Error fetching tests", error);
//     } finally {
//       setIsLoadingTests(false);
//     }
//   };



//       if (data.code === 200 || data.code === 201) {
//         setTests(data.data);
//       } else {
//         console.error('Error fetching tests:', data);
//       }
//     } catch (error) {
//       console.error('Error fetching tests:', error);
//     } finally {
//       setIsLoadingTests(false);
//     }
//   };

  return (
    <>
      <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
        <Sidebar />
        <div className="dark:bg-blackPrimary bg-whiteSecondary w-full ">
          <Header/>        
            <div className="w-full pl-3 mt-2 min-h-screen">
            <div className="flex flex-col gap-4">
              {/* Header Steps */}
              <div className="flex items-center justify-center">
                <div className="flex gap-6 items-center text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-color2 text-white rounded-full flex items-center justify-center font-medium">1</div>
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

              {/* Filter Test By Category */}
              <FormControl className="w-1/5">
                <InputLabel>Filter Test By Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  label="Filter Test By Category"
                  disabled={isLoadingCategories}
                >
                  <MenuItem value="0">Select Category</MenuItem>
                  {isLoadingCategories ? (
                    <MenuItem disabled>
                      <CircularProgress size={24} />
                    </MenuItem>
                  ) : (
                    childCategories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.categoryName}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>

              {/* Test List */}
              <div className="text-lg font-semibold mb-4">Select a Test to continue</div>
              {isLoadingTests ? (
                <CircularProgress size={32} />
              ) : tests.length === 0 ? (
                <p>No tests available for the selected category.</p>
              ) : (
                tests.map((test: any) => (
                  <div key={test.categoryId} className="mb-4">
                    <div className="bg-white max-w-2xl py-5 dark:bg-gray-800 p-4 rounded-lg flex justify-between items-center hover:bg-gray-200 dark:hover:bg-gray-700">
                      <span className="text-gray-800 dark:text-gray-200">{test.testName}</span>
                      <Link
                        className="text-blue-600 font-medium hover:underline"
                        state={{ test }}
                        to="/teacher-dashboard/assigntest"
                      >
                        Assign this Test
                      </Link>
                    </div>
                  </div>
                ))
              )}

              {/* Info Section */}
              <div className="mt-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
                <div className="text-lg font-semibold mb-2">Why do I need to Assign Tests?</div>
                <ul className="text-gray-700 dark:text-gray-300 list-disc list-inside">
                  <li>Select the settings that are used when giving the Test (such as Time limits / Randomize questions)</li>
                  <li>
                    Select which <span className="text-blue-500">Group</span> to assign the Test to, or Create a <span className="text-blue-500">Link</span> for the Test to send out or Embed the Test on your
                    website.
                  </li>
                  <li>Learn about <span className="text-blue-500">Groups and Links</span></li>
                </ul>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default SelectTest;
