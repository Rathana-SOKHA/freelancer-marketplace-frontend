import { Route, Navigate } from "react-router";
import AuthLayout from "../../layouts/AuthLayout";
import AppLayout from "../../layouts/AppLayout";
import LoginPage from "../auth/pages/LoginPage";
import RegisterPage from "../auth/pages/RegisterPage";
import ClientProfilePage from "../customers/pages/ClientProfilePage";
import CustomerDashboard from "../customers/pages/CustomerDashboard";
import CustomerJobsPage from "../customers/pages/CustomerJobsPage";
import FreelancersDirectoryPage from "../customers/pages/FreelancersDirectoryPage";
import PostJobPage from "../customers/pages/PostJobPage";
import BrowseJobsPage from "../freelancers/pages/BrowseJobsPage";
import FreelancerDashboard from "../freelancers/pages/FreelancerDashboard";
import FreelancerProfilePage from "../freelancers/pages/FreelancerProfilePage";

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
    <Route path="freelancers" element={<FreelancersDirectoryPage />} />
    <Route path="profile" element={<ClientProfilePage />} />
    <Route path="jobs" element={<CustomerJobsPage />} />
    <Route path="post-job" element={<PostJobPage />} />
  </Route>
);

// Freelancer Routes
export const FreelancerRoutes = (
  <Route path="/freelancer" element={<AppLayout role="FREELANCER" />}>
    <Route index element={<Navigate to="dashboard" />} />
    <Route path="dashboard" element={<FreelancerDashboard />} />
    <Route path="jobs" element={<BrowseJobsPage />} />
    <Route path="profile" element={<FreelancerProfilePage />} />
  </Route>
);
