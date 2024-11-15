import  { useState } from 'react';
import { Button, Menu, MenuItem, ListItemIcon, Typography } from '@mui/material';
import { Add, Shuffle, Repeat, UploadFile } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Header = ({name,page,id}:any) => {

    const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex justify-between items-center bg-gray-800 p-4 text-white">
      {/* Exit Button */}
      {/* <Button variant="contained" onClick={()=>navigate(-1)} className="bg-gray-600 hover:bg-gray-700">
        Back
      </Button> */}
       <button onClick={()=>navigate(-1)}
        className=" bg-sky-600 hover:bg-sky-700 text-white px-5 md:py-2 rounded-lg text-sm flex items-center"
                                                    
         >
                                                
                                                Back
                                            </button>

      {/* Header Title */}
      <h4 className="text-lg font-semibold">{name}</h4> / <h4 className="text-lg opacity-55 font-semibold">{page}</h4>

      {/* Right Actions */}
      <div className="flex items-center space-x-4">
        {/* Add Question Button with Hover Menu */}
        <div onMouseEnter={handleMenuOpen} onMouseLeave={handleMenuClose}>
          {/* <Button
            startIcon={<Add />}
            variant="contained"
            color="error"
            className="hover:bg-red-700"
          >
            Add Question
          </Button> */}
          <button onClick={()=>navigate(-1)}
        className=" bg-red-600 hover:bg-red-700 text-white px-4 md:py-2 rounded-lg text-sm flex items-center"
                                                    
         >
                      <Add className='mr-2'/>                          
                                                Add Question
                                            </button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            MenuListProps={{
              onMouseLeave: handleMenuClose,
            }}
            PaperProps={{
              style: {
                padding: '10px',
              },
            }}
          >
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <Typography variant="inherit">Add a new question</Typography>
            </MenuItem>

            <MenuItem onClick={()=>navigate(`/test/test-editor/question-bank/${id}`)}>
              <ListItemIcon>
                <Repeat />
              </ListItemIcon>
              <Typography variant="inherit">Reuse from your question bank</Typography>
            </MenuItem>

            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <Shuffle />
              </ListItemIcon>
              <Typography variant="inherit">Add random questions</Typography>
            </MenuItem>

            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <UploadFile />
              </ListItemIcon>
              <Typography variant="inherit">Import spreadsheet (.CSV)</Typography>
            </MenuItem>
          </Menu>
        </div>

        {/* Actions Button */}
        {/* <Button variant="contained" className="bg-gray-600 hover:bg-gray-700">
          Actions
        </Button> */}
         <button 
        className=" bg-red-600 hover:bg-red-700 text-white px-5 md:py-2 rounded-lg text-sm flex items-center"
                                                    
         >
                                               
        Actions
     </button>

        {/* Eye Icon */}
        {/* <Button variant="contained" className="bg-gray-600 hover:bg-gray-700">
          <Add />
        </Button> */}
        <button 
        className=" bg-sky-600 hover:bg-sky-700 text-white px-5 md:py-2 rounded-lg text-sm flex items-center"
                                                    
         >   
           <Add />
          </button>
      </div>
    </div>
  );
};

export default Header;
