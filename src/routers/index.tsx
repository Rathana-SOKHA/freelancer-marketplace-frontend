import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AuthRoutes, CustomerRoutes, FreelancerRoutes } from "../features/routes/auth";
import PageNotFound  from "../components/ui/PageNotFound";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth route */}
        { AuthRoutes }

        { FreelancerRoutes }

        { CustomerRoutes }

        {/* Send the app's initial route to the sign-in page. */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}


export default AppRouter;


// import { BrowserRouter, Routes, Route, Navigate } from "react-router";
// import { AuthRoutes, CustomerRoutes, FreelancerRoutes } from "../features/routes";

// export function AppRouter() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Auth routes */}
//         {AuthRoutes}

//         {/* Customer routes */}
//         {CustomerRoutes}

//         {/* Freelancer routes */}
//         {FreelancerRoutes}

//         {/* Default route & 404 fallback */}
//         <Route path="/" element={<Navigate to="/login"/>} />
//         <Route path="*" element={<Navigate to="/login"/>} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default AppRouter;
