import { useEffect, useState } from "react";
import axios from "axios";
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
      <div className="rounded-xl border border-gray-100 bg-white p-6 text-gray-600 shadow-sm">
        Loading your profile...
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700"
      >
        {errorMessage}
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const fullName = `${user.firstName} ${user.lastName}`.trim();

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="mt-1 text-gray-500">Your account information.</p>
      </div>

      <dl className="divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white px-6 shadow-sm">
        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm font-medium text-gray-500">Name</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            {fullName || "Not provided"}
          </dd>
        </div>
        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm font-medium text-gray-500">Email</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            {user.email}
          </dd>
        </div>
        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm font-medium text-gray-500">Role</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            {role || user.role}
          </dd>
        </div>
        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm font-medium text-gray-500">User ID</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            {user.id}
          </dd>
        </div>
      </dl>
    </section>
  );
}

export default ProfilePage;
