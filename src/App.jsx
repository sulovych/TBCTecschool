import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';

/**
 * Main Application Component
 * პორტფოლიოს მთავარი კომპონენტი
 */
export default function App() {
    return (
        <div className="bg-slate-950 text-slate-200 min-h-screen selection:bg-indigo-500 selection:text-white relative overflow-x-hidden antialiased">
            {/* ფონური დეკორატიული განათებები */}
            <div className="fixed top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
            <div className="fixed top-1/2 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
            <div className="fixed bottom-0 left-1/3 w-72 sm:w-96 h-72 sm:h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

            {/* ჰედერი & ნავიგაცია */}
            <Navbar />

            {/* მთავარი შიგთავსი დაყოფილი კომპონენტებად */}
            <main className="main-container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-24">
                <Hero />
                <hr className="border-slate-800/60" />

                <About />
                <hr className="border-slate-800/60" />

                <Skills />
                <hr className="border-slate-800/60" />

                <Projects />
                <hr className="border-slate-800/60" />

                <Team />
                <hr className="border-slate-800/60" />

                <Contact />
            </main>

            {/* ფუტერი */}
            <Footer />
        </div>
    );
}

