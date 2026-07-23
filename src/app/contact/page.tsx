"use client";

import { Mail, MapPin, Phone, ArrowRight, Clock, MessageCircle } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">

            {/* Hero Section */}
            <section className="relative overflow-hidden ">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">

                    <div className="max-w-3xl">
                        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                            Get in touch
                        </p>

                        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-7xl">
                            We&apos;d love to
                            <span className="block text-slate-400 dark:text-slate-500">
                                hear from you.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-400">
                            Have a question about your order, our products, or anything else?
                            Send us a message and our team will get back to you as soon as possible.
                        </p>
                    </div>

                </div>
            </section>


            {/* Main Contact Section */}
            <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12">

                <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">

                    {/* Contact Information */}
                    <div>

                        <div className="mb-10">
                            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                Let&apos;s talk
                            </h2>

                            <p className="mt-4 max-w-md leading-7 text-slate-600 dark:text-slate-400">
                                Whether you need help with an order or simply want to say hello,
                                we&apos;re here to help.
                            </p>
                        </div>


                        <div className="space-y-6">

                            {/* Email */}
                            <div className="group flex gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 transition-colors group-hover:bg-slate-200 dark:bg-slate-900 dark:group-hover:bg-slate-800">
                                    <Mail className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                        Email
                                    </p>

                                    <a
                                        href="mailto:support@example.com"
                                        className="mt-1 block font-medium transition-colors hover:text-slate-500 dark:hover:text-slate-400"
                                    >
                                        anuragchaudhary903@gmail.com                                    </a>
                                </div>
                            </div>


                            {/* Phone */}
                            <div className="group flex gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 transition-colors group-hover:bg-slate-200 dark:bg-slate-900 dark:group-hover:bg-slate-800">
                                    <Phone className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                        Phone
                                    </p>

                                    <a
                                        href="tel:+910000000000"
                                        className="mt-1 block font-medium transition-colors hover:text-slate-500 dark:hover:text-slate-400"
                                    >
                                        +91 81274 55775
                                    </a>
                                </div>
                            </div>


                            {/* Address */}
                            <div className="group flex gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 transition-colors group-hover:bg-slate-200 dark:bg-slate-900 dark:group-hover:bg-slate-800">
                                    <MapPin className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                        Visit us
                                    </p>

                                    <p className="mt-1 max-w-xs font-medium">
                                        Gandhi Nagar Ward-5
                                        <br />
                                        Siswa Bazar Maharajganj, India
                                    </p>
                                </div>
                            </div>


                            {/* Working Hours */}
                            <div className="group flex gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 transition-colors group-hover:bg-slate-200 dark:bg-slate-900 dark:group-hover:bg-slate-800">
                                    <Clock className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                        24/7 Support
                                    </p>

                                    <p className="mt-1 font-medium">
                                        Monday – Sunday
                                        <br />
                                        10:00 AM – 10:00 AM
                                    </p>
                                </div>
                            </div>

                        </div>


                        {/* Support Card */}
                        <div className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/50">

                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-sm dark:bg-slate-800">
                                    <MessageCircle className="h-5 w-5" />
                                </div>

                                <div>
                                    <h3 className="font-semibold">
                                        Need quick help?
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                        if u have any query then u can chat with our bot
                                        <br />

                                        ---------or-----------
                                        <br />
                                        you can directly message our support team
                                    </p>
                                    <div className="flex flex-col">
                                        <a
                                            href="#contact-form"
                                            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
                                        >
                                            send a message
                                            <ArrowRight className="h-4 w-4" />
                                        </a>
                                        <p>
                                            --------
                                        </p>
                                        <a
                                            href="/chat"
                                            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
                                        >
                                            Talk to our bot
                                            <ArrowRight className="h-4 w-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>


                    {/* Contact Form */}
                    <div id="contact-form" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10 dark:border-slate-800 dark:bg-slate-900">

                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold tracking-tight">
                                Send us a message
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                Fill out the form below and we&apos;ll get back to you shortly.
                            </p>
                        </div>


                        <form className="space-y-6">

                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Your name
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-500 dark:focus:border-slate-500 dark:focus:bg-slate-900 dark:focus:ring-slate-800"
                                />
                            </div>


                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Email address
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-500 dark:focus:border-slate-500 dark:focus:bg-slate-900 dark:focus:ring-slate-800"
                                />
                            </div>


                            {/* Subject */}
                            <div>
                                <label
                                    htmlFor="subject"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Subject
                                </label>

                                <input
                                    id="subject"
                                    type="text"
                                    placeholder="How can we help?"
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-500 dark:focus:border-slate-500 dark:focus:bg-slate-900 dark:focus:ring-slate-800"
                                />
                            </div>


                            {/* Message */}
                            <div>
                                <label
                                    htmlFor="message"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Message
                                </label>

                                <textarea
                                    id="message"
                                    rows={6}
                                    placeholder="Tell us how we can help..."
                                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:placeholder:text-slate-500 dark:focus:border-slate-500 dark:focus:bg-slate-900 dark:focus:ring-slate-800"
                                />
                            </div>


                            {/* Submit */}
                            <button
                                type="submit"
                                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                            >
                                Send message

                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>

                        </form>

                    </div>

                </div>

            </section>


            {/* Bottom CTA */}
            <section className="border-t border-slate-200 dark:border-slate-800">
                <div className="mx-auto max-w-7xl px-5 py-16 text-center sm:px-8 sm:py-24 lg:px-12">

                    <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                        We&apos;re here to help.
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl text-slate-600 dark:text-slate-400">
                        Your experience matters to us. Reach out whenever you need assistance.
                    </p>

                </div>
            </section>

        </main>
    );
}