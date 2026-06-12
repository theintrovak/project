"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, ShoppingCart, User, Search } from "lucide-react";
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    NavbarLogo,
    NavbarButton,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
} from "@/components/ui/resizable-navbar";

export default function NavBar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user } = useAuth();
    const navItems = [
        {
            name: "Shop",
            link: "/",
        },
        {
            name: "Categories",
            link: "/categories",
        },
        {
            name: "Contact",
            link: "/contact",
        },
    ];
    return (
        <Navbar >
            <NavBody>
                {/* Logo */}
                <NavbarLogo />
                <NavItems items={navItems} />
                {/* Desktop Nav */}
                <div className="flex items-center gap-4">
                    <NavbarButton variant="secondary" href="/login">Login</NavbarButton>
                    <NavbarButton variant="primary" href="/signup">Signup</NavbarButton>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-3 ">
                    {/* Search (desktop) */}
                    <div className="relative hidden md:block">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search products"
                            className="h-9 w-48 rounded-md border pl-8 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                    </div>

                    {/* Cart */}
                    <Link href="/cart" className="relative rounded-md p-2 hover:bg-muted ">
                        <ShoppingCart className="h-5 w-5" />
                        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">2</span>
                    </Link>

                    {/* Profile */}
                    <Link href={user ? "/profile" : "/login"} className="hidden rounded-md p-2 hover:bg-muted md:block">
                        <User className="h-5 w-5" />
                    </Link>
                </div>
            </NavBody>

            {/* Mobile Menu Button */}
            <MobileNav>
                <MobileNavHeader>
                    <NavbarLogo />
                    <MobileNavToggle
                        isOpen={isMobileMenuOpen}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    />
                </MobileNavHeader>

                <MobileNavMenu
                    isOpen={isMobileMenuOpen}
                    onClose={() => setIsMobileMenuOpen(false)}
                >
                    {navItems.map((item, idx) => (
                        <a
                            key={`mobile-link-${idx}`}
                            href={item.link}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="relative text-neutral-600 dark:text-neutral-300"
                        >
                            <span className="block">{item.name}</span>
                        </a>
                    ))}
                    <div className="flex w-full flex-col gap-4">
                        <NavbarButton
                            onClick={() => setIsMobileMenuOpen(false)}
                            variant="primary"
                            className="w-full"
                            href="/login"
                        >
                            Login
                        </NavbarButton>
                        <NavbarButton
                            onClick={() => setIsMobileMenuOpen(false)}
                            variant="primary"
                            className="w-full"
                            href="/signup"
                        >
                            Signup
                        </NavbarButton>
                    </div>
                </MobileNavMenu>
            </MobileNav>



        </Navbar>
    );
}

