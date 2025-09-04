// src/pages/Employees/EditEmployee.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById, updateUser } from '../../api/userApi';

const EditEmployee = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    employeeId: '',
    salutation: '',
    firstName: '',
    lastName: '',
    password: '',
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

  const [loading, setLoading] = useState(true);

  // Fetch user by ID
  useEffect(() => {
    getUserById(id)
      .then(res => {
        const user = res.data;
        setFormData({
          employeeId: user.employeeId || '',
          salutation: user.salutation || '',
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          password: '', // Don't preload password
          birthDate: user.dateOfBirth || '',
          gender: user.gender || '',
          nationality: user.nationality || '',
          phone: user.phone || '',
          email: user.email || '',
          address: user.address || '',
          city: user.city || '',
          state: user.state || '',
          country: user.country || '',
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching user:", err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      username: formData.email.split('@')[0],
      firstName: formData.firstName,
      lastName: formData.lastName,
      ...(formData.password && { password: formData.password }),
      gender: formData.gender,
      dateOfBirth: formData.birthDate,
      nationality: formData.nationality,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      updatedBy: 1,
      updatedAt: new Date().toISOString(),
    };

    try {
      await updateUser(id, updatedUser);
      alert("User updated successfully");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update user");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading user data...</p>;

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-md rounded-xl mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Edit Employee</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Basic Info */}
        <section>
          <h3 className="text-xl font-semibold border-b pb-2 mb-4">Basic User Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Input label="Employee ID" name="employeeId" value={formData.employeeId} onChange={handleChange} required />
            <Select label="Salutation" name="salutation" value={formData.salutation} onChange={handleChange} options={['Mr.', 'Ms.', 'Mrs.', 'Dr.']} />
            <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Leave blank to keep existing password" />
            <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
            <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
            {/* Photo upload removed for edit to simplify */}
          </div>
        </section>

        {/* Personal Info */}
        <section>
          <h3 className="text-xl font-semibold border-b pb-2 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Input label="Date of Birth" type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
            <Select label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={['Male', 'Female', 'Other']} />
            <Input label="Nationality" name="nationality" value={formData.nationality} onChange={handleChange} />
          </div>
        </section>

        {/* Contact Info */}
        <section>
          <h3 className="text-xl font-semibold border-b pb-2 mb-4">Contact Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
            <Input label="Email" name="email" value={formData.email} onChange={handleChange} />
            <Input label="Address" name="address" value={formData.address} onChange={handleChange} />
            <Input label="City" name="city" value={formData.city} onChange={handleChange} />
            <Input label="State" name="state" value={formData.state} onChange={handleChange} />
            <Input label="Country" name="country" value={formData.country} onChange={handleChange} />
          </div>
        </section>

        <div className="text-right mt-8">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Update Employee
          </button>
        </div>
      </form>
    </div>
  );
};

// Reusable Input component
const Input = ({ label, name, value, onChange, type = 'text', required = false, placeholder = '' }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border border-gray-300 rounded-md p-2 w-full"
      required={required}
    />
  </div>
);

// Reusable Select component
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

export default EditEmployee;
