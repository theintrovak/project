"use client";



import { useEffect, useRef, useState } from "react";
import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-mono" });
const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/* ------------------------------------------------------------------ */

const JOURNEY_STEPS = [
  { tag: "01", label: "DISCOVER", detail: "Server-fetched product grid" },
  { tag: "02", label: "PRODUCT", detail: "Slug routing, variants, stock" },
  { tag: "03", label: "CART", detail: "Server cart, size + color aware" },
  { tag: "04", label: "CHECKOUT", detail: "Address + payment method" },
  { tag: "05", label: "VALIDATE", detail: "Stock, price, existence checks" },
  { tag: "06", label: "ORDER", detail: "Snapshot saved, cart cleared" },
  { tag: "07", label: "TRACK", detail: "Order status + history" },
];

const AUTH_FLOW = [
  "Register",
  "Password hashed (bcrypt)",
  "Email verification sent",
  "Login",
  "JWT signed",
  "Stored in HTTP-only cookie",
  "Authenticated requests",
];

const CART_FLOW = ["Auth cookie read", "JWT verified → user id", "Cart looked up by userId", "MongoDB document returned"];

const ORDER_PIPELINE = [
  "Authenticate user",
  "Fetch user's cart",
  "Validate cart is non-empty",
  "Re-fetch each product from MongoDB",
  "Check product still exists",
  "Check stock ≥ requested qty",
  "Read real price from DB (ignore client price)",
  "Calculate total server-side",
  "Create + save order document",
  "Clear cart",
];

const PROBLEMS = [
  {
    n: "P1",
    title: "Async client component",
    problem: "Data fetching and interactivity were tangled in one component.",
    fix: "Server component fetches and passes props down; client component only handles events.",
  },
  {
    n: "P2",
    title: "Reading an HTTP-only cookie",
    problem: "Client JS can't read the auth cookie directly — so how does the UI know who's logged in?",
    fix: "AuthContext calls GET /api/auth/me; the browser attaches the cookie automatically; the server resolves and returns the user.",
  },
  {
    n: "P3",
    title: "One user reading another's cart",
    problem: "Nothing stops a request from asking for someone else's cart — unless identity comes from a source the client can't forge.",
    fix: "User id is derived from the verified JWT, never from a request parameter. Cart lookup is always scoped to that id.",
  },
  {
    n: "P4",
    title: "Client-side price manipulation",
    problem: "A request body can claim any price it wants — ₹1 for a ₹2,500 hoodie.",
    fix: "The client sends a product id only. The server fetches the live price from MongoDB and computes the total itself.",
  },
  {
    n: "P5",
    title: "Products deleted mid-cart",
    problem: "A product can vanish from the catalog while it's still sitting in someone's cart.",
    fix: "Order creation re-verifies every line item exists in the database before it will create the order.",
  },
  {
    n: "P6",
    title: "Overselling stock",
    problem: "A cart can request more units than remain in inventory.",
    fix: "Stock is checked against live inventory at order time, per item, and the order is rejected if it doesn't clear.",
  },
];

const STACK = [
  { name: "Next.js 16", role: "Application framework" },
  { name: "TypeScript", role: "Type safety end-to-end" },
  { name: "MongoDB", role: "Primary datastore" },
  { name: "Mongoose", role: "Schema + data modeling" },
  { name: "Tailwind CSS", role: "Styling system" },
  { name: "JWT", role: "Authentication tokens" },
  { name: "HTTP-only cookies", role: "Secure session transport" },
];

const SCHEMAS: { title: string; fields: string[] }[] = [
  { title: "User", fields: ["name", "email", "password (hashed)", "phone", "isVerified", "isAdmin", "verification / reset tokens"] },
  { title: "Product", fields: ["name", "slug", "description", "price", "category", "images[]", "sizes[]", "colors", "stock", "isFeatured"] },
  { title: "Cart", fields: ["user", "items[] → product", "quantity", "size", "color"] },
  { title: "Order", fields: ["user", "orderItems[]", "shippingAddress", "paymentMethod", "itemsPrice / shippingPrice / taxPrice / totalPrice", "paymentStatus", "orderStatus"] },
];

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
    >
      {children}
    </div>
  );
}

function Eyebrow({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-mono text-[11px] tracking-[0.25em] text-amber-600 dark:text-amber-400">
        FIG.{index}
      </span>
      <span className="h-px flex-1 max-w-[48px] bg-neutral-300 dark:bg-neutral-700" />
      <span className="font-mono text-[11px] tracking-[0.25em] text-neutral-500 dark:text-neutral-500 uppercase">
        {label}
      </span>
    </div>
  );
}

