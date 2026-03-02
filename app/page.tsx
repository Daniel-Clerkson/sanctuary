'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

function WaveformAnimation() {
  return (
    <div className="flex items-end gap-[3px] h-8">
      {[0.4, 0.7, 1, 0.6, 0.8].map((scale, i) => (
        <div
          key={i}
          className="w-[3px] bg-gold rounded-full waveform-bar"
          style={{
            animationDelay: `${i * 0.15}s`,
            animationDuration: `${0.8 + i * 0.2}s`,
          }}
        />
      ))}
    </div>
  )
}

function HeroSection() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center gradient-pulse overflow-hidden adire-pattern">
      <div className="relative z-10 px-6 md:px-12 lg:px-24 max-w-[1400px]">
        <div className={`${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0ms' }}>
          <h1 className="font-serif text-cream text-5xl sm:text-7xl md:text-8xl lg:text-[96px] leading-[0.95] tracking-tight">
            Where Faith
          </h1>
        </div>
        <div className={`${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '80ms' }}>
          <h1 className="font-serif text-cream text-5xl sm:text-7xl md:text-8xl lg:text-[96px] leading-[0.95] tracking-tight">
            Meets <span className="text-gold">Now.</span>
          </h1>
        </div>
        <div className={`mt-8 ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '160ms' }}>
          <p className="font-sans text-muted-foreground text-base md:text-lg max-w-[480px] leading-relaxed">
            A community for young believers in Kano. Sermons, events, devotionals — all in one place.
          </p>
        </div>
        <div className={`flex flex-wrap gap-4 mt-10 ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '240ms' }}>
          <Link
            href="/auth"
            className="inline-flex items-center justify-center h-12 px-8 bg-gold text-[#0A0A0A] font-sans font-medium text-sm rounded-xl hover:scale-[1.02] transition-all duration-200"
          >
            Join the Community
          </Link>
          <Link
            href="/dashboard/sermons"
            className="inline-flex items-center justify-center h-12 px-8 border border-gold text-gold font-sans font-medium text-sm rounded-xl hover:bg-gold/10 transition-all duration-200"
          >
            Explore Sermons
          </Link>
        </div>
      </div>

      {/* Next Service Card */}
      <div className={`absolute bottom-8 right-6 md:right-12 lg:right-24 ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
        <div className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl p-4 px-5 flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-success pulse-dot" />
          <div>
            <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">Next Service</p>
            <p className="font-sans text-cream text-sm font-medium">Sunday 9AM</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureBlocks() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <section className="px-6 md:px-12 lg:px-24 py-20 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Block 1 — Sermon Library (large, left) */}
        <div
          className={`md:row-span-2 bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 md:p-8 flex flex-col justify-between min-h-[300px] md:min-h-[400px] hover:border-gold/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300 ${mounted ? 'animate-fade-up' : 'opacity-0'}`}
          style={{ animationDelay: '100ms' }}
        >
          <div>
            <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider mb-4">Sermon Library</p>
            <WaveformAnimation />
          </div>
          <div className="mt-auto">
            <h3 className="font-serif text-cream text-xl md:text-2xl mb-1">The Weight of Grace</h3>
            <p className="font-sans text-muted-foreground text-sm">Pastor Bright</p>
          </div>
        </div>

        {/* Block 2 — Events (small, top right) */}
        <div
          className={`bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 flex items-center gap-4 hover:border-gold/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300 ${mounted ? 'animate-fade-up' : 'opacity-0'}`}
          style={{ animationDelay: '180ms' }}
        >
          <div className="w-12 h-12 rounded-xl bg-surface-elevated flex items-center justify-center flex-shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div>
            <h3 className="font-sans text-cream text-lg font-medium">3 events this month</h3>
            <p className="font-sans text-muted-foreground text-sm">Upcoming gatherings</p>
          </div>
        </div>

        {/* Block 3 — Devotional (medium, bottom right) */}
        <div
          className={`bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 md:p-8 hover:border-gold/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300 ${mounted ? 'animate-fade-up' : 'opacity-0'}`}
          style={{ animationDelay: '260ms' }}
        >
          <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider mb-4">Daily Devotional</p>
          <blockquote className="font-serif text-cream/90 italic text-lg md:text-xl leading-relaxed">
            {'"For I know the plans I have for you," declares the Lord...'}
          </blockquote>
          <p className="font-mono text-gold text-xs mt-3 text-right">Jeremiah 29:11</p>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="px-6 md:px-12 lg:px-24 py-16 border-t border-[rgba(255,255,255,0.06)]">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="font-serif text-gold text-xl">Sanctuary</h2>
          <p className="font-sans text-muted-foreground text-sm mt-1">Built for the next generation.</p>
        </div>
        <nav className="flex gap-8">
          <Link href="/auth" className="font-sans text-sm text-muted-foreground hover:text-cream transition-colors">Join</Link>
          <Link href="/dashboard/sermons" className="font-sans text-sm text-muted-foreground hover:text-cream transition-colors">Sermons</Link>
          <Link href="/dashboard/events" className="font-sans text-sm text-muted-foreground hover:text-cream transition-colors">Events</Link>
        </nav>
      </div>
    </footer>
  )
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <FeatureBlocks />
      <Footer />
    </main>
  )
}
