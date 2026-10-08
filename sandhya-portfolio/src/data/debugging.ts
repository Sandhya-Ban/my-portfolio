import type { DebugStep } from '../types/portfolio';

export interface DebuggingIncident {
  id: string;
  title: string;
  problemSummary: string;
  symptom: string;
  architectureNodes: {
    name: 'Frontend' | 'API Gateway' | 'Business Logic' | 'Database';
    status: 'ok' | 'issue' | 'fixed';
    tech: string;
    details: string;
  }[];
  steps: DebugStep[];
  solution: string;
  learnings: string;
}

export const debuggingCaseStudy: DebuggingIncident = {
  id: 'hms-latency-optimization',
  title: 'HMS Patient Workflow & Query Latency Optimization',
  problemSummary: 'Clinical dashboard load times spiking under 50+ concurrent users due to unindexed MySQL joins and redundant UI re-renders.',
  symptom: 'Patient admission screen experienced 2.8s load times with occasional UI freezes during peak morning triage hours.',
  architectureNodes: [
    {
      name: 'Frontend',
      status: 'fixed',
      tech: 'React.js + TypeScript',
      details: 'Modularized patient timeline components, implemented memoized state, cutting page load time by 20%.',
    },
    {
      name: 'API Gateway',
      status: 'fixed',
      tech: 'RESTful API Layer',
      details: 'Restructured appointment endpoints with selective field projection and gzip response compression.',
    },
    {
      name: 'Business Logic',
      status: 'ok',
      tech: 'Python / Node Service Layer',
      details: 'Validated JWT permissions and patient triage state transitions with zero race conditions.',
    },
    {
      name: 'Database',
      status: 'fixed',
      tech: 'MySQL 8.0 Relational Layer',
      details: 'Added composite index on (clinic_id, appointment_time, status), dropping query latency from 840ms to 24ms.',
    },
  ],
  steps: [
    {
      id: 1,
      label: 'INIT',
      status: 'active',
      title: 'INVESTIGATING CLINICAL BOTTLENECK...',
      detail: 'Tracing request lifecycle from React.js patient dashboard → REST APIs → MySQL query execution plan.',
      layer: 'Frontend',
      timestamp: '09:14:02.105',
    },
    {
      id: 2,
      label: 'DB_ANALYZE',
      status: 'warning',
      title: 'MYSQL SLOW QUERY DETECTED ⚠️',
      detail: 'Full table scan on appointments (42,000 rows) due to missing composite index on clinic_id + status.',
      layer: 'Database',
      timestamp: '09:14:02.340',
    },
    {
      id: 3,
      label: 'DB_OPTIMIZE',
      status: 'success',
      title: 'INDEX APPLIED & BENCHMARKED ✓',
      detail: 'Added composite index `idx_clinic_time_status`. Query execution time plunged from 840ms to 24ms.',
      layer: 'Database',
      timestamp: '09:14:02.580',
    },
    {
      id: 4,
      label: 'API_STREAMLINE',
      status: 'success',
      title: 'REST API PAYLOAD RESTRUCTURED ✓',
      detail: 'Eliminated redundant nested patient joins; serialized only active triage fields, reducing payload size by 65%.',
      layer: 'API Gateway',
      timestamp: '09:14:02.790',
    },
    {
      id: 5,
      label: 'UI_REFACTOR',
      status: 'warning',
      title: 'FRONTEND WATERFALL IDENTIFIED ⚠️',
      detail: 'Parent component re-rendered entire 50-row triage grid on every single vitals heartbeat interval.',
      layer: 'Frontend',
      timestamp: '09:14:02.980',
    },
    {
      id: 6,
      label: 'UI_OPTIMIZE',
      status: 'success',
      title: 'REACT MEMO & VIRTUALIZATION APPLIED ✓',
      detail: 'Applied React.memo and localized triage timers; eliminated 92% of redundant DOM re-renders.',
      layer: 'Frontend',
      timestamp: '09:14:03.180',
    },
    {
      id: 7,
      label: 'VERIFY',
      status: 'success',
      title: '20% FASTER LOAD TIME VERIFIED ✓',
      detail: 'Page load time dropped by 20%; 50+ concurrent medical staff users supported smoothly with zero lag.',
      layer: 'Frontend',
      timestamp: '09:14:03.350',
    },
  ],
  solution: 'Engineered end-to-end full stack optimizations: composite MySQL indexing, payload minification, and modular React.js memoization.',
  learnings: 'High-concurrency systems require full-stack alignment: database indexing and frontend render efficiency are two sides of the same coin.',
};
