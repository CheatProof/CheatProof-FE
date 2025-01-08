import  { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Settings, 
  UserPlus, 
  Mail, 
  Trash2, 
  ChevronDown, 
  Plus, 
  ChevronRight,
  Edit,
  Key
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate, useParams } from 'react-router-dom';
import { deleteGroup, fetchGroupById, getGroupMembersByGroupId, updateGroup } from '../../api/group';
import { ContentState, convertFromHTML, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "draft-js/dist/Draft.css";
import toast, { Toaster } from 'react-hot-toast';
import { Circles } from "react-loader-spinner";

const GroupsManagement = () => {
  const{id}= useParams()
  const navigate = useNavigate()
  const [group, setGroup] = useState<any>(null);
  const [groupMembers, setGroupMembers] = useState<any[]>([]);
  const [isGroupDescOpen, setIsGroupDescOpen] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isDeleting, setIsDeleting] = useState(false);
  const [newGroupName, setNewGroupName] = useState("")
  const [loading, setLoading] = useState(false)
  const [membersLoading, setMembersLoading] = useState(true);

  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
  };

  const getHtmlFromEditorState = (editorState: any) => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    return draftToHtml(rawContentState);
  };

  const htmlToEditorState = (html: any) => {
    const blocks = convertFromHTML(html);
    if (blocks) {
      const contentState = ContentState.createFromBlockArray(blocks.contentBlocks, blocks.entityMap);
      return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty();
  };

  const handleDeleteGroup = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteGroup(group.id)

      if (response.code==200) {
        navigate('/teacher-dashboard/allgroups');
      } else {
        console.error('Failed to delete group');
        // You might want to show an error toast here
      }
    } catch (error) {
      console.error('Error deleting group:', error);
      // You might want to show an error toast here
    } finally {
      setIsDeleting(false);
    }
  };

  const [expandedMember, setExpandedMember] = useState<any>(null);

  const getGroup = async()=>{
    // fetch group data from API based on id
    //...
    const data = await fetchGroupById(id);
    setGroup(data.data);
    setNewGroupName(data.data.groupName);
    setEditorState(htmlToEditorState(data.data.groupMessage));
    
    console.log(data.data);
    // set group data to state

  }
  const fetchGroupMembers = async()=>{
    // fetch group members data from API based on id
    //...
    const data = await getGroupMembersByGroupId(id);
    console.log(data.data);
 
    setGroupMembers(data.data);
    setMembersLoading(false);

    // set group members data to state
  }

  const editGroup = async ()=>{
    setLoading(true);
    const editGroup = {
      groupName: newGroupName,
      groupMessage: getHtmlFromEditorState(editorState)
    }
    const data = await updateGroup(group.id,editGroup);
    if(data.code === 200){
      toast.success("Group edited successfully");
      console.log('Group edited successfully');
      // handle success
    }else{
      toast.error("Failed to edit group");
      console.log('Failed to edit group');
      // handle failure
    }
    setLoading(false);
  }

