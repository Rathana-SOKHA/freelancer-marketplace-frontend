
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

import { authService } from "../services/authService";
import { BaseButton } from "../../../components/bases/BaseButton";

function LoginForm() {
    const navigate = useNavigate();

    // Store email and password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Store loading and error
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Handle email change
    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    // Handle password change
    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    // Handle login
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setLoading(true);
        setErrorMessage("");

        try {
            const response = await authService.login({
                email: email,
                password: password,
            });

            if (response.success) {
                const role = response.data.user.role;

                if (role === "FREELANCER") {
                    navigate("/freelancer/dashboard");
                } else {
                    navigate("/customer/dashboard");
                }
            } else {
                setErrorMessage("Login failed. Please try again.");
            }

        } catch (error) {

            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setErrorMessage(
                        error.response.data.message || "Login failed."
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
        <form onSubmit={handleSubmit} className="space-y-6">

            <h3 className="text-xl font-bold text-gray-800 text-center">
                Sign in
            </h3>

            {/* Error Message */}
            {errorMessage !== "" && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
                    {errorMessage}
                </div>
            )}

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
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Login Button */}
            <BaseButton
                type="submit"
                loading={loading}
                loadingText="Signing in..."
                fullWidth
            >
                Sign in
            </BaseButton>

            {/* Register Link */}
            <p className="text-center text-sm text-gray-600">
                Don't have an account?{" "}

                <Link
                    to="/register"
                    className="font-medium text-blue-600 hover:underline"
                >
                    Register
                </Link>
            </p>

        </form>
    );
}

export default LoginForm;
