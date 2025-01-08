'use client';

import { useReducer } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Reducer for managing form state
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    case "SET_QUANTITY":
      return { ...state, quantity: action.payload };
    default:
      return state;
  }
};

const InventoryForm = () => {
  const [state, dispatch] = useReducer(reducer, { name: "", description: "", quantity: 0 });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });

      if (response.ok) {
        toast.success("Item added successfully!");
      } else {
        toast.error("Failed to add item! Please try again.");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      {/* Toast container */}
      <ToastContainer />

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter item name"
            onChange={(e) =>
              dispatch({ type: "SET_NAME", payload: e.target.value })
            }
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Enter item description"
            onChange={(e) =>
              dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })
            }
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            placeholder="Enter quantity"
            onChange={(e) =>
              dispatch({ type: "SET_QUANTITY", payload: parseInt(e.target.value) })
            }
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          Add Item
        </button>
      </form>
    </>
  );
};

export default InventoryForm;
