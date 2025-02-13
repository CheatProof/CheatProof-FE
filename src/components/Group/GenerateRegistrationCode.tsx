// import React from 'react';

import { fetchGroupById, registrationCodesByGroupId } from "@/api/group";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

function GenerateRegistrationCode() {
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState<any>(null);
  const [newGroupName, setNewGroupName] = useState("")

  const [codes,setCodes] =useState( [
    "H68125724860XH",
    "DP3112572486937",
    "JH3125724861YD",
    "HB4125724864DR",
    "JG6125724865AM",
  ]);

  const getRegistrationCodes = async () => {
    try {
      setLoading(true);
      const response = await registrationCodesByGroupId(id);
      console.log(response);
      setCodes(response.data.map((code:any) => code.registrationCode));
    } catch (error) {
      console.error('Error generating registration codes:', error);
    }
    setLoading(false);
  };

   const getGroup = async()=>{
      // fetch group data from API based on id
      //...
      const data = await fetchGroupById(id);
      setGroup(data.data);
      setNewGroupName(data.data.groupName);
      // setEditorState(htmlToEditorState(data.data.groupMessage));
      console.log(newGroupName);
      console.log(data.data);
      // set group data to state
  
    }

  useEffect(() => {
    getGroup();
    getRegistrationCodes();
  },[]);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Container */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Info Banner */}
        <div className="bg-blue-100 border-l-4 border-color1 text-fore p-4 mb-4 rounded-md">
          <p>Each registration code below is a unique code and can only be used once.</p>
        </div>

        {/* Group Information */}
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md">
          <p>
            <strong>Group:</strong> {group?.groupName}
          </p>
          <p>
            These codes are for registering into the Group - <strong>{group?.groupName}</strong>.
          </p>
          <p>
            Print and give one code to each user. Alternatively, you can batch upload users via the Manage members page for each Group you create.
          </p>
        </div>

        {/* Links */}
        <div className="flex justify-start gap-6 mb-6">
          <a
            href="#"
            className="text-red-600 hover:underline font-semibold"
          >
            Print this page
          </a>
          <a
            href="#"
            className="text-red-600 hover:underline font-semibold"
          >
            Export to excel
          </a>
        </div>

        {/* Registration Codes Section */}
        {/* <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Registration Codes:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {codes.map((code, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-300 p-4 rounded-md shadow hover:shadow-lg transition-shadow"
              >
                <p className="text-gray-700 font-semibold">Code {index + 1}</p>
                <p className="text-lg overflow-clip break-words font-bold text-blue-600">{code}</p>
              </div>
            ))}
          </div>
        </div> */}

<div>
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Registration Codes:</h2>
{loading ? (
          <div className="flex justify-center items-center py-10">
            <CircularProgress size={50} />
          </div>
        ) : (
          
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {codes.map((code, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border border-gray-300 p-4 rounded-md shadow hover:shadow-lg transition-shadow"
                >
                  <p className="text-gray-700 font-semibold">Code {index + 1}</p>
                  <p className="text-lg overflow-clip break-words font-bold text-blue-600">{code}</p>
                </div>
              ))}
            </div>
               )}
          </div>
     
      </div>
    </div>
  );
}

export default GenerateRegistrationCode;
