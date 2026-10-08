import { useState } from 'react';
import type { ProjectData } from '../../types/portfolio';
import { CheckIcon } from '../ui/Icons';

export function HMSPreview({ project }: { project: ProjectData }) {
  const [activeTab, setActiveTab] = useState<'appointments' | 'patients' | 'facilities'>('appointments');
  const [bookedStatus, setBookedStatus] = useState<string | null>(null);

  const appointments = [
    { id: 'APT-101', patient: 'Eleanor Vance', doctor: 'Dr. Sarah Lin (Cardiology)', time: '09:30 AM', room: 'Suite 302', status: 'CONFIRMED' },
    { id: 'APT-102', patient: 'Marcus Chen', doctor: 'Dr. Robert Blake (Neurology)', time: '11:00 AM', room: 'Suite 104', status: 'IN-PROGRESS' },
    { id: 'APT-103', patient: 'Aria Montgomery', doctor: 'Dr. Priya Nair (Pediatrics)', time: '02:15 PM', room: 'Suite 210', status: 'PENDING' },
    { id: 'APT-104', patient: 'David Miller', doctor: 'Dr. Sarah Lin (Cardiology)', time: '04:00 PM', room: 'Suite 302', status: 'CONFIRMED' },
  ];

  const facilities = [
    { name: 'ICU Ward Alpha', capacity: '18 / 20 Beds', status: 'Near Capacity', color: 'text-amber-400' },
    { name: 'Surgical Suite B', capacity: 'Operational', status: 'Sterilized & Ready', color: 'text-emerald-400' },
    { name: 'Cardiology Diagnostics', capacity: '12 / 15 Patients', status: 'Active', color: 'text-emerald-400' },
    { name: 'Emergency Triage', capacity: '6 / 8 Bays', status: 'High Traffic', color: 'text-purple-400' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Clinical Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-2xl glass-card p-3.5">
          <p className="text-[11px] font-mono uppercase tracking-wider text-gray-400">Active Patients</p>
          <p className="mt-1 text-2xl font-bold font-mono text-sky-400">342</p>
          <span className="text-[10px] text-gray-400 font-mono">HIPAA compliant records</span>
        </div>
        <div className="rounded-2xl glass-card p-3.5">
          <p className="text-[11px] font-mono uppercase tracking-wider text-gray-400">Doctors On Duty</p>
          <p className="mt-1 text-2xl font-bold font-mono text-white">28</p>
          <span className="text-[10px] text-sky-400 font-mono">6 departments active</span>
        </div>
        <div className="rounded-2xl glass-card p-3.5">
          <p className="text-[11px] font-mono uppercase tracking-wider text-gray-400">Scheduled Today</p>
          <p className="mt-1 text-2xl font-bold font-mono text-emerald-400">46</p>
          <span className="text-[10px] text-emerald-400 font-mono">Zero double-bookings</span>
        </div>
        <div className="rounded-2xl glass-card p-3.5">
          <p className="text-[11px] font-mono uppercase tracking-wider text-gray-400">Facility Occupancy</p>
          <p className="mt-1 text-2xl font-bold font-mono text-purple-300">82%</p>
          <span className="text-[10px] text-purple-300 font-mono">Real-time bed tracking</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 rounded-xl glass-pill p-1 text-xs font-mono w-fit">
        <button
          onClick={() => setActiveTab('appointments')}
          className={`rounded-lg px-3 py-1.5 transition ${
            activeTab === 'appointments'
              ? 'bg-sky-500/25 text-sky-300 font-semibold border border-sky-400/50 shadow-sm'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Appointments Schedule
        </button>
        <button
          onClick={() => setActiveTab('facilities')}
          className={`rounded-lg px-3 py-1.5 transition ${
            activeTab === 'facilities'
              ? 'bg-sky-500/25 text-sky-300 font-semibold border border-sky-400/50 shadow-sm'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Facility Resources
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="rounded-3xl glass-panel-blue p-5">
        {activeTab === 'appointments' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-white">Clinical Appointment Registry</h4>
              <span className="text-xs text-sky-300 font-mono rounded-full glass-pill px-2.5 py-0.5">
                React • MySQL • 20% Faster
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 font-mono">
                    <th className="py-2.5 px-3">Appointment ID</th>
                    <th className="py-2.5 px-3">Patient</th>
                    <th className="py-2.5 px-3">Physician</th>
                    <th className="py-2.5 px-3">Time</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {appointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-white/[0.04] transition">
                      <td className="py-3 px-3 text-sky-300 font-semibold">{apt.id}</td>
                      <td className="py-3 px-3 font-sans text-gray-200">{apt.patient}</td>
                      <td className="py-3 px-3 text-gray-300">{apt.doctor}</td>
                      <td className="py-3 px-3 text-gray-400">{apt.time}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`rounded-full glass-pill px-2.5 py-0.5 text-[10px] ${
                            apt.status === 'CONFIRMED'
                              ? 'text-emerald-300 border-emerald-500/40'
                              : apt.status === 'IN-PROGRESS'
                              ? 'text-amber-300 border-amber-500/40'
                              : 'text-gray-300'
                          }`}
                        >
                          {apt.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => setBookedStatus(`Checked in ${apt.patient} for ${apt.doctor}`)}
                          className="rounded-xl glass-pill bg-sky-600/30 hover:bg-sky-600/50 text-sky-200 border-sky-400/40 px-3 py-1 text-[11px] font-sans transition"
                        >
                          Check In
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {bookedStatus && (
              <div className="rounded-xl glass-card border-sky-500/40 bg-sky-500/10 p-3 text-xs text-sky-200 flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-sky-400" />
                <span>{bookedStatus} (Status updated in MySQL database with optimized index query)</span>
              </div>
            )}
          </div>
        )}

        {activeTab === 'facilities' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {facilities.map((f) => (
              <div key={f.name} className="rounded-2xl glass-card p-4">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-semibold text-white">{f.name}</h5>
                  <span className={`text-xs font-mono ${f.color}`}>{f.status}</span>
                </div>
                <p className="mt-2 text-xs font-mono text-gray-400">Capacity: {f.capacity}</p>
                <div className="mt-2 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-400 rounded-full" style={{ width: '80%' }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tech Architecture Footnote */}
      <div className="text-xs text-gray-400 font-mono flex items-center justify-between px-2">
        <span>Stack: {project.technologies.join(' • ')}</span>
        <span>Row-Level Security & Encrypted Medical DB</span>
      </div>
    </div>
  );
}
