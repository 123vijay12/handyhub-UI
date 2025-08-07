import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, User, TrashIcon } from 'lucide-react';
import NoDataFound from '../components/NoDataFound';
import useUsers from '../routes/useUsers';
import { Pencil } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../api/userApi';

const UserList = () => {
  const [setModalOpen] = useState(false);
  const { users: initialUsers, loading } = useUsers(); // ✅ fixed here
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
    if (initialUsers) {
      setUsers(initialUsers);
    }
  }, [initialUsers]);

  if (loading) return <div>Loading...</div>;

  const handleAddUser = (newUser) => {
    setUsers([
      ...users,
      {
        id: users.length + 1,
        ...newUser,
      },
    ]);
    setModalOpen(false);
  };

const handleEdit = (userId) => {
  console.log("Edit user ID:", userId);
  navigate(`/users/edit/${userId}`);
};



const handleDelete = async (userId) => {
  const confirm = window.confirm("Are you sure you want to delete this user?");
  if (!confirm) return;

  try {
    await deleteUser(userId);
    setUsers(users.filter((user) => user.id !== userId));
    alert("User deleted successfully.");
  } catch (error) {
    console.error("Delete error:", error);
    alert("Failed to delete user.");
  }
};



  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">User List</h2>
          <button
            onClick={() => navigate("/users/create")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create New User
          </button>
      </div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {users.length > 0 ? (
    users.map((user) => (
      <div
        key={user.id}
        className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition relative"
      >
        {/* Edit Icon */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-blue-600"
          onClick={() => handleEdit(user.id)}
          title="Edit User"
        >
          <Pencil className="w-5 h-5" />
        </button>
          {/* Delete Button */}
          <button
            className="absolute top-10 right-2 text-gray-500 hover:text-red-600"
            onClick={() => handleDelete(user.id)}
            title="Delete User"
          >
            <TrashIcon className="w-5 h-5" />
          </button>

        <div className="flex items-center gap-4">
          <div className="bg-gray-200 p-3 rounded-full">
            <User className="w-8 h-8 text-gray-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold">{user.name}</h3>
            <div className="text-sm text-gray-500">
              {user.city}, {user.state}
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-blue-600" />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-green-600" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-red-600 mt-1" />
            <span>
              {user.address}, {user.city}, {user.state}, {user.country}
            </span>
          </div>
        </div>
      </div>
    ))
  ) : (
    <NoDataFound />
  )}
</div>

    </div>
  );
};

export default UserList;
