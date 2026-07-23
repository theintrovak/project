export default function Loading() {
    return (
        <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">

            {/* Hero Skeleton */}
            <section className="border-b border-slate-200 dark:border-slate-800">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">

                    <div className="max-w-3xl animate-pulse">

                        <div className="h-4 w-28 rounded-full bg-slate-200 dark:bg-slate-800" />

                        <div className="mt-6 space-y-3">
                            <div className="h-12 w-full max-w-xl rounded-xl bg-slate-200 dark:bg-slate-800 sm:h-16" />
                            <div className="h-12 w-3/4 max-w-md rounded-xl bg-slate-200 dark:bg-slate-800 sm:h-16" />
                        </div>

                        <div className="mt-8 space-y-3">
                            <div className="h-4 w-full max-w-2xl rounded-full bg-slate-200 dark:bg-slate-800" />
                            <div className="h-4 w-5/6 max-w-xl rounded-full bg-slate-200 dark:bg-slate-800" />
                        </div>

                    </div>

                </div>
            </section>


            {/* Main Content */}
            <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12">

                <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">

                    {/* Contact Information Skeleton */}
                    <div className="animate-pulse">

                        <div className="h-8 w-40 rounded-lg bg-slate-200 dark:bg-slate-800" />

                        <div className="mt-5 space-y-3">
                            <div className="h-4 w-full max-w-md rounded-full bg-slate-200 dark:bg-slate-800" />
                            <div className="h-4 w-5/6 max-w-sm rounded-full bg-slate-200 dark:bg-slate-800" />
                        </div>


                        {/* Contact Details */}
                        <div className="mt-10 space-y-7">

                            {[1, 2, 3, 4].map((item) => (
                                <div
                                    key={item}
                                    className="flex gap-4"
                                >
                                    <div className="h-12 w-12 shrink-0 rounded-2xl bg-slate-200 dark:bg-slate-800" />

                                    <div className="flex-1 space-y-3">
                                        <div className="h-3 w-20 rounded-full bg-slate-200 dark:bg-slate-800" />
                                        <div className="h-4 w-40 rounded-full bg-slate-200 dark:bg-slate-800" />
                                    </div>
                                </div>
                            ))}

                        </div>


                        {/* Support Card */}
                        <div className="mt-12 rounded-3xl border border-slate-200 p-6 dark:border-slate-800">

                            <div className="flex gap-4">

                                <div className="h-11 w-11 shrink-0 rounded-full bg-slate-200 dark:bg-slate-800" />

                                <div className="flex-1 space-y-4">
                                    <div className="h-5 w-32 rounded-full bg-slate-200 dark:bg-slate-800" />

                                    <div className="space-y-2">
                                        <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-800" />
                                        <div className="h-3 w-4/5 rounded-full bg-slate-200 dark:bg-slate-800" />
                                    </div>

                                    <div className="h-4 w-24 rounded-full bg-slate-200 dark:bg-slate-800" />
                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Contact Form Skeleton */}
                    <div className="animate-pulse rounded-3xl border border-slate-200 p-6 sm:p-8 lg:p-10 dark:border-slate-800">

                        <div className="space-y-4">
                            <div className="h-8 w-56 rounded-lg bg-slate-200 dark:bg-slate-800" />
                            <div className="h-4 w-full max-w-md rounded-full bg-slate-200 dark:bg-slate-800" />
                        </div>


                        <div className="mt-8 space-y-6">

                            {/* Input */}
                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="space-y-2"
                                >
                                    <div className="h-4 w-24 rounded-full bg-slate-200 dark:bg-slate-800" />

                                    <div className="h-12 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
                                </div>
                            ))}


                            {/* Textarea */}
                            <div className="space-y-2">

                                <div className="h-4 w-20 rounded-full bg-slate-200 dark:bg-slate-800" />

                                <div className="h-36 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />

                            </div>


                            {/* Button */}
                            <div className="h-12 w-full rounded-xl bg-slate-300 dark:bg-slate-700" />

                        </div>

                    </div>

                </div>

            </section>


            {/* Bottom CTA Skeleton */}
            <section className="border-t border-slate-200 dark:border-slate-800">

                <div className="mx-auto max-w-7xl px-5 py-16 text-center sm:px-8 sm:py-24 lg:px-12">

                    <div className="mx-auto animate-pulse space-y-5">

                        <div className="mx-auto h-9 w-64 rounded-lg bg-slate-200 dark:bg-slate-800" />

                        <div className="mx-auto h-4 w-full max-w-xl rounded-full bg-slate-200 dark:bg-slate-800" />

                    </div>

                </div>

            </section>

        </main>
    );
}