// frontend/src/features/auth/pages/RegisterPage.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { authService } from "../services/authService";
import { RoleType } from "../../../enums/roleType";
import { BaseButton } from "../../../components/bases/BaseButton";

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: RoleType.CLIENT,
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await authService.register(formData);
      if (response.success) {
        navigate("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "Registration failed. Try again."
        );
      } else {
        setErrorMessage("Registration failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h3 className="text-xl font-bold text-gray-800 text-center">Create an Account</h3>

      {errorMessage && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
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
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">I want to:</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
        >
          <option value={RoleType.CLIENT}>Hire Freelancers (Client)</option>
          <option value={RoleType.FREELANCER}>Work as Freelancer</option>
        </select>
      </div>

      <BaseButton
        type="submit"
        loading={loading}
        loadingText="Registering..."
        fullWidth
      >
        Create Account
      </BaseButton>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-blue-600 hover:underline">
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default RegisterPage;