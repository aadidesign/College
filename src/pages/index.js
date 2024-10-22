import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // State for the role
  const [message, setMessage] = useState("");
  const router = useRouter(); // Next.js router to handle navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/auth", {
        email,
        password,
        action: "login",
      });
      setMessage(response.data.message);

      // Navigate based on the selected role
      if (role === "Student") {
        router.push("/studentdashboard");
      } else if (role === "Faculty") {
        router.push("/facultydashboard");
      } else {
        setMessage("Please select a role.");
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <>
      <Head>
        <title>Register - PCCOE Event Management</title>
        <meta name="description" content="Register to manage your events" />
      </Head>

      <main className="flex min-h-screen">
        <div className="flex-1 flex items-center justify-center p-10">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLR9BOqjh7PtxtZ_uxCL9AIMtGusfE7lc6cw&s"
            alt="PCCOE Logo"
            className="w-[350px] h-[350px] mb-10"
          />
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

            {/* Dropdown for Role Selection */}
            <div>
              <label
                htmlFor="role"
                className="block mb-2 text-lg font-semibold text-blue-800"
              >
                Select Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-600"
                required
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="Student">Student</option>
                <option value="Faculty">Faculty</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-4 rounded-md font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg"
            >
              Register
            </button>

            {message && (
              <p className="text-center text-red-500 mt-4">{message}</p>
            )}

            <p className="text-center">
              Already have an account?{" "}
              <Link href="/home" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </main>
    </>
  );
};

export default RegisterPage;
