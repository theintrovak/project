"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, User, Search } from "lucide-react";

export default function NavBar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Detect scroll for shadow/background
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur"
                }`}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
                {/* Logo */}
                <Link href="/" className="text-xl font-bold">
                    <span className="flex items-center">
                        Rishikesh<span className="text-primary text-amber-600">Readymade</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden items-center gap-6 md:flex">
                    <Link href="/" className="text-sm font-medium hover:text-primary">Home</Link>
                    <Link href="/shop" className="text-sm font-medium hover:text-primary">Shop</Link>
                    <Link href="/categories" className="text-sm font-medium hover:text-primary">Categories</Link>
                    <Link href="/contact" className="text-sm font-medium hover:text-primary">Contact</Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
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
                    <Link href="/cart" className="relative rounded-md p-2 hover:bg-muted">
                        <ShoppingCart className="h-5 w-5" />
                        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">2</span>
                    </Link>

                    {/* Profile */}
                    <Link href="/login" className="hidden rounded-md p-2 hover:bg-muted md:block">
                        <User className="h-5 w-5" />
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="rounded-md p-2 hover:bg-muted md:hidden"
                        aria-label="Toggle menu"
                    >
                        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="border-t bg-white md:hidden">
                    <nav className="flex flex-col gap-4 px-4 py-4">
                        <Link href="/" onClick={() => setOpen(false)}>Home</Link>
                        <Link href="/shop" onClick={() => setOpen(false)}>Shop</Link>
                        <Link href="/categories" onClick={() => setOpen(false)}>Categories</Link>
                        <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
                        <Link href="/login" onClick={() => setOpen(false)}>Login</Link>

                        {/* Mobile Search */}
                        <input
                            type="text"
                            placeholder="Search products"
                            className="mt-2 h-10 rounded-md border px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                    </nav>
                </div>
            )}
        </header>
    );
}

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


export function NavbarDemo() {
    const navItems = [
        {
            name: "Shop",
            link: "#shop",
        },
        {
            name: "Categories",
            link: "#categories",
        },
        {
            name: "Contact",
            link: "#contact",
        },
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="relative w-full">
            <Navbar>
                {/* Desktop Navigation */}
                <NavBody>
                    <NavbarLogo />
                    <NavItems items={navItems} />
                    <div className="flex items-center gap-4">
                        <NavbarButton variant="secondary">Login</NavbarButton>
                        <NavbarButton variant="primary">Book a call</NavbarButton>
                    </div>
                </NavBody>

                {/* Mobile Navigation */}
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


            {/* Navbar */}
        </div>
    );
}