import { chapters } from '../../data/journey';

interface ChapterOverlayProps {
  activeChapterIndex: number;
  onJumpToChapter: (progress: number) => void;
}

export function ChapterOverlay({
  activeChapterIndex,
  onJumpToChapter,
}: ChapterOverlayProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-30 flex flex-col justify-between p-6 sm:p-10">
      {/* Spacer to replace old top bar */}
      <div />

      {/* Right Side Journey Progress Dots */}
      <div className="pointer-events-auto fixed right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3">
        {chapters.map((ch, idx) => {
          const isActive = idx === activeChapterIndex;
          const chapterMidProgress = (ch.progressRange[0] + ch.progressRange[1]) / 2;

          return (
            <button
              key={ch.id}
              onClick={() => onJumpToChapter(chapterMidProgress)}
              className="group relative flex items-center justify-end"
              title={`${ch.chapterNumber}: ${ch.title}`}
            >
              {/* Tooltip on hover */}
              <span className="absolute right-7 mr-2 whitespace-nowrap rounded-xl glass-pill px-3 py-1 text-[11px] font-mono text-gray-200 opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none">
                {ch.chapterNumber} • {ch.title}
              </span>

              {/* Dot */}
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? 'h-6 w-2 bg-gradient-to-b from-purple-400 to-indigo-500 shadow-[0_0_12px_rgba(168,85,247,0.8)]'
                    : 'h-2 w-2 bg-white/20 group-hover:bg-white/60'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Bottom Hint */}
      <div className="flex items-end justify-center pb-2">
        {activeChapterIndex === 0 && (
          <div className="pointer-events-none flex items-center gap-2 rounded-full glass-pill px-4 py-1.5 text-[11px] font-mono text-purple-200/90 shadow-lg shadow-purple-500/10">
            <span>Scroll to walk through universe</span>
            <span className="animate-bounce">↓</span>
          </div>
        )}
      </div>
    </div>
  );
}
