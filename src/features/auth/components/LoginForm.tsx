
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

import { authService } from "../services/authService";

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
        <form onSubmit={handleSubmit} className="space-y-5">

            <div>
                <h2 className="text-3xl font-black uppercase tracking-tight text-black">
                    Welcome back
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Sign in to continue to your workspace.
                </p>
            </div>

            {/* Error Message */}
            {errorMessage !== "" && (
                <div role="alert" className="border-2 border-red-700 bg-red-50 p-3 text-sm font-medium text-red-800">
                    {errorMessage}
                </div>
            )}

            {/* Email */}
            <div>
                <label htmlFor="login-email" className="block text-xs font-bold uppercase tracking-wider text-black">
                    Email
                </label>

                <input
                    type="email"
                    id="login-email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    autoComplete="email"
                    className="mt-2 block w-full border-2 border-black bg-white px-3 py-3 text-sm outline-none transition focus:bg-[#fff9cf] focus:shadow-[3px_3px_0_#ffe96a]"
                />
            </div>

            {/* Password */}
            <div>
                <label htmlFor="login-password" className="block text-xs font-bold uppercase tracking-wider text-black">
                    Password
                </label>

                <input
                    type="password"
                    id="login-password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    autoComplete="current-password"
                    className="mt-2 block w-full border-2 border-black bg-white px-3 py-3 text-sm outline-none transition focus:bg-[#fff9cf] focus:shadow-[3px_3px_0_#ffe96a]"
                />
            </div>

            {/* Login Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full border-2 border-black bg-black px-4 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-[3px_3px_0_#ffe96a] transition hover:bg-[#ffe96a] hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading ? "Signing in..." : "Sign in"}
            </button>

            {/* Register Link */}
            <p className="border-t border-gray-200 pt-4 text-center text-sm text-gray-600">
                Don't have an account?{" "}

                <Link
                    to="/register"
                    className="font-bold text-black underline decoration-2 underline-offset-4 hover:bg-[#ffe96a]"
                >
                    Register
                </Link>
            </p>

        </form>
    );
}

export default LoginForm;
