import React from 'react';
import Card from './common/Card';
import SectionHeader from './common/SectionHeader';
import { techSkills, additionalSkills } from '../data/portfolioData';

/**
 * Skills Component
 * ტექნიკური უნარების სექცია Reusable Card კომპონენტის გამოყენებით
 */
export default function Skills() {
    const colorClasses = {
        indigo: 'text-indigo-400',
        cyan: 'text-cyan-400',
        emerald: 'text-emerald-400',
        amber: 'text-amber-400',
        rose: 'text-rose-400'
    };

    return (
        <section id="skills" className="scroll-mt-20 sm:scroll-mt-24">
            <SectionHeader title="ტექნიკური უნარები" accentColor="cyan" />

            <div className="skills-grid grid gap-5 sm:gap-6">
                {/* პროგრამირების ენები & ტექნოლოგიები */}
                <Card hover={false} className="p-5 sm:p-7">
                    <div>
                        <div className="flex items-center gap-2.5 mb-5">
                            <span className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </span>
                            <h3 className="text-lg font-bold text-white">პროგრამირების ენები &amp; ტექნოლოგიები</h3>
                        </div>

                        <ul className="space-y-3 text-sm">
                            {techSkills.map((skill, index) => (
                                <li
                                    key={index}
                                    className="skill-item p-3 sm:p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/60 flex"
                                >
                                    <span className={`font-semibold font-mono text-xs sm:text-sm shrink-0 ${colorClasses[skill.color] || 'text-indigo-400'}`}>
                                        {skill.name}:
                                    </span>
                                    <span className="text-slate-300 text-xs sm:text-sm leading-relaxed sm:ml-2">
                                        {skill.details}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>

                {/* დამატებითი უნარები */}
                <Card hover={false} className="p-5 sm:p-7">
                    <div>
                        <div className="flex items-center gap-2.5 mb-5">
                            <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </span>
                            <h3 className="text-lg font-bold text-white">დამატებითი უნარები</h3>
                        </div>

                        <ul className="space-y-3 text-sm">
                            {additionalSkills.map((skill, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-slate-950/60 border border-slate-800/60"
                                >
                                    <span className="text-emerald-400 mt-0.5 text-base shrink-0">✓</span>
                                    <div>
                                        <strong className="text-white block font-medium text-sm sm:text-base">
                                            {skill.title}
                                        </strong>
                                        <span className="text-slate-300 text-xs sm:text-sm leading-relaxed block mt-0.5">
                                            {skill.description}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>
            </div>
        </section>
    );
}

