// frontend/src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import FreelancerDashboard from "./features/freelancers/pages/FreelancerDashboard";
import CustomerDashboard from "./features/customers/pages/CustomerDashboard";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Layout for Login & Register */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Freelancer Layout & Protected Routes */}
        <Route path="/freelancer" element={<AppLayout role="FREELANCER" />}>
          <Route path="dashboard" element={<FreelancerDashboard />} />
          {/* Add more freelancer routes here: e.g. path="profile", path="proposals" */}
        </Route>

        {/* Customer / Client Layout & Protected Routes */}
        <Route path="/customer" element={<AppLayout role="CLIENT" />}>
          <Route path="dashboard" element={<CustomerDashboard />} />
          {/* Add more customer routes here: e.g. path="jobs", path="post-job" */}
        </Route>

        {/* Default route fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;