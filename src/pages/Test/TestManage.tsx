import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../components';
import ViewTest from '../../components/Test/ViewTestCard';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Box, Modal, Typography } from '@mui/material';
import { TbSearch } from 'react-icons/tb';
import { getAllParentCategories } from '../../api/parent-category';
import { createTestByUser, getTestByUser } from '../../api/test';
import { getAllChildCategories } from '../../api/child-category';
import toast, { Toaster } from 'react-hot-toast';
import { Circles } from 'react-loader-spinner';

const TestManage: React.FC = () => {
  const [tests, setTests] = useState([]); // Tests data
  const [parentCategories, setParentCategories] = useState([]); // Parent categories data
  const [childCategories, setChildCategories] = useState([]); // Child categories data
  const [category, setCategory] = useState('All'); // Selected category
  const [searchTerm, setSearchTerm] = useState(''); // Search term
  const [sortBy, setSortBy] = useState('Alphabetical'); // Sort option
  const [modalOpen, setModalOpen] = useState(false); // Modal control
  const [newTestName, setNewTestName] = useState(''); // New test name
  const [newChildCategory, setNewChildCatgory] = useState(""); // Selected child category
  const [newTestCategory, setNewTestCategory] = useState(''); // Selected new test category
  const [loading, setLoading] = useState(true); // Loading state

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
        console.log(data.data);
        setChildCategories(data.data);
      } else {
        console.error('Error fetching child categories', data);
      }
    } catch (error) {
      console.error('Error fetching child categories', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    Promise.all([fetchAllParentCategories(), fetchAllChildCategoryData(), fetchUserTest()]).then(() => setLoading(false));
  }, []);

  // Filter tests based on category and search term
  const filteredTests = tests.filter((test: any) => {
    const matchesCategory =
      category === 'All' || test.parentCategoryId === category;
    const matchesSearch =
      test.testName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle category change
  const handleCategoryChange = (event: any) => setCategory(event.target.value as string);

  // Handle modal open/close
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  // Handle creating a new test
  const handleCreateTest = async () => {
    try {
      const body = { testName: newTestName, categoryId: newChildCategory };
      const data = await createTestByUser(body);
      if (data.code === 201) {
        toast.success("Test created successfully", {
          position: "top-center",
          duration: 5000,
        });
        fetchUserTest(); // Refresh tests after creation
      } else {
        toast.error("Error creating test", {
          position: "top-center",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error('Error creating new test', error);
    }
    handleModalClose();
  };

  return (
    <>
           {loading ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}>
          <Circles
            height="80"
            width="80"
            color="#152487"
            ariaLabel="circles-loading"
          />
        </div>
      ) : (
        <div className="h-auto shadow dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
          <Toaster />
          <Sidebar />
          <div className="dark:bg-blackPrimary bg-whiteSecondary w-full pt-6 pl-3 max-sm:pt-6 max-sm:pl-5 flex max-[1700px]:flex-wrap gap-x-5 max-[400px]:pl-2">
            <div className="w-full pl-3">
              <h2 className="text-3xl text-black font-bold mb-3 py-3">All Tests</h2>

              {/* Search and Filter Bar */}
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} pr={4}>
                <Box display="flex" gap={2}>
                  {/* Search Field */}
                  <TextField
                    label="Search Test Name"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      endAdornment: <TbSearch />,
                    }}
                  />

                  {/* Categories Dropdown */}
                  <FormControl size="small" className="min-w-5" variant="outlined">
                    <InputLabel>Categories</InputLabel>
                    <Select value={category} onChange={handleCategoryChange} label="Categories">
                      <MenuItem value="All">All Categories</MenuItem>
                      {parentCategories.map((parentCategory: any) => (
                        <MenuItem key={parentCategory.id} value={parentCategory.id}>
                          {parentCategory.parentCategoryName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box display="flex" alignItems="center" gap={2}>
                  {/* Sort By Dropdown */}
                  <FormControl size="small" variant="outlined">
                    <InputLabel>Sort by</InputLabel>
                    <Select value={sortBy} onChange={(e) => setSortBy(e.target.value as string)} label="Sort by">
                      <MenuItem value="Alphabetical">Alphabetical</MenuItem>
                      <MenuItem value="Date">Date</MenuItem>
                      <MenuItem value="Popularity">Popularity</MenuItem>
                    </Select>
                  </FormControl>

                  {/* New Test Button */}
                  <button
                    className="bg-color2 hover:bg-color1 text-white px-4 md:py-2 rounded-lg text-md font-medium"
                    onClick={handleModalOpen}
                  >
                    + Create Test
                  </button>
                </Box>
              </Box>


              {/* Render Filtered Tests */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {filteredTests.map((test: any) => (
                  <ViewTest key={test.id} test={test} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Creating New Test */}
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2" mb={2}>
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
            <Select
              value={newTestCategory}
              onChange={(e) => setNewTestCategory(e.target.value)}
              label="Category"
            >
              {parentCategories.map((parentCategory: any) => (
                <MenuItem key={parentCategory.id} value={parentCategory.id}>
                  {parentCategory.parentCategoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        {newTestCategory &&
          <FormControl fullWidth>
            <InputLabel>Subcategory</InputLabel>
            <Select
              value={newChildCategory}
              onChange={(e) => setNewChildCatgory(e.target.value)}
              label="Subcategory"
            >
              {childCategories
                .filter((childCategory: any) => {return childCategory.parentCategoryId === newTestCategory})
                .map((childCategory: any) => (
                  <MenuItem key={childCategory.id} value={childCategory.id}>
                    {childCategory.categoryName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>}

          <Box textAlign="right" mt={2}>
            <Button onClick={handleCreateTest} variant="contained" color="primary">
              Create
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default TestManage;













