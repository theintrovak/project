"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import toast from "react-hot-toast";

export default function Signup() {
    const router = useRouter();
    const [showpassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
    });
    const [loading, setLoading] = useState(false);



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user.password !== user.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
        setLoading(true);
        const loadingToast = toast.loading("Creating your account...");
        try {
            const response = await axios.post("api/user/signup", user);
            toast.dismiss(loadingToast);
            if (response) {
                toast.success("Signup successful!");
                router.push("/login");

            }
        } catch (error: unknown) {
            toast.dismiss(loadingToast);
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || "Something went wrong!";
                toast.error(message);
            } else if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen overflow-hidden flex items-center justify-center bg-[#0a0a0a] px-4">
            <div className="w-full max-w-sm">

                {/* Logo / Brand mark */}
                <div className="flex justify-center mb-5">
                    <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>

                {/* Card */}
                <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6">

                    <div className="mb-4">
                        <h1 className="text-xl font-semibold text-white tracking-tight">Create an account</h1>
                        <p className="text-xs text-gray-500 mt-0.5">Fill in your details to get started</p>
                    </div>

                    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>

                        {/* Username */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="username" className="text-xs font-medium text-gray-400">
                                Name
                            </label>
                            <input
                                type="text"
                                value={user.name}
                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                                required
                                name="Name"
                                id="Name"
                                placeholder="Your Name"
                                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-gray-600 rounded-lg px-3.5 py-2 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="text-xs font-medium text-gray-400">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                required
                                id="email"
                                placeholder="you@example.com"
                                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-gray-600 rounded-lg px-3.5 py-2 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
                            />
                        </div>
                        {/* phone */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="confirmPassword" className="text-xs font-medium text-gray-400">
                                Phone
                            </label>
                            <div className="relative">

                                <PhoneInput
                                    country={"in"}

                                    value={user.phone}
                                    onChange={(e) => setUser({ ...user, phone: e })}
                                    inputStyle={{
                                        width: "100%",
                                        height: "43px",
                                        background: "#1A1A1A",
                                        color: "#ffffff",
                                        border: "1px solid #3f3f46",
                                        borderRadius: "8px",
                                    }}
                                    buttonStyle={{
                                        background: "#18181b",
                                        border: "1px solid #3f3f46",
                                        borderRight: "none",
                                        borderRadius: "8px 0 0 8px",
                                    }}
                                    dropdownStyle={{
                                        background: "#18181b",
                                        color: "#ffffff",
                                        border: "1px solid #3f3f46",
                                    }}

                                    placeholder="phone"
                                />

                            </div>
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="password" className="text-xs font-medium text-gray-400">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showpassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    value={user.password}
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    required
                                    placeholder="••••••••"
                                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-gray-600 rounded-lg px-3.5 py-2 pr-10 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showpassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-amber-500 transition"
                                    tabIndex={-1}
                                >
                                    {showpassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.458 12C2.732 16.057 6.523 19 12 19a10.48 10.48 0 005.37-1.443M9.88 9.88a3 3 0 104.24 4.24M3 3l18 18" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="confirmPassword" className="text-xs font-medium text-gray-400">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showpassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={user.confirmPassword}
                                    onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                                    required
                                    id="confirmPassword"
                                    placeholder="••••••••"
                                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-gray-600 rounded-lg px-3.5 py-2 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
                                />
                            </div>

                        </div>



                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-1 w-full flex items-center justify-center gap-2 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed text-black font-semibold text-sm rounded-lg transition-colors duration-200"
                        >
                            {loading ? (
                                <>
                                    <span>Signing Up…</span>
                                </>
                            ) : (
                                "Sign Up"
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-4">
                        Already have an account?{" "}
                        <Link href="/login" className="text-amber-500 hover:text-amber-400 transition-colors">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}