import React from 'react';

/**
 * Reusable Button Component
 * მრავალჯერ გამოყენებადი ღილაკის კომპონენტი
 */
export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    icon,
    className = '',
    disabled = false,
    onClick,
    type = 'button',
    as = 'button',
    href,
    ...props
}) {
    const variantStyles = {
        primary: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40',
        secondary: 'bg-slate-900 text-slate-200 border border-slate-800 hover:border-slate-700 hover:bg-slate-800',
        emerald: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30',
        danger: 'bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/20',
        ghost: 'bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30'
    };

    const sizeStyles = {
        sm: 'px-3 py-1.5 text-xs rounded-lg',
        md: 'px-4 py-2.5 text-sm rounded-xl',
        lg: 'px-6 py-3.5 text-base rounded-xl'
    };

    const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
    const classes = `${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size] || sizeStyles.md} ${className}`;

    if (as === 'a') {
        return (
            <a href={href} className={classes} {...props}>
                {children}
                {icon}
            </a>
        );
    }

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={classes}
            {...props}
        >
            {children}
            {icon}
        </button>
    );
}

