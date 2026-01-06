"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname() || "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-xl border-b border-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <span className="text-white font-black text-xl">✨</span>
          </div>
          <span className="text-2xl font-black bg-gradient-to-r from-sky-700 to-emerald-500 bg-clip-text text-transparent">CreativeHub</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className={`relative font-semibold transition-colors duration-200 ${active ? "text-sky-700" : "text-slate-700 hover:text-sky-700"}`}>
                {link.label}
                {active && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-500 to-emerald-400"></span>}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-slate-700 font-semibold hover:text-sky-700 transition-colors">Login</Link>
          <Link href="/register" className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-emerald-400 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:translate-y-[-1px] transition-all duration-300">Sign Up</Link>
        </div>

        <button className="md:hidden p-2 text-slate-700 hover:text-sky-700 transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 shadow-xl animate-fade-in">
          <nav className="px-6 py-4 flex flex-col gap-4">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-slate-700 font-semibold hover:text-sky-700 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>{link.label}</Link>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-slate-200">
              <Link href="/login" className="text-center py-2.5 text-slate-700 font-semibold hover:text-sky-700 transition-colors">Login</Link>
              <Link href="/register" className="text-center px-6 py-2.5 bg-gradient-to-r from-sky-500 to-emerald-400 text-white font-bold rounded-full shadow-lg">Sign Up</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
