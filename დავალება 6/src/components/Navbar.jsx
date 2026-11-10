import React, { useState } from 'react';

/**
 * Navbar Component
 * ჰედერი და ნავიგაცია რესპონსიული მობილური მენიუთი
 */
export default function Navbar({ activeSection = 'home' }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { href: '#home', label: 'მთავარი', num: '01' },
        { href: '#about', label: 'ჩემ შესახებ', num: '02' },
        { href: '#skills', label: 'უნარები', num: '03' },
        { href: '#projects', label: 'პროექტები', num: '04' },
        { href: '#team', label: 'თანამშრომლები', num: '05' },
    ];

    const toggleMenu = () => setIsMenuOpen(prev => !prev);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/90 border-b border-slate-800/80 transition-all duration-300">
            <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* ლოგო */}
                <a href="#home" className="flex items-center gap-2.5 group" onClick={closeMenu}>
                    <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center font-mono font-bold text-white text-sm shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                        &lt;/&gt;
                    </span>
                    <span className="font-bold text-base sm:text-lg text-white tracking-tight group-hover:text-indigo-400 transition-colors">
                        ლუკა სულაძე
                    </span>
                </a>

                {/* დესკტოპ მენიუ */}
                <ul className="desktop-nav items-center gap-1 lg:gap-2 text-sm font-medium text-slate-300">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <a
                                href={item.href}
                                className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition-colors"
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                    <li>
                        <a
                            href="#contact"
                            className="px-3.5 py-1.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/20"
                        >
                            კონტაქტი
                        </a>
                    </li>
                </ul>

                {/* მობილური ბურგერ მენიუს ღილაკი */}
                <button
                    type="button"
                    onClick={toggleMenu}
                    aria-label="მენიუს გახსნა"
                    aria-expanded={isMenuOpen}
                    className="mobile-menu-btn items-center justify-center p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                >
                    {isMenuOpen ? (
                        <svg className="w-6 h-6 block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6 block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </nav>

            {/* მობილური ჩამოსაშლელი მენიუ */}
            <div className={`mobile-menu ${isMenuOpen ? 'is-open' : ''} border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-xl px-4 py-4 space-y-2 shadow-2xl transition-all`}>
                <ul className="flex flex-col space-y-1 font-medium text-slate-300 text-base">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <a
                                href={item.href}
                                onClick={closeMenu}
                                className="mobile-nav-link flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:text-white hover:bg-slate-900 transition-colors"
                            >
                                <span>{item.label}</span>
                                <span className="text-xs text-slate-500 font-mono">{item.num}</span>
                            </a>
                        </li>
                    ))}
                    <li className="pt-2">
                        <a
                            href="#contact"
                            onClick={closeMenu}
                            className="mobile-nav-link flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/25"
                        >
                            <span>კონტაქტი</span>
                        </a>
                    </li>
                </ul>
            </div>
        </header>
    );
}

