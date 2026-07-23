"use client";

import { useState, } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { ShoppingCart, User, Search } from "lucide-react";
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
    const router = useRouter();
    const { getTotalItems } = useCart();

    const count = getTotalItems();
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
        <Navbar>
            <NavBody className="border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
                {/* Logo */}
                <div className="flex items-center">
                    <NavbarLogo />
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex">
                    <NavItems items={navItems} />
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                    {/* Search */}
                    <div className="relative hidden lg:block">
                        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="h-11 w-64 rounded-full border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-slate-500 dark:focus:bg-slate-950 dark:focus:ring-slate-800"
                        />
                    </div>

                    {/* Cart */}
                    <a
                        href={user ? "/cart" : "/login"}
                        className="group relative rounded-full border border-transparent p-2.5 transition-all duration-300 hover:border-slate-200 hover:bg-slate-100 dark:hover:border-slate-700 dark:hover:bg-slate-900"
                    >
                        <ShoppingCart className="h-5 w-5 text-slate-700 transition-colors group-hover:text-black dark:text-slate-300 dark:group-hover:text-white" />

                        <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-black px-1 text-[10px] font-semibold leading-none text-white dark:bg-white dark:text-slate-900">
                            {count}
                        </span>
                    </a>

                    {/* Profile */}
                    <Link
                        href={user ? "/profile" : "/login"}
                        className="group hidden rounded-full border border-transparent p-2.5 transition-all duration-300 hover:border-slate-200 hover:bg-slate-100 dark:hover:border-slate-700 dark:hover:bg-slate-900 md:flex"
                    >
                        <User className="h-5 w-5 text-slate-700 transition-colors group-hover:text-black dark:text-slate-300 dark:group-hover:text-white" />
                    </Link>

                    {/* Authentication */}
                    <div className={`${user ? "hidden" : "hidden lg:flex"} items-center gap-3`}>
                        <NavbarButton
                            variant="secondary"
                            href="/login"
                            className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
                        >
                            Login
                        </NavbarButton>

                        <NavbarButton
                            variant="primary"
                            href="/signup"
                            className="rounded-full px-5 py-2.5 text-sm font-medium shadow-lg shadow-slate-900/10 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl dark:shadow-black/30"
                        >
                            Signup
                        </NavbarButton>
                    </div>
                </div>
            </NavBody>

            {/* Mobile Navigation */}
            <MobileNav className="border-b border-slate-200 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
                <MobileNavHeader className="px-1 py-1">
                    <NavbarLogo />

                    <MobileNavToggle
                        isOpen={isMobileMenuOpen}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}

                    />
                </MobileNavHeader>

                <MobileNavMenu
                    isOpen={isMobileMenuOpen}
                    onClose={() => setIsMobileMenuOpen(false)}
                    className="space-y-6 bg-white px-6 pb-8 pt-4 dark:bg-slate-950"
                >
                    {/* Mobile Search */}
                    <div className="relative">
                        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

                        <input
                            type="text"
                            placeholder="Search products..."
                            className="h-11 w-full rounded-full border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition-all focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-slate-500 dark:focus:bg-slate-950 dark:focus:ring-slate-800"
                        />
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
                        {navItems.map((item, idx) => (
                            <a
                                key={`mobile-link-${idx}`}
                                href={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="group flex items-center justify-between py-4 text-base font-medium text-slate-700 transition-all duration-300 hover:translate-x-1 hover:text-black dark:text-slate-300 dark:hover:text-white"
                            >
                                <span>{item.name}</span>

                                <span className="text-slate-300 transition-transform duration-300 group-hover:translate-x-1 dark:text-slate-600">
                                    →
                                </span>
                            </a>
                        ))}
                    </div>

                    {/* Mobile Actions */}
                    <div className="flex flex-col gap-3 pt-2">
                        <NavbarButton
                            onClick={() => setIsMobileMenuOpen(false)}
                            variant="secondary"
                            className={`${user ? "hidden" : "w-full rounded-full border border-slate-200 py-3 dark:border-slate-700"}`}
                            href="/login"
                        >
                            Login
                        </NavbarButton>

                        <NavbarButton
                            onClick={() => setIsMobileMenuOpen(false)}
                            variant="primary"
                            className={`${user ? "hidden" : "w-full rounded-full py-3"}`}
                            href="/signup"
                        >
                            Signup
                        </NavbarButton>

                        <Link
                            href={user ? "/profile" : "/login"}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-center gap-2 rounded-full border border-slate-200 py-3 text-sm font-medium text-slate-700 transition-all duration-300 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
                        >
                            <User className="h-4 w-4" />
                            Profile
                        </Link>

                        <a
                            href={user ? "/cart" : "/login"}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-center gap-2 rounded-full border border-slate-200 py-3 text-sm font-medium text-slate-700 transition-all duration-300 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
                        >
                            <ShoppingCart className="h-4 w-4" />
                            Cart
                            <span className="rounded-full bg-black px-2 py-0.5 text-xs text-white dark:bg-white dark:text-slate-900">
                                {count}
                            </span>
                        </a>
                    </div>
                </MobileNavMenu>
            </MobileNav>
        </Navbar>
    );
};