//   {
//     "id": "34ab9c3f-5a09-4626-83d1-9554ee3dbbd9",
//     "username": "tony23",
//     "password": "$2b$10$7um8xir/MyQKpcKsswDbieiilTDPhLM.hFoORLnDtdlJH/pPG4yd2",
//     "email": "tony@gmail.com",
//     "firstName": "tony",
//     "lastName": "stark",
//     "profileImage": null,
//     "dateCreated": "2024-11-19T23:14:44.000Z",
//     "lastLogin": null,
//     "isActive": true,
//     "createdAt": "2024-11-19T23:14:44.000Z",
//     "updatedAt": "2024-11-19T23:14:44.000Z"
// }

  // Call getGroup on component mount
  useEffect(() => {
    getGroup();
    fetchGroupMembers();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 p-4">
      <Toaster/>
      {/* Navigation Card */}



      {/* Section Management */}
      <Card className="w-full">
        {/* Header Section */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-gray-500" />
            <h2 className="text-xl font-semibold">{group?.groupName}</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <Button onClick={()=>navigate(`/teacher-dashboard/group-add-member/${id}`)} variant="ghost" className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Add Members
            </Button>
            <Button variant="ghost" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Notify Members
            </Button>
            <Button variant="ghost" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Member Settings
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                  Delete Group
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to delete this group?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the group
                    "{group?.groupName}" and remove all associated data. 
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isDeleting}
                    onClick={handleDeleteGroup}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    {isDeleting ? "Deleting..." : "Delete Group"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button className="hover:bg-white border-fore border-2 hover:text-fore bg-fore text-white font-medium" onClick={()=>navigate(`/teacher-dashboard/selecttest`)}>
              Assign Test
            </Button>
          </div>
        </div>

        {/* Group Message Section */}
             {/* Group Description Collapsible */}
      <Collapsible
        open={isGroupDescOpen}
        onOpenChange={setIsGroupDescOpen}
        className="w-full bg-white shadow-sm rounded-lg"
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-gray-50">
          <div className="flex items-center gap-2">
            <Edit className="w-5 h-5 text-gray-500" />
            <span className="font-medium">Group Description</span>
          </div>
          <ChevronRight className={`w-5 h-5 transform transition-transform ${isGroupDescOpen ? 'rotate-90' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4 border-t">
          <div className="space-y-4">
            <label className="">Group Name</label>
            <input
              type="text"
              value={newGroupName}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              onChange={(event)=>setNewGroupName(event.target.value)}

              />
            <label className="">Group Description</label>
          <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                toolbar={{
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: true },
                  image: {
                    previewImage: true,
                    uploadCallback: (file: any) => {
                      return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          resolve({
                            data: {
                              url: reader.result,
                            },
                          });
                        };
                        reader.onerror = (reason) => reject(reason);
                        reader.readAsDataURL(file);
                      });
                    },
                    alt: { present: true, mandatory: true },
                  },
                }}
              />
            <Button onClick={()=>editGroup()} className="bg-blue-500 hover:bg-blue-600 text-white">
            {loading ? (
    <Circles
      height="20"
      width="20"
      color="primary"
      ariaLabel="circles-loading"
      visible={true}
    />
  ):(
              "Save Description"
  )}
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>


        {/* Tabs Section */}
        <div className="p-4">
          <Tabs defaultValue="members" className="w-full">
            <TabsList className="grid w-[400px] h-12 grid-cols-2">
              <TabsTrigger value="members" className="flex items-center gap-2">
                Group Members
                <span className="bg-gray-200 px-2 py-0.5 rounded-full text-sm">{groupMembers.length}</span>
              </TabsTrigger>
              <TabsTrigger value="assigned" className="flex items-center gap-2">
                Test Assigned
                <span className="bg-gray-200 px-2 py-0.5 rounded-full text-sm">{group?.AssignedTestGroups?.length}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="members" className="mt-4">
              <div className="flex items-center justify-between mb-4">
                <Button variant="ghost" className="text-gray-500 flex items-center gap-1">
                  Sort by First Name
                  <ChevronDown className="w-4 h-4" />
                </Button>
                <div className="flex items-center gap-2">
                  <Button variant="ghost">
                    Actions
                  </Button>
                  <Button onClick={()=>navigate(`/teacher-dashboard/group-add-member/${id}`)} className="bg-color2 hover:bg-color1 text-white flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add new members
                  </Button>
                </div>
              </div>

              {membersLoading ? (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      height: "100vh",
    }}
  >
    <Circles height="60" width="60" color="#152487" ariaLabel="loading" />
  </div>
) : (
  <>
    {/* Member List with Collapsible Details */}
    {groupMembers.map((member: any, index: any) => (
      <Collapsible
        key={index}
        open={expandedMember === index}
        onOpenChange={() =>
          setExpandedMember(expandedMember === index ? null : index)
        }
      >
        <Card className="mb-2">
          <CollapsibleTrigger className="w-full">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <UserPlus className="w-4 h-4 text-gray-500" />
                </div>
                <span className="font-medium">{member.User.username}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transform transition-transform ${
                  expandedMember === index ? "rotate-180" : ""
                }`}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 !text-[75%] border-t bg-gray-50">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-gray-500" />
                <span>Password: ********</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span>Email: {member.User.email}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Edit Details
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 hover:text-red-600"
                >
                  Remove Member
                </Button>
              </div>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    ))}
  </>
)}

            </TabsContent>

            <TabsContent value="assigned">
            { group?.AssignedTestGroups?.length===0 && <div className="p-4 text-center text-gray-500">
                No tests assigned yet
              </div>}
              {group?.AssignedTestGroups?.length!==0 && (
                <div className="p-4">
                  <div className="text-sm text-gray-600 mb-4">
                    {group?.AssignedTestGroups?.length} Tests assigned:
                  </div>
                  
                  {group?.AssignedTestGroups.map((test:any, index:any) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center gap-3">
                        <div className="text-gray-600">{test.AssignedTests.Tests.testName}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button onClick={()=>navigate(`/teacher-dashboard/grouptest/${test.id}`)} className="text-gray-600 hover:text-gray-800">
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
                  
            
                </div>
              )}
    
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
};

export default GroupsManagement;

