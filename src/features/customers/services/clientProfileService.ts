import api from "../../../plugins/axios";
import type {
  ClientProfile,
  ClientProfilePayload,
  ClientProfileResponse,
} from "../types/clientProfile";

export const clientProfileService = {
  async getProfile(): Promise<ClientProfile> {
    const response = await api.get<ClientProfileResponse>("/client-profile");
    return response.data.data;
  },

  async createProfile(payload: ClientProfilePayload): Promise<ClientProfile> {
    const response = await api.post<ClientProfileResponse>(
      "/client-profile",
      payload
    );
    return response.data.data;
  },

  async updateProfile(payload: ClientProfilePayload): Promise<ClientProfile> {
    const response = await api.put<ClientProfileResponse>(
      "/client-profile",
      payload
    );
    return response.data.data;
  },
};
