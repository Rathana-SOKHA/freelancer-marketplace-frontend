// frontend/src/features/auth/services/authService.ts
import api from "../../../plugins/axios";
import type {
  ApiResponse,
  AuthResponseData,
  LoginPayload,
  RegisterPayload,
  User,
} from "../types";

export const authService = {
  // POST /api/auth/register
  async register(payload: RegisterPayload): Promise<ApiResponse<AuthResponseData>> {
    const response = await api.post<ApiResponse<AuthResponseData>>(
      "/auth/register",
      payload
    );
    return response.data;
  },

  // POST /api/auth/login
  async login(payload: LoginPayload): Promise<ApiResponse<AuthResponseData>> {
    const response = await api.post<ApiResponse<AuthResponseData>>(
      "/auth/login",
      payload
    );
    return response.data;
  },

  // GET /api/auth/me (Cookie sent automatically)
  async getProfile(): Promise<ApiResponse<{ user: User; role: string }>> {
    const response = await api.get<ApiResponse<{ user: User; role: string }>>(
      "/auth/me"
    );
    return response.data;
  },

  // POST /api/auth/logout (Backend clears cookie)
  async logout(): Promise<ApiResponse<{ message: string }>> {
    const response = await api.post<ApiResponse<{ message: string }>>(
      "/auth/logout"
    );
    return response.data;
  },
};