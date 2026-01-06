import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Features from "./components/Features";
import About from "./components/About";
import Contact from "./components/Contact";

export default function Page() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <About />
      <Contact />
      
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <span className="text-3xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">CreativeHub</span>
          </div>
          <p className="text-gray-400 mb-4">Empowering creators worldwide since 2024</p>
          <div className="flex justify-center gap-6 mb-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
          </div>
          <p className="text-gray-500 text-sm">&copy; 2026 CreativeHub. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
