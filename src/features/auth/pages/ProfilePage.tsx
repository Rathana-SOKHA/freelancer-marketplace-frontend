import { useEffect, useState } from "react";
import axios from "axios";
import { Mail, ShieldCheck, UserRound } from "lucide-react";
import { authService } from "../services/authService";
import type { User } from "../types";

function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      try {
        const response = await authService.getProfile();

        if (!response.success) {
          throw new Error(response.message || "Unable to load your profile.");
        }

        if (isMounted) {
          setUser(response.data.user);
          setRole(response.data.role);
        }
      } catch (error) {
        console.error("Profile load error", error);

        if (isMounted) {
          const serverMessage = axios.isAxiosError<{ message?: string }>(error)
            ? error.response?.data?.message
            : undefined;
          setErrorMessage(
            serverMessage ||
              (error instanceof Error
                ? error.message
                : "Unable to load your profile. Please try again.")
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="border-2 border-black bg-white p-6 font-mono text-sm font-bold uppercase shadow-[4px_4px_0_#111]">
        Loading your profile...
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div
        role="alert"
        className="border-2 border-red-700 bg-red-50 p-6 font-medium text-red-800 shadow-[4px_4px_0_#111]"
      >
        {errorMessage}
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const fullName = `${user.firstName} ${user.lastName}`.trim();
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
    .toUpperCase();
  const profileDetails = [
    { label: "Full name", value: fullName || "Not provided", icon: UserRound },
    { label: "Email address", value: user.email, icon: Mail },
    { label: "Account type", value: role || user.role, icon: ShieldCheck },
  ];

  return (
    <section className="mx-auto max-w-5xl space-y-6 text-black">
      <header className="flex flex-col justify-between gap-4 border-b-2 border-dashed border-black pb-5 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">
            My Profile
          </h1>
          <p className="mt-2 inline-block bg-[#ffe96a] px-2 py-1 font-mono text-xs font-semibold uppercase">
            Account information
          </p>
        </div>
        <p className="text-sm font-medium text-gray-600">
          Your identity on FreelanceHub.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[minmax(240px,0.8fr)_minmax(0,1.5fr)]">
        <section className="relative flex min-h-72 flex-col items-center justify-center overflow-hidden border-2 border-black bg-[#ffe96a] p-6 text-center shadow-[4px_4px_0_#111]">
          <div
            aria-hidden="true"
            className="absolute -bottom-12 -right-10 size-40 rotate-12 border-[18px] border-black/5"
          />
          <div className="relative flex size-28 items-center justify-center border-2 border-black bg-white font-mono text-3xl font-black shadow-[4px_4px_0_#111]">
            {initials || "?"}
          </div>
          <h2 className="relative mt-5 text-xl font-black uppercase">
            {fullName || "Your profile"}
          </h2>
          <span className="relative mt-2 border border-black bg-black px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
            {role || user.role}
          </span>
        </section>

        <section className="border-2 border-black bg-white p-5 shadow-[4px_4px_0_#111] sm:p-6">
          <div className="mb-2 flex items-center justify-between border-b-2 border-black pb-4">
            <div>
              <h2 className="font-black uppercase">Personal details</h2>
              <p className="mt-1 font-mono text-xs text-gray-500">
                Your account at a glance
              </p>
            </div>
            <span className="bg-[#ffe96a] px-2 py-1 font-mono text-[10px] font-bold uppercase">
              Profile
            </span>
          </div>

          <dl className="divide-y divide-gray-200">
            {profileDetails.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="flex items-center gap-4 py-4"
              >
                <span className="flex size-10 shrink-0 items-center justify-center border-2 border-black bg-white">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <dt className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    {label}
                  </dt>
                  <dd className="mt-1 break-words text-sm font-bold text-black">
                    {value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </section>
  );
}

export default ProfilePage;
