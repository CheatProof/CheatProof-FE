




// import React, { useState, useEffect } from 'react';
// import { Box, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import toast, { Toaster } from 'react-hot-toast';
// import { getAllGroupMembers } from '@/api/group';
// import { useParams } from 'react-router-dom';

// const AllMembers = () => {
// const {id} = useParams();
//   const [groupMembers, setGroupMembers] = useState<{ id: string; User: { username: string; firstName: string; lastName: string }; Group: { groupName: string } }[]>([]);
//   const [groups, setGroups] = useState<{ id: string; name: string }[]>([]);
//   const [selectedGroup, setSelectedGroup] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchGroupMembers();
//   }, [selectedGroup]);

// //   const fetchGroupMembers = async () => {
// //     setLoading(true);
// //     try {
// //       const response = await getAllGroupMembers(id);
// //       setSelectedGroup(response.data[0].Group.id);
      
// //       if (!response) {
// //         toast.error('Failed to fetch group members');
// //         return;
// //       }

// //       if (response.code === 200) {
// //         setGroupMembers(response.data);
// //       } else {
// //         toast.error('No members found or API issue');
// //       }
// //     } catch (error) {
// //       toast.error('Error fetching data');
// //       console.error('Fetch error:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// const fetchGroupMembers = async () => {
//     setLoading(true);
//      const data = await getAllGroupMembers();
//      console.log(data.data[0].Group);
//           setSelectedGroup(data.data[0].Group.groupName);
//            setLoading(false);
// };


// // const fetchGroupMembers = async () => {
// //   console.log(localStorage.getItem('token'))
// //   if (!id) {
// //       toast.error("Invalid group ID");
// //       return;
// //   }

// //   setLoading(true);
// //   try {
// //       const data = await getAllGroupMembers(id);

// //       if (!data) {
// //           toast.error("No data received from API");
// //           return;
// //       }

// //       setSelectedGroup(data?.data?.[0]?.Group?.id || "");  // Ensure valid path
// //       setGroupMembers(data?.data || []);  // Ensure valid data

// //   } catch (error) {
// //       console.error("Fetch error:", error);
// //       toast.error("Error fetching data");
// //   } finally {
// //       setLoading(false);
// //   }
// // };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {/* Filter Dropdown */}
//       <FormControl className="w-1/5 mb-4">
//         <InputLabel>Filter by Group</InputLabel>
//         <Select value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
//           <MenuItem value="">All Groups</MenuItem>
//           {groups.map((group) => (
//             <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
//           ))}
//         </Select>
//       </FormControl>
      
//        {/* Total Count */}
//        <p className="my-6 text-lg font-medium">
//               Total Count: {groupMembers.length}
//             </p>
//       {/* Members Table */}
//       <Box className="min-h-[90vh] px-4 pb-4">  
//   <Table className="bg-gray-50 shadow-md rounded-lg p-4">
//     <TableHeader className="bg-color1/20">
//       <TableRow>
//         <TableHead>Username</TableHead>
//         <TableHead>First Name</TableHead>
//         <TableHead>Last Name</TableHead>
//         <TableHead>Group Name</TableHead>
//       </TableRow>
//     </TableHeader>

//     <TableBody>
//       {loading ? (
//         <TableRow>
//           <TableCell colSpan={4} className="text-center py-6">
//             <CircularProgress />
//           </TableCell>
//         </TableRow>
//       ) : groupMembers.length > 0 ? (
//         groupMembers.map((member) => (
//           <TableRow key={member.id} className="hover:bg-gray-100">
//             <TableCell>{member.User.username}</TableCell>
//             <TableCell>{member.User.firstName}</TableCell>
//             <TableCell>{member.User.lastName}</TableCell>
//             <TableCell>{member.Group.groupName}</TableCell>
//           </TableRow>
//         ))
//       ) : (
//         <TableRow>
//           <TableCell colSpan={4} className="text-center py-4">No members available.</TableCell>
//         </TableRow>
//       )}
//     </TableBody>
//   </Table>
// </Box>
//       <Toaster />
//     </div>
//   );
// };

// export default AllMembers;



import { useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import toast, { Toaster } from 'react-hot-toast';
import { getAllGroupMembers } from '@/api/group';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';


const safeValue = (value: string | undefined, fallback = "N/A") => value ?? fallback;
const AllMembers = () => {
  const [groupMembers, setGroupMembers] = useState<
    { id: string; User: { username: string; firstName: string; lastName: string }; Group: { id: string; groupName: string } }[]
  >([]);
  const [groups, setGroups] = useState<{ id: string; name: string }[]>([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroupMembers();
  }, []);

  // Fetch all group members & extract unique groups
  const fetchGroupMembers = async () => {
    setLoading(true);
    try {
      const data = await getAllGroupMembers();
      if (!data || !data.data || data.data.length === 0) {
        toast.error("No members found.");
        return;
      }

      // Store all members
      setGroupMembers(data.data);

      // Extract unique groups from the members list
      const uniqueGroups: { id: string; groupName: string }[] = Array.from(
        new Map<string, { id: string; groupName: string }>(
          data.data.map((member: { Group: { id: string; groupName: string } }) => [member.Group.id, member.Group])
        ).values()
      );
      
      setGroups(uniqueGroups.map(group => ({ id: group.id, name: group.groupName })));

    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  // Filter members based on selected group
  const filteredMembers = selectedGroup
    ? groupMembers.filter(member => member.Group.id === selectedGroup)
    : groupMembers;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Filter Dropdown */}
      <FormControl className="w-1/6 mb-4">
        <InputLabel>Filter by Group</InputLabel>
        <Select label="Filter by Group" value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
          <MenuItem value="">All Groups</MenuItem>
          {groups.map((group) => (
            <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      
      {/* Total Count */}
      <p className="ml-4 my-6 text-lg font-semibold">
        Total Count: {filteredMembers.length}
      </p>

      {/* Members Table */}
      <Box className="min-h-[90vh] px-4 pb-4">  
        <Table className="bg-gray-50 shadow-md rounded-lg p-4">
          <TableHeader className="bg-color1/20">
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Group Name</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
        
                <TableRow key={member.id} className="hover:bg-gray-100">
                  <TableCell>
                    <Box className="flex items-center">
                      <Avatar className="mr-2 bg-color1/20">
                        <AvatarFallback className="bg-color1/20">
                          { safeValue(member.User.username, "N/A").charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span>{safeValue(member.User.username)}</span>
                    </Box>
                  </TableCell>

                  <TableCell>{safeValue(member.User.firstName)}</TableCell>
                  <TableCell>{safeValue(member.User.lastName)}</TableCell>
                  <TableCell>{safeValue(member.Group.groupName)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">No members available.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>

      <Toaster />
    </div>
  );
};

export default AllMembers;










