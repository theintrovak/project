"use client";
import { useState, useEffect } from "react";
import PhoneInput from 'react-phone-input-2'
import Image from "next/image";
import { Edit2, Mail, MapPin, Phone, LogOut, Settings, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

export default function ProfilePage() {
    const router = useRouter();
    const [editing, setEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState(
        {
            name: "",
            email: "",
            phone: "",
        }
    );
    const { user } = useAuth();
    const [orderData, setOrderData] = useState([]);


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get("/api/orders");
                setOrderData(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchOrders();
    }, []);
    const handleUpdate = async () => {
        const loadingToast = toast.loading("updating user...");
        try {
            const response = await axios.put("/api/user/update", updatedUser);
            toast.dismiss(loadingToast);
            if (response) {
                toast.success("User updated successfully!");
                router.refresh();
            }
        } catch (error: unknown) {
            if (error instanceof Error) return toast.error(error.message);
        } finally {
            toast.dismiss(loadingToast);
        }

    }

    const handleLogout = async () => {
        const loadingToast = toast.loading("Logging out...");
        try {
            const response = await axios.get("/api/user/logout");
            toast.dismiss(loadingToast);
            if (response) {
                toast.success("Logout successful!");
                router.push("/login");
            }
        } catch (error: unknown) {
            if (error instanceof Error) return toast.error(error.message);
        } finally {
            toast.dismiss(loadingToast);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#292929] flex justify-center items-center px-4 py-10">
            <div className="bg-white/10 backdrop-blur-lg p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-md sm:max-w-lg md:max-w-3xl border border-white/10">

                {/* Header Section */}
                <div className="flex flex-col items-center mb-8 text-center">
                    <div className="relative">
                        <Image
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                            alt="Profile"
                            width={120}
                            height={120}
                            className="rounded-full border-4 border-amber-500"
                        />
                        <button
                            onClick={() => setEditing(!editing)}
                            className="absolute bottom-2 right-2 bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-full transition-all"
                        >
                            <Edit2 size={16} />
                        </button>
                    </div>
                    <h1 className="text-2xl mt-4 font-semibold text-white break-all">
                        {user?.name}
                    </h1>
                    <p className="text-gray-300 flex flex-col sm:flex-row sm:items-center sm:gap-2 mt-1 text-sm sm:text-base">
                        <Mail size={16} />{user?.email}
                    </p>
                </div>

                {/* Editable Form / Info Section */}
                {editing ? (
                    <form className="flex flex-col gap-3 sm:gap-4" onSubmit={handleUpdate} >
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={updatedUser.name}
                            onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
                            className="bg-transparent border border-gray-600 rounded-lg p-2 text-white focus:ring-2 focus:ring-amber-500 outline-none text-sm sm:text-base"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={updatedUser.email}
                            onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                            className="bg-transparent border border-gray-600 rounded-lg p-2 text-white focus:ring-2 focus:ring-amber-500 outline-none text-sm sm:text-base"
                        />
                        <input
                            type="numbern"
                            placeholder="Phone"
                            value={updatedUser.phone}
                            onChange={(e) => setUpdatedUser({ ...updatedUser, phone: e.target.value })}
                            className="bg-transparent border border-gray-600 rounded-lg p-2 text-white focus:ring-2 focus:ring-amber-500 outline-none text-sm sm:text-base"
                            maxLength={10}
                            minLength={10}
                        />

                        <button
                            type="submit"
                            className="bg-amber-500 hover:bg-amber-600 rounded-lg py-2 text-white font-semibold transition-all text-sm sm:text-base"
                        >
                            Save Changes
                        </button>
                    </form>
                ) : (
                    <div className="bg-white/5 p-4 rounded-xl text-gray-300 text-sm sm:text-base">
                        <h3 className="text-lg font-semibold text-white mb-3">
                            Personal Information
                        </h3>
                        <p className="flex items-center gap-2 break-all">
                            <Phone size={16} className="text-amber-500" /> +{user?.phone}
                        </p>
                        <p className="flex items-center gap-2 mt-1 break-all">
                            <MapPin size={16} className="text-amber-500" />
                            {orderData[0]?.shippingAddress.city}
                        </p>
                    </div>
                )}
                {/* Add Address */}


                {/* Order Summary */}
                <div className="bg-white/5 p-4 rounded-xl mt-8 text-sm sm:text-base">
                    <h3 className="text-lg font-semibold text-white mb-3">Recent Orders</h3>
                    {orderData?.map((order: any) => (
                        <div key={orderData[0]?._id} className="mb-4 flex flex-col sm:flex-row justify-between gap-4">
                            <div className="flex flex-col border-b border-white p-2 rounded-2xl w-full">
                                <p className="flex items-center gap-2">
                                    <ShoppingBag size={16} className="text-amber-500" />{" "}
                                    {orderData[0]?.orderItems[0]?.name}
                                </p>
                                <p className="flex items-center gap-2 mt-1">
                                    <MapPin size={16} className="text-amber-500" />{" "}{orderData[0]?.shippingAddress.addressLine1}
                                </p>
                                <div className="flex items-center gap-2 mt-1">


                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-between mt-8 gap-4">
                    <button
                        onClick={() => setEditing(!editing)}
                        className="w-full sm:w-auto px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-sm sm:text-base"
                    >
                        {editing ? "Cancel" : "Edit Profile"}
                    </button>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-sm sm:text-base">
                            <Settings size={18} /> Settings
                        </button>
                        <button
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all text-sm sm:text-base"
                            onClick={handleLogout}
                        >
                            <LogOut size={18} /> Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
