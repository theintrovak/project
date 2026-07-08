"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import axios from "axios";
import { toast } from "react-hot-toast";

type LineItem = {
    productId: string;
    name: string;
    slug: string;
    image: string;
    quantity: number;
    size?: string;
    color?: string;
    unitPrice: number;
    totalPrice: number;
}

const PAYMENT_METHODS = [

    { id: "UPI", label: "upi" },
    { id: "COD", label: "Cash On Delivery" },
] as const;

function currency(n: number) {
    return n.toLocaleString("en-IN", { style: "currency", currency: "INR" });
}

export default function CheckoutPage() {
    const { cart } = useCart();


    const ITEMS: LineItem[] = useMemo(() =>
        cart.map((item) => ({
            productId: item.productId._id,
            name: item.productId.name,
            slug: item.productId.slug,
            image: item.productId.images[0],
            quantity: item.quantity,
            size: item.size,
            color: item.color,
            unitPrice: item.productId.price,
            totalPrice: item.quantity * item.productId.price
        }))
        , [cart]);

    const [method, setMethod] = useState<(typeof PAYMENT_METHODS)[number]["id"]>("UPI");
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);
    const [promo, setPromo] = useState("");
    const [promoApplied, setPromoApplied] = useState(false);



    const subtotal = useMemo(() => ITEMS.reduce((s, i) => s + i.unitPrice * i.quantity, 0), [ITEMS]);
    const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
    const tax = Math.round((subtotal - discount) * 0.0825);
    const total = subtotal - discount + tax;
    console.log(`discount: ${discount}, payment method: ${method}, tax: ${tax}`);
    const [shippingAddress, setShippingAddress] = useState({

        fullName: "",
        phone: "",
        country: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        postalCode: "",


    });
    const order = {
        orderItems: ITEMS,
        shippingAddress,
        pricing: {
            subtotal: subtotal,
            tax: tax,
            discount: discount,
            totalAmount: total,
        },
        payment: {
            paymentMethod: method,
        },
        coupon: promoApplied
            ? {
                couponCode: promo,
                discount: discount,
            }
            : undefined,
    };
    function applyPromo() {
        if (promo.trim().toUpperCase() === "FIRST10") setPromoApplied(true);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const loadingToast = toast.loading("Processing your order...");
        try {
            setSubmitting(true);
            const response = await axios.post("/api/orders", order);
            if (response.data.success) {
                toast.dismiss(loadingToast);
                toast.success("Order placed successfully!");
                setDone(true);
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message ?? "Something went wrong")
            }
            toast.dismiss(loadingToast);
            toast.error("Something went wrong!");
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }
    if (ITEMS.length === 0) {
        return (
            <main className="min-h-screen bg-[#F4F1EA] flex items-center justify-center px-6">
                <div className="max-w-md w-full text-center">
                    <h1 className="font-serif text-3xl text-[#1C1B19] mb-2">
                        Your cart is empty
                    </h1>
                    <p className="text-[#5C584F] mb-8">
                        Looks like you have not added anything to your cart yet.
                    </p>
                </div>
            </main>
        );
    }
    if (submitting) {
        return (
            <main className="min-h-screen bg-[#F4F1EA] flex items-center justify-center px-6">
                <div className="max-w-md w-full text-center">
                    <h1 className="font-serif text-3xl text-[#1C1B19] mb-2">
                        Processing your order
                    </h1>
                    <p className="text-[#5C584F] mb-8">
                        Please wait, we are processing your order.
                    </p>
                </div>
            </main>
        );
    }

    if (done) {
        return (
            <main className="min-h-screen bg-[#F4F1EA] flex items-center justify-center px-6">
                <div className="max-w-md w-full text-center">
                    <div className="mx-auto mb-6 w-14 h-14 rounded-full bg-[#1C1B19] flex items-center justify-center">
                        <svg width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M4 12.5l5 5L20 7"
                                stroke="#C9A24B"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <h1
                        className="font-serif text-3xl text-[#1C1B19] mb-2"
                    >{method === "COD" ? "Order placed successfully!" : "Order placed successfully!"}</h1>
                    <p className="text-[#5C584F] mb-8">
                        Receipt sent. A confirmation email is on its way, and your project kicks off within one business day.
                    </p>
                    <p className="text-sm tracking-widest uppercase text-[#9C8A5E]"> {order.orderItems.map((item) => (
                        <li key={`${item.productId}-${item.size}-${item.color}`} className="flex justify-between gap-4 text-sm">
                            <div>
                                <p className="font-medium">{item.name}</p>

                            </div>
                            <span className="whitespace-nowrap font-medium">{currency(item.unitPrice * item.quantity)}</span>
                        </li>
                    ))}
                        <h4>TOTAL = {currency(order.pricing.totalAmount)}</h4></p>

                </div>
            </main>
        );
    }


    return (
        <main className="min-h-screen bg-[#F4F1EA] text-[#1C1B19]">
            <header className="border-b border-[#1C1B19]/10">
                <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
                    <span
                        className="font-serif text-xl tracking-tight"
                    >Anurag&nbsp;Studio</span>
                    <span className="text-xs uppercase tracking-[0.2em] text-[#5C584F]">Secure checkout</span>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-[1fr_420px] gap-10">
                {/* Form column */}
                <form onSubmit={handleSubmit} className="space-y-10 order-2 lg:order-1">
                    {/* contact */}
                    <section>
                        <h2 className="font-serif text-2xl mb-5">Contact</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <Field
                                label="Full name"
                                value={shippingAddress.fullName}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })} placeholder="Anurag Kurmi "
                                required
                                minLength={3}
                                maxLength={20}
                            />
                            <Field
                                label="Phone"
                                value={shippingAddress.phone}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                                placeholder="+91 999999999"
                                required
                                minLength={10}
                                maxLength={10}
                            />
                        </div>
                    </section>
                    {/* address */}
                    <section>
                        <h2 className="font-serif text-2xl mb-5">Billing address</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <Field
                                label="Country"
                                value={shippingAddress.country}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })} placeholder="India"
                                required
                                className="sm:col-span-2"
                            />
                            <Field
                                label="Address Line 1"
                                value={shippingAddress.addressLine1}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })}
                                placeholder="123 SISWA BAZAR"
                                required
                                className="sm:col-span-2"
                            />
                            <Field
                                label="Address Line 2"
                                value={shippingAddress.addressLine2} onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine2: e.target.value })} placeholder="123 GANDHI NAGAR"

                                className="sm:col-span-2"
                            />
                            <Field
                                label="City"
                                value={shippingAddress.city}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                                placeholder="MAHARAJGANJ"
                                required
                            />
                            <Field
                                label="Postal code"
                                value={shippingAddress.postalCode} onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })} placeholder="272163"
                                required
                                pattern="[0-9]{6}"
                            />
                        </div>
                    </section>
                    {/* PAyment */}
                    <section>
                        <h2 className="font-serif text-2xl mb-5">Payment method</h2>
                        <div className="grid grid-cols-3 gap-3 mb-5">
                            {PAYMENT_METHODS.map((m) => (
                                <button
                                    type="button"
                                    key={m.id}
                                    onClick={() => setMethod(m.id)}
                                    className={`py-3 rounded-md border text-sm transition-colors ${method === m.id
                                        ? "border-[#1C1B19] bg-[#1C1B19] text-[#F4F1EA]"
                                        : "border-[#1C1B19]/20 hover:border-[#1C1B19]/40"
                                        }`}
                                >
                                    {m.label}
                                </button>
                            ))}
                        </div>


                        {method === "UPI" && (
                            <p className="text-sm text-[#5C584F] bg-white/60 border border-[#1C1B19]/10 rounded-md p-4">
                                You'll be redirected to Gpay to complete this payment after review.
                            </p>
                        )}
                        {method === "COD" && (
                            <p className="text-sm text-[#5C584F] bg-white/60 border border-[#1C1B19]/10 rounded-md p-4">
                                You'll be redirected to completed  after review.
                            </p>
                        )}
                    </section>

                    {/* submit */}

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-[#1C1B19] text-[#F4F1EA] py-4 rounded-md font-medium tracking-wide hover:bg-[#2A2823] transition-colors disabled:opacity-60"
                    >
                        {submitting ? "Processing…" : `Pay ${currency(total)}`}
                    </button>
                    <p className="text-xs text-center text-[#8B8678]">Payments are encrypted. You won't be charged until you confirm.</p>
                </form>

                {/* Receipt summary */}
                <aside className="order-1 lg:order-2">
                    <div className="bg-white rounded-lg border border-[#1C1B19]/10 shadow-sm overflow-hidden sticky top-8">
                        <div className="px-6 py-5 border-b border-dashed border-[#1C1B19]/20">
                            <h3 className="font-serif text-lg">Order summary</h3>
                        </div>

                        <ul className="px-6 py-5 space-y-4">
                            {ITEMS.map((item) => (
                                <li key={`${item.productId}-${item.size}-${item.color}`} className="flex justify-between gap-4 text-sm">
                                    <div>
                                        <p className="font-medium">{item.name}</p>

                                    </div>
                                    <span className="whitespace-nowrap font-medium">{currency(item.unitPrice * item.quantity)}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="px-6 py-4 border-t border-dashed border-[#1C1B19]/20">
                            <div className="flex gap-2">
                                <input
                                    value={promo}
                                    onChange={(e) => setPromo(e.target.value)}
                                    placeholder="Promo code"
                                    disabled={promoApplied}
                                    className="flex-1 px-3 py-2 text-sm rounded-md border border-[#1C1B19]/15 bg-[#F4F1EA] focus:outline-none focus:ring-1 focus:ring-[#C9A24B] disabled:opacity-60"
                                />
                                <button
                                    type="button"
                                    onClick={applyPromo}
                                    disabled={promoApplied || !promo}
                                    className="px-4 py-2 text-sm rounded-md border border-[#1C1B19]/20 hover:border-[#1C1B19]/40 disabled:opacity-40"
                                >
                                    {promoApplied ? "Applied" : "Apply"}
                                </button>
                            </div>
                            {promoApplied && <p className="text-xs text-[#7A8B5C] mt-2">FIRST10 applied — 10% off</p>}
                        </div>

                        <div className="px-6 py-5 border-t border-[#1C1B19]/10 space-y-2 text-sm">
                            <Row label="Subtotal" value={currency(subtotal)} />
                            {promoApplied && <Row label="Discount" value={`−${currency(discount)}`} muted />}
                            <Row label="Tax" value={currency(tax)} muted />
                            <div className="flex justify-between pt-3 mt-1 border-t border-[#1C1B19]/10 text-base font-semibold">
                                <span>Total due</span>
                                <span className="text-[#9C8A5E]">{currency(total)}</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
}

function Field({
    label,
    className = "",
    ...rest
}: { label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <label className={`block ${className}`}>
            <span className="block text-xs uppercase tracking-wider text-[#5C584F] mb-1.5">{label}</span>
            <input
                {...rest}
                className="w-full px-3.5 py-2.5 rounded-md border border-[#1C1B19]/15 bg-white focus:outline-none focus:ring-1 focus:ring-[#C9A24B] focus:border-[#C9A24B] text-sm placeholder:text-[#B9B2A2]"
            />
        </label>
    );
}

function Row({ label, value, muted = false }: { label: string; value: string; muted?: boolean }) {
    return (
        <div className={`flex justify-between ${muted ? "text-[#8B8678]" : ""}`}>
            <span>{label}</span>
            <span>{value}</span>
        </div>
    );
}