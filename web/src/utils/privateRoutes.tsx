import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { PrivateRoutesProps } from "./types";
import { useSelector } from 'react-redux';
import Layout from '../components/layout'

export const PrivateRoutes: React.FC<PrivateRoutesProps> = () => {
    const { isAuthenticated } = useSelector((state: any) => state.user);
    if (isAuthenticated) {
        return <Layout>
            <Outlet />
        </Layout>
    } else {
        return <Navigate to='/login' replace></Navigate>
    }
};