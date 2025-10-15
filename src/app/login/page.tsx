"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner"
import toast from "react-hot-toast";


export default function Login() {
    const router = useRouter();
    const [showpassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const loadingToast = toast.loading("Logging in...");
        try {
            setLoading(true);
            const response = await axios.post("api/user/login", user)
            toast.dismiss(loadingToast);
            if (response) {
                toast.success("Login successful!");
                console.log("Login successful");
                router.push("/profile");
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
    }
    return (
        <div
            className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-400 via-orange-300 to-pink-400 overflow-hidden"
        >
            {/* Decorative Background Blobs */}
            <svg
                className="absolute top-0 left-0 w-64 h-64 text-white opacity-30 blur-2xl"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="currentColor"
                    d="M40.5,-59.5C52.8,-50.4,63.4,-40.5,68.8,-28.2C74.2,-15.9,74.5,-1.1,68.4,11.8C62.3,24.7,49.8,35.7,37.1,47.1C24.4,58.4,12.2,70.2,-1.6,72.3C-15.4,74.5,-30.8,67,-42.5,56.2C-54.2,45.3,-62.3,31.1,-66.1,15.5C-69.9,-0.2,-69.4,-17.1,-62.8,-30.8C-56.2,-44.6,-43.6,-55.3,-29.7,-63.1C-15.9,-70.9,-8,-75.8,3,-79.3C14,-82.8,28,-85.1,40.5,-59.5Z"
                    transform="translate(100 100)"
                />
            </svg>
            <svg
                className="absolute bottom-0 right-0 w-72 h-72 text-white opacity-25 blur-2xl"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="currentColor"
                    d="M50.4,-63.6C63.9,-52.7,72.8,-36.2,74.6,-19.1C76.3,-2,70.9,16,61.1,30.2C51.3,44.4,37.2,54.7,21.6,62.1C6,69.5,-11,74.1,-26.1,69.2C-41.2,64.4,-54.4,50.2,-62.4,33.5C-70.3,16.7,-73.1,-2.6,-68.1,-20.6C-63.1,-38.6,-50.3,-55.4,-34.2,-66.3C-18.1,-77.2,1.3,-82.2,18.8,-79.4C36.3,-76.7,50.4,-63.6,50.4,-63.6Z"
                    transform="translate(100 100)"
                />
            </svg>

            {/* Login Card */}
            <div className="relative z-10 flex flex-col w-[90%] max-w-md bg-white/30 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/20">
                <h1 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-lg">
                    Login
                </h1>

                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <label htmlFor="email" className="text-white font-medium">
                        Email :
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        id="email"
                        placeholder="you@example.com"
                        className="p-2 rounded-lg border-none focus:ring-2 focus:ring-amber-500 outline-none text-gray-800"
                    />

                    <label htmlFor="password" className="text-white font-medium">
                        Password :
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        id="password"
                        placeholder="••••••••"
                        className="p-2 rounded-lg border-none focus:ring-2 focus:ring-amber-500 outline-none text-gray-800"
                    />
                    {showpassword && <div className="relative mt-0 border 
                    rounded-2xl p-2 space-y-2 bg-[#ffffff5c] overflow-visible ">
                        <p> {user.password} </p>
                    </div>}
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showpassword)}
                        className="absolute right-12 top-[246px]  text-gray-600 hover:text-amber-600 transition"
                    >
                        {showpassword ? (
                            // 👁️ Eye-open icon
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        ) : (
                            // 👁️‍🗨️ Eye-slash icon
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.98 8.223A10.477 10.477 0 001.458 12C2.732 16.057 6.523 19 12 19a10.48 10.48 0 005.37-1.443M9.88 9.88a3 3 0 104.24 4.24M3 3l18 18"
                                />
                            </svg>
                        )}
                    </button>

                    <button
                        type="submit"
                        className="mt-6 py-2 px-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300"
                    >
                        {loading ? <><Spinner /><span>Loading</span></> : "Login"}
                    </button>
                </form>

                <p className="text-white text-center mt-6 text-sm">
                    Don’t have an account?{" "}
                    <Link href="/signup" className="text-amber-500 hover:underline">
                        Signup here
                    </Link>
                </p>
            </div>
        </div>
    );
}
