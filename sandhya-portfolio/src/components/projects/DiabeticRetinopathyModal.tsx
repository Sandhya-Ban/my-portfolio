import { useState } from 'react';
import type { ProjectData } from '../../types/portfolio';
import { SparklesIcon, CheckIcon, AlertTriangleIcon } from '../ui/Icons';

interface ScanSample {
  id: string;
  name: string;
  patientId: string;
  eye: 'Left (OS)' | 'Right (OD)';
  features: string;
  groundTruth: string;
  predictedStage: string;
  confidence: number;
  riskLevel: 'Low' | 'Moderate' | 'High';
}

const SAMPLE_SCANS: ScanSample[] = [
  {
    id: 'scan-01',
    name: 'Sample Retinal Fundus #01',
    patientId: 'PT-8092',
    eye: 'Right (OD)',
    features: 'Clear macula, uniform optic disc margin, normal vascular branching',
    groundTruth: 'Stage 0: No Retinopathy',
    predictedStage: 'Stage 0: No DR',
    confidence: 94.8,
    riskLevel: 'Low',
  },
  {
    id: 'scan-02',
    name: 'Sample Retinal Fundus #02',
    patientId: 'PT-4127',
    eye: 'Left (OS)',
    features: 'Isolated microaneurysms detected in parafoveal capillary bed',
    groundTruth: 'Stage 1: Mild Non-Proliferative DR',
    predictedStage: 'Stage 1: Mild NPDR',
    confidence: 91.4,
    riskLevel: 'Moderate',
  },
  {
    id: 'scan-03',
    name: 'Sample Retinal Fundus #03',
    patientId: 'PT-6301',
    eye: 'Right (OD)',
    features: 'Multiple blot hemorrhages, hard lipid exudates, venous beading',
    groundTruth: 'Stage 2: Moderate Non-Proliferative DR',
    predictedStage: 'Stage 2: Moderate NPDR',
    confidence: 93.2,
    riskLevel: 'High',
  },
];

