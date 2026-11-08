import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router";
import { jobService } from "../services/jobService";
import type { ClientJob } from "../types/job";

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message || "Unable to load your job posts.";
  }
  return error instanceof Error
    ? error.message
    : "Something went wrong. Please try again.";
}

function formatBudget(job: ClientJob) {
  const minimum = job.budgetMin === null ? null : Number(job.budgetMin);
  const maximum = job.budgetMax === null ? null : Number(job.budgetMax);
  if (minimum === null && maximum === null) return "Budget not set";
  if (minimum !== null && maximum !== null) return `$${minimum} – $${maximum}`;
  return minimum !== null ? `From $${minimum}` : `Up to $${maximum}`;
}

function CustomerJobsPage() {
  const location = useLocation();
  const [jobs, setJobs] = useState<ClientJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const successMessage = (location.state as { successMessage?: string } | null)
    ?.successMessage;

  useEffect(() => {
    let isMounted = true;

    async function loadJobs() {
      try {
        const clientJobs = await jobService.getMyJobs();
        if (isMounted) setJobs(clientJobs);
      } catch (error) {
        console.error("Client jobs load error", error);
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
          <h1 className="text-3xl font-black uppercase tracking-tight">My Job Posts</h1>
          <p className="mt-2 inline-block bg-[#ffe96a] px-2 py-1 font-mono text-xs font-semibold uppercase">
            Your hiring activity
          </p>
        </div>
        <Link
          to="/customer/post-job"
          className="inline-flex items-center justify-center border-2 border-black bg-black px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-[3px_3px_0_#ffe96a] transition hover:bg-[#ffe96a] hover:text-black"
        >
          + Post a job
        </Link>
      </header>

      {successMessage && (
        <div
          role="status"
          className="border-2 border-green-700 bg-green-50 p-3 text-sm font-medium text-green-800"
        >
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div
          role="alert"
          className="border-2 border-red-700 bg-red-50 p-3 text-sm font-medium text-red-800"
        >
          {errorMessage}
        </div>
      )}
      {loading && (
        <div className="border-2 border-black bg-white p-6 font-mono text-sm font-bold uppercase shadow-[4px_4px_0_#111]">
          Loading your job posts...
        </div>
      )}
      {!loading && !errorMessage && jobs.length === 0 && (
        <div className="border-2 border-black bg-white p-8 text-center shadow-[4px_4px_0_#111]">
          <h2 className="text-lg font-black uppercase">No job posts yet</h2>
          <p className="mt-2 text-sm text-gray-600">
            Post your first job to start finding freelancers.
          </p>
          <Link
            to="/customer/post-job"
            className="mt-5 inline-flex border-2 border-black bg-[#ffe96a] px-4 py-3 text-sm font-bold uppercase text-black transition hover:bg-black hover:text-white"
          >
            Create your first job
          </Link>
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
                  <p className="mt-2 line-clamp-3 whitespace-pre-line text-sm leading-6 text-gray-700">
                    {job.description}
                  </p>
                </div>
                <span className="w-fit shrink-0 border border-black bg-[#ffe96a] px-2 py-1 font-mono text-[10px] font-bold uppercase">
                  {job.status.replaceAll("_", " ")}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-gray-200 pt-4 text-xs font-semibold uppercase text-gray-600">
                <span>{formatBudget(job)}</span>
                <span>{job.experienceLevel.toLowerCase()} level</span>
                {job.estimatedDuration && <span>{job.estimatedDuration}</span>}
                <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
              </div>
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
    </section>
  );
}

export default CustomerJobsPage;
