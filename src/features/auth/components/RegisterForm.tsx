
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

import { authService } from "../services/authService";
import { RoleType } from "../../../enums/roleType";
import { BaseButton } from "../../../components/bases/BaseButton";

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

            <h3 className="text-xl font-bold text-gray-800 text-center">
                Create an Account
            </h3>

            {/* Error Message */}
            {errorMessage !== "" && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
                    {errorMessage}
                </div>
            )}

            {/* First Name and Last Name */}
            <div className="grid grid-cols-2 gap-4">

                {/* First Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        First Name
                    </label>

                    <input
                        type="text"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Last Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Last Name
                    </label>

                    <input
                        type="text"
                        value={lastName}
                        onChange={handleLastNameChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                </div>

            </div>

            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Email
                </label>

                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Password */}
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Password
                </label>

                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    minLength={8}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Role */}
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    I want to:
                </label>

                <select
                    value={role}
                    onChange={handleRoleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
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
            <BaseButton
                type="submit"
                loading={loading}
                loadingText="Registering..."
                fullWidth
            >
                Create Account
            </BaseButton>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}

                <Link
                    to="/login"
                    className="font-medium text-blue-600 hover:underline"
                >
                    Sign In
                </Link>
            </p>

        </form>
    );
}

export default RegisterForm;
