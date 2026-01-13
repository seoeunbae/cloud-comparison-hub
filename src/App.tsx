import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cloud, Search, ArrowRightLeft, Info, CheckCircle2, XCircle, Github, Loader2, Sparkles } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { compareCloudProducts, type ComparisonResult } from './services/geminiService';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [awsInput, setAwsInput] = useState('');
  const [gcpInput, setGcpInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!awsInput.trim() || !gcpInput.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await compareCloudProducts(awsInput, gcpInput);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError('Failed to compare products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-orange-100/50 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <main className="flex-grow container mx-auto px-4 py-12 max-w-5xl">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-full text-sm font-medium text-slate-600 mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-500" />
            AI 기반 클라우드 서비스 비교
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-4">
            Cloud Comparator
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            AWS와 GCP 서비스를 즉시 비교해보세요. 아키텍처 구성을 위한 유사점, 주요 차이점 및 최적의 활용 사례를 찾아드립니다.
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 md:p-8 mb-12"
        >
          <form onSubmit={handleCompare} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <div className="w-6 h-6 rounded bg-orange-500 flex items-center justify-center text-white text-[10px] font-bold">AWS</div>
                  AWS 제품명
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={awsInput}
                    onChange={(e) => setAwsInput(e.target.value)}
                    placeholder="예: EC2, Lambda, S3"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">GCP</div>
                  GCP 제품명
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={gcpInput}
                    onChange={(e) => setGcpInput(e.target.value)}
                    placeholder="예: Compute Engine, Cloud Functions, GCS"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className={cn(
                  "flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold shadow-lg hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                  loading && "animate-pulse"
                )}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    서비스 분석 중...
                  </>
                ) : (
                  <>
                    <ArrowRightLeft className="w-5 h-5" />
                    제품 비교하기
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 flex items-center gap-3 mb-8"
            >
              <XCircle className="w-5 h-5" />
              {error}
            </motion.div>
          )}

          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Product Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={cn(
                  "p-6 rounded-2xl border transition-all",
                  result.awsProduct.isValid ? "bg-orange-50/50 border-orange-200" : "bg-red-50/50 border-red-200"
                )}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-600">AWS 서비스</span>
                    {result.awsProduct.isValid ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{result.awsProduct.name}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {result.awsProduct.isValid ? result.awsProduct.description : `참고: "${result.awsProduct.name}"은(는) 표준 AWS 제품명이 아닌 것으로 보입니다.`}
                  </p>
                </div>

                <div className={cn(
                  "p-6 rounded-2xl border transition-all",
                  result.gcpProduct.isValid ? "bg-blue-50/50 border-blue-200" : "bg-red-50/50 border-red-200"
                )}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600">GCP 서비스</span>
                    {result.gcpProduct.isValid ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{result.gcpProduct.name}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {result.gcpProduct.isValid ? result.gcpProduct.description : `참고: "${result.gcpProduct.name}"은(는) 표준 GCP 제품명이 아닌 것으로 보입니다.`}
                  </p>
                </div>
              </div>

              {/* Detailed Comparison */}
              {result.awsProduct.isValid && result.gcpProduct.isValid && (
                <div className="glass-card overflow-hidden">
                  <div className="p-6 md:p-8 bg-slate-900 text-white">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <Search className="w-6 h-6 text-blue-400" />
                      심층 비교 분석
                    </h2>
                  </div>
                  <div className="p-6 md:p-8 space-y-8">
                    {/* Similarities */}
                    <section>
                      <h4 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4">
                        <div className="w-2 h-6 bg-green-500 rounded-full" />
                        주요 유사점
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {result.similarities.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg text-slate-700 text-sm">
                            <div className="mt-1 w-1.5 h-1.5 bg-slate-400 rounded-full shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>

                    {/* Differences */}
                    <section>
                      <h4 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4">
                        <div className="w-2 h-6 bg-orange-500 rounded-full" />
                        핵심 차이점
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {result.differences.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg text-slate-700 text-sm">
                            <div className="mt-1 w-1.5 h-1.5 bg-slate-400 rounded-full shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>

                    {/* Use Cases */}
                    <section>
                      <h4 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4">
                        <div className="w-2 h-6 bg-blue-500 rounded-full" />
                        전략적 활용 사례
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {result.useCases.map((item, i) => (
                          <div key={i} className="p-4 border border-slate-100 rounded-xl bg-white shadow-sm flex gap-3">
                            <Info className="w-5 h-5 text-blue-500 shrink-0" />
                            <p className="text-slate-700 text-sm leading-relaxed">{item}</p>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Summary */}
                    <section className="pt-6 border-t border-slate-100">
                      <h4 className="text-lg font-bold text-slate-900 mb-3">요약</h4>
                      <p className="text-slate-600 leading-relaxed italic">
                        "{result.summary}"
                      </p>
                    </section>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center space-y-4">
          <div className="flex justify-center items-center gap-4 text-slate-400">
            <Cloud className="w-5 h-5" />
            <div className="w-px h-4 bg-slate-200" />
            <span className="text-sm font-medium">멀티 클라우드 인텔리전스</span>
          </div>
          <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em]">
            DEVELOPER: <a 
              href="https://github.com/seoeunbae" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-blue-500 transition-colors font-bold inline-flex items-center gap-1"
            >
              @seoeunbae
              <Github className="w-3 h-3" />
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
