import React from 'react';
import { Sidebar } from '../../components';
import ViewTest from '../../components/Test/ViewTestCard';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';
import { TbSearch } from 'react-icons/tb';

const TestManage: React.FC = () => {
  const [category, setCategory] = React.useState('All');
  const [sortBy, setSortBy] = React.useState('Alphabetical');

  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(event.target.value as string);
  };

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortBy(event.target.value as string);
  };

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
                    endAdornment: (
                     <TbSearch/>
                    ),
                  }}
                />

                {/* Categories Dropdown */}
                <FormControl size="small" className='min-w-5' variant="outlined">
                  <InputLabel>Categories</InputLabel>
                  <Select value={category} onChange={handleCategoryChange} label="Categories">
                    <MenuItem value="All">
                  All Categories
                    </MenuItem>
                    <MenuItem value="Category 1">Category 1</MenuItem>
                    <MenuItem value="Category 2">Category 2</MenuItem>
                    <MenuItem value="Category 3">Category 3</MenuItem>
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
                <Button variant="contained" color="error" sx={{ textTransform: 'none' }}>
                  + New Test
                </Button>
              </Box>
            </Box>

            {/* Test Cards */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <ViewTest />
              <ViewTest />
              <ViewTest />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestManage;
