"use client";

import Link from "next/link";
import React from "react";
import { FiPower } from "react-icons/fi";
import { signOut } from "next-auth/react";

const Dashboard = () => {
  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="relative bg-white/80 shadow-lg rounded-lg p-8 w-full max-w-5xl">
        {/* Sign-out Button */}
        <button
          onClick={handleSignOut}
          className="absolute top-4 right-4 text-gray-700 bg-yellow-500 hover:bg-red-500 hover:text-white rounded-full p-3 shadow-md transition-all duration-300 transform hover:scale-110 focus:ring focus:ring-red-300 focus:outline-none"
          title="Sign Out"
        >
          <FiPower className="w-5 h-5" />
        </button>

        {/* Dashboard Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          SQLite Inventory Dashboard
        </h1>

        {/* Dashboard Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add Inventory Item Section */}
          <div className="bg-blue-100 shadow-md p-6 rounded-lg hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">
              Add New Inventory Item
            </h2>
            <p className="text-gray-600 mb-4">
              Quickly add a new item to your inventory database.
            </p>
            <Link href={"/add-items"}>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
                Add Item
              </button>
            </Link>
          </div>

          {/* View All Items Section */}
          <div className="bg-green-100 shadow-md p-6 rounded-lg hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold text-green-600 mb-4">
              View All Items
            </h2>
            <p className="text-gray-600 mb-4">
              Browse the list of all available inventory items.
            </p>
            <Link href={"/view-all-items"}>
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300">
                View Items
              </button>
            </Link>
          </div>

          {/* Manage Users Section */}
          <div className="bg-teal-100 shadow-md p-6 rounded-lg hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold text-teal-600 mb-4">
              Manage Users
            </h2>
            <p className="text-gray-600 mb-4">
              View, add, and manage user roles for the inventory system.
            </p>
            <Link href={"/manage-users"}>
              <button className="w-full bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 focus:outline-none focus:ring focus:ring-teal-300">
                Manage Users
              </button>
            </Link>
          </div>

          {/* Generate Reports Section */}
          <div className="bg-purple-100 shadow-md p-6 rounded-lg hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold text-purple-600 mb-4">
              Generate Reports
            </h2>
            <p className="text-gray-600 mb-4">
              Create detailed reports about your inventory.
            </p>
            <button
              className="w-full bg-gray-400 text-white py-2 px-4 rounded"
              disabled
            >
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
            <button
              className="w-full bg-gray-400 text-white py-2 px-4 rounded"
              disabled
            >
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
            <button
              className="w-full bg-gray-400 text-white py-2 px-4 rounded"
              disabled
            >
              Configure Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
