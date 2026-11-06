export const RoleType = {
  CLIENT: "CLIENT",
  FREELANCER: "FREELANCER",
} as const;

export type RoleType = (typeof RoleType)[keyof typeof RoleType];
