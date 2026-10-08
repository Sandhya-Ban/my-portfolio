import { useState } from 'react';
import type { ProjectData } from '../../types/portfolio';
import { CheckIcon, AlertTriangleIcon } from '../ui/Icons';

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  stockKg: number;
  thresholdKg: number;
  shelfLifeDays: number;
  status: 'In Stock' | 'Low Stock' | 'Reorder Now';
}

export function VegetableInventoryPreview({ project }: { project: ProjectData }) {
  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: 'V-101',
      name: 'Organic Roma Tomatoes',
      sku: 'VEG-TOM-01',
      category: 'Solanaceae',
      stockKg: 420,
      thresholdKg: 150,
      shelfLifeDays: 6,
      status: 'In Stock',
    },
    {
      id: 'V-102',
      name: 'Hydroponic Baby Spinach',
      sku: 'VEG-SPN-04',
      category: 'Leafy Greens',
      stockKg: 85,
      thresholdKg: 100,
      shelfLifeDays: 3,
      status: 'Low Stock',
    },
    {
      id: 'V-103',
      name: 'Crisp English Cucumbers',
      sku: 'VEG-CUC-09',
      category: 'Cucurbits',
      stockKg: 310,
      thresholdKg: 120,
      shelfLifeDays: 8,
      status: 'In Stock',
    },
    {
      id: 'V-104',
      name: 'Bell Peppers (Tri-Color)',
      sku: 'VEG-PEP-12',
      category: 'Solanaceae',
      stockKg: 40,
      thresholdKg: 80,
      shelfLifeDays: 4,
      status: 'Reorder Now',
    },
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  const handleAdjustStock = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStock = Math.max(0, item.stockKg + delta);
          let newStatus: 'In Stock' | 'Low Stock' | 'Reorder Now' = 'In Stock';
          if (newStock === 0 || newStock < item.thresholdKg * 0.5) {
            newStatus = 'Reorder Now';
          } else if (newStock < item.thresholdKg) {
            newStatus = 'Low Stock';
          }
          return { ...item, stockKg: newStock, status: newStatus };
        }
        return item;
      })
    );
    setNotification(`Stock updated for ${id} via transactional CRUD handler.`);
  };

  const totalStockKg = items.reduce((acc, curr) => acc + curr.stockKg, 0);

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-2xl glass-card p-3.5">
          <p className="text-[11px] font-mono uppercase tracking-wider text-gray-400">Total Produce Stock</p>
          <p className="mt-1 text-2xl font-bold font-mono text-emerald-400">{totalStockKg} kg</p>
          <span className="text-[10px] text-gray-400 font-mono">FIFO batch tracking</span>
        </div>
        <div className="rounded-2xl glass-card p-3.5">
          <p className="text-[11px] font-mono uppercase tracking-wider text-gray-400">Active SKUs</p>
          <p className="mt-1 text-2xl font-bold font-mono text-white">{items.length}</p>
          <span className="text-[10px] text-emerald-400 font-mono">All categories cataloged</span>
        </div>
        <div className="rounded-2xl glass-card p-3.5">
          <p className="text-[11px] font-mono uppercase tracking-wider text-gray-400">Reorder Alerts</p>
          <p className="mt-1 text-2xl font-bold font-mono text-amber-400">
            {items.filter((i) => i.status !== 'In Stock').length}
          </p>
          <span className="text-[10px] text-amber-400 font-mono">Automated threshold warnings</span>
        </div>
        <div className="rounded-2xl glass-card p-3.5">
          <p className="text-[11px] font-mono uppercase tracking-wider text-gray-400">Spoilage Prevention</p>
          <p className="mt-1 text-2xl font-bold font-mono text-white">99.4%</p>
          <span className="text-[10px] text-gray-400 font-mono">Shelf life algorithm</span>
        </div>
      </div>

      {/* Interactive Inventory CRUD Table */}
      <div className="rounded-3xl glass-panel-emerald p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-semibold text-white">Live Stock Management Table</h4>
            <p className="text-xs text-gray-400 mt-0.5">Simulate inventory additions/deductions via CRUD buttons</p>
          </div>
          <span className="text-xs font-mono text-emerald-300 rounded-full glass-pill px-2.5 py-0.5">
            Python • MySQL CRUD
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 font-mono">
                <th className="py-2.5 px-3">Item / SKU</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Current Stock</th>
                <th className="py-2.5 px-3">Shelf Life</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">CRUD Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.04] transition">
                  <td className="py-3 px-3">
                    <div className="font-sans font-semibold text-white">{item.name}</div>
                    <div className="text-[10px] text-gray-400">{item.sku}</div>
                  </td>
                  <td className="py-3 px-3 text-gray-300 font-sans">{item.category}</td>
                  <td className="py-3 px-3 font-semibold text-white">
                    {item.stockKg} kg
                    <span className="text-[10px] text-gray-400 block font-normal">
                      Min: {item.thresholdKg} kg
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-400">{item.shelfLifeDays} days rem.</td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full glass-pill px-2.5 py-0.5 text-[10px] ${
                        item.status === 'In Stock'
                          ? 'text-emerald-300 border-emerald-500/40'
                          : item.status === 'Low Stock'
                          ? 'text-amber-300 border-amber-500/40'
                          : 'text-rose-300 border-rose-500/40'
                      }`}
                    >
                      {item.status === 'In Stock' ? (
                        <CheckIcon className="w-3 h-3" />
                      ) : (
                        <AlertTriangleIcon className="w-3 h-3" />
                      )}
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="inline-flex gap-1.5 font-sans">
                      <button
                        onClick={() => handleAdjustStock(item.id, -25)}
                        className="rounded-xl glass-pill px-2.5 py-1 text-[11px] text-gray-200 hover:border-white/40 transition"
                      >
                        -25 kg
                      </button>
                      <button
                        onClick={() => handleAdjustStock(item.id, 50)}
                        className="rounded-xl glass-pill bg-emerald-500/25 hover:bg-emerald-500/40 border-emerald-400/50 px-2.5 py-1 text-[11px] text-emerald-200 transition"
                      >
                        +50 kg
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {notification && (
          <div className="mt-3.5 rounded-xl glass-card border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300 flex items-center gap-2">
            <CheckIcon className="w-4 h-4 text-emerald-400" />
            <span>{notification}</span>
          </div>
        )}
      </div>

      <div className="text-xs text-gray-400 font-mono flex items-center justify-between px-2">
        <span>Stack: {project.technologies.join(' • ')}</span>
        <span>FIFO Inventory Logic • Real-time Batch Alerts</span>
      </div>
    </div>
  );
}
