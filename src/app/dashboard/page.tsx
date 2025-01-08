"use client";

import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white/80 shadow-lg rounded-lg p-8 w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          SQLite Inventory Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add Inventory Item Section */}
          <div className="bg-blue-100 shadow-md p-6 rounded-lg hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">
              Add New Inventory Item
            </h2>
            <p className="text-gray-600 mb-4">
              Quickly add a new item to your inventory database.
            </p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
              Add Item
            </button>
          </div>

          {/* View All Items Section */}
          <div className="bg-green-100 shadow-md p-6 rounded-lg hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold text-green-600 mb-4">
              View All Items
            </h2>
            <p className="text-gray-600 mb-4">
              Browse the list of all available inventory items.
            </p>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300">
              View Items
            </button>
          </div>

          {/* Manage Users Section */}
          <div className="bg-teal-100 shadow-md p-6 rounded-lg hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold text-teal-600 mb-4">
              Manage Users
            </h2>
            <p className="text-gray-600 mb-4">
              View, add, and manage user roles for the inventory system.
            </p>
            <button className="w-full bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 focus:outline-none focus:ring focus:ring-teal-300">
              Manage Users
            </button>
          </div>

          {/* Generate Reports Section */}
          <div className="bg-purple-100 shadow-md p-6 rounded-lg hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold text-purple-600 mb-4">
              Generate Reports
            </h2>
            <p className="text-gray-600 mb-4">
              Create detailed reports about your inventory.
            </p>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-300">
              Generate Report
            </button>
          </div>

          {/* Notifications Section */}
          <div className="bg-yellow-100 shadow-md p-6 rounded-lg hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold text-yellow-600 mb-4">
              Notifications
            </h2>
            <p className="text-gray-600 mb-4">
              Keep track of important inventory updates.
            </p>
            <button className="w-full bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 focus:outline-none focus:ring focus:ring-yellow-300">
              View Notifications
            </button>
          </div>

          {/* Settings Section */}
          <div className="bg-red-100 shadow-md p-6 rounded-lg hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              Settings
            </h2>
            <p className="text-gray-600 mb-4">
              Configure your inventory system settings.
            </p>
            <button className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300">
              Configure Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
