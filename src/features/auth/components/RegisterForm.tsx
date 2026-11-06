
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

import { authService } from "../services/authService";
import { RoleType } from "../../../enums/roleType";

function RegisterForm() {
    const navigate = useNavigate();

    // Store first name, last name, email, password and role
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<RoleType>(RoleType.CLIENT);

    // Store loading and error
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Handle first name change
    function handleFirstNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFirstName(e.target.value);
    }

    // Handle last name change
    function handleLastNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setLastName(e.target.value);
    }

    // Handle email change
    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    // Handle password change
    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    // Handle role change
    function handleRoleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setRole(e.target.value as RoleType);
    }

    // Handle registration
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setLoading(true);
        setErrorMessage("");

        try {
            const response = await authService.register({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                role: role,
            });

            if (response.success) {
                navigate("/login");
            } else {
                setErrorMessage("Registration failed. Please try again.");
            }

        } catch (error) {

            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setErrorMessage(
                        error.response.data.message || "Registration failed."
                    );
                } else {
                    setErrorMessage("Unable to connect to the server.");
                }
            } else {
                setErrorMessage("Something went wrong.");
            }

        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <div>
                <h2 className="text-3xl font-black uppercase tracking-tight text-black">
                    Create account
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Join the community and get started.
                </p>
            </div>

            {/* Error Message */}
            {errorMessage !== "" && (
                <div role="alert" className="border-2 border-red-700 bg-red-50 p-3 text-sm font-medium text-red-800">
                    {errorMessage}
                </div>
            )}

            {/* First Name and Last Name */}
            <div className="grid grid-cols-2 gap-4">

                {/* First Name */}
                <div>
                    <label htmlFor="register-first-name" className="block text-xs font-bold uppercase tracking-wider text-black">
                        First Name
                    </label>

                    <input
                        type="text"
                        id="register-first-name"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        required
                        autoComplete="given-name"
                        className="mt-2 block w-full border-2 border-black bg-white px-3 py-3 text-sm outline-none transition focus:bg-[#fff9cf] focus:shadow-[3px_3px_0_#ffe96a]"
                    />
                </div>

                {/* Last Name */}
                <div>
                    <label htmlFor="register-last-name" className="block text-xs font-bold uppercase tracking-wider text-black">
                        Last Name
                    </label>

                    <input
                        type="text"
                        id="register-last-name"
                        value={lastName}
                        onChange={handleLastNameChange}
                        required
                        autoComplete="family-name"
                        className="mt-2 block w-full border-2 border-black bg-white px-3 py-3 text-sm outline-none transition focus:bg-[#fff9cf] focus:shadow-[3px_3px_0_#ffe96a]"
                    />
                </div>

            </div>

            {/* Email */}
            <div>
                <label htmlFor="register-email" className="block text-xs font-bold uppercase tracking-wider text-black">
                    Email
                </label>

                <input
                    type="email"
                    id="register-email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    autoComplete="email"
                    className="mt-2 block w-full border-2 border-black bg-white px-3 py-3 text-sm outline-none transition focus:bg-[#fff9cf] focus:shadow-[3px_3px_0_#ffe96a]"
                />
            </div>

            {/* Password */}
            <div>
                <label htmlFor="register-password" className="block text-xs font-bold uppercase tracking-wider text-black">
                    Password
                </label>

                <input
                    type="password"
                    id="register-password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className="mt-2 block w-full border-2 border-black bg-white px-3 py-3 text-sm outline-none transition focus:bg-[#fff9cf] focus:shadow-[3px_3px_0_#ffe96a]"
                />
            </div>

            {/* Role */}
            <div>
                <label htmlFor="register-role" className="block text-xs font-bold uppercase tracking-wider text-black">
                    I want to:
                </label>

                <select
                id="register-role"
                value={role}
                onChange={handleRoleChange}
                className="mt-2 block w-full border-2 border-black bg-white px-3 py-3 text-sm outline-none transition focus:bg-[#fff9cf] focus:shadow-[3px_3px_0_#ffe96a]"
                >
                    <option value={RoleType.CLIENT}>
                        Hire Freelancers (Client)
                    </option>

                    <option value={RoleType.FREELANCER}>
                        Work as Freelancer
                    </option>
                </select>
            </div>

            {/* Register Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full border-2 border-black bg-black px-4 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-[3px_3px_0_#ffe96a] transition hover:bg-[#ffe96a] hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading ? "Registering..." : "Create account"}
            </button>

            {/* Login Link */}
            <p className="border-t border-gray-200 pt-4 text-center text-sm text-gray-600">
                Already have an account?{" "}

                <Link
                    to="/login"
                    className="font-bold text-black underline decoration-2 underline-offset-4 hover:bg-[#ffe96a]"
                >
                    Sign In
                </Link>
            </p>

        </form>
    );
}

export default RegisterForm;
