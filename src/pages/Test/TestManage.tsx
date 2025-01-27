import React, { useEffect, useState } from 'react';
import { Footer, Header, Sidebar } from '../../components';
import ViewTest from '../../components/Test/ViewTestCard';
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Modal,
  Typography,
} from '@mui/material';
import { TbSearch } from 'react-icons/tb';
import { getAllParentCategories } from '../../api/parent-category';
import { createTestByUser, getTestByUser } from '../../api/test';
import { getAllChildCategories } from '../../api/child-category';
import toast, { Toaster } from 'react-hot-toast';
import { Circles } from 'react-loader-spinner';
import { Button } from '@material-tailwind/react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Illustration from "@/assets/undraw_no-data_ig65.svg"

const TestManage: React.FC = () => {
  const [tests, setTests] = useState([]); // Tests data
  const [parentCategories, setParentCategories] = useState([]); // Parent categories data
  const [childCategories, setChildCategories] = useState([]); // Child categories data
  const [category, setCategory] = useState('All'); // Selected category
  const [searchTerm, setSearchTerm] = useState(''); // Search term
  const [sortBy, setSortBy] = useState('Alphabetical'); // Sort option
  const [modalOpen, setModalOpen] = useState(false); // Modal control
  const [newTestName, setNewTestName] = useState(''); // New test name
  const [newChildCategory, setNewChildCatgory] = useState(''); // Selected child category
  const [newTestCategory, setNewTestCategory] = useState(''); // Selected new test category
  const [loading, setLoading] = useState(true); // Loading state
  const [creatingTest, setCreatingTest] = useState(false); // Track creation process
  const props:any = {}

  // Fetch parent categories
  const fetchAllParentCategories = async () => {
    try {
      const data = await getAllParentCategories();
      if (data.code === 200 || data.code === 201) {
        setParentCategories(data.data);
      } else {
        console.error('Error fetching parent categories', data);
      }
    } catch (error) {
      console.error('Error fetching parent categories', error);
    }
  };

  // Fetch user-specific tests
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

  // Fetch child categories
  const fetchAllChildCategoryData = async () => {
    try {
      const data = await getAllChildCategories();
      if (data.code === 200 || data.code === 201) {
        setChildCategories(data.data);
      } else {
        console.error('Error fetching child categories', data);
        toast.error('Error fetching child categories');
      }
    } catch (error) {
      console.error('Error fetching child categories', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    Promise.all([fetchAllChildCategoryData(),fetchAllParentCategories(), fetchUserTest()]).then(() =>
      setLoading(false)
    );
  }, []);

  // Filter tests based on category and search term
  const filteredTests = tests.filter((test: any) => {
    const matchesCategory = category === 'All' || test.categoryId === category;
    const matchesSearch = test.testName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle creating a new test
  const handleCreateTest = async () => {
    setCreatingTest(true);

    try {
      if (!newTestName || !newChildCategory) {
        toast.error('Please fill out all required fields');
        return;
      }

      // const testNameRegex = /^[a-zA-Z0-9-_]+$/;
      if (!newTestName) {
        toast.error('Test name can only contain alphanumeric characters and spaces');
        return;
      }

      const body = { testName: newTestName, categoryId: newChildCategory };
      const data = await createTestByUser(body);
      if (data.code === 201) {
        toast.success('Test created successfully');
        fetchUserTest(); // Refresh tests after creation
      } else {
        toast.error('Error creating test');
      }
    } catch (error) {
      console.error('Error creating new test', error);
    } finally {
      setCreatingTest(false);
      setModalOpen(false);
    }
  };

  // Handle null data
  const renderNoData = () => (
    <div className="text-center text-gray-500 mx-auto dark:text-gray-400 mt-8">
      <img
      className="max-w-72 h-auto"
      alt="No Data Illustration"
      src={Illustration}
      />
      <p className='text-center text-xl ml-3 mt-3'>No tests available to display</p>
    </div>
  );

  return (
    <>
      <div className="h-auto shadow flex dark:border-blackSecondary border-blackSecondary border-1 dark:bg-blackPrimary bg-whiteSecondary">
        <Toaster />
        <Sidebar />
        <div className="dark:bg-blackPrimary min-h-screen bg-whiteSecondary w-full">
          <Header />
          <div className="w-full pl-3 min-h-screen">
            <div className="w-full px-3 py-4 flex text-center justify-center md:justify-start">
              <span className="text-2xl font-semibold">Tests {'>'} All Tests </span>
            </div>

            {/* Search and Filter Bar */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} pr={4}>
              <Box display="flex" gap={2}>
                <TextField
                className='!font-[Poppins]'
                  label="Search Test Name"
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    sx:{
                      fontFamily: 'Poppins',
                    },
                    endAdornment: <TbSearch />,
                  }}
                />

                <FormControl
              title='Category'
                  size="small" className="min-w-5 !font-[Poppins]" >
                  {/* <InputLabel className='!font-[Poppins]'>Categories</InputLabel> */}
                  <Select className='!font-[Poppins]' value={category} onChange={(e) => setCategory(e.target.value as string)}>
                    <MenuItem className='!font-[Poppins]' value="All">All Categories</MenuItem>
                    {childCategories.map((childCategories: any) => (
                      <MenuItem className='!font-[Poppins]' key={childCategories.id} value={childCategories.id}>
                        {childCategories.categoryName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box display="flex" alignItems="center" gap={2}>
                <FormControl size="small" variant="outlined">
                  <InputLabel>Sort by</InputLabel>
                  <Select value={sortBy} onChange={(e) => setSortBy(e.target.value as string)}>
                    <MenuItem value="Alphabetical">Alphabetical</MenuItem>
                    <MenuItem value="Date">Date</MenuItem>
                    <MenuItem value="Popularity">Popularity</MenuItem>
                  </Select>
                </FormControl>

                <Button
                {...props}
                  className="bg-color2 hover:bg-color1 text-white"
                  onClick={() => setModalOpen(true)}
                >
                  + Create Test
                </Button>
              </Box>
            </Box>

            {/* Render Filtered Tests */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {loading ? (
                <div className="flex justify-center items-center w-full">
                  <Circles height="80" width="80" color="#152487" ariaLabel="circles-loading" />
                </div>
              ) : filteredTests.length > 0 ? (
                filteredTests.map((test: any) => <ViewTest key={test.id} test={test} />)
              ) : (
                renderNoData()
              )}
            </div>
          </div>
          <Footer />
        </div>
      </div>

      {/* Modal for Creating New Test */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 4,
            p: 4,
          }}
        >
          <Typography variant="h6" mb={2}>
            Create New Test
          </Typography>
          <TextField
            label="Test Name"
            variant="outlined"
            fullWidth
            value={newTestName}
            onChange={(e) => setNewTestName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl sx={{ mb: 2 }} fullWidth>
            <InputLabel>Category</InputLabel>
            <Select value={newTestCategory} onChange={(e) => setNewTestCategory(e.target.value)}>
              {parentCategories.map((parentCategory: any) => (
                <MenuItem key={parentCategory.id} value={parentCategory.id}>
                  {parentCategory.parentCategoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {newTestCategory && (
            <FormControl fullWidth>
              <InputLabel>Subcategory</InputLabel>
              <Select
                value={newChildCategory}
                onChange={(e) => setNewChildCatgory(e.target.value)}
              >
                {childCategories
                  .filter(
                    (childCategory: any) =>
                      childCategory.parentCategoryId === newTestCategory
                  )
                  .map((childCategory: any) => (
                    <MenuItem key={childCategory.id} value={childCategory.id}>
                      {childCategory.categoryName}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}

          <Alert className="mt-4">
            <AlertDescription>
              Instructions for creating a test:
              <ul className="list-disc ml-4 mt-2">
                <li>Test name should be unique</li>
                <li>Avoid special characters in the test name</li>
                <li>Maximum length is 50 characters</li>
              </ul>
            </AlertDescription>
          </Alert>

          <Box textAlign="right" className="flex justify-start gap-2" mt={2}>
            <Button
            {...props}
              className="bg-color1"
              onClick={handleCreateTest}
              disabled={creatingTest}
              style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              {creatingTest && (
                <Circles
                  height="20"
                  width="20"
                  color="#FFFFFF"
                  ariaLabel="circles-loading"
                />
              )}
              Create
            </Button>

            <Button {...props} className="bg-gray-400" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default TestManage;
