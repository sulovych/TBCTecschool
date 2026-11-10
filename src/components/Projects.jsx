import React from 'react';
import Card from './common/Card';
import SectionHeader from './common/SectionHeader';
import Badge from './common/Badge';
import { projectsData } from '../data/portfolioData';

/**
 * Projects Component
 * პროექტების სექცია Reusable Card და Badge კომპონენტების გამოყენებით
 */
export default function Projects() {
    return (
        <section id="projects" className="scroll-mt-20 sm:scroll-mt-24">
            <SectionHeader title="პროექტები" accentColor="purple" />

            <div className="projects-grid grid gap-5 sm:gap-6">
                {projectsData.map((project) => (
                    <Card
                        key={project.id}
                        hover={true}
                        className="project-card group p-5 sm:p-6"
                    >
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <Badge variant={project.tagVariant || 'indigo'}>
                                    {project.tag}
                                </Badge>
                                <span className="text-slate-500 group-hover:text-indigo-400 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-slate-300 sm:text-slate-400 text-sm leading-relaxed">
                                {project.description}
                            </p>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}

