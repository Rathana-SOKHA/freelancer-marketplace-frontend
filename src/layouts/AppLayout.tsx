// frontend/src/layouts/AppLayout.tsx
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { authService } from "../features/auth/services/authService";

interface AppLayoutProps {
  role: "CLIENT" | "FREELANCER";
}

export const AppLayout: React.FC<AppLayoutProps> = ({ role }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      navigate("/login");
    }
  };

  const isFreelancer = role === "FREELANCER";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Role Badge */}
          <div className="flex items-center space-x-4">
            <Link to={isFreelancer ? "/freelancer/dashboard" : "/customer/dashboard"}>
              <span className="text-xl font-black text-blue-600 tracking-tight">
                FreelanceHub
              </span>
            </Link>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${
                isFreelancer
                  ? "bg-purple-100 text-purple-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {isFreelancer ? "Freelancer Mode" : "Client Mode"}
            </span>
          </div>

          {/* Role-Specific Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            {isFreelancer ? (
              <>
                <Link
                  to="/freelancer/dashboard"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                >
                  Browse Jobs
                </Link>
                <Link
                  to="/freelancer/proposals"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                >
                  My Proposals
                </Link>
                <Link
                  to="/freelancer/profile"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                >
                  My Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/customer/dashboard"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                >
                  Find Freelancers
                </Link>
                <Link
                  to="/customer/jobs"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                >
                  My Job Posts
                </Link>
                <Link
                  to="/customer/post-job"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  + Post a Job
                </Link>
              </>
            )}
          </nav>

          {/* User Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleLogout}
              className="text-sm px-3.5 py-1.5 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;