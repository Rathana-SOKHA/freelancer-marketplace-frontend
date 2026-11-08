import api from "../../../plugins/axios";
import type { BrowseJob } from "../types";

interface OpenJobsResponse {
  success: boolean;
  message: string;
  data: BrowseJob[];
}

export const openJobsService = {
  async getOpenJobs(): Promise<BrowseJob[]> {
    const response = await api.get<OpenJobsResponse>("/jobs/browse");
    return response.data.data;
  },
};
