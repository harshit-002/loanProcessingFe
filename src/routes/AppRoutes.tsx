import { Routes, Route, Navigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
import Login from "../pages/Login.tsx";
import { Home } from "../pages/Home";
import { useAuth } from "../hooks/useAuth.ts";
import Register from "../pages/Register.tsx";
import { ApplicationList } from "../pages/ApplicationList.tsx";
import { ApplicationDetails } from "../pages/ApplicationDetails.tsx";
import { SubmitApplication } from "../pages/SubmitApplication.tsx";
import LoadingUser from "../component/LoadingUser.tsx";

export const AppRoutes = () => {
  const { account, loading } = useAuth();
  if (loading) {
    return <LoadingUser />;
  }
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/apply"
        element={account ? <SubmitApplication /> : <Navigate to="/login" />}
      />
      <Route
        path="/home"
        element={account ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/view-applications"
        element={
          account ? (
            <ApplicationList></ApplicationList>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/applications/:id" element={<ApplicationDetails />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
