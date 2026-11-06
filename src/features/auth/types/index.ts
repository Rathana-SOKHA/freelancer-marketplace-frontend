// frontend/src/features/auth/types/index.ts
import type { RoleType } from "../../../enums/roleType";

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: RoleType;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: RoleType;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AuthResponseData {
  user: User;
  accessToken?: string;
  refreshToken?: string;
}