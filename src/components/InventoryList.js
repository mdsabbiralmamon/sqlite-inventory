'use client';

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify"; // Ensure you have react-toastify installed and imported
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles
import useStore from "../store/store";

const InventoryList = () => {
  const { items, fetchItems } = useStore();
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch(`/api/items/${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchItems();
      toast.success("Item deleted successfully!", { autoClose: 3000 });
    } else {
      toast.error("Failed to delete item.", { autoClose: 3000 });
    }
  };

  const handleUpdate = async () => {
    const res = await fetch(`/api/items/${editItem.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editItem),
    });
    if (res.ok) {
      fetchItems();
      setEditItem(null);
      toast.success("Item updated successfully!", { autoClose: 3000 });
    } else {
      toast.error("Failed to update item.", { autoClose: 3000 });
    }
  };

  return (
    <div className="">
      <ToastContainer />
      <div className="bg-white bg-opacity-90 backdrop-blur-lg shadow-xl rounded-lg w-full max-w-4xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Quantity</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="border-t transition hover:bg-gray-100"
                >
                  <td className="py-3 px-4 text-blue-600">{item.name}</td>
                  <td className="py-3 px-4 text-gray-600">{item.description}</td>
                  <td
                    className={`py-3 px-4 ${
                      item.quantity > 3
                        ? "text-green-600"
                        : item.quantity > 0
                        ? "text-yellow-500"
                        : "text-red-600"
                    }`}
                  >
                    {item.quantity}
                  </td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <button
                      onClick={() => setEditItem(item)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md shadow-sm hover:bg-blue-600 transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
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

        {editItem && (
          <div className="mt-6 bg-white p-6 shadow-lg rounded-lg transition-transform transform scale-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Edit Item
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                value={editItem.name}
                onChange={(e) =>
                  setEditItem({ ...editItem, name: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Name"
              />
              <textarea
                value={editItem.description}
                onChange={(e) =>
                  setEditItem({ ...editItem, description: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Description"
              ></textarea>
              <input
                type="number"
                value={editItem.quantity}
                onChange={(e) =>
                  setEditItem({
                    ...editItem,
                    quantity: parseInt(e.target.value),
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Quantity"
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setEditItem(null)}
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

export default InventoryList;
