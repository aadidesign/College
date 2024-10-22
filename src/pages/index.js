import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Head from "next/head";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/auth", { email, password, action: "login" });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <>
      <Head>
        <title>Register - PCCOE Event Management</title>
        <meta name="description" content="Register to manage your events" />
        {/* <script src="https://cdn.tailwindcss.com"></script> */}
      </Head>

      <main className="flex min-h-screen">
        <div className="flex-1 bg-blue-600 flex items-center justify-center p-10">
          {/* Update the logo path accordingly */}
          <img src="/src/app/images/logo.png" alt="PCCOE Logo" className="w-48 h-48 mb-10" />
        </div>

        <div className="flex-1 flex items-center justify-center bg-white p-10">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md space-y-8 bg-gray-100 p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-3xl font-bold text-center text-blue-900">
              Register
            </h2>

            <div>
              <label htmlFor="email" className="block mb-2 text-lg font-semibold text-blue-800">
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
              <label htmlFor="password" className="block mb-2 text-lg font-semibold text-blue-800">
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

            <Link href="/home">
            <button
              type="submit"
              href="/home"
              className="w-full bg-blue-900 text-white py-4 rounded-md font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg"
            >
              Register
            </button>
            </Link>

            {message && <p className="text-center text-red-500 mt-4">{message}</p>}

            <p className="text-center">
              Already have an account?{" "}
              <Link href="/home" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
            <p className="text-center">
              {/* Already have an account?{" "} */}
              <Link href="/studentdashboard" className="text-blue-600 hover:underline">
                Student
              </Link>
            </p>
          </form>
        </div>
      </main>
    </>
  );
};

export default RegisterPage;
