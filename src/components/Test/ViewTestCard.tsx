import React from "react";
import testIcon from "../../assets/test.png";
import { FcQuestions } from "react-icons/fc";
import { IoCheckmarkSharp } from "react-icons/io5";
import { Card, CardContent, Typography, Box, Grid, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ViewTest: React.FC = ({ item }:any) => {
  const navigate = useNavigate();
  console.log(item);

  return (
    <Card

    onClick={() => navigate("/test/1")}
      sx={{
        width: 300,
        borderLeft: 4,
        borderColor: "primary.main",
        boxShadow: 3,
        cursor: "pointer",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.03)",
          borderColor: "primary.dark",

        },
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          component="h3"
          fontWeight="bold"
          sx={{
            "&:hover": {
              color: "primary.main",
            },
            transition: "color 0.3s",
          }}
        >
          CNN Preparation
        </Typography>
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
          <Box>
            <Box display="flex" alignItems="center" mb={1}>
              <FcQuestions style={{ marginRight: "8px" }} />
              <Typography variant="body2">50 Questions</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <IoCheckmarkSharp color="green" style={{ marginRight: "8px" }} />
              <Typography variant="body2">Total pts: 50</Typography>
            </Box>
          </Box>
          <Avatar
            src={testIcon}
            alt="test icon"
            sx={{ width: 56, height: 56 }}
            variant="square"
          />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ViewTest;
