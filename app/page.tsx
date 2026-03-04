'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { PlayCircle, BookOpen, Calendar, MessageSquare, ExternalLink, ArrowRight } from 'lucide-react'

function WaveformAnimation() {
  return (
    <div className="flex items-end gap-[3px] h-8">
      {[0.4, 0.7, 1, 0.6, 0.8].map((scale, i) => (
        <div
          key={i}
          className="w-[3px] bg-gold rounded-full waveform-bar animate-waveform"
          style={{
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  )
}


function HeroSection() {
  const [mounted, setMounted] = useState(false)
  
  // Replace this with your specific YouTube Video ID
  const videoId = "XQF_rtkgqyc" 

  useEffect(() => { setMounted(true) }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* 1. YOUTUBE BACKGROUND OVERLAY */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 w-full h-full scale-[1.5]"> {/* Scale prevents black bars */}
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1`}
            allow="autoplay; encrypted-media"
            className="w-full h-full object-cover grayscale opacity-40 pointer-events-none"
            frameBorder="0"
          />
        </div>
        
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/70 to-background" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* 2. HERO CONTENT */}
      <div className="relative z-10 px-6 md:px-12 lg:px-24 max-w-[1400px]">
        <div className={`${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0ms' }}>
          <h1 className="font-serif text-cream text-5xl sm:text-7xl md:text-8xl lg:text-[110px] leading-[0.9] tracking-tighter">
            Where Faith <br /> Meets <span className="text-gold">Now.</span>
          </h1>
        </div>
        
        <div className={`mt-10 ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '160ms' }}>
          <p className="font-sans text-muted-foreground text-lg md:text-xl max-w-[540px] leading-relaxed">
            The digital companion for the next generation of believers. Daily fellowship, ministry resources, and digital study—built for the church in Kano.
          </p>
        </div>

        <div className={`flex flex-wrap gap-4 mt-12 ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '240ms' }}>
          <Link
            href="/auth"
            className="group inline-flex items-center justify-center h-14 px-10 bg-gold text-[#0A0A0A] font-sans font-bold text-sm rounded-2xl hover:scale-[1.02] transition-all duration-300"
          >
            Enter Sanctuary <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </Link>
          <Link
            href="/dashboard/sermons"
            className="inline-flex items-center justify-center h-14 px-10 border border-white/10 bg-white/5 backdrop-blur-md text-cream font-sans font-medium text-sm rounded-2xl hover:bg-white/10 transition-all duration-300"
          >
            Explore Library
          </Link>
        </div>
      </div>

      {/* Stats/Next Service Overlay */}
      <div className={`absolute bottom-12 left-6 md:left-12 lg:left-24 hidden md:flex gap-12 ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
        <div>
          <p className="font-mono text-[10px] text-gold uppercase tracking-[0.3em] mb-1">Live in Kano</p>
          <p className="font-serif text-cream text-2xl">Sundays 9AM</p>
        </div>
        <div className="w-[1px] h-12 bg-white/10" />
        <div>
          <p className="font-mono text-[10px] text-gold uppercase tracking-[0.3em] mb-1">Global Reach</p>
          <p className="font-serif text-cream text-2xl">Daily Rhapsody</p>
        </div>
      </div>
    </section>
  )
}

function FeatureBlocks() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <section className="px-6 md:px-12 lg:px-24 py-32 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Sermon Dashboard Card (Large) */}
        <div className={`md:col-span-8 bg-surface border border-white/5 rounded-[32px] p-8 md:p-12 relative overflow-hidden group hover:border-gold/30 transition-all duration-500 ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <PlayCircle className="text-gold" size={24} />
                <span className="font-mono text-[11px] text-gold uppercase tracking-widest">Sermon Archives</span>
              </div>
              <h3 className="font-serif text-cream text-3xl md:text-5xl max-w-md leading-tight">Access Deep Teachings Anywhere.</h3>
              <p className="mt-6 text-muted-foreground text-lg max-w-sm">Stream curated playlists from Pastor Chris and build your spiritual library.</p>
            </div>
            <div className="mt-12">
              <WaveformAnimation />
            </div>
          </div>
          {/* Subtle Background Art */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent pointer-events-none" />
        </div>

        {/* Daily Study / Notes (Tall) */}
        <div className={`md:col-span-4 bg-surface-elevated border border-white/5 rounded-[32px] p-8 flex flex-col justify-between hover:border-gold/20 transition-all duration-500 ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
          <div>
            <div className="flex items-center gap-3 mb-8">
              <MessageSquare className="text-gold" size={20} />
              <span className="font-mono text-[11px] text-gold uppercase tracking-widest">Study Tools</span>
            </div>
            <h3 className="font-serif text-cream text-2xl">Digital Note-Taking</h3>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
              Capture insights while you listen. Your notes are saved locally, creating a personal archive of your growth.
            </p>
          </div>
          <div className="mt-8 p-4 bg-black/20 rounded-xl border border-white/5 italic text-gold/60 text-xs font-serif leading-relaxed">
            "The Word is alive and active..."
          </div>
        </div>

        {/* Rhapsody Portal (Small) */}
        <div className={`md:col-span-6 bg-surface border border-white/5 rounded-[32px] p-8 flex items-center justify-between hover:bg-gold/5 transition-all duration-500 ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '300ms' }}>
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
              <BookOpen size={32} />
            </div>
            <div>
              <h3 className="font-serif text-cream text-xl">Daily Rhapsody</h3>
              <p className="text-muted-foreground text-sm">Read the messenger angel daily.</p>
            </div>
          </div>
          <ExternalLink size={20} className="text-muted-foreground group-hover:text-gold" />
        </div>

        {/* Event Counter (Small) */}
        <div className={`md:col-span-6 bg-surface border border-white/5 rounded-[32px] p-8 flex items-center justify-between hover:bg-white/5 transition-all duration-500 ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-cream">
              <Calendar size={32} />
            </div>
            <div>
              <h3 className="font-serif text-cream text-xl">Youth Events</h3>
              <p className="text-muted-foreground text-sm">Join the next gathering in Kano.</p>
            </div>
          </div>
          <span className="bg-gold/10 text-gold font-mono text-xs px-3 py-1 rounded-full uppercase">3 Upcoming</span>
        </div>

      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="px-6 md:px-12 lg:px-24 py-20 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
        <div>
          <h2 className="font-serif text-gold text-2xl tracking-tighter">SANCTUARY</h2>
          <p className="font-sans text-muted-foreground text-sm mt-2">Equipping the next generation for a life of purpose.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
          <div className="space-y-4">
            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Platform</p>
            <nav className="flex flex-col gap-2">
              <Link href="/auth" className="text-sm text-muted-foreground hover:text-gold transition-colors">Join Community</Link>
              <Link href="/dashboard/sermons" className="text-sm text-muted-foreground hover:text-gold transition-colors">Listen Online</Link>
            </nav>
          </div>
          <div className="space-y-4">
            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Ministry</p>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="text-sm text-muted-foreground hover:text-gold transition-colors">About Us</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-gold transition-colors">Partnership</Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">© 2026 Sanctuary Kano. All rights reserved.</p>
        <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Built with Love & Grace</p>
      </div>
    </footer>
  )
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-cream selection:bg-gold selection:text-black">
      <HeroSection />
      <FeatureBlocks />
      <Footer />
    </main>
  )
}