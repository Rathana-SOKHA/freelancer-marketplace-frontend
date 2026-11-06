// frontend/src/features/freelancers/pages/FreelancerDashboard.tsx
import React from "react";
import { ArrowUpRight, BriefcaseBusiness, CircleDollarSign, FileText } from "lucide-react";

export const FreelancerDashboard: React.FC = () => {
  const stats = [
    { label: "Active proposals", value: "0", icon: FileText, highlight: true, change: "Ready to grow" },
    { label: "Active contracts", value: "0", icon: BriefcaseBusiness, highlight: false, change: "On track" },
    { label: "Total earnings", value: "$0.00", icon: CircleDollarSign, highlight: false, change: "This month" },
  ];

  return (
    <div className="space-y-6 text-black">
      <div className="flex flex-col justify-between gap-4 border-b-2 border-dashed border-black pb-5 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">Dashboard</h1>
          <p className="mt-2 inline-block bg-[#ffe96a] px-2 py-1 font-mono text-xs font-semibold uppercase">
            Freelancer workspace
          </p>
        </div>
        <p className="text-sm font-medium text-gray-600">
          Find clients, submit proposals, and manage your projects.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, highlight, change }) => (
          <article
            key={label}
            className={`relative min-h-36 border-2 border-black p-5 shadow-[4px_4px_0_#111] ${
              highlight ? "bg-[#ffe96a]" : "bg-white"
            }`}
          >
            <div className="flex items-start justify-between">
              <span className="flex size-10 items-center justify-center border-2 border-black bg-black text-white">
                <Icon size={20} aria-hidden="true" />
              </span>
              <span className="inline-flex items-center gap-1 border border-black bg-white px-2 py-1 font-mono text-[10px] font-bold uppercase">
                <ArrowUpRight size={12} aria-hidden="true" />
                {change}
              </span>
            </div>
            <p className="mt-5 text-xs font-bold uppercase tracking-wider underline decoration-1 underline-offset-4">
              {label}
            </p>
            <p className="mt-2 font-mono text-3xl font-black">{value}</p>
          </article>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(260px,0.8fr)]">
        <section className="min-h-72 border-2 border-black bg-white p-5 shadow-[4px_4px_0_#111]">
          <div className="flex items-center justify-between border-b-2 border-black pb-4">
            <div>
              <h2 className="font-black uppercase">Proposal activity</h2>
              <p className="mt-1 font-mono text-xs text-gray-500">Your recent work</p>
            </div>
            <span className="border border-black px-2 py-1 font-mono text-[10px] font-bold uppercase">
              Overview
            </span>
          </div>
          <div className="flex min-h-48 items-center justify-center text-center">
            <div>
              <p className="font-mono text-4xl font-black">0</p>
              <p className="mt-2 text-sm text-gray-500">
                Your proposal activity will appear here.
              </p>
            </div>
          </div>
        </section>
        <section className="min-h-72 border-2 border-black bg-white p-5 shadow-[4px_4px_0_#111]">
          <div className="flex items-center justify-between border-b-2 border-black pb-4">
            <h2 className="font-black uppercase">Get started</h2>
            <span className="bg-[#ffe96a] px-2 py-1 font-mono text-[10px] font-bold uppercase">
              Next steps
            </span>
          </div>
          <p className="mt-5 text-sm leading-6 text-gray-600">
            Browse open jobs and send a proposal to start building your project history.
          </p>
          <div className="mt-5 border-2 border-dashed border-gray-300 p-4 font-mono text-xs uppercase text-gray-500">
            Your next opportunity starts with a proposal.
          </div>
        </section>
      </div>
    </div>
  );
};

export default FreelancerDashboard;