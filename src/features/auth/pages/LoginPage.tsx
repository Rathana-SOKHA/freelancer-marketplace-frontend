// frontend/src/features/auth/pages/LoginPage.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { authService } from "../services/authService";
import { BaseButton } from "../../../components/bases/BaseButton";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await authService.login(formData);
      if (response.success) {
        // Cookie is stored automatically by browser
        // Redirect user based on their role
        const role = response.data.user.role;
        if (role === "FREELANCER") {
          navigate("/freelancer/dashboard");
        } else {
          navigate("/customer/dashboard");
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "Failed to sign in. Please try again."
        );
      } else {
        setErrorMessage("Failed to sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h3 className="text-xl font-bold text-gray-800 text-center">Sign in</h3>

      {errorMessage && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
          {errorMessage}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <BaseButton
        type="submit"
        loading={loading}
        loadingText="Signing in..."
        fullWidth
      >
        Sign in
      </BaseButton>

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link to="/register" className="font-medium text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginPage;