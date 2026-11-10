import React from 'react';
import Card from './common/Card';
import SectionHeader from './common/SectionHeader';
import { aboutData } from '../data/portfolioData';

/**
 * About Component
 * "ჩემ შესახებ" სექცია Reusable Card კომპონენტის გამოყენებით
 */
export default function About() {
    return (
        <section id="about" className="scroll-mt-20 sm:scroll-mt-24">
            <SectionHeader title={aboutData.title} accentColor="indigo" />

            <Card hover={false} className="p-5 sm:p-8">
                <p className="text-slate-200 text-base sm:text-lg leading-relaxed mb-6">
                    {aboutData.bio}
                </p>

                {/* Highlights Grid (Reusable highlight items) */}
                <div className="features-grid grid gap-3 sm:gap-4 pt-4 border-t border-slate-800/60 font-mono text-sm">
                    {aboutData.highlights.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/60"
                        >
                            <span className="text-xl shrink-0">{item.icon}</span>
                            <div className="min-w-0">
                                <div className="text-slate-400 text-xs">{item.label}</div>
                                <div className="text-slate-200 font-semibold font-sans truncate">{item.value}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </section>
    );
}

