'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { sermons } from '@/lib/store'
import { ArrowLeft, Play, Pause, Share2, Bookmark, SkipBack, SkipForward } from 'lucide-react'
import { toast } from 'sonner'

function AudioPlayer() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!playing) return
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setPlaying(false)
          return 0
        }
        return prev + 0.5
      })
    }, 200)
    return () => clearInterval(interval)
  }, [playing])

  return (
    <div className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
      {/* Waveform visualization */}
      <div className="flex items-end justify-center gap-[2px] h-16 mb-6">
        {Array.from({ length: 48 }).map((_, i) => {
          const height = Math.sin(i * 0.3) * 30 + 35
          const filled = (i / 48) * 100 <= progress
          return (
            <div
              key={i}
              className={`w-1 rounded-full transition-colors duration-150 ${filled ? 'bg-gold' : 'bg-surface-elevated'}`}
              style={{ height: `${height}%` }}
            />
          )
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6">
        <button className="text-muted-foreground hover:text-cream transition-colors" aria-label="Rewind 15 seconds">
          <SkipBack size={20} />
        </button>
        <button
          onClick={() => setPlaying(!playing)}
          className="w-14 h-14 rounded-full bg-gold flex items-center justify-center hover:scale-105 transition-transform"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? (
            <Pause size={22} fill="#0A0A0A" className="text-[#0A0A0A]" />
          ) : (
            <Play size={22} fill="#0A0A0A" className="text-[#0A0A0A] ml-0.5" />
          )}
        </button>
        <button className="text-muted-foreground hover:text-cream transition-colors" aria-label="Forward 15 seconds">
          <SkipForward size={20} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="w-full h-1 bg-surface-elevated rounded-full overflow-hidden">
          <div className="h-full bg-gold rounded-full transition-all duration-200" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="font-mono text-[10px] text-muted-foreground">
            {Math.floor(progress * 0.42)}:{String(Math.floor((progress * 25.2) % 60)).padStart(2, '0')}
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">42:15</span>
        </div>
      </div>
    </div>
  )
}

export default function SermonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [mounted, setMounted] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const sermon = sermons.find((s) => s.id === id)
  if (!sermon) {
    return (
      <div className="text-center py-20">
        <p className="font-serif text-muted-foreground italic text-lg">Sermon not found.</p>
        <Link href="/dashboard/sermons" className="font-sans text-gold text-sm mt-4 inline-block">Back to Sermons</Link>
      </div>
    )
  }

  const related = sermons.filter((s) => s.id !== id).slice(0, 3)

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast('Link copied to clipboard')
  }

  return (
    <div>
      <Link href="/dashboard/sermons" className="inline-flex items-center gap-2 text-muted-foreground hover:text-cream font-sans text-sm transition-colors mb-8">
        <ArrowLeft size={16} />
        Back to Sermons
      </Link>

      <div className={mounted ? 'animate-fade-up' : 'opacity-0'}>
        <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">{sermon.series}</p>
        <h1 className="font-serif text-cream text-3xl md:text-5xl mt-2 leading-tight">{sermon.title}</h1>
        <p className="font-sans text-muted-foreground text-sm mt-3">
          {sermon.pastor} &middot;{' '}
          {new Date(sermon.date).toLocaleDateString('en-NG', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      <div className={`mt-8 ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '80ms' }}>
        <AudioPlayer />
      </div>

      {/* Actions */}
      <div className={`flex gap-3 mt-4 ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '120ms' }}>
        <button
          onClick={() => setBookmarked(!bookmarked)}
          className={`inline-flex items-center gap-2 h-9 px-4 border rounded-lg font-sans text-xs font-medium transition-all ${
            bookmarked ? 'border-gold/50 text-gold bg-gold/10' : 'border-[rgba(255,255,255,0.06)] text-muted-foreground hover:text-cream'
          }`}
        >
          <Bookmark size={14} className={bookmarked ? 'fill-gold' : ''} />
          {bookmarked ? 'Bookmarked' : 'Bookmark'}
        </button>
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 h-9 px-4 border border-[rgba(255,255,255,0.06)] rounded-lg font-sans text-xs font-medium text-muted-foreground hover:text-cream transition-all"
        >
          <Share2 size={14} />
          Share
        </button>
      </div>

      {/* Sermon notes */}
      <div className={`mt-10 ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '160ms' }}>
        <h2 className="font-serif text-cream text-xl mb-4">Sermon Notes</h2>
        <div className="prose prose-invert max-w-none">
          {sermon.notes.split('\n').map((paragraph, i) => (
            <p key={i} className="font-sans text-cream/80 text-[15px] leading-relaxed mb-4">{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Related sermons */}
      {related.length > 0 && (
        <div className={`mt-16 ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '240ms' }}>
          <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider mb-4">Related Sermons</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((s) => (
              <Link
                key={s.id}
                href={`/dashboard/sermons/${s.id}`}
                className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl p-5 hover:border-gold/20 hover:-translate-y-1 transition-all duration-300"
              >
                <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">{s.series}</p>
                <h4 className="font-sans text-cream text-sm font-medium mt-1">{s.title}</h4>
                <p className="font-sans text-muted-foreground text-xs mt-1.5">{s.pastor}</p>
                <p className="font-mono text-gold text-xs mt-1">{s.duration}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
