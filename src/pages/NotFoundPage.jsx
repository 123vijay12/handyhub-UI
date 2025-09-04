import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
      <div className="text-center p-8 bg-white shadow-lg rounded-2xl max-w-lg mx-auto">
        {/* Big 404 number */}
        <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-4 text-3xl font-semibold text-gray-800">
          Oops! Page Not Found
        </h2>

        {/* Message */}
        <p className="mt-2 text-gray-600">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Action button */}
        <div className="mt-6">
          <Link
            to="/login"
            className="px-6 py-3 text-white font-semibold rounded-lg shadow-md bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 transition-all duration-200 ease-in-out"
          >
            Go Back Home
          </Link>
        </div>

        {/* Decorative image */}
        <div className="mt-8">
  <img
  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
  alt="Page Not Found Illustration"
  className="max-w-xs mx-auto"
/>

        </div>
      </div>
    </div>
  );
}
