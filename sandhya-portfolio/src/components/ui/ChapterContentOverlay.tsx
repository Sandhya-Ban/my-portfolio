import { useState } from 'react';
import type { ProjectData } from '../../types/portfolio';
import { projectsData } from '../../data/projects';
import { skillsData } from '../../data/skills';
import { debuggingCaseStudy } from '../../data/debugging';
import {
  workExperience,
  educationInfo,
  certificationsList,
  experienceStack,
  growthConcepts,
} from '../../data/experience';
import {
  ArrowRightIcon,
  MailIcon,
  GitHubIcon,
  LinkedInIcon,
  CheckIcon,
  AlertTriangleIcon,
  SparklesIcon,
} from './Icons';
import animeAvatar from '../../assets/anime-avatar.jpg';
import realProfile from '../../assets/profile.jpeg';

interface ChapterContentOverlayProps {
  activeChapterIndex: number;
  activeSkillId: string;
  onSelectSkill: (id: string) => void;
  onSelectProject: (p: ProjectData) => void;
  onNavigate: (progress: number) => void;
  onOpenContact: () => void;
}

export function ChapterContentOverlay({
  activeChapterIndex,
  activeSkillId,
  onSelectSkill,
  onSelectProject,
  onNavigate,
  onOpenContact,
}: ChapterContentOverlayProps) {
  const [experienceTab, setExperienceTab] = useState<'timeline' | 'pipeline'>('timeline');
  const [activeExpId, setActiveExpId] = useState(workExperience[0].id);
  const [showRealPhoto, setShowRealPhoto] = useState(false);

  const activeSkill = skillsData.find((s) => s.id === activeSkillId) || skillsData[1];
  const selectedRole = workExperience.find((w) => w.id === activeExpId) || workExperience[0];

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex items-center justify-start px-5 sm:px-10 lg:px-16 select-none">
      {/* CHAPTER 01: INTRO */}
      {activeChapterIndex === 0 && (
        <div className="max-w-xl space-y-4 pointer-events-auto chapter-enter">
          {/* Top Developer Avatar & Identity Card */}
          <div className="flex items-center gap-4 rounded-3xl glass-panel-glow p-4">
            {/* Interactive Avatar Container */}
            <div
              className="relative group cursor-pointer flex-shrink-0"
              onClick={() => setShowRealPhoto(!showRealPhoto)}
              title="Click to toggle between Anime Guide and Real Photo"
            >
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl overflow-hidden border-2 border-purple-400/80 shadow-lg shadow-purple-500/40 transition-transform duration-300 group-hover:scale-105">
                <img
                  src={showRealPhoto ? realProfile : animeAvatar}
                  alt="Sandhya B — Full Stack Developer"
                  className="h-full w-full object-cover transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-1">
                  <span className="text-[9px] font-mono text-purple-200 bg-black/60 px-1.5 py-0.5 rounded">
                    {showRealPhoto ? 'Real' : 'Anime'} ⇄
                  </span>
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#070c1a]"></span>
              </span>
            </div>

            {/* Profile Intro beside photo */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="rounded-full glass-pill-purple px-2.5 py-0.5 text-[10px] font-mono font-semibold text-purple-200">
                  {showRealPhoto ? 'Verified Real Photo' : 'Anime Developer Guide'}
                </span>
                <button
                  onClick={() => setShowRealPhoto(!showRealPhoto)}
                  className="text-[10px] font-mono text-gray-400 hover:text-purple-300 underline transition"
                >
                  {showRealPhoto ? 'Switch to Anime ⇄' : 'Switch to Real ⇄'}
                </button>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 leading-tight">
                Sandhya B
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-purple-300 font-mono">
                Software Engineer | Full Stack Development
              </p>
              <p className="text-[11px] text-gray-400 font-mono mt-0.5">
                📍 Hyderabad, India • 📞 +91 6305457284
              </p>
            </div>
          </div>

          {/* Home-page summary */}
          <div className="rounded-3xl glass-panel p-5 space-y-2.5 text-xs sm:text-sm text-gray-300">
            <p className="leading-relaxed">
              I build thoughtful full-stack products, from polished interfaces to reliable APIs and databases. I improved
              Hospital Management System page load times by{' '}
              <span className="text-emerald-400 font-semibold">20%</span> and built the{' '}
              <span className="text-purple-300 font-semibold">Divine Food platform end-to-end</span>—turning real needs
              into maintainable software with React, Python, FastAPI, and MySQL.
            </p>

            <div className="pt-2.5 flex flex-wrap gap-2 text-[11px] font-mono text-gray-300 border-t border-white/10">
              <span className="rounded-lg glass-pill px-2.5 py-1 text-gray-200">📍 Hyderabad, India</span>
              <span className="rounded-lg glass-pill px-2.5 py-1 text-gray-200">🎓 B.Tech CSE (CGPA: 8.5)</span>
              <span className="rounded-lg glass-pill px-2.5 py-1 text-purple-300">⚡ React • Python • MySQL</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => onNavigate(0.52)}
              className="flex items-center gap-2 rounded-full bg-white text-black px-6 py-2.5 text-xs sm:text-sm font-bold hover:bg-gray-200 transition duration-200 shadow-xl shadow-white/15"
            >
              <span>VIEW MY WORK</span>
              <ArrowRightIcon className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenContact}
              className="flex items-center gap-2 rounded-full glass-pill bg-purple-600/30 hover:bg-purple-600/45 border-purple-500/45 px-6 py-2.5 text-xs sm:text-sm font-semibold text-purple-200 transition duration-200 shadow-lg shadow-purple-500/25"
            >
              <MailIcon className="w-4 h-4 text-purple-300" />
              <span>LET'S TALK</span>
            </button>
          </div>

          <div className="pt-1 text-xs font-mono text-purple-300/80">
            <button
              onClick={() => onNavigate(0.22)}
              className="group inline-flex items-center gap-1.5 hover:text-white transition"
            >
              <span>↓ Scroll or click to follow character journey</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      )}

      {/* CHAPTER 02: DEVELOPER DNA */}
      {activeChapterIndex === 1 && (
        <div className="max-w-lg space-y-4 pointer-events-auto chapter-enter">
          <div className="rounded-3xl glass-panel-glow p-5 sm:p-6 max-h-[82vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-semibold">
                Chapter 02 • Developer DNA
              </span>
              <span className="text-[10px] font-mono text-gray-400">Core Technical Constellation</span>
            </div>

            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-white">
              Technical Skill Matrix
            </h2>
            <p className="mt-1.5 text-xs text-gray-300 leading-relaxed">
              Curated stack across Frontend, Backend, Databases, and Core Engineering Concepts from real-world production.
            </p>

            {/* Quick Skill Selector Pills */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {['react', 'typescript', 'python', 'fastapi', 'mysql', 'postgresql', 'redux', 'tailwind', 'oop', 'git'].map(
                (id) => {
                  const s = skillsData.find((item) => item.id === id);
                  if (!s) return null;
                  const isActive = activeSkillId === id;
                  return (
                    <button
                      key={id}
                      onClick={() => onSelectSkill(id)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-mono transition ${
                        isActive
                          ? 'bg-purple-600/70 border border-purple-400 text-white font-semibold shadow-md shadow-purple-500/40 backdrop-blur-md'
                          : 'glass-pill text-gray-300 hover:text-white hover:border-purple-400/40'
                      }`}
                    >
                      {s.name}
                    </button>
                  );
                }
              )}
            </div>

            {/* Active Skill Details & Code Snippet */}
            {activeSkill && (
              <div className="mt-4 rounded-2xl glass-card p-4 space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-white/10 text-xs font-mono">
                  <span className="font-semibold text-white">{activeSkill.name}</span>
                  <span className="text-[10px] text-purple-300 uppercase tracking-wider">{activeSkill.category}</span>
                </div>
                <p className="text-xs text-gray-300">{activeSkill.description}</p>

                {activeSkill.codeSnippet && (
                  <div className="pt-2 font-mono text-[10px] text-purple-200 overflow-x-auto">
                    <div className="text-[9px] text-gray-400 mb-1 flex items-center justify-between">
                      <span>Production Implementation</span>
                      <span className="text-emerald-400">● Verified</span>
                    </div>
                    <pre className="p-2.5 rounded-xl glass-card border border-white/5">
                      <code>{activeSkill.codeSnippet}</code>
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* CHAPTER 03: HOW I THINK */}
      {activeChapterIndex === 2 && (
        <div className="max-w-lg space-y-4 pointer-events-auto chapter-enter">
          <div className="rounded-3xl glass-panel-blue p-5 sm:p-6 max-h-[82vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 font-semibold">
                Chapter 03 • How I Think
              </span>
              <span className="rounded-full glass-pill px-2.5 py-0.5 text-[10px] font-mono font-semibold text-emerald-400 border-emerald-500/40">
                20% Faster Load Verified
              </span>
            </div>

            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-white">
              Root Cause Diagnostics
            </h2>
            <p className="mt-1.5 text-xs text-gray-300 leading-relaxed">
              <strong className="text-white">Incident:</strong> {debuggingCaseStudy.problemSummary}
            </p>

            {/* Diagnostic trace steps */}
            <div className="mt-3.5 space-y-1.5 font-mono text-[10px]">
              {debuggingCaseStudy.steps.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between rounded-xl glass-card px-3 py-2 transition hover:bg-white/[0.07]"
                >
                  <div className="flex items-center gap-2">
                    {s.status === 'success' ? (
                      <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <AlertTriangleIcon className="w-3.5 h-3.5 text-amber-400" />
                    )}
                    <span className={s.status === 'success' ? 'text-emerald-300 font-semibold' : 'text-amber-300 font-semibold'}>
                      {s.title}
                    </span>
                  </div>
                  <span className="text-[9px] text-gray-400">{s.layer}</span>
                </div>
              ))}
            </div>

            <div className="mt-3.5 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-gray-400">
              <span>Frontend (React.js) ↓ REST API ↓ MySQL 8.0</span>
              <span className="text-emerald-400 font-semibold">50+ Users Supported ✓</span>
            </div>
          </div>
        </div>
      )}

      {/* CHAPTER 04: SYSTEMS I'VE BUILT */}
      {activeChapterIndex === 3 && (
        <div className="max-w-lg space-y-4 pointer-events-auto chapter-enter">
          <div className="rounded-3xl glass-panel-glow p-5 sm:p-6 max-h-[82vh] overflow-y-auto">
            <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-semibold">
              Chapter 04 • Systems I've Built
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-white">
              Featured Projects
            </h2>
            <p className="mt-1.5 text-xs text-gray-300 leading-relaxed">
              Click any 3D tower or select a project below to inspect the architecture and test the live interactive dashboard.
            </p>

            <div className="mt-4 space-y-2.5">
              {projectsData.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onSelectProject(p)}
                  className="w-full flex items-center justify-between rounded-2xl glass-card-hover p-3.5 text-left group"
                >
                  <div className="pr-2">
                    <div className="text-xs font-bold text-white group-hover:text-purple-300 transition flex items-center gap-2">
                      <span>{p.title}</span>
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: p.accentColor }}
                      />
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono mt-0.5 line-clamp-1">
                      {p.subtitle}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {p.technologies.slice(0, 3).map((t) => (
                        <span key={t} className="rounded-md glass-pill px-2 py-0.5 text-[9px] font-mono text-purple-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 rounded-full glass-pill px-2.5 py-1 text-[11px] font-mono text-purple-300 group-hover:text-white group-hover:border-purple-400/60 transition whitespace-nowrap">
                    <span>Inspect</span>
                    <span>→</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CHAPTER 05: EXPERIENCE & PIPELINE */}
      {activeChapterIndex === 4 && (
        <div className="max-w-xl space-y-4 pointer-events-auto chapter-enter">
          <div className="rounded-3xl glass-panel p-5 sm:p-6 max-h-[82vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-semibold">
                  Chapter 05 • Work Experience
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Professional Journey
                </h2>
              </div>

              {/* Tabs: Timeline vs Pipeline */}
              <div className="flex items-center gap-1 rounded-xl glass-pill p-1 text-xs font-mono">
                <button
                  onClick={() => setExperienceTab('timeline')}
                  className={`rounded-lg px-2.5 py-1 transition ${
                    experienceTab === 'timeline'
                      ? 'bg-purple-600/70 border border-purple-400 text-white font-semibold shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Roles
                </button>
                <button
                  onClick={() => setExperienceTab('pipeline')}
                  className={`rounded-lg px-2.5 py-1 transition ${
                    experienceTab === 'pipeline'
                      ? 'bg-purple-600/70 border border-purple-400 text-white font-semibold shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Pipeline
                </button>
              </div>
            </div>

            {experienceTab === 'timeline' ? (
              <div className="mt-4 space-y-4">
                {/* Role Switcher Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {workExperience.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => setActiveExpId(role.id)}
                      className={`rounded-xl px-3 py-1.5 text-xs font-mono transition text-left ${
                        activeExpId === role.id
                          ? 'glass-pill-purple text-white font-semibold border-purple-400/70 shadow-sm'
                          : 'glass-pill text-gray-400 hover:text-white'
                      }`}
                    >
                      <div className="font-bold">{role.company}</div>
                      <div className="text-[10px] opacity-80">{role.period}</div>
                    </button>
                  ))}
                </div>

                {/* Selected Role Detailed Card */}
                <div className="rounded-2xl glass-card p-4 space-y-2.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {selectedRole.role}
                    </h3>
                    <span className="text-xs font-mono text-purple-300">{selectedRole.company}</span>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">{selectedRole.summary}</p>

                  <div className="rounded-xl glass-pill-purple px-3 py-1.5 text-[11px] font-mono text-purple-200">
                    ★ <span className="font-semibold">Key Highlight:</span> {selectedRole.keyHighlight}
                  </div>

                  <ul className="space-y-1.5 pt-1 text-xs text-gray-300">
                    {selectedRole.bullets.slice(0, 3).map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-purple-400 font-bold">›</span>
                        <span className="leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 flex flex-wrap gap-1 border-t border-white/5">
                    {selectedRole.techStack.map((tech) => (
                      <span key={tech} className="rounded-md glass-pill px-2 py-0.5 text-[10px] font-mono text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Full Stack Pipeline View */
              <div className="mt-4 space-y-2.5">
                <p className="text-xs text-gray-300">
                  End-to-end production workflow: component hierarchy, asynchronous REST APIs, MySQL relational queries, and Agile sprints.
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="rounded-2xl glass-card p-3">
                    <div className="text-sky-300 font-semibold text-[11px] mb-1">Frontend</div>
                    <div className="text-[10px] text-gray-300">{experienceStack.frontend.slice(0, 4).join(' • ')}</div>
                  </div>
                  <div className="rounded-2xl glass-card p-3">
                    <div className="text-amber-300 font-semibold text-[11px] mb-1">Backend</div>
                    <div className="text-[10px] text-gray-300">{experienceStack.backend.slice(0, 3).join(' • ')}</div>
                  </div>
                  <div className="rounded-2xl glass-card p-3">
                    <div className="text-indigo-300 font-semibold text-[11px] mb-1">Database</div>
                    <div className="text-[10px] text-gray-300">MySQL • PostgreSQL • ACID</div>
                  </div>
                  <div className="rounded-2xl glass-card p-3">
                    <div className="text-purple-300 font-semibold text-[11px] mb-1">Agile & Tools</div>
                    <div className="text-[10px] text-gray-300">Git • GitHub • Scrum Sprints</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CHAPTER 06: EDUCATION & CERTIFICATIONS */}
      {activeChapterIndex === 5 && (
        <div className="max-w-lg space-y-4 pointer-events-auto chapter-enter">
          <div className="rounded-3xl glass-panel p-5 sm:p-6 max-h-[82vh] overflow-y-auto space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-semibold">
                Chapter 06 • Education & Growth
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-white">
                Education & Credentials
              </h2>
            </div>

            {/* Education Card */}
            <div className="rounded-2xl glass-panel-glow p-4 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-semibold">
                  Undergraduate Degree
                </span>
                <span className="rounded-full glass-pill px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-400 border-emerald-500/40">
                  {educationInfo.score}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">{educationInfo.degree}</h3>
              <p className="text-xs text-gray-300">{educationInfo.institution} • {educationInfo.location}</p>
              <p className="text-[11px] font-mono text-gray-400">{educationInfo.period}</p>
            </div>

            {/* Certifications List */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">
                Professional Certifications
              </h4>
              <div className="space-y-2">
                {certificationsList.map((cert) => (
                  <div
                    key={cert.title}
                    className="flex items-center justify-between rounded-xl glass-card p-3 hover:border-purple-400/40 transition"
                  >
                    <div>
                      <div className="text-xs font-semibold text-white">{cert.title}</div>
                      <div className="text-[10px] text-gray-400 font-mono">{cert.issuer}</div>
                    </div>
                    <span className="text-[10px] font-mono text-purple-300 rounded-full glass-pill px-2.5 py-0.5">
                      Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Concepts Chips */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">
                Core Engineering Competencies
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {['OOP (Object-Oriented Programming)', 'Data Structures & Algorithms', 'Software Design Principles', 'Debugging & Troubleshooting', 'Clean Code Practices', 'Agile/Scrum'].map(
                  (c) => (
                    <span key={c} className="rounded-xl glass-pill px-2.5 py-1 text-[11px] font-mono text-purple-200">
                      {c}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHAPTER 07: FUTURE HORIZONS & CONTACT */}
      {activeChapterIndex === 6 && (
        <div className="max-w-lg space-y-4 pointer-events-auto chapter-enter">
          <div className="rounded-3xl glass-panel-glow p-6 sm:p-7 text-left space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full glass-pill px-3 py-1 text-xs font-mono text-orange-300 border-orange-500/40">
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>Horizon Summit • Ready to Build</span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                LET'S CONNECT & BUILD.
              </h2>
              <p className="mt-1 text-sm font-semibold text-purple-300 font-mono">
                Sandhya B • Software Engineer | Full Stack Development
              </p>
              <div className="mt-3 rounded-2xl glass-card p-3.5 space-y-1 text-xs text-gray-300 font-mono">
                <p>📍 Hyderabad, India</p>
                <p>📞 +91 6305457284</p>
                <p>✉️ banothsandhya119@gmail.com</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                href="https://github.com/sandhya"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full glass-pill hover:border-white/40 px-4 py-2 text-xs font-semibold text-white transition"
              >
                <GitHubIcon className="w-3.5 h-3.5" />
                <span>GITHUB</span>
              </a>

              <a
                href="https://linkedin.com/in/sandhya"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full glass-pill hover:border-white/40 px-4 py-2 text-xs font-semibold text-white transition"
              >
                <LinkedInIcon className="w-3.5 h-3.5 text-[#0077b5]" />
                <span>LINKEDIN</span>
              </a>

              <button
                onClick={onOpenContact}
                className="flex items-center gap-1.5 rounded-full glass-pill bg-purple-600/50 hover:bg-purple-600/70 border-purple-400/50 px-5 py-2 text-xs font-semibold text-white transition shadow-lg shadow-purple-600/30"
              >
                <MailIcon className="w-3.5 h-3.5" />
                <span>DIRECT MESSAGE</span>
              </button>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <button
                onClick={() => onNavigate(0.0)}
                className="text-purple-400 hover:underline"
              >
                ↺ Replay Universe
              </button>
              <span className="text-gray-500">Sandhya B • 2026</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