function Corner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`absolute w-4 h-4 text-neutral-300 dark:text-neutral-700 ${className}`}>
      <path d="M0 0 L0 8 M0 0 L8 0" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function Blueprint({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative border border-neutral-200 dark:border-neutral-800 ${className}`}>
      <Corner className="top-0 left-0" />
      <Corner className="top-0 right-0 rotate-90" />
      <Corner className="bottom-0 left-0 -rotate-90" />
      <Corner className="bottom-0 right-0 rotate-180" />
      {children}
    </div>
  );
}

/** Vertical pipeline with an animated pulse traveling down each connector. */
function Pipeline({ steps }: { steps: string[] }) {
  return (
    <ol className="relative pl-8">
      <span
        className="pipe-current absolute left-[7px] top-2 bottom-2 w-px bg-neutral-300 dark:bg-neutral-700"
        aria-hidden
      />
      {steps.map((s, i) => (
        <li key={i} className="relative pb-6 last:pb-0">
          <span className="absolute -left-8 top-0.5 w-3.5 h-3.5 rounded-full border-2 border-amber-500 bg-white dark:bg-neutral-950" />
          <span className="font-mono text-[11px] text-neutral-400 dark:text-neutral-600 mr-2">{String(i + 1).padStart(2, "0")}</span>
          <span className="font-medium text-neutral-800 dark:text-neutral-200 text-[15px]">{s}</span>
        </li>
      ))}
    </ol>
  );
}

function FeatureAccordion({
  title,
  tagline,
  flow,
  bullets,
  defaultOpen = false,
}: {
  title: string;
  tagline: string;
  flow: string[];
  bullets: string[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-sm overflow-hidden bg-white/60 dark:bg-neutral-950/60">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-neutral-50 dark:hover:bg-neutral-900/60 transition-colors"
        aria-expanded={open}
      >
        <span>
          <span className="block font-display font-semibold text-lg text-neutral-900 dark:text-neutral-100">{title}</span>
          <span className="block font-mono text-[12px] text-neutral-500 dark:text-neutral-500 mt-0.5">{tagline}</span>
        </span>
        <span
          className={`font-mono text-amber-600 dark:text-amber-400 text-xl leading-none shrink-0 transition-transform duration-300 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-6 pt-1 grid md:grid-cols-2 gap-8 border-t border-neutral-100 dark:border-neutral-900">
            <div className="pt-5">
              <Pipeline steps={flow} />
            </div>
            <ul className="pt-5 space-y-3">
              {bullets.map((b, i) => (
                <li key={i} className="flex gap-2.5 text-[14px] text-neutral-600 dark:text-neutral-400">
                  <span className="text-amber-500 dark:text-amber-400 mt-1">▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default function EcommerceShowcase() {
  return (
    <main
      className={`${display.variable} ${mono.variable} ${body.variable} font-[family-name:var(--font-body)] bg-[#f6f2e9] dark:bg-[#0a0a0c] text-neutral-900 dark:text-neutral-200 selection:bg-amber-400/30`}
    >
      {/* faint grid texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.4] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #00000008 1px, transparent 1px), linear-gradient(to bottom, #00000008 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden
      />

      {/* ---------------------------------------------------------- */}
      {/* HERO */}
      {/* ---------------------------------------------------------- */}
      <section className="relative px-6 sm:px-10 lg:px-16 pt-24 pb-20 max-w-6xl mx-auto">
        <div className="font-mono text-[12px] tracking-[0.25em] text-amber-600 dark:text-amber-400 mb-6">
          PROJECT SPEC — REV. 01 · FULL-STACK COMMERCE PLATFORM
        </div>
        <h1 className="font-[family-name:var(--font-display)] font-semibold text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.03] tracking-tight text-neutral-950 dark:text-white max-w-4xl">
          A complete e-commerce platform, built from the ground up.
        </h1>
        <p className="mt-6 max-w-2xl text-[17px] sm:text-[18px] leading-relaxed text-neutral-600 dark:text-neutral-400">
          From secure authentication and product discovery to server-side cart management and
          order processing — this is a real clothing business in Nepal, taken online with a modern
          Next.js, TypeScript, and MongoDB architecture.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {["Next.js 16", "TypeScript", "MongoDB", "Mongoose", "Tailwind CSS", "JWT", "HTTP-only Cookies"].map((b) => (
            <span
              key={b}
              className="font-mono text-[11px] px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-full"
            >
              {b}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#journey"
            className="px-5 py-3 bg-neutral-950 dark:bg-amber-400 text-white dark:text-neutral-950 font-medium text-sm rounded-sm hover:opacity-90 transition-opacity"
          >
            Explore the architecture
          </a>
          <a
            href="/shop"
            className="px-5 py-3 border border-neutral-300 dark:border-neutral-700 font-medium text-sm rounded-sm hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            View live store ↗
          </a>
          <a
            href="#"
            className="px-5 py-3 border border-neutral-300 dark:border-neutral-700 font-medium text-sm rounded-sm hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            View source ↗
          </a>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* PROJECT STORY */}
      {/* ---------------------------------------------------------- */}
      <section className="px-6 sm:px-10 lg:px-16 py-16 max-w-6xl mx-auto">
        <Reveal>
          <Eyebrow index="01" label="Why this exists" />
          <div className="grid lg:grid-cols-[1fr,1.4fr] gap-10">
            <h2 className="font-[family-name:var(--font-display)] font-semibold text-2xl sm:text-3xl leading-tight text-neutral-950 dark:text-white">
              Not a demo store. A real business, moved online.
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
              <p>
                This platform takes a traditional clothing business and turns it into a full
                digital commerce operation — customers browse real inventory, choose real sizes and
                colors, create accounts, and place orders that move through a complete backend
                flow, not a mocked one.
              </p>
              <p>
                The brief was never <span className="italic">"build a shopping website."</span> It
                was: build a system that handles identity, inventory, and money correctly — with
                room to grow into admin tooling and live payments.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* LIVE USER JOURNEY */}
      {/* ---------------------------------------------------------- */}
      <section id="journey" className="px-6 sm:px-10 lg:px-16 py-16 max-w-6xl mx-auto">
        <Reveal>
          <Eyebrow index="02" label="End-to-end flow" />
          <h2 className="font-[family-name:var(--font-display)] font-semibold text-2xl sm:text-3xl text-neutral-950 dark:text-white mb-10">
            The complete e-commerce flow
          </h2>
        </Reveal>

        <Reveal>
          <Blueprint className="p-6 sm:p-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 lg:gap-0">
              {JOURNEY_STEPS.map((s, i) => (
                <div key={s.tag} className="relative lg:flex lg:flex-col lg:items-center text-center lg:px-2">
                  {i < JOURNEY_STEPS.length - 1 && (
                    <span className="hidden lg:block journey-connector absolute top-[22px] left-1/2 w-full h-px bg-neutral-300 dark:bg-neutral-700" />
                  )}
                  <div className="relative z-10 mx-auto w-11 h-11 rounded-full border-2 border-amber-500 bg-[#f6f2e9] dark:bg-[#0a0a0c] flex items-center justify-center font-mono text-[12px] font-bold text-amber-600 dark:text-amber-400">
                    {s.tag}
                  </div>
                  <div className="mt-3 font-semibold text-[13px] tracking-wide text-neutral-900 dark:text-neutral-100">
                    {s.label}
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-neutral-500 dark:text-neutral-500 leading-snug">
                    {s.detail}
                  </div>
                </div>
              ))}
            </div>
          </Blueprint>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* FEATURE DEEP DIVES */}
      {/* ---------------------------------------------------------- */}
      <section className="px-6 sm:px-10 lg:px-16 py-16 max-w-6xl mx-auto">
        <Reveal>
          <Eyebrow index="03" label="The three features that matter most" />
          <h2 className="font-[family-name:var(--font-display)] font-semibold text-2xl sm:text-3xl text-neutral-950 dark:text-white mb-3">
            Feature deep-dives
          </h2>
          <p className="text-[15px] text-neutral-600 dark:text-neutral-400 max-w-2xl mb-10">
            Frontend architecture is table stakes. These three are where the backend engineering
            actually lives — click to expand each flow.
          </p>
        </Reveal>

        <Reveal className="space-y-4">
          <FeatureAccordion
            title="🔐 Authentication"
            tagline="JWT · HTTP-only cookies · email verification · password reset"
            flow={AUTH_FLOW}
            bullets={[
              "Tokens live in HTTP-only cookies, not localStorage — client-side JS never touches them.",
              "Registration → hashed password → verification email → token expiry handling.",
              "Forgot-password flow with single-use, time-limited reset tokens.",
              "Separate protected-route middleware for user vs. admin sessions.",
            ]}
            defaultOpen
          />
          <FeatureAccordion
            title="🛒 Server-Side Cart"
            tagline="Bound to the user, not the browser — persists across devices"
            flow={CART_FLOW}
            bullets={[
              "Cart items store productId + quantity + size + color — a Black Tee (M) and a Black Tee (L) are different line items.",
              "Cart is resolved from the authenticated user's id, never a client-supplied id.",
              "Persists in MongoDB, so it survives logout, device switches, and browser resets.",
            ]}
          />
          <FeatureAccordion
            title="📦 Secure Order Processing"
            tagline="The client proposes; the server decides"
            flow={ORDER_PIPELINE}
            bullets={[
              "The client can send whatever price it wants — the server ignores it entirely and reads the real price from MongoDB.",
              "Orders are rejected if a product was deleted or stock can't cover the requested quantity.",
              "Every order stores a price snapshot — a later price change never rewrites history.",
            ]}
          />
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* ORDER SNAPSHOT CALLOUT */}
      {/* ---------------------------------------------------------- */}
      <section className="px-6 sm:px-10 lg:px-16 py-10 max-w-6xl mx-auto">
        <Reveal>
          <Blueprint className="p-6 sm:p-8 grid md:grid-cols-[1.2fr,1fr] gap-8 items-center">
            <div>
              <Eyebrow index="04" label="Design decision" />
              <h3 className="font-[family-name:var(--font-display)] font-semibold text-xl text-neutral-950 dark:text-white mb-3">
                Orders remember the past, on purpose
              </h3>
              <p className="text-[14px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                Orders store purchase-time product data — name, image, unit price, total — instead
                of pointing back at the live Product document. If a hoodie goes from ₹2,500 to
                ₹3,000 next month, last month's receipt still reads ₹2,500.
              </p>
            </div>
            <div className="font-mono text-[13px] bg-neutral-950 text-neutral-300 rounded-sm p-5 leading-7">
              <div className="text-amber-400">Product snapshot</div>
              <div>├── productId</div>
              <div>├── name</div>
              <div>├── image</div>
              <div>├── quantity</div>
              <div>├── unitPrice</div>
              <div>└── totalPrice</div>
            </div>
          </Blueprint>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* PROBLEMS SOLVED */}
      {/* ---------------------------------------------------------- */}
      <section className="px-6 sm:px-10 lg:px-16 py-16 max-w-6xl mx-auto">
        <Reveal>
          <Eyebrow index="05" label="Engineering log" />
          <h2 className="font-[family-name:var(--font-display)] font-semibold text-2xl sm:text-3xl text-neutral-950 dark:text-white mb-10">
            Problems solved
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-5">
          {PROBLEMS.map((p) => (
            <Reveal key={p.n}>
              <div className="h-full border border-neutral-200 dark:border-neutral-800 rounded-sm p-5 bg-white/60 dark:bg-neutral-950/60">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-mono text-[11px] text-amber-600 dark:text-amber-400">{p.n}</span>
                  <h3 className="font-semibold text-[15px] text-neutral-900 dark:text-neutral-100">{p.title}</h3>
                </div>
                <p className="text-[13px] text-neutral-500 dark:text-neutral-500 mb-2">
                  <span className="font-medium text-neutral-600 dark:text-neutral-400">Problem — </span>
                  {p.problem}
                </p>
                <p className="text-[13px] text-neutral-600 dark:text-neutral-400">
                  <span className="font-medium text-amber-600 dark:text-amber-400">Fix — </span>
                  {p.fix}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* SYSTEM ARCHITECTURE */}
      {/* ---------------------------------------------------------- */}
      <section className="px-6 sm:px-10 lg:px-16 py-16 max-w-6xl mx-auto">
        <Reveal>
          <Eyebrow index="06" label="System architecture" />
          <h2 className="font-[family-name:var(--font-display)] font-semibold text-2xl sm:text-3xl text-neutral-950 dark:text-white mb-10">
            How a request actually travels
          </h2>
        </Reveal>
        <Reveal>
          <Blueprint className="p-6 sm:p-10">
            <div className="flex flex-col items-stretch gap-0 max-w-md mx-auto">
              {[
                { label: "Next.js UI", sub: "Server components · Client components" },
                { label: "API Routes", sub: "Auth · Products · Cart · Orders" },
                { label: "Authentication", sub: "HTTP-only cookies · JWT validation" },
                { label: "MongoDB", sub: "Users · Products · Carts · Orders" },
              ].map((layer, i, arr) => (
                <div key={layer.label} className="flex flex-col items-center">
                  <div className="w-full border border-neutral-300 dark:border-neutral-700 rounded-sm px-5 py-4 text-center bg-[#f6f2e9] dark:bg-[#0a0a0c]">
                    <div className="font-semibold text-[15px] text-neutral-900 dark:text-neutral-100">{layer.label}</div>
                    <div className="font-mono text-[11px] text-neutral-500 dark:text-neutral-500 mt-1">{layer.sub}</div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="arch-connector h-8 w-px bg-neutral-300 dark:bg-neutral-700 relative">
                      <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-r border-neutral-400 dark:border-neutral-600 rotate-45" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Blueprint>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* DATABASE ARCHITECTURE */}
      {/* ---------------------------------------------------------- */}
      <section className="px-6 sm:px-10 lg:px-16 py-16 max-w-6xl mx-auto">
        <Reveal>
          <Eyebrow index="07" label="Data model" />
          <h2 className="font-[family-name:var(--font-display)] font-semibold text-2xl sm:text-3xl text-neutral-950 dark:text-white mb-10">
            Database architecture
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SCHEMAS.map((s) => (
            <Reveal key={s.title}>
              <div className="h-full border border-neutral-200 dark:border-neutral-800 rounded-sm overflow-hidden">
                <div className="px-4 py-3 bg-neutral-950 dark:bg-amber-400 text-white dark:text-neutral-950 font-semibold text-[14px]">
                  {s.title}
                </div>
                <ul className="p-4 space-y-1.5 font-mono text-[12px] text-neutral-600 dark:text-neutral-400">
                  {s.fields.map((f, i, arr) => (
                    <li key={f}>
                      {i === arr.length - 1 ? "└── " : "├── "}
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* TECH STACK */}
      {/* ---------------------------------------------------------- */}
      <section className="px-6 sm:px-10 lg:px-16 py-16 max-w-6xl mx-auto">
        <Reveal>
          <Eyebrow index="08" label="Built with" />
          <h2 className="font-[family-name:var(--font-display)] font-semibold text-2xl sm:text-3xl text-neutral-950 dark:text-white mb-10">
            Technology stack
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STACK.map((t) => (
            <Reveal key={t.name}>
              <div className="border border-neutral-200 dark:border-neutral-800 rounded-sm p-4 hover:border-amber-500/60 transition-colors">
                <div className="font-semibold text-[14px] text-neutral-900 dark:text-neutral-100">{t.name}</div>
                <div className="font-mono text-[11px] text-neutral-500 dark:text-neutral-500 mt-1">{t.role}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* FOOTER CTA */}
      {/* ---------------------------------------------------------- */}
      <section className="px-6 sm:px-10 lg:px-16 py-24 max-w-6xl mx-auto text-center">
        <Reveal>
          <div className="font-mono text-[11px] tracking-[0.25em] text-amber-600 dark:text-amber-400 mb-4">
            END OF SPEC
          </div>
          <h2 className="font-[family-name:var(--font-display)] font-semibold text-2xl sm:text-4xl text-neutral-950 dark:text-white max-w-2xl mx-auto">
            Frontend architecture, backend engineering, and security awareness — in one build.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="/shop"
              className="px-6 py-3 bg-neutral-950 dark:bg-amber-400 text-white dark:text-neutral-950 font-medium text-sm rounded-sm hover:opacity-90 transition-opacity"
            >
              View live store ↗
            </a>
            <a
              href="#"
              className="px-6 py-3 border border-neutral-300 dark:border-neutral-700 font-medium text-sm rounded-sm hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            >
              View source on GitHub ↗
            </a>
          </div>
        </Reveal>
      </section>

      <style jsx global>{`
        @keyframes pipeCurrent {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(400%);
          }
        }
        .pipe-current::after {
          content: "";
          position: absolute;
          left: -1.5px;
          top: 0;
          width: 4px;
          height: 24%;
          background: linear-gradient(to bottom, transparent, #f59e0b, transparent);
          animation: pipeCurrent 2.6s linear infinite;
        }
        @keyframes journeyCurrent {
          0% {
            background-position: -120px 0;
          }
          100% {
            background-position: 120px 0;
          }
        }
        .journey-connector {
          background-image: linear-gradient(90deg, transparent 0%, #f59e0b 50%, transparent 100%);
          background-size: 60px 100%;
          background-repeat: repeat-x;
          animation: journeyCurrent 3s linear infinite;
          opacity: 0.5;
        }
        @media (prefers-reduced-motion: reduce) {
          .pipe-current::after,
          .journey-connector {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}