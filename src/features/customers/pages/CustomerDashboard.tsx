// frontend/src/features/customers/pages/CustomerDashboard.tsx
import React from "react";

export const CustomerDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Client Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Hire top freelancers and manage your ongoing project postings.
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm">
          Post a New Job
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-700">Open Jobs</h3>
          <p className="text-3xl font-extrabold text-blue-600 mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-700">Proposals Received</h3>
          <p className="text-3xl font-extrabold text-emerald-600 mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-700">Hired Freelancers</h3>
          <p className="text-3xl font-extrabold text-indigo-600 mt-2">0</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;