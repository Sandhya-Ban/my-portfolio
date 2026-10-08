import { useState } from 'react';
import type { ProjectData } from '../../types/portfolio';

interface JobCard {
  id: string;
  company: string;
  role: string;
  stage: 'Applied' | 'Screening' | 'Technical' | 'Offer';
  date: string;
  salary: string;
  tags: string[];
}

export function JobTrackerPreview({ project }: { project: ProjectData }) {
  const [jobs, setJobs] = useState<JobCard[]>([
    {
      id: '1',
      company: 'Vercel Ecosystem',
      role: 'Full Stack Engineer',
      stage: 'Technical',
      date: '2d ago',
      salary: '$135k - $160k',
      tags: ['React', 'Next.js', 'PostgreSQL'],
    },
    {
      id: '2',
      company: 'Linear Labs',
      role: 'Frontend Systems Developer',
      stage: 'Screening',
      date: '4d ago',
      salary: '$140k - $170k',
      tags: ['TypeScript', 'GraphQL', 'WebGL'],
    },
    {
      id: '3',
      company: 'Stripe Infrastructure',
      role: 'Backend API Engineer',
      stage: 'Offer',
      date: 'Today',
      salary: '$150k - $185k',
      tags: ['Python', 'FastAPI', 'Distributed Systems'],
    },
    {
      id: '4',
      company: 'Supabase Data',
      role: 'Database Solutions Engineer',
      stage: 'Applied',
      date: '1w ago',
      salary: '$130k - $155k',
      tags: ['PostgreSQL', 'SQL', 'Docker'],
    },
  ]);

  const stages: ('Applied' | 'Screening' | 'Technical' | 'Offer')[] = [
    'Applied',
    'Screening',
    'Technical',
    'Offer',
  ];

  const handlePromoteStage = (id: string) => {
    setJobs((prev) =>
      prev.map((job) => {
        if (job.id === id) {
          const currentIndex = stages.indexOf(job.stage);
          const nextStage = stages[Math.min(currentIndex + 1, stages.length - 1)];
          return { ...job, stage: nextStage };
        }
        return job;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-2xl glass-card p-3.5">
          <p className="text-[11px] font-mono uppercase tracking-wider text-gray-400">Total Tracked</p>
          <p className="mt-1 text-2xl font-bold font-mono text-pink-400">{jobs.length}</p>
          <span className="text-[10px] text-gray-400 font-mono">Active pipelines</span>
        </div>
        <div className="rounded-2xl glass-card p-3.5">
          <p className="text-[11px] font-mono uppercase tracking-wider text-gray-400">Interviews</p>
          <p className="mt-1 text-2xl font-bold font-mono text-white">2</p>
          <span className="text-[10px] text-pink-400 font-mono">50% screen rate</span>
        </div>
        <div className="rounded-2xl glass-card p-3.5">
          <p className="text-[11px] font-mono uppercase tracking-wider text-gray-400">Offers Extended</p>
          <p className="mt-1 text-2xl font-bold font-mono text-emerald-400">1</p>
          <span className="text-[10px] text-emerald-400 font-mono">Negotiation phase</span>
        </div>
        <div className="rounded-2xl glass-card p-3.5">
          <p className="text-[11px] font-mono uppercase tracking-wider text-gray-400">Avg Response Time</p>
          <p className="mt-1 text-2xl font-bold font-mono text-white">4.2d</p>
          <span className="text-[10px] text-gray-400 font-mono">Optimized outreach</span>
        </div>
      </div>

      {/* Interactive Kanban Board */}
      <div className="rounded-3xl glass-panel-glow p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-semibold text-white">Application Pipeline Kanban</h4>
            <p className="text-xs text-gray-400 mt-0.5">Click "Advance Stage" on any card to move forward in the funnel</p>
          </div>
          <span className="text-xs font-mono text-pink-300 rounded-full glass-pill px-2.5 py-0.5">
            React • TypeScript • Tailwind
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {stages.map((stage) => {
            const stageJobs = jobs.filter((j) => j.stage === stage);
            return (
              <div
                key={stage}
                className="rounded-2xl glass-card p-3.5 flex flex-col min-h-[220px]"
              >
                <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
                  <span className="text-xs font-mono font-semibold text-gray-200">{stage}</span>
                  <span className="rounded-full glass-pill px-2 py-0.5 text-[10px] font-mono text-gray-300">
                    {stageJobs.length}
                  </span>
                </div>

                <div className="space-y-2.5 flex-1">
                  {stageJobs.map((job) => (
                    <div
                      key={job.id}
                      className="rounded-xl glass-card border-pink-500/25 bg-pink-950/20 p-3 hover:border-pink-400/50 transition group"
                    >
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-semibold text-white">{job.company}</h5>
                        <span className="text-[10px] font-mono text-gray-400">{job.date}</span>
                      </div>
                      <p className="text-[11px] text-gray-300 mt-1">{job.role}</p>
                      <p className="text-[10px] font-mono text-emerald-400 mt-1">{job.salary}</p>

                      <div className="flex flex-wrap gap-1 mt-2">
                        {job.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-md glass-pill px-1.5 py-0.5 text-[9px] font-mono text-gray-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {stage !== 'Offer' && (
                        <button
                          onClick={() => handlePromoteStage(job.id)}
                          className="mt-3 w-full rounded-xl glass-pill bg-pink-500/20 hover:bg-pink-500/35 border-pink-400/40 py-1.5 text-[10px] font-mono text-pink-200 transition"
                        >
                          Advance Stage →
                        </button>
                      )}
                    </div>
                  ))}

                  {stageJobs.length === 0 && (
                    <div className="h-24 flex items-center justify-center text-[11px] font-mono text-gray-500 border border-dashed border-white/10 rounded-xl glass-card">
                      No applications
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-xs text-gray-400 font-mono flex items-center justify-between px-2">
        <span>Stack: {project.technologies.join(' • ')}</span>
        <span>Optimistic UI updates • Relational State</span>
      </div>
    </div>
  );
}
