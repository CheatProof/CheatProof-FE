import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  IconButton,
  Divider,
  Tabs,
  Tab,
  CircularProgress,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { getAllParentCategories ,createParentCategory} from '../../api/parent-category';
import { createChildCategory } from "../../api/child-category";

const CategoryManage: React.FC = () => {
  const [categoryName, setCategoryName] = useState('');
  const [parentCategory, setParentCategory] = useState("");
  const [parentCategories, setParentCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [newParentCategoryName, setNewParentCategoryName] = useState('');

  const handleAddCategory = async() => {
    if (tabValue === 0 && categoryName) {
      const newCategory = { categoryName: categoryName, parentCategoryId:parentCategory };
      const data = await createChildCategory(newCategory);
      console.log(data);
      if (data.message === "Category created successfully") {
        console.log("New category added:", newCategory);
        setCategoryName('');
        setParentCategory("");
      } 
      
    } else if (tabValue === 1 && newParentCategoryName) {


      const newParentCategory = { parentCategoryName: newParentCategoryName };
      const data = await createParentCategory(newParentCategory);
      if (data.code === 201) {
        setParentCategories([...parentCategories, data.data]);
        console.log("New parent category added:", newParentCategory);
        setNewParentCategoryName('');
      } else {
        console.error("Error creating parent category", data);
      }

    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event)
    setTabValue(newValue);
    setCategoryName('');
    setParentCategory("");
    setNewParentCategoryName('');
  };

  const fetchAllParentCategories = async () => {
    try {
      const data = await getAllParentCategories();
      if (data.code === 200 || data.code === 201) {
        setParentCategories(data.data);
      } else {
        console.error("Error fetching parent categories", data);
      }
    } catch (error) {
      console.error("Error fetching parent categories", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllParentCategories();
  }, []);

  return (
    <Box padding={3}>
      {/* Header */}
      {/* <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Manage Categories</Typography>
        <IconButton>
          <CloseIcon />
        </IconButton>
      </Box> */}

      {/* Tabs for switching between New Category and New Parent Category */}
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="category tabs">
        <Tab label="New Category" />
        <Tab label="New Parent Category" />
      </Tabs>

      <Divider sx={{ my: 2 }} />

      {/* Tab 0: New Category Form */}
      {tabValue === 0 && (
        <>
          <FormControl fullWidth margin="normal">
            <InputLabel>Parent Category</InputLabel>
            <Select
              value={parentCategory}
              onChange={(e) => setParentCategory(e.target.value)}
              label="Select Parent Category"
              disabled={isLoading}
            >
              <MenuItem value={0}>Select Category</MenuItem>
              {isLoading ? (
                <MenuItem disabled>
                  <CircularProgress size={24} />
                </MenuItem>
              ) : (
                parentCategories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.parentCategoryName}
                  </MenuItem>
                ))
              )}
            </Select>
            <Typography variant="body2" color="textSecondary" mt={1}>
              Parent categories are not used for questions. They are only used to group your categories.
            </Typography>
          </FormControl>

          <TextField
            fullWidth
            label="Name of Category"
            variant="outlined"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            inputProps={{ maxLength: 50 }}
            helperText="Categories are used to categorize your questions."
          />

          <Box mt={2}>
            {/* <Button
              variant="contained"
              color="error"
              onClick={handleAddCategory}
              disabled={!categoryName || isLoading}
            >
              Add Category
            </Button> */}
            <button
              className="bg-color2 hover:bg-fore disabled:bg-gray-400 disabled:text-gray-800 disabled:opacity-50 text-white px-4 font-md md:py-2 rounded-md text-md flex items-center justify-center gap-x-2"
              onClick={handleAddCategory}
              disabled={!categoryName || isLoading}
            >
             
              Add Category
            </button>
          </Box>
        </>
      )}

      {/* Tab 1: New Parent Category Form */}
      {tabValue === 1 && (
        <>
          <TextField
            fullWidth
            label="Name of Parent Category"
            variant="outlined"
            value={newParentCategoryName}
            onChange={(e) => setNewParentCategoryName(e.target.value)}
            inputProps={{ maxLength: 50 }}
            helperText="Parent categories are not used for questions."
          />

          <Box mt={2}>
            {/* <Button
              variant="contained"
              color="error"
              onClick={handleAddCategory}
              disabled={!newParentCategoryName}
            >
              Add Parent Category
            </Button> */}
           <button
              className="bg-color2 hover:bg-fore disabled:bg-gray-400 disabled:text-gray-800 disabled:opacity-50 text-white px-4 font-md md:py-2 rounded-md text-md flex items-center justify-center gap-x-2"
              onClick={handleAddCategory}
              disabled={!newParentCategoryName}
            >
             
              Add Category
            </button>

          </Box>
        </>
      )}

      {/* <Divider sx={{ my: 4 }} /> */}
    </Box>
  );
};

export default CategoryManage;
