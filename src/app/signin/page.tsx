'use client';

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
  
      if (res?.error) {
        toast.error(res.error || "Something went wrong. Please try again.", {
          autoClose: 3000, // Duration for the error toast
        });
      } else {
        toast.success("Login successful!", {
          autoClose: 3000, // Duration for the success toast
        });
  
        // Delay navigation by 3 seconds to allow the toast to be visible
        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred.";
      toast.error(errorMessage, {
        autoClose: 3000, // Duration for the error toast
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <ToastContainer />
      <div className="bg-white bg-opacity-80 backdrop-blur-lg p-8 shadow-2xl rounded-lg w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Welcome Back
        </h1>
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-bold text-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-purple-300"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-700">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-blue-600 font-medium hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
