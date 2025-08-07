// src/pages/Employees/AddEmployee.jsx
import React, { useState } from 'react';
import { createUser } from '../api/userApi';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    salutation: '',
    firstName: '',
    lastName: '',
    password: '',
    photo: null,
    birthDate: '',
    gender: '',
    nationality: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    country: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Prepare payload
  const userPayload = {
    username: formData.email.split('@')[0], // You can customize this logic
    firstName: formData.firstName,
    lastName: formData.lastName,
    password: formData.password,
    isActive: true,
    createdBy: 1,
    createdAt: new Date().toISOString(),
    updatedBy: 1,
    updatedAt: new Date().toISOString(),
    gender: formData.gender,
    dateOfBirth: formData.birthDate,
    nationality: formData.nationality,
    profilePictureUrl: 'http://example.com/images/avatar.png', // Replace with actual upload URL
    phone: formData.phone,
    email: formData.email,
    address: formData.address,
    city: formData.city,
    state: formData.state,
    country: formData.country,
  };

  try {
    const response = await createUser(userPayload);
    console.log('User added:', response.data);
    alert("Employee added successfully");
    // Optionally redirect or reset
  } catch (error) {
    console.error('Error adding employee:', error);
    alert("Failed to add employee");
  }
};


  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-md rounded-xl mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Add Employee</h2>
        <button className="text-sm text-red-500 hover:underline">Close</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* SECTION 1: Basic User Details */}
        <section>
          <h3 className="text-xl font-semibold border-b pb-2 mb-4">Basic User Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Input label="Employee ID" name="employeeId" value={formData.employeeId} onChange={handleChange} required />
            <Select label="Salutation" name="salutation" value={formData.salutation} onChange={handleChange} options={['Mr.', 'Ms.', 'Mrs.', 'Dr.']} />
            <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required />
            <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
            <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
            <div>
              <label className="block text-sm font-medium mb-1">Photo</label>
              <input type="file" name="photo" accept="image/*" onChange={handleChange} className="border p-2 rounded-md w-full" />
              <small className="text-xs text-gray-500">150x150px JPEG, PNG Image</small>
            </div>
          </div>
        </section>

        {/* SECTION 2: Personal Info */}
        <section>
          <h3 className="text-xl font-semibold border-b pb-2 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Input label="Date of Birth" type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
            <Select label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={['Male', 'Female', 'Other']} />
            <Input label="Nationality" name="nationality" value={formData.nationality} onChange={handleChange} />
          </div>
        </section>

        {/* SECTION 3: Contact Details */}
        <section>
          <h3 className="text-xl font-semibold border-b pb-2 mb-4">Contact Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
            <Input label="Email" name="email" value={formData.email} onChange={handleChange} />
            <Input label="Address" name="address" value={formData.address} onChange={handleChange} />
            <Input label="City" name="city" value={formData.city} onChange={handleChange} />
            <Input label="State" name="state" value={formData.state} onChange={handleChange} />
            <Input label="Country" name="country" value={formData.country} onChange={handleChange} />
          </div>
        </section>

        <div className="text-right mt-8">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Save Employee
          </button>
        </div>
      </form>
    </div>
  );
};

// Input component
const Input = ({ label, name, value, onChange, type = 'text', required }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-md p-2 w-full"
      required={required}
    />
  </div>
);

// Select component
const Select = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <select name={name} value={value} onChange={onChange} className="border border-gray-300 rounded-md p-2 w-full">
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default AddEmployee;
