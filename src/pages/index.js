"use client";

import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";

const PCCOE_LOGO_URL = "/src/app/images/logo.png"; // Update the logo path

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <>
      <Head>
        <title>Login - PCCOE Event Management</title>
        <meta
          name="description"
          content="Login to PCCOE Event Management to manage your events."
        />
      </Head>

      <main className="flex min-h-screen">
        <div className="flex-1 bg-blue-600 flex items-center justify-center p-10">
          <img
            src={PCCOE_LOGO_URL}
            alt="PCCOE Logo"
            className="w-48 h-48 mb-10 animate-fade-in"
          />
        </div>

        <div className="flex-1 flex items-center justify-center bg-white p-10">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md space-y-8 bg-gray-100 p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-3xl font-bold text-center text-blue-900">
              Login
            </h2>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-lg font-semibold text-blue-800"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-lg font-semibold text-blue-800"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-4 rounded-md font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg"
            >
              Login
            </button>
            <p className="text-center">
              Don’t have an account?{" "}
              <Link href="/register" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </main>
    </>
  );
}
