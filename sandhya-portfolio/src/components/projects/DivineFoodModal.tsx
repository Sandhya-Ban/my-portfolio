import { useState } from 'react';
import type { ProjectData } from '../../types/portfolio';
import { CheckIcon, SparklesIcon } from '../ui/Icons';

export function DivineFoodPreview({ project }: { project: ProjectData }) {
  const [selectedFacility, setSelectedFacility] = useState('All Facilities');
  const [redeemedCount, setRedeemedCount] = useState(980);
  const [lastRedeemedCode, setLastRedeemedCode] = useState<string | null>(null);

  const coupons = [
    { code: 'DF-9082-A', sponsor: 'Acme Charity Foundation', quota: '10 Meals', status: 'ACTIVE', facility: 'Center North' },
    { code: 'DF-8419-B', sponsor: 'Metro Health Alliance', quota: '5 Meals', status: 'REDEEMED', facility: 'East Facility' },
    { code: 'DF-3211-C', sponsor: 'Apex Logistics Community', quota: '15 Meals', status: 'ACTIVE', facility: 'Downtown Center' },
    { code: 'DF-7742-D', sponsor: 'Global Relief Fund', quota: '8 Meals', status: 'ACTIVE', facility: 'Center North' },
  ];

  const handleSimulateRedeem = (code: string) => {
    setLastRedeemedCode(code);
    setRedeemedCount((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      {/* Platform Banner & Metric Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-2xl glass-card p-3.5">
          <p className="text-[11px] font-mono uppercase tracking-wider text-gray-400">Total Allocated</p>
          <p className="mt-1 text-2xl font-bold font-mono text-purple-300">1,420</p>
          <span className="text-[10px] text-emerald-400 font-mono">100% Verified ACID</span>
        </div>
        <div className="rounded-2xl glass-card p-3.5">
          <p className="text-[11px] font-mono uppercase tracking-wider text-gray-400">Redeemed</p>
          <p className="mt-1 text-2xl font-bold font-mono text-white">{redeemedCount}</p>
          <span className="text-[10px] text-purple-400 font-mono">Real-time sync</span>
        </div>
        <div className="rounded-2xl glass-card p-3.5">
          <p className="text-[11px] font-mono uppercase tracking-wider text-gray-400">Program Centers</p>
          <p className="mt-1 text-2xl font-bold font-mono text-white">6</p>
          <span className="text-[10px] text-gray-400 font-mono">Cloudflare R2 cached</span>
        </div>
        <div className="rounded-2xl glass-card p-3.5">
          <p className="text-[11px] font-mono uppercase tracking-wider text-gray-400">Redemption Rate</p>
          <p className="mt-1 text-2xl font-bold font-mono text-emerald-400">
            {((redeemedCount / 1420) * 100).toFixed(1)}%
          </p>
          <span className="text-[10px] text-emerald-400 font-mono">Live throughput</span>
        </div>
      </div>

      {/* Visual Architecture Flow */}
      <div className="rounded-2xl glass-panel-glow p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-purple-400 animate-ping" />
            <h4 className="text-xs font-mono uppercase tracking-widest text-purple-300">
              System Architecture Flow
            </h4>
          </div>
          <span className="text-[11px] font-mono text-gray-300">FastAPI • PostgreSQL • R2</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {project.architecture.steps.map((step, idx) => (
            <div
              key={step.name}
              className="relative rounded-xl glass-card p-3 text-center flex flex-col items-center justify-between"
            >
              <div className="text-[10px] font-mono text-purple-400 font-semibold mb-1">0{idx + 1}</div>
              <div className="text-xs font-semibold text-white">{step.name}</div>
              <div className="text-[10px] text-gray-400 mt-1 leading-snug">{step.description}</div>
              {idx < project.architecture.steps.length - 1 && (
                <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 text-purple-400 text-xs z-10">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Coupon Ledger & Scanner Preview */}
      <div className="rounded-2xl glass-panel p-5 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <span>Live Coupon Ledger Simulator</span>
              <span className="text-[10px] rounded-full glass-pill-purple text-purple-200 px-2.5 py-0.5">
                Interactive
              </span>
            </h4>
            <p className="text-xs text-gray-400 mt-0.5">Click "Redeem" to simulate atomic scanner verification</p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedFacility}
              onChange={(e) => setSelectedFacility(e.target.value)}
              aria-label="Filter by Facility"
              className="rounded-xl glass-pill px-3 py-1.5 text-xs text-gray-200 focus:outline-none focus:border-purple-400"
            >
              <option value="All Facilities" className="bg-[#080e1c] text-white">All Facilities</option>
              <option value="Center North" className="bg-[#080e1c] text-white">Center North</option>
              <option value="East Facility" className="bg-[#080e1c] text-white">East Facility</option>
              <option value="Downtown Center" className="bg-[#080e1c] text-white">Downtown Center</option>
            </select>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 font-mono">
                <th className="py-2.5 px-3">Token Hash</th>
                <th className="py-2.5 px-3">Sponsor Entity</th>
                <th className="py-2.5 px-3">Quota</th>
                <th className="py-2.5 px-3">Facility</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {coupons.map((c) => {
                const isThisRedeemed = lastRedeemedCode === c.code || c.status === 'REDEEMED';
                return (
                  <tr key={c.code} className="hover:bg-white/[0.04] transition">
                    <td className="py-3 px-3 font-semibold text-purple-300">{c.code}</td>
                    <td className="py-3 px-3 font-sans text-gray-200">{c.sponsor}</td>
                    <td className="py-3 px-3 text-gray-300">{c.quota}</td>
                    <td className="py-3 px-3 text-gray-400">{c.facility}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] ${
                          isThisRedeemed
                            ? 'glass-pill text-emerald-300 border-emerald-500/40'
                            : 'glass-pill-purple text-purple-200'
                        }`}
                      >
                        {isThisRedeemed ? <CheckIcon className="w-3 h-3" /> : <SparklesIcon className="w-3 h-3" />}
                        {isThisRedeemed ? 'REDEEMED' : 'ACTIVE'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleSimulateRedeem(c.code)}
                        disabled={isThisRedeemed}
                        className={`rounded-xl px-3 py-1.5 text-[11px] font-sans font-medium transition ${
                          isThisRedeemed
                            ? 'glass-pill text-gray-500 cursor-not-allowed opacity-50'
                            : 'glass-pill bg-purple-600/40 hover:bg-purple-600/60 text-purple-200 border-purple-400/50 shadow-md shadow-purple-500/20'
                        }`}
                      >
                        {isThisRedeemed ? 'Verified' : 'Redeem Now'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {lastRedeemedCode && (
          <div className="mt-3.5 rounded-xl glass-card border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300 flex items-center justify-between">
            <span>
              ✓ Ledger verified: Coupon <strong>{lastRedeemedCode}</strong> redeemed via FastAPI router with transactional commit.
            </span>
            <span className="font-mono text-[10px] text-emerald-400">HTTP 200 OK • 22ms</span>
          </div>
        )}
      </div>
    </div>
  );
}
