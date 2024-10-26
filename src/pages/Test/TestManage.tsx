import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../components';
import ViewTest from '../../components/Test/ViewTestCard';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Box, Modal, Typography } from '@mui/material';
import { TbSearch } from 'react-icons/tb';
import { getAllParentCategories } from '../../api/parent-category';
import { createTestByUser, getTestByUser } from '../../api/test';
import { getAllChildCategories } from '../../api/child-category';

const TestManage: React.FC = () => {
  const [tests, setTests] = useState([]); // State to hold the tests

  const [parentCategories, setParentCategories] = useState([]); // State to hold the parent categories
  const [childCategories, setChildCategories] = useState([]); // State to hold the child categories
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Alphabetical');
  const [modalOpen, setModalOpen] = useState(false); // State to control the modal
  const [newTestName, setNewTestName] = useState('');
  const [newChildCategory, setNewChildCatgory] = useState("")
  const [newTestCategory, setNewTestCategory] = useState('');


  const fetchAllParentCategories = async()=>{
try{
  // Fetch all parent categories using the API
  const data = await getAllParentCategories();
  console.log(data);
  if (data.code === 200 || data.code === 201) {
    // Set the parent categories in the state
    setParentCategories(data.data);
  } else {
    console.error('Error fetching parent categories', data);
  }

  

}
  catch(error){
    console.error('Error fetching parent categories', error);
  }
  
  }

  const fetchUserTest = async ()=>{
    try{
      const data = await getTestByUser();
      console.log(data);
      if (data.code === 200 || data.code === 201) {
        // Set the new test in the state
        setTests(data.data);
        // This is where you'll implement logic to set the new test in the state
        console.log(data.data);
        // This is where you'll implement logic to set the new test in the state
        console.log(data.data);
      } else {
    }
  }
  catch(error){
    console.error('Error fetching user test', error);
  }
}


  const fetchAllChildCategoryData = async()=>{
    try{
      const data = await getAllChildCategories();
      console.log(data);
      if (data.code === 200 || data.code === 201) {

        // Set the child categories in the state
        setChildCategories(data.data);
        // This is where you'll implement logic to set the child categories in the state
        console.log(data.data);
      } else {
    }
  }
  catch(error){
    console.error('Error fetching child categories', error);
  }
}

  // Handle category and sorting changes
  const handleCategoryChange = (event: any) => setCategory(event.target.value as string);
  // const handleChildCategoryChange = (event: any) => setCategory(event.target.value as string);

  const handleSortChange = (event: any) => setSortBy(event.target.value as string);

  // Handle new test modal open/close
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  // Handle creating new test
  const handleCreateTest = async() => {
    try{
    const body={
      testName:newTestName,
      categoryId:newChildCategory
    }
    console.log(body);
    const data = await createTestByUser(body);

    if(data.code == 201){
      alert("Test created successfully")
    } else {
      alert("Invalid credentials")
    }

    }
    catch(error){
      console.error('Error creating new test', error);
    }
    // This is where you'll implement the logic for creating a new test
    // You'll call the API for adding the new test using the values from `newTestName` and `newTestCategory`

    console.log('Creating new test:', { newTestName, newTestCategory });
    // Close the modal after creating the test
    handleModalClose();
  };

  useEffect(() => {
    fetchAllParentCategories(); // Fetch parent categories on component mount
    fetchAllChildCategoryData(); // Fetch child categories on component mount
    fetchUserTest(); // Fetch user test on component mount
    // TODO: Use effect hook to fetch parent categories whenever the component mounts and updates the parentCategories state
  },[])

  return (
    <>
      <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
        <Sidebar />
        <div className="dark:bg-blackPrimary bg-whiteSecondary w-full pt-6 pl-9 max-sm:pt-6 max-sm:pl-5 flex max-[1700px]:flex-wrap gap-x-10 max-[400px]:pl-2">
          <div className="w-full pl-3">
            <h2 className="text-3xl text-black font-bold mb-6 py-6">All Tests</h2>

            {/* Search and Filter Bar */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} pr={4}>
              <Box display="flex" gap={2}>
                {/* Search Field */}
                <TextField
                  label="Search Test Name"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    endAdornment: <TbSearch />,
                  }}
                />

                {/* Categories Dropdown */}
                <FormControl size="small" className="min-w-5" variant="outlined">
                  <InputLabel>Categories</InputLabel>
                  <Select value={category} onChange={handleCategoryChange} label="Categories">
                    <MenuItem value="All">All Categories</MenuItem>
                   {
                    parentCategories.map((parentCategory:any) => (
                      <MenuItem key={parentCategory.id} value={parentCategory.id}>
                        {parentCategory.parentCategoryName}
                      </MenuItem>
                    ))
                   }
                  </Select>
                </FormControl>
              </Box>

              <Box display="flex" alignItems="center" gap={2}>
                {/* Sort By Dropdown */}
                <FormControl size="small" variant="outlined">
                  <InputLabel>Sort by</InputLabel>
                  <Select value={sortBy} onChange={handleSortChange} label="Sort by">
                    <MenuItem value="Alphabetical">Alphabetical</MenuItem>
                    <MenuItem value="Date">Date</MenuItem>
                    <MenuItem value="Popularity">Popularity</MenuItem>
                  </Select>
                </FormControl>

                {/* New Test Button */}
                <Button variant="contained" color="error" sx={{ textTransform: 'none' }} onClick={handleModalOpen}>
                  + New Test
                </Button>
              </Box>
            </Box>

            {/* Test Cards */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
             {
              tests.map((test:any) => (
                <ViewTest test={test} />
              ))
             }
            </div>
          </div>
        </div>
      </div>

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

          <FormControl
           sx={{ mb: 2 }}
           fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={newTestCategory}
              onChange={(e) => setNewTestCategory(e.target.value)}
              label="Category"
            >
             {
              parentCategories.map((parentCategory:any) => (
                <MenuItem key={parentCategory.id} value={parentCategory.id}>
                  {parentCategory.parentCategoryName}
                </MenuItem>
              ))
             }
            </Select>
          </FormControl>

         {childCategories.filter((category:any)=>{return newTestCategory === category.parentCategoryId }).length !== 0 && <FormControl fullWidth>
            <InputLabel>Child Category</InputLabel>
            <Select
              value={newChildCategory}
              onChange={(e) => setNewChildCatgory(e.target.value)}
              label="Category"
            >
             {
              childCategories.filter((category:any)=>{return newTestCategory === category.parentCategoryId }).map((parentCategory:any) => (
                <MenuItem key={parentCategory.id} value={parentCategory.id}>
                  {parentCategory.categoryName}
                </MenuItem>
              ))
             }
            </Select>
          </FormControl>}

          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button onClick={handleModalClose} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleCreateTest}>
              Create Test
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default TestManage;
