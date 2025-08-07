import React, { useState } from 'react';

const UserForm = ({ config, userIndex, onChange, values }) => {
  return (
    <div className="border rounded p-4 mb-6 bg-white shadow-sm">
      <h3 className="text-lg font-bold mb-4">User {userIndex + 1}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {config.map((field) => (
          <div key={field.name}>
            <label className="block mb-1 font-medium">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={values[field.name] || ""}
              onChange={(e) => onChange(userIndex, field.name, e.target.value)}
              required={field.required}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function UserFormManager() {
  const userFormConfig = [/* your config as above */];

  const [users, setUsers] = useState([{},{},{}]); // for 3 user forms initially

  const handleChange = (index, name, value) => {
    const newUsers = [...users];
    newUsers[index][name] = value;
    setUsers(newUsers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Users:", users);
    // You can validate or send data from here
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto mt-10">
      {users.map((user, index) => (
        <UserForm
          key={index}
          config={userFormConfig}
          userIndex={index}
          values={user}
          onChange={handleChange}
        />
      ))}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setUsers([...users, {}])}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Add Another User
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
