import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Mail, ShieldCheck, UserRound } from "lucide-react";
import { authService } from "../../auth/services/authService";
import type { User } from "../../auth/types";
import { clientProfileService } from "../services/clientProfileService";
import type {
  ClientProfile,
  ClientProfilePayload,
} from "../types/clientProfile";

interface ClientProfileForm {
  companyName: string;
  companyWebsite: string;
  companyDescription: string;
  location: string;
  companyLogoUrl: string;
}

const emptyForm: ClientProfileForm = {
  companyName: "",
  companyWebsite: "",
  companyDescription: "",
  location: "",
  companyLogoUrl: "",
};

function getFormValues(profile: ClientProfile): ClientProfileForm {
  return {
    companyName: profile.companyName || "",
    companyWebsite: profile.companyWebsite || "",
    companyDescription: profile.companyDescription || "",
    location: profile.location || "",
    companyLogoUrl: profile.companyLogoUrl || "",
  };
}

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message || "Unable to save your profile.";
  }

  return error instanceof Error
    ? error.message
    : "Something went wrong. Please try again.";
}

function ClientProfilePage() {
  const [form, setForm] = useState<ClientProfileForm>(emptyForm);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState("");
  const [hasProfile, setHasProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      try {
        const accountResponse = await authService.getProfile();

        if (!accountResponse.success) {
          throw new Error(accountResponse.message || "Unable to load your account.");
        }

        if (isMounted) {
          setUser(accountResponse.data.user);
          setRole(accountResponse.data.role);
        }

        try {
          const profile = await clientProfileService.getProfile();
          if (isMounted) {
            setForm(getFormValues(profile));
            setHasProfile(true);
          }
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 404) {
            if (isMounted) {
              setForm(emptyForm);
              setHasProfile(false);
            }
            return;
          }
          throw error;
        }
      } catch (error) {
        console.error("Client profile load error", error);
        if (isMounted) {
          setErrorMessage(getErrorMessage(error));
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

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
    setErrorMessage("");
    setSuccessMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    const payload: ClientProfilePayload = {
      companyName: form.companyName.trim() || null,
      companyWebsite: form.companyWebsite.trim() || null,
      companyDescription: form.companyDescription.trim() || null,
      location: form.location.trim() || null,
      companyLogoUrl: form.companyLogoUrl.trim() || null,
    };

    try {
      const profile = hasProfile
        ? await clientProfileService.updateProfile(payload)
        : await clientProfileService.createProfile(payload);

      setForm(getFormValues(profile));
      setHasProfile(true);
      setSuccessMessage("Your client profile has been saved.");
    } catch (error) {
      console.error("Client profile save error", error);
      setErrorMessage(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="border-2 border-black bg-white p-6 font-mono text-sm font-bold uppercase shadow-[4px_4px_0_#111]">
        Loading your client profile...
      </div>
    );
  }

  const fullName = user ? `${user.firstName} ${user.lastName}`.trim() : "";
  const initials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
    : "";
  const accountDetails = user
    ? [
        { label: "Full name", value: fullName || "Not provided", icon: UserRound },
        { label: "Email address", value: user.email, icon: Mail },
        { label: "Account type", value: role || user.role, icon: ShieldCheck },
      ]
    : [];

  return (
    <section className="mx-auto max-w-4xl space-y-6 text-black">
      <header className="flex flex-col justify-between gap-4 border-b-2 border-dashed border-black pb-5 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">
            Client Profile
          </h1>
          <p className="mt-2 inline-block bg-[#ffe96a] px-2 py-1 font-mono text-xs font-semibold uppercase">
            Tell freelancers about your company
          </p>
        </div>
        <p className="text-sm font-medium text-gray-600">
          Add your company details to your client profile.
        </p>
      </header>

      {user && (
        <div className="grid gap-5 lg:grid-cols-[minmax(240px,0.8fr)_minmax(0,1.5fr)]">
          <section className="relative flex min-h-72 flex-col items-center justify-center overflow-hidden border-2 border-black bg-[#ffe96a] p-6 text-center shadow-[4px_4px_0_#111]">
            <div
              aria-hidden="true"
              className="absolute -bottom-12 -right-10 size-40 rotate-12 border-[18px] border-black/5"
            />
            <div className="relative flex size-28 items-center justify-center overflow-hidden border-2 border-black bg-white font-mono text-3xl font-black shadow-[4px_4px_0_#111]">
              {form.companyLogoUrl ? (
                <img
                  src={form.companyLogoUrl}
                  alt={`${form.companyName || "Company"} logo`}
                  className="size-full object-cover"
                />
              ) : (
                initials || "?"
              )}
            </div>
            <h2 className="relative mt-5 text-xl font-black uppercase">
              {form.companyName || fullName || "Your company"}
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
                Account
              </span>
            </div>

            <dl className="divide-y divide-gray-200">
              {accountDetails.map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center gap-4 py-4">
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
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5 border-2 border-black bg-white p-5 shadow-[4px_4px_0_#111] sm:p-6"
      >
        {errorMessage && (
          <div
            role="alert"
            className="border-2 border-red-700 bg-red-50 p-3 text-sm font-medium text-red-800"
          >
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div
            role="status"
            className="border-2 border-green-700 bg-green-50 p-3 text-sm font-medium text-green-800"
          >
            {successMessage}
          </div>
        )}

        <div>
          <label
            htmlFor="client-company-name"
            className="block text-xs font-bold uppercase tracking-wider"
          >
            Company name
          </label>
          <input
            id="client-company-name"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            maxLength={150}
            placeholder="Your company"
            className="mt-2 block w-full border-2 border-black bg-white px-3 py-3 text-sm outline-none focus:bg-[#fff9cf]"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="client-company-website"
              className="block text-xs font-bold uppercase tracking-wider"
            >
              Company website
            </label>
            <input
              id="client-company-website"
              name="companyWebsite"
              type="url"
              value={form.companyWebsite}
              onChange={handleChange}
              maxLength={255}
              placeholder="https://example.com"
              className="mt-2 block w-full border-2 border-black bg-white px-3 py-3 text-sm outline-none focus:bg-[#fff9cf]"
            />
          </div>

          <div>
            <label
              htmlFor="client-location"
              className="block text-xs font-bold uppercase tracking-wider"
            >
              Location
            </label>
            <input
              id="client-location"
              name="location"
              value={form.location}
              onChange={handleChange}
              maxLength={150}
              placeholder="City, country"
              className="mt-2 block w-full border-2 border-black bg-white px-3 py-3 text-sm outline-none focus:bg-[#fff9cf]"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="client-company-description"
            className="block text-xs font-bold uppercase tracking-wider"
          >
            Company description
          </label>
          <textarea
            id="client-company-description"
            name="companyDescription"
            value={form.companyDescription}
            onChange={handleChange}
            rows={5}
            placeholder="Tell freelancers about your company and the work you do."
            className="mt-2 block w-full resize-y border-2 border-black bg-white px-3 py-3 text-sm outline-none focus:bg-[#fff9cf]"
          />
        </div>

        <div>
          <label
            htmlFor="client-company-logo"
            className="block text-xs font-bold uppercase tracking-wider"
          >
            Company logo URL
          </label>
          <input
            id="client-company-logo"
            name="companyLogoUrl"
            type="url"
            value={form.companyLogoUrl}
            onChange={handleChange}
            maxLength={500}
            placeholder="https://example.com/logo.png"
            className="mt-2 block w-full border-2 border-black bg-white px-3 py-3 text-sm outline-none focus:bg-[#fff9cf]"
          />
        </div>

        <div className="border-t-2 border-black pt-5">
          <button
            type="submit"
            disabled={saving}
            className="border-2 border-black bg-black px-5 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-[3px_3px_0_#ffe96a] transition hover:bg-[#ffe96a] hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : hasProfile ? "Save changes" : "Create profile"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default ClientProfilePage;
