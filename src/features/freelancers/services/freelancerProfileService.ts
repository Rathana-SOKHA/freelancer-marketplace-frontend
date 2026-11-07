import api from "../../../plugins/axios";
import type {
  FreelancerProfile,
  FreelancerProfilePayload,
  FreelancerProfileResponse,
} from "../types";

export const freelancerProfileService = {
  async getProfile(): Promise<FreelancerProfile> {
    const response = await api.get<FreelancerProfileResponse>(
      "/freelancer-profile"
    );
    return response.data.data;
  },

  async createProfile(
    payload: FreelancerProfilePayload
  ): Promise<FreelancerProfile> {
    const response = await api.post<FreelancerProfileResponse>(
      "/freelancer-profile",
      payload
    );
    return response.data.data;
  },

  async updateProfile(
    payload: FreelancerProfilePayload
  ): Promise<FreelancerProfile> {
    const response = await api.put<FreelancerProfileResponse>(
      "/freelancer-profile",
      payload
    );
    return response.data.data;
  },
};


