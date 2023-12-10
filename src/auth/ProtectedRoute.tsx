import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { RoutesEnum } from "../types/routes.enum";
import { useAuth } from "./AuthProvider";

const ProtectedRoutes = () => {
  const { token } = useAuth();

  return token ? <Outlet /> : <Navigate to={RoutesEnum.LOGIN} />;
};

export default ProtectedRoutes;
