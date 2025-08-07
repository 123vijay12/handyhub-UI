import { useEffect, useState } from "react";
import { fetchUsers } from "../api/userApi";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers()
      .then((response) =>{ setUsers(response.data)
        console.log(response.data)
      })
      .catch((error) => console.error("Error fetching users", error))
      .finally(() => setLoading(false));
  }, []);

  return { users, loading };
};

export default useUsers;
