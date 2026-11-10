import React, { useState } from 'react';
import Card from './common/Card';
import SectionHeader from './common/SectionHeader';
import Button from './common/Button';
import { personalInfo } from '../data/portfolioData';

/**
 * Contact Component
 * საკონტაქტო ინფო და ფორმა (POST /posts)
 */
export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(null); // { message, type }
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const payload = {
            title: name,
            body: message,
            email: email,
            userId: 1
        };

        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();

            setStatus({
                type: 'success',
                text: `შეტყობინება წარმატებით გაიგზავნა! ID: #${data.id} (POST 201 Created)`
            });
            setName('');
            setEmail('');
            setMessage('');
        } catch (err) {
            setStatus({
                type: 'error',
                text: `შეტყობინების გაგზავნა ვერ მოხერხდა: ${err.message}`
            });
        } finally {
            setSubmitting(false);
            setTimeout(() => setStatus(null), 7000);
        }
    };

    return (
        <section id="contact" className="scroll-mt-20 sm:scroll-mt-24">
            <SectionHeader title="კონტაქტი" accentColor="emerald" />

            <div className="contact-layout grid gap-6 sm:gap-8 items-start">
                {/* საკონტაქტო ინფო */}
                <div className="space-y-4 sm:space-y-6">
                    <p className="text-slate-300 text-base leading-relaxed">
                        დამიკავშირდით პროექტების ან თანამშრომლობისთვის:
                    </p>

                    <address className="not-italic space-y-3 sm:space-y-4">
                        <a
                            href={`mailto:${personalInfo.email}`}
                            className="contact-link flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/60 transition-all group"
                        >
                            <span className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform shrink-0">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </span>
                            <div className="min-w-0 flex-1">
                                <span className="text-xs text-slate-400 block">Email</span>
                                <span className="contact-link-text text-white font-medium text-xs sm:text-sm truncate block group-hover:text-indigo-400 transition-colors">
                                    {personalInfo.email}
                                </span>
                            </div>
                        </a>

                        <a
                            href={personalInfo.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-link flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/60 transition-all group"
                        >
                            <span className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-white group-hover:scale-110 transition-transform shrink-0">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                </svg>
                            </span>
                            <div className="min-w-0 flex-1">
                                <span className="text-xs text-slate-400 block">GitHub</span>
                                <span className="contact-link-text text-white font-medium text-xs sm:text-sm truncate block group-hover:text-indigo-400 transition-colors">
                                    {personalInfo.githubUsername}
                                </span>
                            </div>
                        </a>
                    </address>
                </div>

                {/* ფორმა (Reusable Card) */}
                <Card hover={false} className="contact-form-wrapper p-5 sm:p-8">
                    <h3 className="text-lg font-bold text-white mb-5 sm:mb-6 flex items-center gap-2">
                        <span>✉️</span> შეტყობინების გაგზავნა (POST)
                    </h3>

                    {status && (
                        <div className={`p-4 rounded-xl border text-sm mb-4 ${
                            status.type === 'success'
                                ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-200'
                                : 'bg-rose-950/70 border-rose-500/50 text-rose-200'
                        }`}>
                            {status.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">
                                სახელი:
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                placeholder="თქვენი სახელი"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-base sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                                ელ-ფოსტა:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-base sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1.5">
                                შეტყობინება:
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                required
                                placeholder="თქვენი შეტყობინება..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-base sm:text-sm resize-none"
                            ></textarea>
                        </div>

                        <div>
                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                disabled={submitting}
                                className="w-full sm:w-auto"
                                icon={
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                }
                            >
                                {submitting ? 'იგზავნება...' : 'გაგზავნა (POST)'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </section>
    );
}

