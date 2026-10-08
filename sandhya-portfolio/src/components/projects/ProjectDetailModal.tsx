import type { ProjectData } from '../../types/portfolio';
import { CloseIcon, GitHubIcon, ArrowUpRightIcon } from '../ui/Icons';
import { DivineFoodPreview } from './DivineFoodModal';
import { HMSPreview } from './HMSModal';
import { JobTrackerPreview } from './JobTrackerModal';
import { VegetableInventoryPreview } from './VegetableInventoryModal';
import { DiabeticRetinopathyPreview } from './DiabeticRetinopathyModal';

interface ProjectDetailModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-2xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel-glow p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: `0 0 50px -10px ${project.accentColor}33`,
        }}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-6 mb-6">
          <div>
            <div className="flex items-center gap-3">
              <span
                className="h-3 w-3 rounded-full animate-pulse"
                style={{ backgroundColor: project.accentColor }}
              />
              <span className="text-xs font-mono uppercase tracking-widest text-gray-400">
                {project.category}
              </span>
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {project.title}
            </h2>
            <p className="mt-1 text-sm text-purple-300 font-mono">
              {project.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full glass-pill px-3.5 py-1.5 text-xs text-gray-200 hover:border-white/40 hover:text-white transition"
              >
                <GitHubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            )}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="rounded-full glass-pill p-2 text-gray-300 hover:text-white transition"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Technologies Bar */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-xl glass-pill px-3 py-1 text-xs font-mono text-purple-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Project Description */}
        <p className="text-sm text-gray-300 leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Dynamic Project Preview UI */}
        <div className="mb-6">
          {project.uiPreviewType === 'coupon' && <DivineFoodPreview project={project} />}
          {project.uiPreviewType === 'hms' && <HMSPreview project={project} />}
          {project.uiPreviewType === 'job' && <JobTrackerPreview project={project} />}
          {project.uiPreviewType === 'inventory' && <VegetableInventoryPreview project={project} />}
          {project.uiPreviewType === 'retinopathy' && <DiabeticRetinopathyPreview project={project} />}
        </div>

        {/* Key Engineering Features */}
        <div className="rounded-2xl glass-card p-5 mb-6">
          <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-3">
            Core Engineering Highlights
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-300">
            {project.features.map((feat) => (
              <li key={feat} className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">›</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <p className="text-xs text-gray-400 font-mono">
            Architected & Implemented by Sandhya B
          </p>
          <button
            onClick={onClose}
            className="rounded-full glass-pill hover:bg-white/15 px-5 py-2 text-xs font-medium text-white transition flex items-center gap-1.5"
          >
            <span>Return to Universe</span>
            <ArrowUpRightIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
