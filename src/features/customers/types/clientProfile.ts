export interface ClientProfile {
  id: number;
  userId: number;
  companyName: string | null;
  companyWebsite: string | null;
  companyDescription: string | null;
  location: string | null;
  companyLogoUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ClientProfilePayload {
  companyName: string | null;
  companyWebsite: string | null;
  companyDescription: string | null;
  location: string | null;
  companyLogoUrl: string | null;
}

export interface ClientProfileResponse {
  success: boolean;
  message: string;
  data: ClientProfile;
}
