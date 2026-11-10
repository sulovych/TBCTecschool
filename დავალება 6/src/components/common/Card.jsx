import React from 'react';

/**
 * Reusable Card Component
 * მრავალჯერ გამოყენებადი ბარათის კომპონენტი მინის ეფექტით (backdrop-blur)
 * და hover ანიმაციებით.
 */
export default function Card({
    children,
    className = '',
    hover = true,
    glow = false,
    onClick,
    ...props
}) {
    const hoverClasses = hover
        ? 'hover:border-slate-700 hover:-translate-y-1 transition-all duration-300'
        : '';
    const glowClasses = glow
        ? 'border-emerald-500/60 ring-2 ring-emerald-500/20'
        : 'border-slate-800/80';

    return (
        <div
            onClick={onClick}
            className={`p-5 sm:p-7 rounded-2xl bg-slate-900/50 border ${glowClasses} backdrop-blur-sm shadow-xl flex flex-col justify-between ${hoverClasses} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

