import React from 'react';

/**
 * Reusable Badge Component
 * მრავალჯერ გამოყენებადი ტეგის/ბეიჯის კომპონენტი
 */
export default function Badge({
    children,
    variant = 'indigo',
    className = ''
}) {
    const variantStyles = {
        indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
        amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        slate: 'bg-slate-800 text-slate-400 border-slate-700/50'
    };

    const style = variantStyles[variant] || variantStyles.indigo;

    return (
        <span className={`text-xs font-mono px-2.5 py-1 rounded-md border inline-flex items-center gap-1.5 ${style} ${className}`}>
            {children}
        </span>
    );
}

