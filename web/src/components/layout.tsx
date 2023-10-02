import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
// import Header from './Header';

const Layout: React.FC<{ children: ReactNode }> = () => {
    return (
        <>
            {/* <Header /> */}
            <main className="App">
                <Outlet />
            </main>
        </>
    )
}

export default Layout