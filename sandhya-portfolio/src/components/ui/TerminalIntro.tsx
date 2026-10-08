import { ArrowRightIcon, MailIcon } from './Icons';

interface TerminalIntroProps {
  onStartJourney: () => void;
  onViewWork: () => void;
  onLetsTalk: () => void;
}

export function TerminalIntro({ onStartJourney, onViewWork, onLetsTalk }: TerminalIntroProps) {
  return (
    <div className="w-full h-full flex items-center justify-start px-6 sm:px-12 lg:px-20">
      <div className="max-w-xl space-y-6 pointer-events-auto">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-mono text-purple-300">
          <span className="h-2 w-2 rounded-full bg-purple-400 animate-ping" />
          <span>Interactive Engineering Universe</span>
        </div>

        {/* Minimal Hero Headline */}
        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Hi, I'm <span className="text-gradient-purple">Sandhya B</span>
          </h1>

          <p className="mt-2 text-xl sm:text-2xl font-semibold text-gray-300">
            Full Stack Developer
          </p>
        </div>

        {/* Core Statement */}
        <div className="border-l-2 border-purple-500/40 pl-4 py-1 space-y-1 text-gray-300 text-base sm:text-lg">
          <p className="font-semibold text-white">Building interfaces.</p>
          <p className="font-medium text-gray-300">Designing APIs.</p>
          <p className="font-medium text-gray-400">Solving real problems.</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-1">
          <button
            onClick={onViewWork}
            className="flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-xs sm:text-sm font-semibold hover:bg-gray-200 transition duration-200 shadow-lg shadow-white/10"
          >
            <span>VIEW MY WORK</span>
            <ArrowRightIcon className="w-4 h-4" />
          </button>

          <button
            onClick={onLetsTalk}
            className="flex items-center gap-2 rounded-full border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 px-6 py-3 text-xs sm:text-sm font-semibold text-white transition duration-200"
          >
            <MailIcon className="w-4 h-4 text-purple-300" />
            <span>LET'S TALK</span>
          </button>
        </div>

        {/* Scroll Instruction */}
        <div className="pt-2">
          <button
            onClick={onStartJourney}
            className="group inline-flex items-center gap-2 text-xs font-mono text-purple-300/80 hover:text-purple-200 transition"
          >
            <span>↓ Scroll down or click to follow character journey</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
