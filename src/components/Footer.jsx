import React from 'react';

/**
 * Footer Component
 * საიტის ფუტერი საავტორო უფლებებით
 */
export default function Footer() {
    return (
        <footer className="mt-16 sm:mt-20 border-t border-slate-800/80 bg-slate-950/60 backdrop-blur-md py-6 sm:py-8">
            <div className="footer-content max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 text-xs sm:text-sm text-slate-500">
                <p>&copy; 2026 ლუკა სულაძე. ყველა უფლება დაცულია.</p>
                <p className="font-mono text-xs text-slate-600">Built with React &amp; Tailwind CSS</p>
            </div>
        </footer>
    );
}

