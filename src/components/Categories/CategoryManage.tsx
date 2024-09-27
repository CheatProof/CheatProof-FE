import React, { useState } from "react";
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
  List,
  ListItem,
  ListItemText,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const CategoryManage: React.FC = () => {
  const [categoryName, setCategoryName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [categories, setCategories] = useState([
    { name: "Generic (default)", parent: "Generic Parent (default)", questions: 51 },
  ]);
  const [tabValue, setTabValue] = useState(0);

  const handleAddCategory = () => {
    if (categoryName) {
      const newCategory = { name: categoryName, parent: parentCategory, questions: 0 };
      setCategories([...categories, newCategory]);
      setCategoryName('');
    }
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
    setCategoryName(''); // Reset the category name when tab changes
  };

  return (
    <Box padding={3}>
      {/* Category Creation Form */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Create a category</Typography>
        <IconButton>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Tab for New Category and New Parent Category */}
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="category tabs">
        <Tab label="New category" />
        <Tab label="New Parent category" />
      </Tabs>

      <Divider sx={{ my: 2 }} />

      {/* Form Fields based on selected Tab */}
      {tabValue === 0 ? (
        <>
          {/* New Category Tab Content */}
          {/* Parent Category Selection */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Parent Category</InputLabel>
            <Select
              value={parentCategory}
              onChange={(e) => setParentCategory(e.target.value)}
              label="Parent Category"
            >
              <MenuItem value="Generic Parent (default)">Generic Parent (default)</MenuItem>
              <MenuItem value="Other Parent">Other Parent</MenuItem>
            </Select>
            <Typography variant="body2" color="textSecondary" mt={1}>
              Parent categories are not used for questions. They are only used to group your categories.
            </Typography>
          </FormControl>

          {/* Category Name Input */}
          <TextField
            fullWidth
            label="Name of category"
            variant="outlined"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            inputProps={{ maxLength: 30 }}
            helperText="Categories are used to categorize your questions."
          />

          {/* Add Category Button */}
          <Box mt={2}>
            <Button
              variant="contained"
              color="error"
              onClick={handleAddCategory}
              disabled={!categoryName}
            >
              Add Category
            </Button>
          </Box>
        </>
      ) : (
        <>
          {/* New Parent Category Tab Content */}
          {/* Parent Category Name Input */}
          <TextField
            fullWidth
            label="Name of Parent category"
            variant="outlined"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            inputProps={{ maxLength: 30 }}
            helperText="Parent categories are not used for questions."
          />

          {/* Add Parent Category Button */}
          <Box mt={2}>
            <Button
              variant="contained"
              color="error"
              onClick={handleAddCategory}
              disabled={!categoryName}
            >
              Add Parent Category
            </Button>
          </Box>
        </>
      )}

      <Divider sx={{ my: 4 }} />

      {/* Category List */}
      {/* <Typography variant="h6" gutterBottom>
        Categories
      </Typography> */}

      {/* <List>
        {categories.map((category, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ExpandMoreIcon sx={{ marginRight: 2 }} />
              <ListItemText
                primary={category.parent}
                secondary={
                  <Box display="flex" justifyContent="space-between">
                    <Typography>{category.name}</Typography>
                    <Typography>{category.questions}</Typography>
                  </Box>
                }
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List> */}

      {/* New Category Button */}
      {/* <Button
        variant="contained"
        color="error"
        startIcon={<AddIcon />}
        sx={{ mt: 3 }}
      >
        + New Category
      </Button> */}
    </Box>
  );
};

export default CategoryManage;
