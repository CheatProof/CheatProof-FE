// // App.js
// import { generateSelfRegistrationCode, removeSelfRegistrationCode } from '@/api/group';
// import { useState } from 'react';
// import toast, { Toaster } from 'react-hot-toast';
// import { useNavigate, useParams } from 'react-router-dom';
// import { CircularProgress } from "@mui/material";


// const AddGroupCodeUser = () => {
//   const {id} = useParams()
//   const [createCount, setCreateCount] = useState(1);
//   const [removeCount, setRemoveCount] = useState(1);
//   const [loading1, setLoading1] = useState(false);
//   const [loading2, setLoading2] = useState(false);
  
//   const navigate = useNavigate();

//   const createRegistrationCode = async() => {
//     // Logic to generate and store registration code
//     //...
//     try{
//       setLoading1(true);
//       const registrationCode = await generateSelfRegistrationCode(id, createCount)
//       if(registrationCode.code === 201 || registrationCode.code === 200){
//         toast.success("Registration Code created Successfully");
//       }else{
//         toast.error("Failed to create Registration Code");
//       }
//     }
//     catch(error){
//       toast.error("An error occurred while creating Registration Code");
//     }
//     finally{
//       setLoading1(false);
//     }
//   };

//   const removeRegistrationCode = async() => {
//     // Logic to delete registration code
//     //...
//     try{
//       setLoading2(true);
//       const response = await removeSelfRegistrationCode(id, removeCount)
//       if(response.code === 200){
//         toast.success("Registration Code deleted Successfully");
//       }else{
//         toast.error("Failed to delete Registration Code");
//       }
//     }
//     catch(error){
//       toast.error("An error occurred while deleting Registration Code");
//     }
//     finally{
//       setLoading2(false);
//     }
//   };
  
//   // const removeRegistrationCode = async() => {
//   //   // Logic to delete registration code
//   //   //...
//   //   try{
//   //     setLoading2(true);
//   //     const response = await 
//   //     if(response.status === 200){
//   //       toast.success("Registration Code deleted Successfully");
//   //     }else{
//   //       toast.error("Failed to delete Registration Code");
//   //     }
//   //   }
//   //   catch(error){
//   //     toast.error("An error occurred while deleting Registration Code");
//   //   }
//   //   finally{
//   //     setLoading2(false);
//   //   }
//   // };
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <Toaster />
//       <div className="bg-white shadow-md rounded-md p-6 max-w-4xl mx-auto">
//         {/* Header Messages */}
//         <div className="bg-blue-100 text-color1 p-4 rounded-md mb-6">
//           <p>
//             Create Member Registration codes to hand out and allow Users to
//             register themselves into this Group from
//             <a
//               href="https://cheatproof.online/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-fore underline ml-1"
//             >
//               https://cheatproof.online/
//             </a>
//           </p>
//         </div>

//         <div className="bg-blue-100 text-color1 p-4 rounded-md mb-6">
//           <p>You currently have <strong>10 Member Registration Codes</strong> available to use in this Group.</p>
//           <p>You can always delete existing Users you no longer need on your account to create new Member Registration Codes.</p>
//           <button onClick={()=>navigate(`/teacher-dashboard/group-registration-codes/${id}`)}
//            className="bg-color2 text-white px-4 py-2 rounded-md mt-4 hover:bg-color1">
//             Print Member Registration Codes
//           </button>
//         </div>

//         {/* Create Member Registration Codes */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-gray-50 p-4 rounded-md shadow-md">
//             <h2 className="font-bold mb-4">Create Member Registration Codes</h2>
//             <p>You have <strong>{4990 - createCount} User places</strong> left to use across all your Groups.</p>
//             <p>Max. <strong>1,000 Users</strong> can be registered per Group.</p>
//             <p>You have <strong>{990 - createCount} Registration Codes</strong> left to add to this Group.</p>

//             <div className="mt-4">
//               <label htmlFor="create-count" className="block mb-2 font-medium">Create</label>
//               <select
//                 id="create-count"
//                 className="border rounded-md p-2 w-1/2"
//                 value={createCount}
//                 onChange={(e) => setCreateCount(Number(e.target.value))}
                
//               >
//                 {[...Array(50).keys()].map((num) => (
//                   <option key={num + 1} value={num + 1}>
//                     {num + 1}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <button disabled={loading1} onClick={()=> createRegistrationCode()} className="bg-white text-fore border-2 border-fore px-4 py-2 rounded-md mt-4 hover:bg-color1 hover:text-white">
//               {loading1 ? <CircularProgress size={24} color="inherit" /> : "Add Member Registration Codes"}
//             </button>
//           </div>

