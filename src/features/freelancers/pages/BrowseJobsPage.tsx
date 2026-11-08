import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { openJobsService } from "../services/openJobsService";
import type { BrowseJob } from "../types";

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message || "Unable to load open jobs.";
  }
  return error instanceof Error
    ? error.message
    : "Something went wrong. Please try again.";
}

function formatBudget(job: BrowseJob) {
  const minimum = job.budgetMin === null ? null : Number(job.budgetMin);
  const maximum = job.budgetMax === null ? null : Number(job.budgetMax);
  const unit = job.jobType === "HOURLY" ? "/ hour" : "";
  if (minimum === null && maximum === null) return "Budget not specified";
  if (minimum !== null && maximum !== null) {
    return `$${minimum.toLocaleString()} – $${maximum.toLocaleString()}${unit}`;
  }
  return minimum !== null
    ? `From $${minimum.toLocaleString()}${unit}`
    : `Up to $${maximum!.toLocaleString()}${unit}`;
}

function BrowseJobsPage() {
  const [jobs, setJobs] = useState<BrowseJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadJobs() {
      try {
        const openJobs = await openJobsService.getOpenJobs();
        if (isMounted) setJobs(openJobs);
      } catch (error) {
        console.error("Open jobs load error", error);
        if (isMounted) setErrorMessage(getErrorMessage(error));
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    void loadJobs();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="mx-auto max-w-5xl space-y-6 text-black">
      <header className="flex flex-col justify-between gap-4 border-b-2 border-dashed border-black pb-5 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">Browse Jobs</h1>
          <p className="mt-2 inline-block bg-[#ffe96a] px-2 py-1 font-mono text-xs font-semibold uppercase">
            Find your next opportunity
          </p>
        </div>
        <p className="text-sm font-medium text-gray-600">
          Showing jobs posted by clients.
        </p>
      </header>

      {errorMessage && (
        <div
          role="alert"
          className="border-2 border-red-700 bg-red-50 p-4 text-sm font-medium text-red-800"
        >
          {errorMessage}
        </div>
      )}

      {loading && (
        <div className="border-2 border-black bg-white p-6 font-mono text-sm font-bold uppercase shadow-[4px_4px_0_#111]">
          Finding open jobs...
        </div>
      )}

      {!loading && !errorMessage && jobs.length === 0 && (
        <div className="border-2 border-black bg-white p-8 text-center shadow-[4px_4px_0_#111]">
          <h2 className="text-lg font-black uppercase">No open jobs right now</h2>
          <p className="mt-2 text-sm text-gray-600">
            New client job posts will show up here when they are published.
          </p>
        </div>
      )}

      {!loading && jobs.length > 0 && (
        <div className="space-y-4">
          {jobs.map((job) => (
            <article
              key={job.id}
              className="border-2 border-black bg-white p-5 shadow-[4px_4px_0_#111] sm:p-6"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div className="min-w-0">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    {job.category.name} · {job.jobType.toLowerCase()}
                  </p>
                  <h2 className="mt-1 break-words text-xl font-black">{job.title}</h2>
                  <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-700">
                    {job.description}
                  </p>
                </div>
                <span className="w-fit shrink-0 border border-black bg-[#ffe96a] px-2 py-1 font-mono text-[10px] font-bold uppercase">
                  {job.experienceLevel.toLowerCase()} level
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-gray-200 pt-4 text-xs font-semibold uppercase text-gray-600">
                <span>{formatBudget(job)}</span>
                {job.estimatedDuration && <span>{job.estimatedDuration}</span>}
                {job.deadline && (
                  <span>Deadline {new Date(job.deadline).toLocaleDateString()}</span>
                )}
                <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
              </div>

              {(job.clientProfile.companyName || job.clientProfile.location) && (
                <p className="mt-3 text-xs font-medium text-gray-600">
                  {job.clientProfile.companyName || "Client"}
                  {job.clientProfile.location && ` · ${job.clientProfile.location}`}
                </p>
              )}

              {job.jobSkills.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.jobSkills.map(({ skill }) => (
                    <span
                      key={skill.id}
                      className="border border-black px-2 py-1 font-mono text-[10px] font-bold uppercase"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}

      <Link
        to="/freelancer/dashboard"
        className="inline-block text-xs font-bold uppercase underline underline-offset-4"
      >
        Back to dashboard
      </Link>
    </section>
  );
}

export default BrowseJobsPage;
