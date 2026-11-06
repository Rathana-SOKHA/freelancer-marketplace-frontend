// frontend/src/layouts/AppLayout.tsx
import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { authService } from "../features/auth/services/authService";

interface AppLayoutProps {
  role: "CLIENT" | "FREELANCER";
}

export const AppLayout: React.FC<AppLayoutProps> = ({ role }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
  const dashboardPath = isFreelancer
    ? "/freelancer/dashboard"
    : "/customer/dashboard";
  const profilePath = isFreelancer
    ? "/freelancer/profile"
    : "/customer/profile";
  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    `block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
      isActive
        ? "bg-blue-50 text-blue-700"
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    }`;

  return (
    <div className="min-h-screen bg-gray-50 md:flex">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-40 bg-gray-900/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform md:sticky md:top-0 md:h-screen md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b border-gray-100 px-6 py-6">
          <Link
            to={dashboardPath}
            className="text-xl font-black tracking-tight text-blue-600"
            onClick={() => setSidebarOpen(false)}
          >
            FreelanceHub
          </Link>
          <span
            className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase ${
              isFreelancer
                ? "bg-purple-100 text-purple-700"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {isFreelancer ? "Freelancer Mode" : "Client Mode"}
          </span>
        </div>

        <nav aria-label="Main navigation" className="flex-1 space-y-1 px-3 py-5">
          {isFreelancer ? (
            <>
              <NavLink
                to="/freelancer/dashboard"
                end
                className={linkClassName}
                onClick={() => setSidebarOpen(false)}
              >
                Browse Jobs
              </NavLink>
              <NavLink
                to="/freelancer/proposals"
                className={linkClassName}
                onClick={() => setSidebarOpen(false)}
              >
                My Proposals
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/customer/dashboard"
                end
                className={linkClassName}
                onClick={() => setSidebarOpen(false)}
              >
                Find Freelancers
              </NavLink>
              <NavLink
                to="/customer/jobs"
                className={linkClassName}
                onClick={() => setSidebarOpen(false)}
              >
                My Job Posts
              </NavLink>
              <NavLink
                to="/customer/post-job"
                className={linkClassName}
                onClick={() => setSidebarOpen(false)}
              >
                + Post a Job
              </NavLink>
            </>
          )}
          <NavLink
            to={profilePath}
            className={linkClassName}
            onClick={() => setSidebarOpen(false)}
          >
            My Profile
          </NavLink>
        </nav>

        <div className="border-t border-gray-100 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-700"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="p-4 sm:p-6 lg:p-8">
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={sidebarOpen}
            className="mb-4 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            Menu
          </button>
          <main className="mx-auto w-full max-w-7xl">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
