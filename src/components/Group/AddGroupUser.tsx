import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Info } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { addBulkMembersToGroupByEmail } from '../../api/group';

const AddGroupMembers = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [memberInput, setMemberInput] = useState('');
  const [nameOrder, setNameOrder] = useState('firstLast');
  const [adminEmail, setAdminEmail] = useState('');
  const [sendLoginDetails, setSendLoginDetails] = useState(false);
  const [language, setLanguage] = useState('English');
  const [commonPassword, setCommonPassword] = useState('');

  const handleAddMembers = async() => {
    const memberLines = memberInput.split('\n').filter(Boolean); // Split lines and remove empty ones
  
    const members = memberLines.map((line) => {
      // Adjust parsing based on nameOrder
      let firstName = "";
      let lastName = "";
      let email = "";
  
      if (nameOrder === "firstLast") {
        [firstName, lastName, email] = line.split(',').map((field) => field.trim());
      } else if (nameOrder === "lastFirst") {
        [lastName, firstName, email] = line.split(',').map((field) => field.trim());
      }
  
      // Return the member object
      return { firstName, lastName, email };
    });
  
    // Validate each member's fields
    const invalidMembers = members.filter(
      (member) => !member.firstName || !member.lastName || !member.email
    );
  
    if (invalidMembers.length > 0) {
      alert("Each line must include First Name, Last Name, and Email, separated by commas.");
      return;
    }
  
    console.log("Valid Members:", members);

    const data = await addBulkMembersToGroupByEmail({newMembers: members,commonPassword:commonPassword,groupId:id});
    console.log("API Response:", data);
  
    // Proceed with further logic, e.g., API call to save members
  };
  

  return (
    <div className="max-full mx-auto p-4">
      {/* Info Banner */}
      <div className="bg-green-50 p-4 mb-6 rounded-md flex items-start gap-3">
        <Info className="h-5 w-5 text-green-600 mt-0.5" />
        <div className="text-sm text-green-800">
          Manually register Users into this Group now. Have their username and password emailed to them.
          <br />
          <span className="text-green-600 text-xs">
            Note: Self Registration codes are a separate way to register Users and are not required with this option.
          </span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Members</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Member Stats */}
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-semibold">4,997</div>
                <div className="text-sm text-gray-600">Member places available</div>
              </div>
              <div>
                <div className="text-2xl font-semibold">1,000</div>
                <div className="text-sm text-gray-600">Max. Members per Group</div>
              </div>
              <div>
                <div className="text-2xl font-semibold">1</div>
                <div className="text-sm text-gray-600">Members in this Group</div>
              </div>
            </div>
          </div>

          {/* Example Format */}
          <div className="border p-4 rounded-md">
            <div className="font-semibold mb-2">Example Format</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
           
                <div>Kim, Sanders, kim@example.com</div>
                <div>Paul, Smith, paul@example.com</div>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <div>• One user per line</div>
                {/* <div>• Email is optional</div> */}
                <div>• First name, Last name and Email</div>
                <div>• Fields are separated with commas</div>
              </div>
            </div>
          </div>

          {/* New Members Input */}
          <div className="space-y-2">
            <Label htmlFor="members">New Members:</Label>
            <Textarea
              id="members"
              value={memberInput}
              onChange={(e) => setMemberInput(e.target.value)}
              className="h-32"
              placeholder="Enter member details..."
            />
          </div>

          {/* Name Order */}
          <div className="space-y-2">
            <Label>Name Order:</Label>
            <RadioGroup 
              value={nameOrder} 
              onValueChange={setNameOrder}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="firstLast" id="firstLast" />
                <Label htmlFor="firstLast">First name, Last name, email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lastFirst" id="lastFirst" />
                <Label htmlFor="lastFirst">Last Name, First name, email</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Language Selection */}
          <div className="space-y-2">
            <Label htmlFor="language">Language:</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
                <SelectItem value="French">French</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Common Password */}
          <div className="space-y-2">
            <Label htmlFor="commonPassword">Common Password:</Label>
            <Input
              id="commonPassword"
              type="password"
              value={commonPassword}
              onChange={(e) => setCommonPassword(e.target.value)}
              placeholder="Enter a common password"
            />
          </div>

          {/* Administrator Email */}
          <div className="space-y-2">
            <Label htmlFor="adminEmail">Administrator Email:</Label>
            <Input
              id="adminEmail"
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              placeholder="Enter email address"
            />
          </div>

          {/* Send Usernames and Passwords */}
          <div className="space-y-4">
            <div className="font-semibold">Send Usernames and Passwords to:</div>
            <RadioGroup 
              value={sendLoginDetails ? "yes" : "no"} 
              onValueChange={(value) => setSendLoginDetails(value === "yes")}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="noSend" />
                <Label htmlFor="noSend">No: Do not send login details to New Members</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yesSend" />
                <Label htmlFor="yesSend">Yes: Send login details to New Members</Label>
              </div>
            </RadioGroup>
          </div>

          <Button className="w-full" onClick={handleAddMembers}>
            Add Members
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddGroupMembers;
