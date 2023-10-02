import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { PrivateRoutesProps } from "./types";
import { useSelector } from 'react-redux';

export const PrivateRoutes: React.FC<PrivateRoutesProps> = () => {
   const {isAuthenticated} = useSelector((state:any) => state.user);
    if (isAuthenticated) {
        return <Outlet />
    } else {
        return <Navigate to='/login' replace></Navigate>
    }
};