'use client';

import React from 'react';
import InventoryForm from '@/components/InventoryForm';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

const AddItems = () => {
  const router = useRouter();

  // Navigate back to dashboard
  const handleBack = () => {
    router.push('/dashboard'); // Adjust the path based on your dashboard route
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      
      {/* Outer div with relative positioning for the back button */}
      <div className="bg-white/80 shadow-lg rounded-lg p-8 w-full max-w-4xl relative">
        
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 text-white font-semibold py-2 px-4 bg-blue-700 rounded-full hover:bg-blue-800 transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none"
        >
          &larr; Back
        </button>

        <h1 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Add New Inventory Item</h1>

        <InventoryForm />

      </div>
    </div>
  );
};

export default AddItems;
