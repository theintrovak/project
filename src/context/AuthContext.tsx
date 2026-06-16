"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import FullScreenLoader from "@/components/fullscreenloader";

type User = {
    id: string;
    name: string;
    email: string;
    phone: string;
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // 🔑 CHECK LOGIN USING COOKIE
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get("/api/user/me", { withCredentials: true });
                console.log(res)


                if (res.status === 200) {

                    setUser(res.data.data);
                } else {
                    setUser(null);
                }
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const logout = async () => {
        await axios.get("/api/user/logout");
        setUser(null);
    };
    if (loading) return <FullScreenLoader />

    return (
        <AuthContext.Provider value={{ user, loading, logout, }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};
