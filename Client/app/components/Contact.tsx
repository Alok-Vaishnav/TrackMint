"use client";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-gradient-to-b from-white via-sky-50 to-emerald-50/60">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-sky-100 rounded-full text-sky-700 font-semibold text-sm mb-4">
            💬 Get in Touch
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Ready to Start Creating?
          </h2>
          <p className="text-xl text-gray-600">
            Join thousands of creators who are already building amazing things.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-12">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-slate-700 font-semibold mb-2">First Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-2">Last Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-2">Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-2">Message</label>
              <textarea 
                rows={5}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all resize-none"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-sky-500 to-emerald-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:translate-y-[-1px] transition-all duration-300"
            >
              Send Message 🚀
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl mb-2">📧</div>
                <div className="text-gray-900 font-semibold">Email</div>
                <div className="text-gray-600 text-sm">hello@creativehub.com</div>
              </div>
              <div>
                <div className="text-3xl mb-2">💬</div>
                <div className="text-gray-900 font-semibold">Live Chat</div>
                <div className="text-gray-600 text-sm">Available 24/7</div>
              </div>
              <div>
                <div className="text-3xl mb-2">📱</div>
                <div className="text-gray-900 font-semibold">Social Media</div>
                <div className="text-gray-600 text-sm">@creativehub</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
