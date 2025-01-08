"use client";

import Link from "next/link";
import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 text-white flex items-center justify-center">
      <div className="text-center p-10 bg-white bg-opacity-40 rounded-lg shadow-lg backdrop-blur-lg max-w-lg mx-auto">
        <h1 className="text-4xl font-extrabold mb-6">
          Welcome to SQLite Inv
        </h1>
        <p className="text-lg mb-6">
          Sign in to manage your inventory efficiently and seamlessly. Keep
          track of your products, suppliers, and orders all in one place.
        </p>
        <Link href="/signin">
          <button className="py-2 px-6 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-200">
            Sign In to Manage Inventory
          </button>
        </Link>
        <p className="mt-6 text-sm text-gray-200">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-blue-300 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
