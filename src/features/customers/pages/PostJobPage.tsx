import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { jobService } from "../services/jobService";
import type {
  CreateJobPayload,
  JobCategory,
  JobExperienceLevel,
  JobType,
} from "../types/job";

interface JobForm {
  categoryId: string;
  title: string;
  description: string;
  jobType: JobType;
  experienceLevel: JobExperienceLevel;
  budgetMin: string;
  budgetMax: string;
  estimatedDuration: string;
  deadline: string;
}

const initialForm: JobForm = {
  categoryId: "",
  title: "",
  description: "",
  jobType: "FIXED",
  experienceLevel: "INTERMEDIATE",
  budgetMin: "",
  budgetMax: "",
  estimatedDuration: "",
  deadline: "",
};

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message || "Unable to complete your request.";
  }
  return error instanceof Error
    ? error.message
    : "Something went wrong. Please try again.";
}

function PostJobPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [categories, setCategories] = useState<JobCategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadCategories() {
      try {
        const availableCategories = await jobService.getCategories();
        if (isMounted) {
          setCategories(availableCategories);
          setForm((current) => ({
            ...current,
            categoryId: current.categoryId || String(availableCategories[0]?.id ?? ""),
          }));
        }
      } catch (error) {
        console.error("Job categories load error", error);
        if (isMounted) setErrorMessage(getErrorMessage(error));
      } finally {
        if (isMounted) setLoadingCategories(false);
      }
    }

    void loadCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrorMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setErrorMessage("");

    const submitter = (event.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement | null;
    const status = submitter?.value === "DRAFT" ? "DRAFT" : "OPEN";
    const payload: CreateJobPayload = {
      categoryId: Number(form.categoryId),
      title: form.title.trim(),
      description: form.description.trim(),
      jobType: form.jobType,
      experienceLevel: form.experienceLevel,
      budgetMin: form.budgetMin === "" ? null : Number(form.budgetMin),
      budgetMax: form.budgetMax === "" ? null : Number(form.budgetMax),
      estimatedDuration: form.estimatedDuration.trim() || null,
      deadline: form.deadline
        ? new Date(`${form.deadline}T00:00:00`).toISOString()
        : null,
      skillIds: [],
      status,
    };

    try {
      await jobService.createJob(payload);
      navigate("/customer/jobs", {
        state: { successMessage: status === "DRAFT" ? "Draft saved." : "Your job has been posted." },
      });
    } catch (error) {
      console.error("Job post error", error);
      setErrorMessage(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  const inputClassName =
    "mt-2 block w-full border-2 border-black bg-white px-3 py-3 text-sm outline-none focus:bg-[#fff9cf]";
  const labelClassName = "block text-xs font-bold uppercase tracking-wider";

  return (
    <section className="mx-auto max-w-4xl space-y-6 text-black">
      <header className="flex flex-col justify-between gap-4 border-b-2 border-dashed border-black pb-5 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">Post a Job</h1>
          <p className="mt-2 inline-block bg-[#ffe96a] px-2 py-1 font-mono text-xs font-semibold uppercase">
            Find the right freelancer
          </p>
        </div>
        <Link
          to="/customer/jobs"
          className="text-sm font-bold uppercase underline underline-offset-4"
        >
          View my job posts
        </Link>
      </header>

      {errorMessage && (
        <div
          role="alert"
          className="border-2 border-red-700 bg-red-50 p-3 text-sm font-medium text-red-800"
        >
          {errorMessage}
        </div>
      )}

      {!loadingCategories && categories.length === 0 && !errorMessage && (
        <div
          role="alert"
          className="border-2 border-amber-700 bg-amber-50 p-4 text-sm text-amber-900"
        >
          No active job categories are available yet. Please try again later.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5 border-2 border-black bg-white p-5 shadow-[4px_4px_0_#111] sm:p-6"
      >
        <div>
          <label htmlFor="job-title" className={labelClassName}>Job title</label>
          <input
            id="job-title"
            name="title"
            value={form.title}
            onChange={handleChange}
            maxLength={200}
            required
            placeholder="e.g. Build a responsive company website"
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="job-description" className={labelClassName}>Description</label>
          <textarea
            id="job-description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={6}
            required
            placeholder="Describe the work, deliverables, and any important requirements."
            className={inputClassName}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="job-category" className={labelClassName}>Category</label>
            <select
              id="job-category"
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              required
              disabled={loadingCategories || categories.length === 0}
              className={inputClassName}
            >
              {loadingCategories && <option value="">Loading categories...</option>}
              {!loadingCategories && categories.length === 0 && (
                <option value="">No categories available</option>
              )}
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="job-type" className={labelClassName}>Payment type</label>
            <select
              id="job-type"
              name="jobType"
              value={form.jobType}
              onChange={handleChange}
              className={inputClassName}
            >
              <option value="FIXED">Fixed price</option>
              <option value="HOURLY">Hourly</option>
            </select>
          </div>

          <div>
            <label htmlFor="job-experience" className={labelClassName}>Experience level</label>
            <select
              id="job-experience"
              name="experienceLevel"
              value={form.experienceLevel}
              onChange={handleChange}
              className={inputClassName}
            >
              <option value="ENTRY">Entry</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="EXPERT">Expert</option>
            </select>
          </div>

          <div>
            <label htmlFor="job-duration" className={labelClassName}>Estimated duration</label>
            <input
              id="job-duration"
              name="estimatedDuration"
              value={form.estimatedDuration}
              onChange={handleChange}
              maxLength={100}
              placeholder="e.g. 3 weeks"
              className={inputClassName}
            />
          </div>

          <div>
            <label htmlFor="job-budget-min" className={labelClassName}>Minimum budget</label>
            <input
              id="job-budget-min"
              name="budgetMin"
              type="number"
              min="0"
              max="99999999.99"
              step="0.01"
              value={form.budgetMin}
              onChange={handleChange}
              placeholder="500"
              className={inputClassName}
            />
          </div>

          <div>
            <label htmlFor="job-budget-max" className={labelClassName}>Maximum budget</label>
            <input
              id="job-budget-max"
              name="budgetMax"
              type="number"
              min="0"
              max="99999999.99"
              step="0.01"
              value={form.budgetMax}
              onChange={handleChange}
              placeholder="1200"
              className={inputClassName}
            />
          </div>

          <div>
            <label htmlFor="job-deadline" className={labelClassName}>Deadline</label>
            <input
              id="job-deadline"
              name="deadline"
              type="date"
              value={form.deadline}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 border-t-2 border-black pt-5">
          <button
            type="submit"
            value="OPEN"
            disabled={saving || loadingCategories || categories.length === 0}
            className="border-2 border-black bg-black px-5 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-[3px_3px_0_#ffe96a] transition hover:bg-[#ffe96a] hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Publish job"}
          </button>
          <button
            type="submit"
            value="DRAFT"
            disabled={saving || loadingCategories || categories.length === 0}
            className="border-2 border-black bg-white px-5 py-3 text-sm font-bold uppercase tracking-wider text-black transition hover:bg-[#ffe96a] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Save draft
          </button>
        </div>
      </form>
    </section>
  );
}

export default PostJobPage;
