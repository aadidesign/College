import React from 'react';
import Link from 'next/link';

const Register = () => {
  return (
    <div className="flex h-screen">
      {/* Left Side - Image Section */}
      <div className="w-1/2 h-full relative">
        <img
          src="/Images/your-image-name.jpg" // Use your actual image path here
          alt="Student Learning"
          className="h-full w-full object-cover"
        />

        {/* Pimpri Chinchwad Logo and Name on Top Left */}
        <div className="absolute top-4 left-4 flex items-center space-x-3">
          <img
            src="/images/logo.png" // Replace with the actual path to your logo
            alt="Logo"
            className="w-10 h-10"
          />
          <h1 className="text-white text-2xl font-bold">
            Pimpri Chinchwad College of Engineering Pune
          </h1>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-1/2 flex items-center justify-center p-10 bg-white">
        <div className="max-w-md w-full space-y-10">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              STUDENT REGISTRATION
            </h2>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-8">
            <div className="space-y-6">
              <div className="flex gap-6">
                <div>
                  <label htmlFor="first-name" className="sr-only">
                    First Name
                  </label>
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    required
                    className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="sr-only">
                    Last Name
                  </label>
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    required
                    className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Username"
                />
              </div>

              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Phone Number"
                />
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Email ID"
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>

              <div>
                <label htmlFor="confirm-password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Account
              </button>
            </div>
            <div className="text-center mt-6">
              <p>
                Already have an account?{' '}
                <Link href="/login" className="text-indigo-600 hover:text-indigo-500">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>

          {/* Google Sign-up Option */}
          <div className="mt-8 text-center">
            <p className="text-gray-500">or sign up with</p>
            <button className="mt-4 bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100">
              <img
                src="/app/images/google-logo-history-png-2598.png" // Use your Google icon image path
                alt="Google Sign-In"
                className="inline-block w-5 mr-2"
              />
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
