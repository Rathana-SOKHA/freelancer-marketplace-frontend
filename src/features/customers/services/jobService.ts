import api from "../../../plugins/axios";
import type {
  ClientJob,
  CreateJobPayload,
  JobApiResponse,
  JobCategory,
} from "../types/job";

export const jobService = {
  async getCategories(): Promise<JobCategory[]> {
    const response = await api.get<JobApiResponse<JobCategory[]>>(
      "/jobs/categories"
    );
    return response.data.data;
  },

  async createCategory(payload: {
    name: string;
    description: string | null;
  }): Promise<JobCategory> {
    const response = await api.post<JobApiResponse<JobCategory>>(
      "/jobs/categories",
      payload
    );
    return response.data.data;
  },

  async getMyJobs(): Promise<ClientJob[]> {
    const response = await api.get<JobApiResponse<ClientJob[]>>("/jobs/mine");
    return response.data.data;
  },

  async createJob(payload: CreateJobPayload): Promise<ClientJob> {
    const response = await api.post<JobApiResponse<ClientJob>>(
      "/jobs",
      payload
    );
    return response.data.data;
  },
};
