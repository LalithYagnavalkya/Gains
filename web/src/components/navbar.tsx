import React from 'react'
import Logo from './logo';

import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/user.slice';

interface navItemType {
    name: string,
    route: string,
}

const navLinks: navItemType[] = [
    { name: 'Dashboard', route: '/app/home' },
    { name: 'Customers', route: '/app/customers' },
    // { name: 'Dashboard', route: '/app/home' }
]
const NavComponent: React.FC<{ item: navItemType }> = ({ item }) => {
    return <NavigationMenuItem>
        <Link to={item.route}>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {item.name}
            </NavigationMenuLink>
        </Link>
    </NavigationMenuItem>
}

const Navbar: React.FC = () => {
    const dispatch = useDispatch();
    return (
        <nav className="border-b">
            <div className="container mx-auto">
                <div className="py-3 flex justify-between items-center">
                    <Logo />
                    <NavigationMenu className="flex space-x-4">
                        <NavigationMenuList>
                            {navLinks.map((x: navItemType
                            ) => <NavComponent key={x.name} item={x} />)}
                            <Link to='/'>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()} onClick={() => { dispatch(logout()) }}>
                                    Logout
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;