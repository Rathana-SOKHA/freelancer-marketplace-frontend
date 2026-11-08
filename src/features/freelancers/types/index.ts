export type ExperienceLevel = "ENTRY" | "INTERMEDIATE" | "EXPERT";
export type FreelancerAvailability = "AVAILABLE" | "BUSY" | "UNAVAILABLE";

export interface FreelancerProfile {
  id: number;
  userId: number;
  title: string | null;
  overview: string | null;
  hourlyRate: string | number | null;
  experienceLevel: ExperienceLevel | null;
  location: string | null;
  portfolioUrl: string | null;
  availability: FreelancerAvailability;
  createdAt: string;
  updatedAt: string;
}

export interface FreelancerProfilePayload {
  title: string | null;
  overview: string | null;
  hourlyRate: number | null;
  experienceLevel: ExperienceLevel | null;
  location: string | null;
  portfolioUrl: string | null;
  availability: FreelancerAvailability;
}

export interface FreelancerProfileResponse {
  success: boolean;
  message: string;
  data: FreelancerProfile;
}

export interface BrowseJob {
  id: number;
  title: string;
  description: string;
  jobType: "FIXED" | "HOURLY";
  experienceLevel: ExperienceLevel;
  budgetMin: number | string | null;
  budgetMax: number | string | null;
  estimatedDuration: string | null;
  deadline: string | null;
  createdAt: string;
  category: {
    id: number;
    name: string;
  };
  jobSkills: Array<{
    id: number;
    skill: { id: number; name: string };
  }>;
  clientProfile: {
    companyName: string | null;
    location: string | null;
  };
}
