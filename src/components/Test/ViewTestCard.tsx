import testIcon from "../../assets/test.png";
import { FcQuestions } from "react-icons/fc";
import { IoCheckmarkSharp } from "react-icons/io5";
import { Card, CardContent, Box, Grid, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";



const ViewTestCard = ({ test }:any) => {
  const props :any = {}
  const navigate = useNavigate();
  console.log(test);

  return (
    <Card

    onClick={() => navigate(`/teacher-dashboard/test-dashboard/${test.id}`)}
      sx={{
        width: 300,
        boxShadow: 3,
        cursor: "pointer",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.03)",
          borderColor: "primary.dark",

        },
      }}
    >
      <CardContent style={{position:"relative"}}>
        <Typography
          variant="h6"
          {...props}
          className="font-[Poppins]"
          
        >
          {test.testName}
        </Typography>
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
          <Box>
            <Box display="flex" alignItems="center" mb={1}>
              <FcQuestions style={{ marginRight: "8px" }} />
              <Typography {...props} className="font-[Poppins]">{test.assignedQuestionCount} Questions</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <IoCheckmarkSharp color="green" style={{ marginRight: "8px" }} />
              <Typography className="font-[Poppins]" {...props} >Total pts: {test.totalAssignedPoints ? test.totalAssignedPoints : "0"}</Typography>
            </Box>
          </Box>
          <Avatar
            src={testIcon}
            alt="test icon"
            sx={{ width: 56, height: 56 }}
            variant="square"
          />
        </Grid>
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-color3 via-color2 to-color1"></span>
                 
      </CardContent>
      
    </Card>
  );
};

export default ViewTestCard;