//           {/* Remove Member Registration Codes */}
//           {/* <div className="bg-gray-50 p-4 rounded-md shadow-md">
//             <h2 className="font-bold mb-4">Remove Member Registration Codes</h2>
//             <p>You have <strong>{createCount} unused Member Registration Codes</strong> in this Group.</p>
//             <ol className="list-decimal ml-6">
//               <li>Remove Member Registration Codes.</li>
//               <li>Create new Member Registration Codes in your other Groups.</li>
//             </ol> */}

//             <div className="bg-gray-50 p-4 rounded-md shadow-md">
//             <h2 className="font-bold mb-4">Remove Member Registration Codes</h2>
//             {createCount === 0 ? (
//               <p>No Registration Codes are waiting to be used for this Group.</p>
//             ) : (
//               <>
//                 <p>You have <strong>{createCount} unused Member Registration Codes</strong> in this Group.</p>
//                 <ol className="list-decimal ml-6">
//                   <li>Remove Member Registration Codes.</li>
//                   <li>Create new Member Registration Codes in your other Groups.</li>
//                 </ol>
             
           

//             <div className="mt-4">
//               <label htmlFor="remove-count" className="block mb-2 font-medium">Remove</label>
//               <select
//                 id="remove-count"
//                 className="border rounded-md p-2 w-1/2"
//                 value={removeCount}
//                 onChange={(e) => setRemoveCount(Number(e.target.value))}
//               >
//                 {[...Array(createCount).keys()].map((num) => (
//                   <option key={num + 1} value={num + 1}>
//                     {num + 1}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <button disabled={loading2} onClick={()=> removeRegistrationCode()}  className="bg-white text-fore border-2 border-fore px-4 py-2 rounded-md mt-4 hover:bg-color1 hover:text-white">
//             {loading2 ? <CircularProgress size={24} color="inherit" /> : "Remove Member Registration Codes"}
//             </button>
//             </>
//       )}
//           </div>
          
//         </div>
       

//         <div className="mt-6">
//           <a
//             href="#"
//             className="text-red-600 underline text-sm"
//           >
//             View Member & Registration code usage across all Groups
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddGroupCodeUser;




















import { generateSelfRegistrationCode, registrationCodesByGroupId, removeSelfRegistrationCode } from '@/api/group';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from "@mui/material";

const AddGroupCodeUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Initial Values
  const [createCount, setCreateCount] = useState(1);
  const [removeCount, setRemoveCount] = useState(1);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [codes, setCodes] = useState([]);

  // Dynamic State for Quantities
  const [userPlacesLeft, setUserPlacesLeft] = useState(4989); // Initial value
  const [registrationCodesLeft, setRegistrationCodesLeft] = useState(989); // Initial value
  const [availableRegistrationCodes, setAvailableRegistrationCodes] = useState<any>(null); // Update this dynamically

  // Function to Create Registration Code
  const createRegistrationCode = async () => {
    try {
      setLoading1(true);
      const response = await generateSelfRegistrationCode(id, createCount);
      
      if (response.code === 201 || response.code === 200) {
        toast.success("Registration Code created successfully!");

        // Update UI dynamically
        setUserPlacesLeft(prev => prev - availableRegistrationCodes);
        setRegistrationCodesLeft(prev => prev - availableRegistrationCodes);
        // setAvailableRegistrationCodes(prev => prev + createCount);
        getRegistrationCodes();
      } else {
        toast.error("Failed to create Registration Code");
      }
    } catch (error) {
      toast.error("An error occurred while creating Registration Code");
    } finally {
      setLoading1(false);
    }
  };

  const getRegistrationCodes = async () => {
      try {
        const response = await registrationCodesByGroupId(id);
        console.log(response);
        setCodes(response.data.map((code:any) => code.registrationCode));
        if (response.code === 200) {
          setAvailableRegistrationCodes(response.data.length);
        }
        console.log(codes);
      } catch (error) {
        console.error('Error generating registration codes:', error);
      }
    };
  // Function to Remove Registration Code
  const removeRegistrationCode = async () => {
    try {
      setLoading2(true);
      const response = await removeSelfRegistrationCode(id, removeCount);

      if (response.code === 201 || response.code === 200) {
        toast.success("Registration Code deleted successfully!");

        // Update UI dynamically
        setUserPlacesLeft(prev => prev - availableRegistrationCodes);
        setRegistrationCodesLeft(prev => prev + removeCount);
        // setAvailableRegistrationCodes(prev => prev - removeCount);
        getRegistrationCodes();
      } else {
        toast.error("Failed to delete Registration Code");
      }
    } catch (error) {
      toast.error("An error occurred while deleting Registration Code");
    } finally {
      setLoading2(false);
    }
  };

  useEffect(() => {
    getRegistrationCodes()
  },[]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Toaster />
      <div className="bg-white shadow-md rounded-md p-6 max-w-4xl mx-auto">
        {/* Header Messages */}
        <div className="bg-blue-100 text-color1 p-4 rounded-md mb-6">
          <p>
            Create Member Registration codes to hand out and allow Users to
            register themselves into this Group from
            <a
              href="https://cheatproof.online/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fore underline ml-1"
            >
              https://cheatproof.online/
            </a>
          </p>
        </div>

        <div className="bg-blue-100 text-color1 p-4 rounded-md mb-6">
          <p>You currently have <strong>{availableRegistrationCodes} Member Registration Codes</strong> available to use in this Group.</p>
          <p>You can always delete existing Users you no longer need on your account to create new Member Registration Codes.</p>
          {/* <button onClick={() => navigate(`/teacher-dashboard/group-registration-codes/${id}`)}
            className="bg-color2 text-white px-4 py-2 rounded-md mt-4 hover:bg-color1">
            Print Member Registration Codes
          </button> */}
          <button 
            onClick={() => navigate(`/teacher-dashboard/group-registration-codes/${id}`)}
            className={`px-4 py-2 rounded-md mt-4 ${
              availableRegistrationCodes === 0 
                ? "bg-gray-400 text-gray-700 cursor-not-allowed" 
                : "bg-color2 text-white hover:bg-color1"
            }`}
            disabled={availableRegistrationCodes === 0}
          >
            Print Member Registration Codes
            </button>

        </div>

        {/* Create Member Registration Codes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-md shadow-md">
            <h2 className="font-bold mb-4">Create Member Registration Codes</h2>
            <p>You have <strong>{4989 - availableRegistrationCodes}</strong> User places left to use across all your Groups.</p>
            <p>Max. <strong>1,000 Users</strong> can be registered per Group.</p>
            <p>You have <strong>{989 - availableRegistrationCodes}</strong> Registration Codes left to add to this Group.</p>

            <div className="mt-4">
              <label htmlFor="create-count" className="block mb-2 font-medium">Create</label>
              <select
                id="create-count"
                className="border rounded-md p-2 w-1/2"
                value={createCount}
                onChange={(e) => setCreateCount(Number(e.target.value))}
              >
                {[...Array(50).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
            </div>

            <button disabled={loading1} onClick={createRegistrationCode} className="bg-white text-fore border-2 border-fore px-4 py-2 rounded-md mt-4 hover:bg-color1 hover:text-white">
              {loading1 ? <CircularProgress size={24} color="inherit" /> : "Add Member Registration Codes"}
            </button>
          </div>

          {/* Remove Member Registration Codes */}
          <div className="bg-gray-50 p-4 rounded-md shadow-md">
            <h2 className="font-bold mb-4">Remove Member Registration Codes</h2>
            {availableRegistrationCodes === 0 ? (
              <p>No Registration Codes are waiting to be used for this Group.</p>
            ) : (
              <>
                <p>You have <strong>{availableRegistrationCodes}</strong> unused Member Registration Codes in this Group.</p>
                <ol className="list-decimal ml-6">
                  <li>Remove Member Registration Codes.</li>
                  <li>Create new Member Registration Codes in your other Groups.</li>
                </ol>

                <div className="mt-4">
                  <label htmlFor="remove-count" className="block mb-2 font-medium">Remove</label>
                  <select
                    id="remove-count"
                    className="border rounded-md p-2 w-1/2"
                    value={removeCount}
                    onChange={(e) => setRemoveCount(Number(e.target.value))}
                  >
                    {[...Array(availableRegistrationCodes).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <button disabled={loading2} onClick={removeRegistrationCode} className="bg-white text-fore border-2 border-fore px-4 py-2 rounded-md mt-4 hover:bg-color1 hover:text-white">
                  {loading2 ? <CircularProgress size={24} color="inherit" /> : "Remove Member Registration Codes"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGroupCodeUser;
