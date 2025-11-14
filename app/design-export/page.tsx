"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import Link from "next/link";
import LandingHeader from "@/components/LandingHeader";
import { ApiSlider } from "@/components/ApiSlider";
import { StatsCard } from "@/components/ui/StatsCard";

export default function DesignExportPage() {
  const [downloading, setDownloading] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const sdkPromoRef = useRef<HTMLDivElement>(null);
  const sdkHighlightRef = useRef<HTMLDivElement>(null);
  const featureCardsRef = useRef<HTMLDivElement>(null);
  const apiSliderRef = useRef<HTMLDivElement>(null);
  const platformStatsRef = useRef<HTMLDivElement>(null);
  const finalCTARef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  const downloadAsPNG = async (ref: React.RefObject<HTMLElement>, name: string) => {
    if (!ref.current) return;

    setDownloading(name);
    try {
      // Hide download button temporarily
      const downloadButtons = document.querySelectorAll('[data-download-button]');
      downloadButtons.forEach((btn) => {
        (btn as HTMLElement).style.display = 'none';
      });

      // Scroll element into view
      ref.current.scrollIntoView({ behavior: 'instant', block: 'start' });
      
      // Wait a bit for scroll to complete
      await new Promise((resolve) => setTimeout(resolve, 100));

      const canvas = await html2canvas(ref.current, {
        scale: 2,
        backgroundColor: null,
        logging: false,
        useCORS: true,
        allowTaint: false,
        removeContainer: false,
        onclone: (clonedDoc) => {
          // Hide download buttons in cloned document
          const clonedButtons = clonedDoc.querySelectorAll('[data-download-button]');
          clonedButtons.forEach((btn) => {
            (btn as HTMLElement).style.display = 'none';
          });
        },
      });

      const link = document.createElement("a");
      link.download = `${name}.png`;
      link.href = canvas.toDataURL("image/png", 1.0);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading PNG:", error);
      alert("Failed to download image. Please try again.");
    } finally {
      // Restore download buttons
      const downloadButtons = document.querySelectorAll('[data-download-button]');
      downloadButtons.forEach((btn) => {
        (btn as HTMLElement).style.display = '';
      });
      setDownloading(null);
    }
  };

  const DownloadButton = ({ sectionName, sectionRef }: { sectionName: string; sectionRef: React.RefObject<HTMLElement> }) => (
    <button
      onClick={() => downloadAsPNG(sectionRef, sectionName)}
      disabled={downloading !== null}
      data-download-button
      className="absolute top-4 right-4 z-50 px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      {downloading === sectionName ? "Downloading..." : `Download`}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0118] via-[#0D0221] to-[#0A0118] text-white">
      <LandingHeader />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div 
          ref={heroRef}
          className="text-center pt-20 pb-16 min-h-screen flex flex-col items-center justify-center relative"
        >
          <DownloadButton sectionName="hero-section" sectionRef={heroRef} />
          
          <div className="inline-flex w-fit items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8 backdrop-blur-sm invisible">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <span className="text-purple-300 text-sm font-medium">Open-Source Wellness Intelligence</span>
          </div>

          <h1 className="text-6xl lg:text-8xl font-bold md:leading-tight mb-6">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white invisible">
              Synheart Wellness
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 invisible">
              Impact Protocol
            </span>
          </h1>

          <p className="md:text-xl text-base text-gray-300 md:max-w-3xl max-w-2xl mx-auto mb-12 leading-relaxed invisible">
            Measure real wellness impact with HRV and emotion-aware metrics. The SWIP Dashboard pairs a public transparency layer with the
            <strong className="text-purple-200"> SWIP Flutter SDK</strong> and <strong className="text-purple-200">Synheart Wear SDK</strong> so you can build production wellness apps, ingest biosignals, and certify outcomes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="px-8 py-4 w-full md:w-auto rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all transform hover:scale-105 invisible">
              View Global Leaderboard
            </button>
            <button className="px-8 py-4 w-full md:w-auto rounded-lg border border-gray-700 bg-gray-800/50 text-white font-semibold hover:bg-gray-700/50 transition-all backdrop-blur-sm invisible">
              Register Your App
            </button>
            <button className="px-8 py-4 w-full md:w-auto rounded-lg border border-purple-600/40 text-purple-200 hover:bg-purple-600/10 transition-all backdrop-blur-sm font-semibold invisible">
              Explore the Flutter SWIP SDK
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-400 invisible">Sessions Tracked</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span className="text-gray-400 invisible">Developers</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-400 invisible">Open Source</span>
            </div>
          </div>
        </div>

        {/* SDK Promo */}
        <div 
          ref={sdkPromoRef}
          className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-pink-900/10 md:p-12 p-6 md:mb-20 mb-8 backdrop-blur-sm"
        >
          <DownloadButton sectionName="sdk-promo" sectionRef={sdkPromoRef} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.15),transparent_60%)]" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 mb-4 invisible">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span className="text-purple-200 text-sm font-medium">Build with the Flutter SDK</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 invisible">
                Ship Wellness Apps with Synheart Tooling
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6 invisible">
                The open-source <strong>SWIP Flutter SDK</strong> packages biosignals, sessions, and emotions for ingestion. 
                Pair it with the <strong>Synheart Wear SDK</strong> to collect data from popular wearables and unlock verified ingestion once your app is approved.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3 invisible">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  Declarative Flutter APIs for sessions, scoring, and ingestion.
                </li>
                <li className="flex items-center gap-3 invisible">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  Synheart Wear plugin streaming Apple Watch, Fitbit, Garmin, Whoop, and more.
                </li>
                <li className="flex items-center gap-3 invisible">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  Verified ingestion keys mapped to your external app ID.
                </li>
              </ul>
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <button className="inline-flex w-full md:w-fit items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all invisible">
                  View Flutter SDK on GitHub
                </button>
                <button className="inline-flex w-full md:w-fit items-center gap-2 px-6 py-3 rounded-lg border border-purple-600/40 text-purple-200 hover:bg-purple-600/10 transition-all invisible">
                  Synheart Wear SDK
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent blur-3xl" />
              <div className="relative h-full w-full rounded-2xl border border-purple-500/20 bg-black/30 p-8">
                <h3 className="text-white text-xl font-semibold mb-4 invisible">Flutter Quick Start (SWIP)</h3>
                <pre className="text-xs md:text-sm text-purple-100 font-mono leading-relaxed overflow-x-auto bg-black/40 rounded-lg p-6 border border-purple-500/10 invisible">
{`import 'package:swip/swip.dart';`}
                </pre>
                <p className="text-gray-400 text-sm mt-4 invisible">
                  Request ingestion access in the developer portal to receive your ingestion key and unlock the full Flutter + Synheart Wear pipeline.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SDK Highlight */}
        <div 
          ref={sdkHighlightRef}
          className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-900/20 via-slate-900/40 to-pink-900/20 p-6 md:p-16 md:mb-20 mb-8 backdrop-blur-sm"
        >
          <DownloadButton sectionName="sdk-highlight" sectionRef={sdkHighlightRef} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.25),transparent_55%)]" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-6 gap-12">
            <div className="col-span-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 mb-6 w-fit invisible">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span className="text-purple-200 text-sm font-medium">Open Source Flutter Ecosystem</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight invisible">
                Build with the SWIP SDK & Synheart Wear
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6 invisible">
                Our Flutter-first SDK stack lets you stream biosignals from wearables, compute SWIP scores, and deliver verified ingestion directly to the dashboard. Ready-to-use widgets, validation helpers, and certification tooling make wellness-grade telemetry achievable in days, not months.
              </p>

              <div className="grid grid-cols-1 mt-6 gap-3 mb-4">
                <div className="rounded-2xl border border-purple-500/20 bg-black/30 p-5">
                  <h3 className="text-white font-semibold mb-2 invisible">SWIP Flutter SDK</h3>
                  <p className="text-gray-400 text-sm leading-relaxed invisible">
                    Flutter package with Bloc-friendly APIs, session lifecycle helpers, and SWIP certification workflows.
                  </p>
                </div>
                <div className="rounded-2xl border border-blue-500/20 bg-black/30 p-5">
                  <h3 className="text-white font-semibold mb-2 invisible">Synheart Wear SDK</h3>
                  <p className="text-gray-400 text-sm leading-relaxed invisible">
                    Flutter plugin that abstracts BLE/Web APIs for Apple Watch, Fitbit, Garmin, Whoop, and more—streamlined into the SWIP pipeline.
                  </p>
                </div>
              </div>
            
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-2">
                <button className="inline-flex items-center w-full md:w-auto gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all invisible">
                  Get started with the SDK
                </button>
                <button className="inline-flex items-center w-full md:w-auto gap-2 px-6 py-3 rounded-lg border border-purple-500/40 text-purple-200 hover:bg-purple-600/10 transition-all invisible">
                  Star the dashboard repo
                </button>
              </div>
            </div>
            <div className="relative h-full col-span-3">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/15 to-transparent blur-3xl" />
              <div className="relative rounded-2xl border border-purple-500/20 bg-black/40 p-8">
                <h3 className="text-gray-100 text-xl font-semibold mb-4 invisible">Synheart Wear Streaming</h3>
                <pre className="text-xs md:text-sm text-purple-100 font-mono leading-relaxed overflow-x-auto bg-black/60 rounded-lg p-6 border border-purple-500/10 invisible">
{`import 'package:synheart_wear/synheart_wear.dart';`}
                </pre>
                <p className="text-gray-400 text-sm mt-4 invisible">
                  Synheart Wear streams biosignals directly into the SWIP Flutter SDK so your app can publish verified telemetry in real time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div 
          ref={featureCardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:mb-20 mb-8 relative"
        >
          <DownloadButton sectionName="feature-cards" sectionRef={featureCardsRef} />
          
          <div className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-900/30 p-8 backdrop-blur-sm hover:border-purple-500/50 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 invisible">Public Transparency</h3>
              <p className="text-gray-400 leading-relaxed invisible">
                Browse anonymized session data and view the global leaderboard ranking apps by their wellness impact scores.
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-900/30 p-8 backdrop-blur-sm hover:border-pink-500/50 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 invisible">Developer Integration</h3>
              <p className="text-gray-400 leading-relaxed invisible">
                Register your wellness app, generate API keys, and submit session data for automatic SWIP evaluation.
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-900/30 p-8 backdrop-blur-sm hover:border-blue-500/50 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 invisible">Open Science</h3>
              <p className="text-gray-400 leading-relaxed invisible">
                Reproducible wellness research through open metrics, transparent data structures, and community contributions.
              </p>
            </div>
          </div>
        </div>

        {/* API Slider Section */}
        <div 
          ref={apiSliderRef}
          className="mb-20 relative"
        >
          <DownloadButton sectionName="api-slider" sectionRef={apiSliderRef} />
          <div className="hidden">
            <ApiSlider />
          </div>
        </div>

        {/* Platform Statistics */}
        <div 
          ref={platformStatsRef}
          className="mb-20 relative"
        >
          <DownloadButton sectionName="platform-statistics" sectionRef={platformStatsRef} />
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 invisible">
              Platform Analytics
            </h2>
            <p className="text-gray-400 text-lg invisible">
              Real-time insights across the SWIP ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="relative overflow-hidden rounded-xl p-6 bg-gradient-to-br from-gray-900/50 to-gray-900/30 border border-gray-800 backdrop-blur-sm">
              <div className="absolute top-4 right-4 p-3 rounded-lg bg-purple-500/20 text-purple-400">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <div className="relative">
                <p className="text-gray-400 text-sm font-medium mb-2 invisible">Total API Calls</p>
                <p className="text-3xl font-bold text-white mb-3 invisible">0</p>
                <div className="flex items-center gap-2 invisible">
                  <span className="text-green-500 text-sm font-medium">0%</span>
                  <span className="text-gray-500 text-sm">This Month</span>
                </div>
              </div>
            </div>
            {[2, 3, 4].map((i) => (
              <div key={i} className="relative overflow-hidden rounded-xl p-6 bg-gradient-to-br from-gray-900/50 to-gray-900/30 border border-gray-800 backdrop-blur-sm">
                <div className="absolute top-4 right-4 p-3 rounded-lg bg-purple-500/20 text-purple-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div className="relative">
                  <p className="text-gray-400 text-sm font-medium mb-2 invisible">Title</p>
                  <p className="text-3xl font-bold text-white mb-3 invisible">0</p>
                  <div className="flex items-center gap-2 invisible">
                    <span className="text-green-500 text-sm font-medium">0%</span>
                    <span className="text-gray-500 text-sm">Label</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Section */}
        <div 
          ref={finalCTARef}
          className="relative overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-12 md:p-16 md:mb-20 mb-8 backdrop-blur-sm"
        >
          <DownloadButton sectionName="final-cta" sectionRef={finalCTARef} />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 invisible">
              Ready to Build the Future
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                of Wellness Apps?
              </span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto invisible">
              Join hundreds of developers building transparent, data-driven wellness applications.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all invisible">
                Register Your App
              </button>
              <button className="px-8 py-4 rounded-lg border border-gray-700 bg-gray-800/50 text-white font-semibold hover:bg-gray-700/50 transition-all invisible">
                Explore Leaderboard
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer 
          ref={footerRef}
          className="border-t border-gray-800 py-12 relative"
        >
          <DownloadButton sectionName="footer" sectionRef={footerRef} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <img
                  src="/logos/Swip_logo-04.svg"
                  alt="SWIP Logo"
                  className="h-12 w-auto"
                />
              </div>
              <p className="text-gray-400 text-sm invisible">
                Open-source wellness intelligence for the modern age.
              </p>
            </div>

            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <h4 className="text-white font-semibold mb-4 invisible">Title</h4>
                <ul className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <li key={j}>
                      <span className="text-gray-400 hover:text-white text-sm transition-colors invisible">
                        Link
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-800">
            <p className="text-gray-500 text-sm invisible">
              © 2025 Synheart AI. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm invisible">
              Built with <span className="text-pink-400">❤</span> for wellness transparency
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
