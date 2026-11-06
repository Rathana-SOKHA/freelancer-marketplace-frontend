// frontend/src/features/freelancers/pages/FreelancerDashboard.tsx
import React from "react";

export const FreelancerDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Freelancer Workspace</h1>
        <p className="text-gray-500 mt-1">
          Find clients, submit proposals, and manage your projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-700">Active Proposals</h3>
          <p className="text-3xl font-extrabold text-blue-600 mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-700">Active Contracts</h3>
          <p className="text-3xl font-extrabold text-purple-600 mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-700">Earnings</h3>
          <p className="text-3xl font-extrabold text-emerald-600 mt-2">$0.00</p>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;