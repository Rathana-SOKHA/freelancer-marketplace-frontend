import api from "../../../plugins/axios";
import type {
  FreelancerDirectoryEntry,
  FreelancerDirectoryResponse,
} from "../types/freelancer";

export const freelancerDirectoryService = {
  async getFreelancers(): Promise<FreelancerDirectoryEntry[]> {
    const response = await api.get<FreelancerDirectoryResponse>("/freelancers");
    return response.data.data;
  },
};
