import React from 'react';

/**
 * Reusable SectionHeader Component
 * მრავალჯერ გამოყენებადი სექციის სათაურის კომპონენტი
 */
export default function SectionHeader({
    title,
    subtitle,
    accentColor = 'indigo',
    action,
    className = ''
}) {
    const colorMap = {
        indigo: 'bg-indigo-500',
        cyan: 'bg-cyan-500',
        purple: 'bg-purple-500',
        emerald: 'bg-emerald-500',
        amber: 'bg-amber-500'
    };

    const barColor = colorMap[accentColor] || 'bg-indigo-500';

    return (
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 ${className}`}>
            <div className="flex items-center gap-3">
                <span className={`w-2.5 h-7 rounded-full ${barColor} inline-block shrink-0`}></span>
                <div>
                    <h2 className="section-title text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-slate-400 text-xs sm:text-sm mt-0.5 font-mono">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
            {action && (
                <div className="flex items-center gap-2">
                    {action}
                </div>
            )}
        </div>
    );
}

