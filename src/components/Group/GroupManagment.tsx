import  { useState } from 'react';
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

const GroupsManagement = () => {
  const [isGroupDescOpen, setIsGroupDescOpen] = useState(false);
  const [expandedMember, setExpandedMember] = useState<any>(null);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 p-4">
      {/* Navigation Card */}


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
            <textarea
              className="w-full p-2 border rounded-md"
              rows={4}
              placeholder="Enter group description..."
            />
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              Save Description
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Section Management */}
      <Card className="w-full">
        {/* Header Section */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-gray-500" />
            <h2 className="text-xl font-semibold">Section B</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="flex items-center gap-2">
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
            <Button variant="ghost" className="flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Delete Options
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              Assign Test
            </Button>
          </div>
        </div>

        {/* Group Message Section */}
        <div className="p-4 border-b">
          <h3 className="text-base font-medium mb-2">Group Message</h3>
          <Button variant="ghost" className="text-red-500 hover:text-red-600 p-0">
            + Add Message
          </Button>
        </div>

        {/* Tabs Section */}
        <div className="p-4">
          <Tabs defaultValue="members" className="w-full">
            <TabsList className="grid w-[400px] grid-cols-2">
              <TabsTrigger value="members" className="flex items-center gap-2">
                Group Members
                <span className="bg-gray-200 px-2 py-0.5 rounded-full text-sm">1</span>
              </TabsTrigger>
              <TabsTrigger value="assigned" className="flex items-center gap-2">
                Test Assigned
                <span className="bg-gray-200 px-2 py-0.5 rounded-full text-sm">1</span>
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
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add new members
                  </Button>
                </div>
              </div>

              {/* Member List with Collapsible Details */}
              {['yabzar naqvi', 'John Doe', 'Jane Smith'].map((member, index) => (
                <Collapsible
                  key={index}
                  open={expandedMember === index}
                  onOpenChange={() => setExpandedMember(expandedMember === index ? null : index)}
                >
                  <Card className="mb-2">
                    <CollapsibleTrigger className="w-full">
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <UserPlus className="w-4 h-4 text-gray-500" />
                          </div>
                          <span className="font-medium">{member}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 transform transition-transform ${expandedMember === index ? 'rotate-180' : ''}`} />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 border-t bg-gray-50">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Key className="w-4 h-4 text-gray-500" />
                          <span>Password: ********</span>
                          <Button variant="ghost" size="sm">
                            Show Password
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span>Email: {member.toLowerCase().replace(' ', '.')}@example.com</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit Details</Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                            Remove Member
                          </Button>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              ))}
            </TabsContent>

            <TabsContent value="assigned">
              <div className="p-4 text-center text-gray-500">
                No tests assigned yet
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
};

export default GroupsManagement;