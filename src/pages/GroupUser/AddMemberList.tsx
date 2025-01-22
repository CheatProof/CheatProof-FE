// import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Footer, Header, Sidebar } from "../../components";
import { Card, Typography, Button } from "@material-tailwind/react";

const exportToCSV = (user: any, fileName: any) => {
  const csvHeader = "First Name,Last Name,Email,Username,Group ID\n";
  const csvRows = user.map((member: any) => {
    const { firstName, lastName, email, username } = member.user.newUser;
    return `${firstName},${lastName},${email},${username},${member.user.plainPassword}`;
  });
  const csvContent = `${csvHeader}${csvRows.join("\n")}`;
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
};

const AddMemberList = () => {
  const props:any={}
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state;
  const data = user.data;

  return (
    <div className="h-auto flex border-t dark:border-blackSecondary border-blackSecondary dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full">
        <Header />
        <div className="w-full mx-2 min-h-screen pl-3 max-w-[96%]">
          <h2 className="text-3xl text-black font-bold py-6">Group Members</h2>
          <div className="flex justify-between items-center mx-2 mb-6">
            <Button
            {...props}
              onClick={() => navigate(`/teacher-dashboard/group-management/${data[0].user.assignUser.groupId}`)}
              variant="gradient"
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white"
            >
              Back
            </Button>
            <Button
            {...props}
              onClick={() => exportToCSV(user.data, "group_members.csv")}
              variant="gradient"
              className="bg-gradient-to-r from-green-500 to-green-700 text-white"
            >
              Export to CSV
            </Button>
          </div>
          <Card
          {...props}
           className="overflow-auto shadow-lg">
            <table className="w-full table-auto ta text-left">
              <thead>
                <tr>
                  <th className="border-b border-gray-300 bg-blue-gray-50 p-4">
                    <Typography
                    {...props}
                     variant="small" className="font-bold text-blue-gray-600">
                      First Name
                    </Typography>
                  </th>
                  <th className="border-b border-gray-300 bg-blue-gray-50 p-4">
                    <Typography
                    {...props}
                     variant="small" className="font-bold text-blue-gray-600">
                      Last Name
                    </Typography>
                  </th>
                  <th className="border-b border-gray-300 bg-blue-gray-50 p-4">
                    <Typography
                    
                    {...props}
                    variant="small" className="font-bold text-blue-gray-600">
                      Email
                    </Typography>
                  </th>
                  <th className="border-b border-gray-300 bg-blue-gray-50 p-4">
                    <Typography 
                    {...props}
                    variant="small" className="font-bold text-blue-gray-600">
                      Username
                    </Typography>
                  </th>
                  <th className="border-b border-gray-300 bg-blue-gray-50 p-4">
                    <Typography
                    {...props}
                     variant="small" className="font-bold text-blue-gray-600">
                      Password
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {user.data?.map((member: any, index: number) => {
                  const { firstName, lastName, email, username } = member.user.newUser;
                  return (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                      <td className="p-4">
                        <Typography 
                        {...props}
                        variant="small" className="text-gray-700">
                          {firstName}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                        {...props}
                         variant="small" className="text-gray-700">
                          {lastName}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                        {...props}
                         variant="small" className="text-gray-700">
                          {email}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                        {...props}
                         variant="small" className="text-gray-700">
                          {username}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                        {...props}
                         variant="small" className="text-gray-700">
                          {member.user.plainPassword}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AddMemberList;
