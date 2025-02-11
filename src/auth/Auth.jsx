import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";

export const Auth = ({ children }) => {
  const { user } = useUser();
  const location = useLocation();
  console.log("location", location);

  return (
    <>
      {user?.id ? (
        children
      ) : (
        <Navigate to="/" replace state={{ from: location }} />
      )}
    </>
  );
};
