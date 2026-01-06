"use client";

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-gradient-to-br from-white via-sky-50 to-emerald-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-60 pointer-events-none">
        <div className="absolute top-16 left-12 w-80 h-80 bg-amber-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-100 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-sky-700 font-semibold text-sm mb-6 border border-slate-100">
              💡 About Us
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
              We empower calm, creative teams to ship faster
            </h2>
            <p className="text-xl text-slate-600 mb-6 leading-relaxed">
              CreativeHub was born from a simple idea: professional-grade tooling should feel light, joyful, and immediately usable.
            </p>
            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
              Over 50,000 creators use our workspace to brainstorm, prototype, and launch polished experiences without the clutter.
            </p>
            <div className="flex gap-4">
              <div className="flex-1 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-3xl font-black text-slate-900 mb-2">500K+</div>
                <div className="text-slate-500">Projects Created</div>
              </div>
              <div className="flex-1 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-3xl font-black text-slate-900 mb-2">98%</div>
                <div className="text-slate-500">Satisfaction Rate</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-white rounded-3xl border border-slate-100 p-8 shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-sky-50 rounded-xl border border-sky-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-sky-400 rounded-full flex items-center justify-center text-2xl text-white">
                    ✓
                  </div>
                  <div>
                    <div className="text-slate-900 font-bold">Easy to Use</div>
                    <div className="text-slate-500 text-sm">Intuitive interface for everyone</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-sky-400 rounded-full flex items-center justify-center text-2xl text-white">
                    ⚡
                  </div>
                  <div>
                    <div className="text-slate-900 font-bold">Real-time Collaboration</div>
                    <div className="text-slate-500 text-sm">Work together seamlessly</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-sky-400 rounded-full flex items-center justify-center text-2xl text-white">
                    🎯
                  </div>
                  <div>
                    <div className="text-slate-900 font-bold">Pixel Perfect Results</div>
                    <div className="text-slate-500 text-sm">Professional output every time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
