import React from 'react';
import Button from './common/Button';
import { personalInfo } from '../data/portfolioData';

/**
 * Hero Component
 * მთავარი გვერდის ბანერი და შესავალი
 */
export default function Hero() {
    return (
        <section id="home" className="pt-4 sm:pt-14 pb-4 sm:pb-8">
            <div className="max-w-3xl">
                {/* Status Badge */}
                <div className="status-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-indigo-300 mb-6 font-mono max-w-full">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                    <span className="truncate">{personalInfo.status}</span>
                </div>

                <header>
                    <h1 className="hero-title text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
                        გამარჯობა, მე ვარ <br className="hidden sm:inline" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400">
                            {personalInfo.name}
                        </span>
                    </h1>
                    <p className="hero-subtitle text-lg sm:text-2xl font-mono text-indigo-300/90 mb-5 sm:mb-6 font-medium break-words">
                        {personalInfo.role}
                    </p>
                </header>

                <p className="hero-desc text-slate-300 sm:text-slate-400 text-base sm:text-xl leading-relaxed mb-8 max-w-2xl">
                    {personalInfo.description}
                </p>

                {/* Call to Action Buttons */}
                <div className="hero-buttons flex gap-3 sm:gap-4 items-stretch sm:items-center">
                    <Button
                        as="a"
                        href="#projects"
                        variant="primary"
                        size="lg"
                        icon={
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        }
                    >
                        პროექტების ნახვა
                    </Button>
                    <Button
                        as="a"
                        href="#contact"
                        variant="secondary"
                        size="lg"
                    >
                        დამიკავშირდით
                    </Button>
                </div>
            </div>
        </section>
    );
}

