import { useState } from 'react';
import { CloseIcon, MailIcon, GitHubIcon, LinkedInIcon, CheckIcon, SparklesIcon } from './Icons';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;
    setIsSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-3xl glass-panel-glow p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close contact dialog"
          className="absolute top-5 right-5 rounded-full glass-pill p-2 text-gray-400 hover:text-white hover:bg-white/15 transition"
        >
          <CloseIcon className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-full glass-pill px-3 py-1 text-xs font-mono text-purple-300">
            <SparklesIcon className="w-3.5 h-3.5 text-purple-400" />
            <span>Open to Engineering Opportunities • Hyderabad, India</span>
          </div>

          <h3 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Sandhya B
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-purple-300 font-mono">
            Software Engineer | Full Stack Development
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-300 font-mono">
            <span>📍 Hyderabad, India</span>
            <a href="tel:+916305457284" className="hover:text-purple-300 transition">
              📞 +91 6305457284
            </a>
            <a href="mailto:banothsandhya119@gmail.com" className="hover:text-purple-300 transition text-purple-300 underline">
              ✉️ banothsandhya119@gmail.com
            </a>
          </div>
        </div>

        {/* Social / Direct Connect Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
          <a
            href="https://github.com/sandhya"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl glass-pill py-2.5 px-3 text-xs font-medium text-gray-200 hover:bg-white/15 transition"
          >
            <GitHubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <a
            href="https://linkedin.com/in/sandhya"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl glass-pill py-2.5 px-3 text-xs font-medium text-gray-200 hover:bg-white/15 transition"
          >
            <LinkedInIcon className="w-4 h-4 text-[#0077b5]" />
            <span>LinkedIn</span>
          </a>

          <a
            href="mailto:banothsandhya119@gmail.com"
            className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 rounded-xl glass-pill bg-purple-600/30 hover:bg-purple-600/45 border-purple-500/50 py-2.5 px-3 text-xs font-medium text-purple-200 transition shadow-md shadow-purple-500/20"
          >
            <MailIcon className="w-4 h-4 text-purple-300" />
            <span>Email Direct</span>
          </a>
        </div>

        {/* Form or Confirmation */}
        {isSubmitted ? (
          <div className="rounded-2xl border border-emerald-500/35 bg-emerald-500/10 backdrop-blur-xl p-6 text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <CheckIcon className="w-6 h-6" />
            </div>
            <h4 className="text-base font-semibold text-white">Message Dispatched!</h4>
            <p className="text-xs text-gray-300 max-w-sm mx-auto">
              Thank you for reaching out, {formState.name || 'there'}! I’ll review your message and reply promptly.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormState({ name: '', email: '', message: '' });
              }}
              className="mt-2 text-xs font-mono text-emerald-400 hover:underline"
            >
              Send another note
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                placeholder="Recruiter / Collaborator Name"
                className="w-full rounded-xl glass-card px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                placeholder="name@company.com"
                className="w-full rounded-xl glass-card px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-1">
                Message / Role Details
              </label>
              <textarea
                rows={4}
                required
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder="Hello Sandhya, we were impressed by your full-stack projects..."
                className="w-full rounded-xl glass-card px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl glass-pill bg-purple-600/40 hover:bg-purple-600/60 border-purple-500/50 py-3 text-xs font-semibold text-white transition shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2"
            >
              <span>SEND MESSAGE</span>
              <SparklesIcon className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
