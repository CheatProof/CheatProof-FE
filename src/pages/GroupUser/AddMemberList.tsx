// import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "../../components";

// Helper function to convert JSON user.data to CSV
const exportToCSV = (user:any, fileName:any) => {
  const csvHeader = "First Name,Last Name,Email,Username,Group ID\n";
  const csvRows = user.map((member:any) => {
    const { firstName, lastName, email, username } = member.user.newUser;
    // const { groupId } = member.user.assignUser;
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
  const location = useLocation();
  const  navigate  = useNavigate(); // Assuming useNavigate hook is available
  const { user } = location.state ; // Expecting user.data to come from location.state
  const data =user.data
  console.log(data)

  return (
    <>
      <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
        <Sidebar />
        <div className="dark:bg-blackPrimary bg-whiteSecondary w-full pt-6 max-sm:pt-6 max-sm:pl-5 flex max-[1700px]:flex-wrap gap-x-10 max-[400px]:pl-2">
          <div className="w-full mx-2 pl-3">
            <h2 className="text-3xl text-black font-bold py-6">Group Members</h2>
            <div className="flex justify-between mx-2">
            <button
              onClick={() => navigate(`/teacher-dashboard/group-management/${data[0].user.assignUser.groupId}`)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
            >
              Back
            </button>
            <button
              onClick={() => exportToCSV(user.data, "group_members.csv")}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
            >
              Export to CSV
            </button>

            </div>
            <table className="w-full text-left border-collapse border px-2 border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">First Name</th>
                  <th className="border border-gray-300 px-4 py-2">Last Name</th>
                  <th className="border border-gray-300 px-4 py-2">Email</th>
                  <th className="border border-gray-300 px-4 py-2">Username</th>
                  <th className="border border-gray-300 px-4 py-2">Password</th>
                </tr>
              </thead>
              <tbody>
                {user.data?.map((member:any, index:any) => {
                  const { firstName, lastName, email, username } = member.user.newUser;
                  // const { groupId } = member.user.assignUser;
                  return (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2">{firstName}</td>
                      <td className="border border-gray-300 px-4 py-2">{lastName}</td>
                      <td className="border border-gray-300 px-4 py-2">{email}</td>
                      <td className="border border-gray-300 px-4 py-2">{username}</td>
                      <td className="border border-gray-300 px-4 py-2">{member.user.plainPassword}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMemberList;
