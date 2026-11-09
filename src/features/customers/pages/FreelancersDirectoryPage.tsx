import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { freelancerDirectoryService } from "../services/freelancerDirectoryService";
import type { FreelancerDirectoryEntry } from "../types/freelancer";

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message || "Unable to load freelancers.";
  }
  return error instanceof Error ? error.message : "Unable to load freelancers.";
}

function formatExperience(level: FreelancerDirectoryEntry["experienceLevel"]) {
  if (!level) return "Experience not specified";
  return `${level.charAt(0)}${level.slice(1).toLowerCase()} level`;
}

export const FreelancersDirectoryPage: React.FC = () => {
  const [freelancers, setFreelancers] = useState<FreelancerDirectoryEntry[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadFreelancers() {
      try {
        const results = await freelancerDirectoryService.getFreelancers();
        if (isMounted) setFreelancers(results);
      } catch (loadError) {
        console.error("Freelancer directory load error", loadError);
        if (isMounted) setError(getErrorMessage(loadError));
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void loadFreelancers();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredFreelancers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return freelancers;

    return freelancers.filter((freelancer) =>
      [
        freelancer.user.firstName,
        freelancer.user.lastName,
        freelancer.title,
        freelancer.overview,
        freelancer.location,
        freelancer.experienceLevel,
      ]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(query))
    );
  }, [freelancers, search]);

  return (
    <div className="space-y-6 text-black">
      <header className="flex flex-col justify-between gap-4 border-b-2 border-dashed border-black pb-5 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">
            Find Freelancers
          </h1>
          <p className="mt-2 inline-block bg-[#ffe96a] px-2 py-1 font-mono text-xs font-semibold uppercase">
            Discover talent for your next project
          </p>
        </div>
        <label className="w-full sm:max-w-sm">
          <span className="mb-1 block text-xs font-bold uppercase tracking-wide">
            Search freelancers
          </span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Name, skill, or location"
            className="w-full border-2 border-black bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#ffe96a]"
          />
        </label>
      </header>

      {error ? (
        <p role="alert" className="border-2 border-red-800 bg-red-50 p-4 text-sm font-medium text-red-800">
          {error}
        </p>
      ) : isLoading ? (
        <p className="border-2 border-black bg-white p-5 font-mono text-sm font-bold uppercase">
          Loading freelancers...
        </p>
      ) : filteredFreelancers.length === 0 ? (
        <section className="border-2 border-black bg-white p-8 text-center shadow-[4px_4px_0_#111]">
          <h2 className="text-lg font-black uppercase">
            {freelancers.length === 0
              ? "No freelancer profiles yet"
              : "No matching freelancers"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {freelancers.length === 0
              ? "Freelancers will appear here after they create a profile."
              : "Try a different name, skill, or location."}
          </p>
        </section>
      ) : (
        <>
          <p className="font-mono text-xs font-bold uppercase tracking-wide text-gray-600">
            {filteredFreelancers.length}{" "}
            {filteredFreelancers.length === 1 ? "freelancer" : "freelancers"}
          </p>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredFreelancers.map((freelancer) => {
              const name =
                `${freelancer.user.firstName} ${freelancer.user.lastName}`.trim();

              return (
                <article
                  key={freelancer.id}
                  className="flex min-h-64 flex-col border-2 border-black bg-white p-5 shadow-[4px_4px_0_#111]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-black">{name}</h2>
                      <p className="mt-1 text-sm font-semibold text-gray-600">
                        {freelancer.title || "Freelancer"}
                      </p>
                    </div>
                    <span className="shrink-0 border border-black bg-[#ffe96a] px-2 py-1 font-mono text-[10px] font-bold uppercase">
                      {freelancer.availability.toLowerCase()}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 font-mono text-[10px] font-bold uppercase">
                    <span className="border border-black px-2 py-1">
                      {formatExperience(freelancer.experienceLevel)}
                    </span>
                    {freelancer.location && (
                      <span className="border border-black px-2 py-1">
                        {freelancer.location}
                      </span>
                    )}
                  </div>
                  <p className="mt-4 line-clamp-4 flex-1 text-sm leading-6 text-gray-700">
                    {freelancer.overview || "This freelancer has not added an overview yet."}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-gray-300 pt-3">
                    <span className="font-mono text-sm font-black">
                      {freelancer.hourlyRate == null
                        ? "Rate not set"
                        : `$${Number(freelancer.hourlyRate).toFixed(2)}/hr`}
                    </span>
                    {freelancer.portfolioUrl && (
                      <a
                        href={freelancer.portfolioUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold uppercase underline underline-offset-4 hover:bg-[#ffe96a]"
                      >
                        Portfolio
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default FreelancersDirectoryPage;
