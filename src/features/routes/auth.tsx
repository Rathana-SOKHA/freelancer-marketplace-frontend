import { Route, Navigate } from "react-router";
import AuthLayout from "../../layouts/AuthLayout";
import AppLayout from "../../layouts/AppLayout";
import LoginPage from "../auth/pages/LoginPage";
import RegisterPage from "../auth/pages/RegisterPage";
import CustomerDashboard from "../customers/pages/CustomerDashboard";
import FreelancerDashboard from "../freelancers/pages/FreelancerDashboard";

// Auth Routes (Login, Register)
export const AuthRoutes = (
  <Route element={<AuthLayout />}>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
  </Route>
);

// Customer Routes
export const CustomerRoutes = (
  <Route path="/customer" element={<AppLayout role="CLIENT" />}>
    <Route index element={<Navigate to="dashboard" />} />
    <Route path="dashboard" element={<CustomerDashboard />} />
  </Route>
);

// Freelancer Routes
export const FreelancerRoutes = (
  <Route path="/freelancer" element={<AppLayout role="FREELANCER" />}>
    <Route index element={<Navigate to="dashboard" />} />
    <Route path="dashboard" element={<FreelancerDashboard />} />
  </Route>
);
