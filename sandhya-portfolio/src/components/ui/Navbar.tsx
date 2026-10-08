import { useState } from 'react';
import { MailIcon } from './Icons';
import { chapters } from '../../data/journey';

interface NavbarProps {
  onNavigate: (progress: number) => void;
  onOpenContact: () => void;
  isScrolled: boolean;
  activeChapterIndex: number;
  currentProgress: number;
}

export function Navbar({
  onNavigate,
  onOpenContact,
  isScrolled,
  activeChapterIndex,
  currentProgress,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentChapter = chapters[activeChapterIndex] || chapters[0];

  const navItems = [
    { label: 'Home', progress: 0.0, chapterIdx: 0 },
    { label: 'Journey', progress: 0.08, chapterIdx: 0 },
    { label: 'Skills', progress: 0.22, chapterIdx: 1 },
    { label: 'Debug', progress: 0.36, chapterIdx: 2 },
    { label: 'Projects', progress: 0.52, chapterIdx: 3 },
    { label: 'Experience', progress: 0.72, chapterIdx: 4 },
    { label: 'Growth', progress: 0.86, chapterIdx: 5 },
    { label: 'Future', progress: 0.96, chapterIdx: 6 },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass-panel border-b border-white/15 py-2.5 shadow-2xl'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Left: Brand + Active Chapter Breadcrumb Tag */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate(0.0)}
            className="text-left font-bold tracking-tight text-lg text-white group flex items-center"
          >
            <span>SANDHYA</span>
            <span className="text-purple-400 group-hover:text-purple-300 transition">.</span>
          </button>

          {/* Active Chapter HUD Tag integrated into Navbar */}
          <div className="hidden sm:flex items-center gap-2 rounded-full glass-pill px-3 py-1 text-[11px] font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-purple-300 font-semibold uppercase">
              {currentChapter.chapterNumber}
            </span>
            <span className="text-gray-500">/</span>
            <span className="text-gray-300 uppercase tracking-wide">
              {currentChapter.title}
            </span>
          </div>
        </div>

        {/* Center: Desktop Nav Pills */}
        <nav className="hidden lg:flex items-center gap-1 rounded-full glass-pill p-1.5">
          {navItems.map((item) => {
            const isActive = activeChapterIndex === item.chapterIdx;
            return (
              <button
                key={item.label}
                onClick={() => onNavigate(item.progress)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition duration-200 ${
                  isActive
                    ? 'bg-purple-600/40 text-white shadow-md shadow-purple-500/25 border border-purple-500/50 backdrop-blur-md'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Journey Progress & Contact Button */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 rounded-full glass-pill px-3 py-1 text-[11px] font-mono text-gray-300">
            <span>JOURNEY:</span>
            <span className="text-purple-300 font-bold">
              {Math.round(currentProgress * 100)}%
            </span>
          </div>

          <button
            onClick={onOpenContact}
            className="flex items-center gap-2 rounded-full glass-pill bg-purple-600/25 hover:bg-purple-600/40 border-purple-500/40 hover:border-purple-400/60 px-4 py-1.5 text-xs font-semibold text-purple-200 transition duration-200 shadow-lg shadow-purple-500/25"
          >
            <MailIcon className="w-3.5 h-3.5 text-purple-300" />
            <span>LET'S TALK</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="lg:hidden rounded-xl glass-pill p-2 text-gray-300 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-t border-b border-white/10 px-6 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                onNavigate(item.progress);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 font-mono transition"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
