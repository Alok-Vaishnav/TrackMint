"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-sky-50 to-emerald-50">
      {/* Soft floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 top-10 w-80 h-80 bg-amber-200 rounded-full blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute right-10 top-24 w-72 h-72 bg-sky-200 rounded-full blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute left-1/3 -bottom-16 w-96 h-96 bg-emerald-200 rounded-full blur-3xl opacity-35 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,195,247,0.18),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(252,211,77,0.2),transparent_30%)]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-xl rounded-full border border-amber-100 shadow-sm mb-8 animate-fade-in-down">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          <span className="text-sm text-slate-700 font-medium">✨ Fresh release — trusted by 50k creators</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight mb-6 animate-fade-in">
          Design bright, joyful products
          <span className="block bg-gradient-to-r from-sky-500 via-emerald-400 to-amber-400 bg-clip-text text-transparent">without the heavy chrome</span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-10 animate-fade-in animation-delay-200">
          A calm, light-first workspace for teams who want elegance, speed, and clarity. Build, refine, and launch with confidence.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in animation-delay-400">
          <Link
            href="/register"
            className="group relative px-8 py-4 bg-gradient-to-r from-sky-500 to-emerald-400 text-white font-bold rounded-full shadow-lg shadow-sky-200/80 hover:shadow-emerald-200 transition-all duration-300 hover:translate-y-[-2px]"
          >
            <span className="relative z-10">Start free workspace</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-600 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          <Link
            href="/features"
            className="px-8 py-4 bg-white/80 backdrop-blur-lg text-slate-800 font-semibold rounded-full border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
          >
            Watch demo →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in animation-delay-600">
          {["Active creators", "Projects shipped", "Satisfaction", "Uptime"].map((label, idx) => {
            const stats = ["50K+", "1M+", "4.9★", "99.9%"];
            return (
              <div key={label} className="p-5 bg-white/90 backdrop-blur-xl rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="text-3xl font-black text-slate-900 mb-1">{stats[idx]}</div>
                <div className="text-slate-500 text-sm">{label}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-scroll"></div>
        </div>
      </div>
    </section>
  );
}