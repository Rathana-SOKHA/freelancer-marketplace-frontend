// frontend/src/features/customers/pages/CustomerDashboard.tsx
import React from "react";
import { Link } from "react-router";
import { ArrowUpRight, BriefcaseBusiness, FileText, UsersRound } from "lucide-react";

export const CustomerDashboard: React.FC = () => {
  const stats = [
    { label: "Open jobs", value: "0", icon: BriefcaseBusiness, highlight: true, note: "Current listings" },
    { label: "Proposals received", value: "0", icon: FileText, highlight: false, note: "To review" },
    { label: "Freelancers hired", value: "0", icon: UsersRound, highlight: false, note: "Your team" },
  ];

  return (
    <div className="space-y-6 text-black">
      <div className="flex flex-col justify-between gap-4 border-b-2 border-dashed border-black pb-5 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">Dashboard</h1>
          <p className="mt-2 inline-block bg-[#ffe96a] px-2 py-1 font-mono text-xs font-semibold uppercase">
            Client workspace
          </p>
        </div>
        <Link
          to="/customer/post-job"
          className="inline-flex items-center justify-center gap-2 border-2 border-black bg-black px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-[3px_3px_0_#ffe96a] transition hover:bg-[#ffe96a] hover:text-black"
        >
          + Post a job
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, highlight, note }) => (
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
                {note}
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
              <h2 className="font-black uppercase">Hiring overview</h2>
              <p className="mt-1 font-mono text-xs text-gray-500">Your project activity</p>
            </div>
            <span className="border border-black px-2 py-1 font-mono text-[10px] font-bold uppercase">
              Overview
            </span>
          </div>
          <div className="flex min-h-48 items-center justify-center text-center">
            <div>
              <p className="font-mono text-4xl font-black">0</p>
              <p className="mt-2 text-sm text-gray-500">
                Job and hiring activity will appear here.
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
            Post a job to find skilled freelancers for your next project.
          </p>
          <Link
            to="/customer/post-job"
            className="mt-5 inline-flex w-full items-center justify-center border-2 border-black bg-[#ffe96a] px-4 py-3 text-sm font-bold uppercase text-black transition hover:bg-black hover:text-white"
          >
            Create your first job
          </Link>
        </section>
      </div>
    </div>
  );
};

export default CustomerDashboard;
