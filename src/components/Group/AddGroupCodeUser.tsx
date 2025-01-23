// App.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddGroupCodeUser = () => {
  const [createCount, setCreateCount] = useState(1);
  const [removeCount, setRemoveCount] = useState(1);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
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
          <p>You currently have <strong>10 Member Registration Codes</strong> available to use in this Group.</p>
          <p>You can always delete existing Users you no longer need on your account to create new Member Registration Codes.</p>
          <button onClick={()=>navigate(`/teacher-dashboard/group-registration-codes`)}
           className="bg-color2 text-white px-4 py-2 rounded-md mt-4 hover:bg-color1">
            Print Member Registration Codes
          </button>
        </div>

        {/* Create Member Registration Codes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-md shadow-md">
            <h2 className="font-bold mb-4">Create Member Registration Codes</h2>
            <p>You have <strong>4,989 User places</strong> left to use across all your Groups.</p>
            <p>Max. <strong>1,000 Users</strong> can be registered per Group.</p>
            <p>You have <strong>989 Registration Codes</strong> left to add to this Group.</p>

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

            <button className="bg-white text-fore border-2 border-fore px-4 py-2 rounded-md mt-4 hover:bg-color1 hover:text-white">
              Add Member Registration Codes
            </button>
          </div>

          {/* Remove Member Registration Codes */}
          <div className="bg-gray-50 p-4 rounded-md shadow-md">
            <h2 className="font-bold mb-4">Remove Member Registration Codes</h2>
            <p>You have <strong>10 unused Member Registration Codes</strong> in this Group.</p>
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
                {[...Array(10).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
            </div>

            <button className="bg-white text-fore border-2 border-fore px-4 py-2 rounded-md mt-4 hover:bg-color1 hover:text-white">
              Remove Member Registration Codes
            </button>
          </div>
        </div>

        <div className="mt-6">
          <a
            href="#"
            className="text-red-600 underline text-sm"
          >
            View Member & Registration code usage across all Groups
          </a>
        </div>
      </div>
    </div>
  );
}

export default AddGroupCodeUser;
