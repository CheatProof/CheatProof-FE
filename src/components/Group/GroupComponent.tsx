import { useEffect, useState } from 'react';
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, ChevronUp, Users, BarChart2 } from 'lucide-react';
import { createGroup, fetchGroups } from '../../api/group';
import { useNavigate } from 'react-router-dom';

const GroupManagement = () => {
  const navigate =useNavigate()
  const [groups, setGroups] = useState<any[
  ]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [allExpanded, setAllExpanded] = useState(true);

  const handleCreateGroup = async() => {
    if (newGroupName.trim()) {
      const newGroup = {
        groupName : newGroupName.trim(),
        groupMessage:  "Add some intructions here regarding test" 
      };

      const data = await createGroup(newGroup)
      if (data.code == 200) {
        // setGroups([...groups, data.group]);
        setNewGroupName('');
        setIsModalOpen(false);
      } else {
       
      }


      setNewGroupName('');
      setIsModalOpen(false);
    }
  };



  const toggleAllGroups = () => {
    const newState = !allExpanded;
    setAllExpanded(newState);
    setGroups(groups.map(group => ({
      ...group,
      isOpen: newState
    })));
  };

  const toggleGroup = (groupId:any) => {
    setGroups(groups.map(group => 
      group.id === groupId ? { ...group, isOpen: !group.isOpen } : group
    ));
  };

  const filteredGroups = groups.filter(group =>
    group.groupName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getGroups = async( )=>{
    const groups = await fetchGroups();
    console.log(groups.data)
    setGroups(groups.data.map((group:any) => ({...group, isOpen:false})));
  }

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Groups</h1>
        
        {/* Header Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => toggleAllGroups()}
              className="p-2 hover:bg-gray-100 rounded"
            >
              {allExpanded ? (
        <ChevronUp className="h-5 w-5 text-gray-500" />
      ) : (
        <ChevronDown className="h-5 w-5 text-gray-500" />
      )}
            </button>
            <div className="relative">
              <Input
                type="text"
                placeholder="Search Group Name"
                value={searchQuery}
                onChange={(e:any) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by: Alphabetical</span>
            </div>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-color2 hover:bg-color1 text-white"
            >
              New Group +
            </Button>
          </div>
        </div>

        {/* Groups List */}
        <div className="space-y-4">
          {filteredGroups.map((group) => (
            <div key={group.id} className="bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-between p-4 bg-blue-50">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-gray-500" />
                  <span className="font-medium">{group.groupName}</span>
                </div>
                <div className="flex items-center gap-4">
                  <button className="text-color1 hover:text-fore hover:underline text-sm" onClick={()=>navigate(`/teacher-dashboard/selecttest`)}>
                    Assign
                  </button>
                  <button className="flex items-center gap-1 text-color1 hover:text-fore hover:underline text-sm">
                    <BarChart2 className="h-4 w-4" />
                    Statistics
                  </button>
                  <Button onClick={()=>navigate(`/teacher-dashboard/group-management/${group.id}`)} variant="outline" size="sm">
                    Edit Group ({group.AssignedTestGroups.length})
                  </Button>
                  <button onClick={() => toggleGroup(group.id)}>
                    {group.isOpen ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
              
              {group.isOpen && (
                <div className="p-4">
                  <div className="text-sm text-gray-600 mb-4">
                    {group.AssignedTestGroups.length} Tests assigned:
                  </div>
                  
                  {group.AssignedTestGroups.map((test:any, index:any) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center gap-3">
                        <div className="text-gray-600">{test.AssignedTests.Tests.testName}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button onClick={()=>navigate(`/teacher-dashboard/grouptest/${test.id}`,{
                          state:{
                            groupTest:test,
                            group:group
                          }
                        })} className="text-gray-600 hover:text-gray-800">
                          Settings
                        </button>
                        <span className={`px-2 py-1 rounded text-sm ${
                          test.AssignedTests.availabilityStatus === 'active' 
                            ? 'text-green-600 bg-green-50' 
                            : 'text-gray-600 bg-gray-50'
                        }`}>
                          {test.AssignedTests.availabilityStatus}
                        </span>
                        <Button variant="outline" size="sm">
                          Results
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <button className="mt-4 flex items-center gap-2 text-fore hover:underline" onClick={()=> navigate('/teacher-dashboard/selecttest')}>
                    <span>+</span> Assign a Test
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* New Group Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Group</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Input
                type="text"
                placeholder="Enter group name"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className="w-full"
              />
              <Alert className="mt-4">
                <AlertDescription>
                  Instructions for creating a group:
                  <ul className="list-disc ml-4 mt-2">
                    <li>Group name should be unique</li>
                    <li>Avoid special characters in group name</li>
                    <li>Maximum length is 50 characters</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateGroup} className='bg-color1 hover:bg-fore'>
                Create Group
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default GroupManagement;