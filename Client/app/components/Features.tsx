"use client";

export default function Features() {
  const features = [
    {
      icon: "🎨",
      title: "Intuitive Design Tools",
      description: "Create stunning visuals with our drag-and-drop interface. No design experience needed."
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Built for speed. Experience real-time collaboration without any lag or delays."
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "Your data is encrypted and protected with enterprise-grade security standards."
    },
    {
      icon: "🌈",
      title: "Customizable Themes",
      description: "Choose from hundreds of templates or create your own unique brand identity."
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description: "Your creations look perfect on any device, from mobile to desktop."
    },
    {
      icon: "🚀",
      title: "Export Anywhere",
      description: "Export in multiple formats - PNG, SVG, PDF, and more. Ready for production."
    }
  ];

  return (
    <section id="features" className="py-24 px-6 bg-gradient-to-b from-white via-sky-50 to-emerald-50/60">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-sky-100 rounded-full text-sky-700 font-semibold text-sm mb-4">
            ✨ Features
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Everything You Need to <span className="bg-gradient-to-r from-sky-600 to-emerald-500 bg-clip-text text-transparent">Create</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful tools designed for creators, by creators. Build something amazing today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-white rounded-2xl border border-slate-200 hover:border-sky-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-emerald-400 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
