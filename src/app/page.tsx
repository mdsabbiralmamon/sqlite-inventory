"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LandingPage = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      toast.success("Redirecting to Dashboard...", { autoClose: 2000 });
      setTimeout(() => router.push("/dashboard"), 2000);
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700">
        <p className="text-white text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 flex items-center justify-center">
      <div className="text-center p-10 bg-white/80 rounded-lg shadow-lg backdrop-blur-md max-w-lg mx-auto transform hover:scale-105 transition duration-300">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900">
          <span className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Welcome to SQLite Inv
          </span>
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Sign in to manage your inventory efficiently. Keep track of your
          products, suppliers, and orders seamlessly.
        </p>
        <Link href="/signin">
          <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transform hover:-translate-y-1 transition duration-300">
            Sign In to Manage Inventory
          </button>
        </Link>
        <p className="mt-6 text-sm text-gray-700">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="text-blue-500 hover:underline hover:text-blue-600 transition duration-200"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
