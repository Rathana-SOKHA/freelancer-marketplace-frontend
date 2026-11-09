import type {
  ExperienceLevel,
  FreelancerAvailability,
} from "../../freelancers/types";

export interface FreelancerDirectoryEntry {
  id: number;
  title: string | null;
  overview: string | null;
  hourlyRate: string | number | null;
  experienceLevel: ExperienceLevel | null;
  location: string | null;
  portfolioUrl: string | null;
  availability: FreelancerAvailability;
  user: {
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  };
}

export interface FreelancerDirectoryResponse {
  success: boolean;
  message: string;
  data: FreelancerDirectoryEntry[];
}
