"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function StudentLoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* ── Left Panel ── */}
      <div className="relative hidden md:flex md:w-1/2 flex-col justify-between p-10 overflow-hidden">
        {/* Background photo */}
        <Image
          src="/18900-SW-106th-Ave-Miami-FL-Building-Photo-2-LargeHighDefinition.webp"
          alt="Rise Preparatory Academy campus"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-navy/75" />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/">
            <Image
              src="/slazzer-preview-u8tbq.png"
              alt="Rise Preparatory Academy"
              width={150}
              height={45}
              className="object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </Link>
        </div>

        {/* Motto block */}
        <div className="relative z-10 max-w-sm">
          <blockquote className="border-l-4 border-gold pl-6">
            <p className="font-serif italic text-white text-xl md:text-2xl leading-relaxed">
              &ldquo;Empowering students to become scholars.&rdquo;
            </p>
          </blockquote>
          <p className="mt-4 text-cream/60 text-xs font-sans uppercase tracking-widest">
            Rise Preparatory Academy &middot; Cutler Bay, FL
          </p>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 min-h-screen bg-cream px-6 py-14">

        {/* Mobile logo */}
        <div className="md:hidden mb-8">
          <Link href="/">
            <Image
              src="/slazzer-preview-u8tbq.png"
              alt="Rise Preparatory Academy"
              width={140}
              height={42}
              className="object-contain"
              style={{ filter: "brightness(0) saturate(100%) invert(13%) sepia(61%) saturate(700%) hue-rotate(199deg)" }}
            />
          </Link>
        </div>

        <div className="w-full max-w-sm">

          {/* Heading */}
          <div className="mb-8">
            <h1 className="font-serif text-navy text-3xl mb-1">Student Portal</h1>
            <p className="text-gray-700 text-sm">Sign in to access your academic dashboard.</p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-navy mb-1.5">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="student@risepreparatory.org"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-navy bg-white focus:outline-none focus:ring-2 focus:ring-navy placeholder:text-gray-400 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-navy mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 text-sm text-navy bg-white focus:outline-none focus:ring-2 focus:ring-navy placeholder:text-gray-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-0 top-0 h-full w-11 flex items-center justify-center text-gray-400 hover:text-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy rounded-r-lg"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Sign In */}
            <button
              type="submit"
              className="btn-primary w-full text-center justify-center"
            >
              Sign In
            </button>
          </form>

          {/* Helper links */}
          <div className="mt-6 flex flex-col items-center gap-2 text-xs">
            <a href="#" className="text-gray-700 hover:text-navy transition-colors">
              Forgot your password?
            </a>
            <span className="text-gray-700">
              Need help?{" "}
              <Link href="/contact" className="text-navy underline underline-offset-2 hover:text-gold transition-colors">
                Contact Admissions
              </Link>
            </span>
          </div>

          {/* Footer note */}
          <p className="mt-10 text-center text-[0.65rem] text-gray-600">
            © {new Date().getFullYear()} Rise Preparatory Academy · For students only
          </p>
        </div>
      </div>
    </div>
  );
}