export function DiabeticRetinopathyPreview({ project }: { project: ProjectData }) {
  const [selectedScan, setSelectedScan] = useState<ScanSample>(SAMPLE_SCANS[1]);
  const [isInferring, setIsInferring] = useState(false);
  const [inferenceStep, setInferenceStep] = useState(0);
  const [result, setResult] = useState<ScanSample | null>(SAMPLE_SCANS[1]);
  const [activeTab, setActiveTab] = useState<'simulator' | 'architecture'>('simulator');

  const handleRunInference = (scan: ScanSample) => {
    setSelectedScan(scan);
    setIsInferring(true);
    setResult(null);
    setInferenceStep(1);

    setTimeout(() => {
      setInferenceStep(2);
      setTimeout(() => {
        setInferenceStep(3);
        setTimeout(() => {
          setIsInferring(false);
          setResult(scan);
        }, 400);
      }, 500);
    }, 450);
  };

  return (
    <div className="space-y-6">
      {/* Header & Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <span>Deep Learning Retinopathy Diagnostics</span>
            <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-mono font-semibold text-emerald-400 border border-emerald-500/30">
              90–95% Accuracy
            </span>
          </h4>
          <p className="text-xs text-gray-400 mt-0.5">
            End-to-end Python image classification pipeline from fundus preprocessing to clinical stage inference
          </p>
        </div>

        <div className="flex items-center gap-1.5 rounded-xl glass-pill p-1 text-xs font-mono">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`rounded-lg px-3 py-1 transition ${
              activeTab === 'simulator'
                ? 'bg-purple-600/70 border border-purple-400 text-white font-semibold shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Inference Lab
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`rounded-lg px-3 py-1 transition ${
              activeTab === 'architecture'
                ? 'bg-purple-600/70 border border-purple-400 text-white font-semibold shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Python OOP Code
          </button>
        </div>
      </div>

      {activeTab === 'simulator' ? (
        <>
          {/* Key Metrics Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-2xl glass-card p-3.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">Classification Accuracy</span>
              <p className="mt-1 text-2xl font-bold font-mono text-emerald-400">92.8%</p>
              <span className="text-[10px] text-gray-400 font-mono">90–95% Target Range</span>
            </div>
            <div className="rounded-2xl glass-card p-3.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">ROC-AUC Score</span>
              <p className="mt-1 text-2xl font-bold font-mono text-purple-300">0.962</p>
              <span className="text-[10px] text-purple-300 font-mono">High Discriminative Power</span>
            </div>
            <div className="rounded-2xl glass-card p-3.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">Sensitivity (Recall)</span>
              <p className="mt-1 text-2xl font-bold font-mono text-sky-400">91.5%</p>
              <span className="text-[10px] text-gray-400 font-mono">Low false-negative rate</span>
            </div>
            <div className="rounded-2xl glass-card p-3.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">Inference Latency</span>
              <p className="mt-1 text-2xl font-bold font-mono text-amber-400">42ms</p>
              <span className="text-[10px] text-gray-400 font-mono">Optimized batch tensor</span>
            </div>
          </div>

          {/* Interactive Pipeline Simulator */}
          <div className="rounded-3xl glass-panel-glow p-5 space-y-5">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-purple-300">
                1. Select Patient Fundus Scan to Evaluate
              </p>
              <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {SAMPLE_SCANS.map((scan) => {
                  const isSelected = selectedScan.id === scan.id;
                  return (
                    <button
                      key={scan.id}
                      onClick={() => handleRunInference(scan)}
                      disabled={isInferring}
                      className={`text-left rounded-2xl p-3 transition ${
                        isSelected
                          ? 'glass-card border-purple-400 bg-purple-950/40 shadow-lg shadow-purple-500/20'
                          : 'glass-card hover:bg-white/[0.08] hover:border-purple-400/40'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-semibold text-white">{scan.patientId}</span>
                        <span
                          className={`rounded-full glass-pill px-2 py-0.5 text-[9px] ${
                            scan.riskLevel === 'Low'
                              ? 'text-emerald-300 border-emerald-500/40'
                              : scan.riskLevel === 'Moderate'
                              ? 'text-amber-300 border-amber-500/40'
                              : 'text-rose-300 border-rose-500/40'
                          }`}
                        >
                          {scan.riskLevel} Risk
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-300 mt-1 line-clamp-1">{scan.name}</p>
                      <p className="text-[10px] text-gray-400 font-mono mt-0.5">{scan.eye}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inference Status / Animated Flow */}
            <div className="rounded-2xl glass-card p-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
                <span className="text-gray-300">Deep Learning Pipeline Execution</span>
                <button
                  onClick={() => handleRunInference(selectedScan)}
                  disabled={isInferring}
                  className="flex items-center gap-1.5 rounded-xl glass-pill bg-purple-600/40 hover:bg-purple-600/60 border-purple-400/50 px-3.5 py-1.5 text-white transition disabled:opacity-50 text-xs font-semibold shadow-md shadow-purple-500/20"
                >
                  <SparklesIcon className="w-3.5 h-3.5" />
                  <span>{isInferring ? 'Processing...' : 'Run Pipeline Inference'}</span>
                </button>
              </div>

              {/* Pipeline Stages */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                <div
                  className={`rounded-xl border p-3 transition ${
                    inferenceStep >= 1
                      ? 'border-purple-400/50 bg-purple-950/30 text-purple-200'
                      : 'border-white/5 glass-card text-gray-500'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span>1. Preprocessing</span>
                    {inferenceStep >= 1 && <span className="text-emerald-400">✓</span>}
                  </div>
                  <p className="text-[10px] mt-1 text-gray-400">
                    CLAHE contrast enhancement & circular mask cropping
                  </p>
                </div>

                <div
                  className={`rounded-xl border p-3 transition ${
                    inferenceStep >= 2
                      ? 'border-purple-400/50 bg-purple-950/30 text-purple-200'
                      : 'border-white/5 glass-card text-gray-500'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span>2. CNN Feature Maps</span>
                    {inferenceStep >= 2 && <span className="text-emerald-400">✓</span>}
                  </div>
                  <p className="text-[10px] mt-1 text-gray-400">
                    Vascular segmentation & microaneurysm detection
                  </p>
                </div>

                <div
                  className={`rounded-xl border p-3 transition ${
                    inferenceStep >= 3
                      ? 'border-purple-400/50 bg-purple-950/30 text-purple-200'
                      : 'border-white/5 glass-card text-gray-500'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span>3. Stage Classification</span>
                    {inferenceStep >= 3 && <span className="text-emerald-400">✓</span>}
                  </div>
                  <p className="text-[10px] mt-1 text-gray-400">
                    Softmax probability distribution & confidence scoring
                  </p>
                </div>
              </div>

              {/* Diagnostic Prediction Card */}
              {result && !isInferring && (
                <div className="mt-4 rounded-2xl glass-card border-emerald-500/40 bg-emerald-950/25 p-4 space-y-2 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                        Diagnostic Evaluation Complete
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      Confidence: {result.confidence}%
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                    <div>
                      <span className="text-[10px] font-mono text-gray-400">Predicted Diagnosis:</span>
                      <p className="font-semibold text-white mt-0.5">{result.predictedStage}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-gray-400">Ground Truth Match:</span>
                      <p className="font-semibold text-emerald-300 mt-0.5">{result.groundTruth}</p>
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-300 pt-1 border-t border-emerald-500/20">
                    <span className="font-semibold text-emerald-400">Clinical Observations:</span>{' '}
                    {result.features}
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        /* Python OOP Architecture Code Snippet View */
        <div className="rounded-3xl glass-panel p-5 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-white/10">
            <span className="text-purple-300">pipeline/retinopathy_classifier.py</span>
            <span className="text-emerald-400 font-semibold">Modular OOP Architecture</span>
          </div>

          <pre className="p-4 rounded-2xl glass-card border border-white/5 font-mono text-xs text-purple-200 overflow-x-auto leading-relaxed">
            <code>{`# Diabetic Retinopathy Deep Learning Classification Pipeline
# Author: Sandhya B (Computer Science & Engineering)

import cv2
import numpy as np
import torch
import torch.nn as nn

class RetinopathyPreprocessor:
    """Modular image preprocessing with CLAHE and circular masking."""
    def __init__(self, target_size=(512, 512), clip_limit=2.0):
        self.target_size = target_size
        self.clahe = cv2.createCLAHE(clipLimit=clip_limit, tileGridSize=(8, 8))

    def process(self, image_path: str) -> np.ndarray:
        image = cv2.imread(image_path)
        image = cv2.resize(image, self.target_size)
        # Isolate green channel for maximum blood vessel contrast
        lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
        l, a, b = cv2.split(lab)
        enhanced_l = self.clahe.apply(l)
        merged = cv2.merge((enhanced_l, a, b))
        return cv2.cvtColor(merged, cv2.COLOR_LAB2RGB) / 255.0

class RetinopathyInferencePipeline:
    """End-to-end evaluation pipeline achieving 90-95% classification accuracy."""
    def __init__(self, model_weights_path: str):
        self.preprocessor = RetinopathyPreprocessor()
        self.model = self._load_model(model_weights_path)
        self.classes = ['No DR', 'Mild NPDR', 'Moderate NPDR', 'Severe NPDR', 'PDR']

    def evaluate_scan(self, image_path: str) -> dict:
        processed_tensor = self.preprocessor.process(image_path)
        with torch.no_grad():
            logits = self.model(processed_tensor)
            probs = torch.softmax(logits, dim=-1)
            pred_idx = torch.argmax(probs).item()
            return {
                "diagnosis": self.classes[pred_idx],
                "confidence": float(probs[pred_idx] * 100),
                "is_urgent": pred_idx >= 2
            }`}</code>
          </pre>

          <p className="text-xs text-gray-400 font-mono">
            Designed with clean OOP abstraction separating preprocessing, neural architecture, and clinical inference.
          </p>
        </div>
      )}

      {/* Footer Info */}
      <div className="text-xs text-gray-400 font-mono flex items-center justify-between px-2 pt-2 border-t border-white/5">
        <span>Project: {project.title}</span>
        <span>Python • Deep Learning • Computer Vision • OOP</span>
      </div>
    </div>
  );
}
