"use client";

import { useMemo, useState } from "react";

type LineItem = {
    id: string;
    name: string;
    detail: string;
    qty: number;
    price: number;
};

const ITEMS: LineItem[] = [
    { id: "1", name: "Next.js Storefront Build", detail: "5-page site, App Router, CMS wired", qty: 1, price: 1450 },
    { id: "2", name: "Stripe Integration", detail: "Checkout + webhooks", qty: 1, price: 350 },
    { id: "3", name: "Priority revisions", detail: "2 rounds, 48h turnaround", qty: 1, price: 150 },
];

const PAYMENT_METHODS = [
    { id: "card", label: "Card" },
    { id: "paypal", label: "PayPal" },
    { id: "bank", label: "Bank transfer" },
] as const;

function currency(n: number) {
    return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export default function CheckoutPage() {
    const [method, setMethod] = useState<(typeof PAYMENT_METHODS)[number]["id"]>("card");
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);
    const [promo, setPromo] = useState("");
    const [promoApplied, setPromoApplied] = useState(false);

    const subtotal = useMemo(() => ITEMS.reduce((s, i) => s + i.price * i.qty, 0), []);
    const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
    const tax = Math.round((subtotal - discount) * 0.0825);
    const total = subtotal - discount + tax;

    function applyPromo() {
        if (promo.trim().toUpperCase() === "FIRST10") setPromoApplied(true);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            setDone(true);
        }, 1200);
    }

    if (done) {
        return (
            <main className="min-h-screen bg-[#F4F1EA] flex items-center justify-center px-6">
                <div className="max-w-md w-full text-center">
                    <div className="mx-auto mb-6 w-14 h-14 rounded-full bg-[#1C1B19] flex items-center justify-center">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <path d="M4 12.5l5 5L20 7" stroke="#C9A24B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h1 className="font-serif text-3xl text-[#1C1B19] mb-2">Payment received</h1>
                    <p className="text-[#5C584F] mb-8">
                        Receipt sent. A confirmation email is on its way, and your project kicks off within one business day.
                    </p>
                    <p className="text-sm tracking-widest uppercase text-[#9C8A5E]">Order #4471 · {currency(total)}</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F4F1EA] text-[#1C1B19]">
            <header className="border-b border-[#1C1B19]/10">
                <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
                    <span className="font-serif text-xl tracking-tight">Anurag&nbsp;Studio</span>
                    <span className="text-xs uppercase tracking-[0.2em] text-[#5C584F]">Secure checkout</span>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-[1fr_420px] gap-10">
                {/* Form column */}
                <form onSubmit={handleSubmit} className="space-y-10 order-2 lg:order-1">
                    <section>
                        <h2 className="font-serif text-2xl mb-5">Contact</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <Field label="Full name" placeholder="Jordan Hayes" required />
                            <Field label="Email" type="email" placeholder="jordan@company.com" required />
                        </div>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl mb-5">Billing address</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <Field label="Country" placeholder="United States" required className="sm:col-span-2" />
                            <Field label="Address" placeholder="123 Market St" required className="sm:col-span-2" />
                            <Field label="City" placeholder="Austin" required />
                            <Field label="Postal code" placeholder="78701" required />
                        </div>
                    </section>

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

                        {method === "card" && (
                            <div className="grid sm:grid-cols-2 gap-4">
                                <Field label="Card number" placeholder="4242 4242 4242 4242" required className="sm:col-span-2" />
                                <Field label="Expiry" placeholder="MM / YY" required />
                                <Field label="CVC" placeholder="123" required />
                            </div>
                        )}
                        {method === "paypal" && (
                            <p className="text-sm text-[#5C584F] bg-white/60 border border-[#1C1B19]/10 rounded-md p-4">
                                You'll be redirected to PayPal to complete this payment after review.
                            </p>
                        )}
                        {method === "bank" && (
                            <p className="text-sm text-[#5C584F] bg-white/60 border border-[#1C1B19]/10 rounded-md p-4">
                                Bank details and a payment reference will be emailed once you confirm the order.
                            </p>
                        )}
                    </section>

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
                                <li key={item.id} className="flex justify-between gap-4 text-sm">
                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-[#8B8678]">{item.detail}</p>
                                    </div>
                                    <span className="whitespace-nowrap font-medium">{currency(item.price * item.qty)}</span>
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