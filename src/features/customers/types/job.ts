export type JobType = "FIXED" | "HOURLY";
export type JobExperienceLevel = "ENTRY" | "INTERMEDIATE" | "EXPERT";
export type JobStatus =
  | "DRAFT"
  | "OPEN"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "CLOSED";

export interface JobCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
}

export interface JobSkill {
  id: number;
  skillId: number;
  skill: { id: number; name: string };
}

export interface ClientJob {
  id: number;
  categoryId: number;
  title: string;
  description: string;
  jobType: JobType;
  experienceLevel: JobExperienceLevel;
  budgetMin: number | string | null;
  budgetMax: number | string | null;
  estimatedDuration: string | null;
  deadline: string | null;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
  category: JobCategory;
  jobSkills: JobSkill[];
}

export interface CreateJobPayload {
  categoryId: number;
  title: string;
  description: string;
  jobType: JobType;
  experienceLevel: JobExperienceLevel;
  budgetMin: number | null;
  budgetMax: number | null;
  estimatedDuration: string | null;
  deadline: string | null;
  skillIds: number[];
  status: "OPEN" | "DRAFT";
}

export interface JobApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
