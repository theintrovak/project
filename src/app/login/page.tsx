"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner"
import toast from "react-hot-toast";
import { WavyBackground } from "@/components/ui/wavy-background";
import { Meteors } from "@/components/ui/meteors";


export default function Login() {
    const router = useRouter();
    const [showpassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

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
        <WavyBackground>
            {/* Login Card */}
            <div className="overflow-hidden relative z-10 flex flex-col w-[90%] max-w-md bg-white/30 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/20">
                <Meteors number={30} />
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
                        type={showpassword ? "text" : "password"}
                        name="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        id="password"
                        placeholder="••••••••"
                        className="p-2 rounded-lg border-none focus:ring-2 focus:ring-amber-500 outline-none text-gray-800"
                    />
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
        </WavyBackground>
    );
}
