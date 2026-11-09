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
    `block border-2 px-3 py-2.5 text-sm font-bold uppercase tracking-wide transition ${
      isActive
        ? "border-black bg-black text-white"
        : "border-transparent text-gray-800 hover:border-black hover:bg-white"
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
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r-2 border-black bg-[#f7f7f4] transition-transform md:sticky md:top-0 md:h-screen md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b-2 border-black bg-[#ffe96a] px-5 py-6">
          <Link
            to={dashboardPath}
            className="text-xl font-black tracking-tight text-black"
            onClick={() => setSidebarOpen(false)}
          >
            ◈ FreelanceHub
          </Link>
          <span
            className={`mt-3 inline-flex border border-black bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
              isFreelancer
                ? "text-black"
                : "text-black"
            }`}
          >
            {isFreelancer ? "Freelancer Mode" : "Client Mode"}
          </span>
        </div>

        <nav aria-label="Main navigation" className="flex-1 space-y-2 px-3 py-5">
          {isFreelancer ? (
            <>
              <NavLink
                to={dashboardPath}
                end
                className={linkClassName}
                onClick={() => setSidebarOpen(false)}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/freelancer/jobs"
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
                to={dashboardPath}
                end
                className={linkClassName}
                onClick={() => setSidebarOpen(false)}
              >
                Dashboard
              </NavLink>
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

        <div className="border-t-2 border-black p-3">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full border-2 border-black bg-white px-3 py-2.5 text-left text-sm font-bold uppercase tracking-wide text-black transition hover:bg-[#ffe96a]"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="min-h-screen bg-[#f7f8fb]">
          <header className="flex h-[68px] items-center justify-between border-b-2 border-black bg-white px-5 sm:px-8">
            <span className="text-sm font-black uppercase tracking-wide text-black">
              Workspace
            </span>
            <span className="hidden text-xs font-semibold uppercase tracking-widest text-gray-500 sm:block">
              {isFreelancer ? "Freelancer" : "Client"} portal
            </span>
          </header>
          <div className="p-4 sm:p-6 lg:p-8">
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={sidebarOpen}
            className="mb-4 border-2 border-black bg-white px-3 py-2 text-sm font-bold uppercase text-black shadow-[3px_3px_0_#111] md:hidden"
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
    </div>
  );
};

export default AppLayout;
