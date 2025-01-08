"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      toast.error("Failed to fetch users.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/users/manage/${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchUsers();
      toast.success("User deleted successfully!", { autoClose: 3000 });
    } else {
      toast.error("Failed to delete user.", { autoClose: 3000 });
    }
  };

  const handleUpdate = async () => {
    const res = await fetch(`/api/users/manage/${editUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editUser),
    });
    if (res.ok) {
      fetchUsers();
      setEditUser(null);
      toast.success("User updated successfully!", { autoClose: 3000 });
    } else {
      toast.error("Failed to update user.", { autoClose: 3000 });
    }
  };

  return (
    <div className="">
      <ToastContainer />
      <div className="max-w-4xl mx-auto bg-white bg-opacity-90 backdrop-blur-lg shadow-xl rounded-lg p-8">
        {/* Create New User Button */}
        <div className="flex justify-start mb-6">
          <button
            onClick={() => router.push("/signup")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Create New User
          </button>
        </div>

        {/* Users List */}
        {loading ? (
          <p className="text-center text-blue-500">Loading users...</p>
        ) : users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Role</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t transition hover:bg-gray-100"
                  >
                    <td className="py-3 px-4 text-blue-600">{user.name}</td>
                    <td className="py-3 px-4 text-gray-600">{user.email}</td>
                    <td className="py-3 px-4 text-gray-600">{user.role}</td>
                    <td className="py-3 px-4 text-center space-x-2">
                      <button
                        onClick={() => setEditUser(user)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md shadow-sm hover:bg-blue-600 transition"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md shadow-sm hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No users found.</p>
        )}

        {/* Edit User Modal */}
        {editUser && (
          <div className="mt-6 bg-white p-6 shadow-lg rounded-lg transition-transform transform scale-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Edit User
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                value={editUser.name}
                onChange={(e) =>
                  setEditUser({ ...editUser, name: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Name"
              />
              <input
                type="email"
                value={editUser.email}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
              />
              <input
                type="password"
                value={editUser.password}
                onChange={(e) =>
                  setEditUser({ ...editUser, password: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="New Password (leave empty to keep current)"
              />
              <select
                value={editUser.role}
                onChange={(e) =>
                  setEditUser({ ...editUser, role: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setEditUser(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
