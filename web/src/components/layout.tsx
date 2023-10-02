import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar';

const Layout: React.FC<{ children: ReactNode }> = () => {
    return (
        <>
            <>
                <Navbar />
                <Outlet />
            </>
        </>
    )
}

export default Layout