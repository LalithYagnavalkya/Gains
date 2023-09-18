import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, PrivateRoutesProps } from "./types";

export const PrivateRoutes: React.FC<PrivateRoutesProps> = () => {
    const { isLoggedIn } = useSelector((state: RootState) => state.auth);
    if (isLoggedIn) {
        return <Outlet />
    } else {
        return <Navigate to='/login'></Navigate>
    }
};