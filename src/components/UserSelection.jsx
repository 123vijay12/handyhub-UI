// src/components/forms/UserSelection.jsx
import React, { useEffect, useState } from "react";
import { fetchUsers } from "../api/userApi";

const UserSelection = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetchUsers();
        setUsers(res.data || []);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;

  return (
    <div>
      <h3>Select a User to Create Worker Profile</h3>
      <div style={{ maxHeight: "300px", overflowY: "auto" }}>
        {users.map((user) => (
          <div
            key={user.id}
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              margin: "5px 0",
              borderRadius: "4px",
              cursor: "pointer"
            }}
            onClick={() => onUserSelect(user.id)}
          >
            <strong>{user.firstName} {user.lastName}</strong>
            <br />
            <small>Email: {user.email}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSelection;