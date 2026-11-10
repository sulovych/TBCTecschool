import React, { useEffect } from 'react';

/**
 * Reusable Modal Component
 * მრავალჯერ გამოყენებადი მოდალური ფანჯარა
 */
export default function Modal({
    isOpen,
    onClose,
    title,
    icon,
    children,
    footer,
    maxWidth = 'max-w-lg'
}) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="modal-overlay"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className={`bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 ${maxWidth} w-full shadow-2xl relative animate-[slideDown_0.2s_ease-out]`}>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 truncate pr-2">
                        {icon && <span>{icon}</span>}
                        <span>{title}</span>
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-slate-400 hover:text-white text-lg font-bold p-1 cursor-pointer transition-colors"
                        aria-label="დახურვა"
                    >
                        ✕
                    </button>
                </div>

                <div className="modal-body">
                    {children}
                </div>

                {footer && (
                    <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end gap-2">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}

