// frontend/src/layouts/AuthLayout.tsx
import React from "react";
import { Link, Outlet } from "react-router-dom";


export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        {/* Clickable Logo linking to login/home */}
        <Link to="/login" className="flex flex-col items-center">
          {/* <img
            src={logo}
            alt="Freelancer Marketplace Logo"
            className="h-28 sm:h-32 w-auto object-contain mb-3 drop-shadow-sm transition-transform hover:scale-105"
          /> */}
        </Link>
        <h2 className="mt-1 text-center text-3xl font-extrabold text-gray-900">
          Freelancer Marketplace
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
