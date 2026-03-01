'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { sermons, allSeries } from '@/lib/store'
import { Search, Bookmark, Play } from 'lucide-react'

function WaveformThumb({ index }: { index: number }) {
  return (
    <div className="w-full h-32 bg-surface-elevated rounded-t-2xl flex items-end justify-center gap-[3px] pb-6 adire-pattern overflow-hidden">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="w-1.5 bg-gold/50 rounded-full waveform-bar"
          style={{
            animationDelay: `${(index * 0.3 + i * 0.15).toFixed(2)}s`,
            animationDuration: `${0.8 + i * 0.2}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function SermonsPage() {
  const [mounted, setMounted] = useState(false)
  const [activeSeries, setActiveSeries] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({})

  useEffect(() => { setMounted(true) }, [])

  const filtered = sermons.filter((s) => {
    const matchesSeries = !activeSeries || s.series === activeSeries
    const matchesSearch = !search || s.title.toLowerCase().includes(search.toLowerCase()) || s.pastor.toLowerCase().includes(search.toLowerCase())
    return matchesSeries && matchesSearch
  })

  return (
    <div>
      {/* Header */}
      <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${mounted ? 'animate-fade-up' : 'opacity-0'}`}>
        <h1 className="font-serif text-cream text-3xl md:text-4xl">Sermons</h1>
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search sermons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-surface border border-[rgba(255,255,255,0.06)] rounded-xl text-cream font-sans text-sm placeholder:text-muted-foreground focus:outline-none focus:border-gold/40 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.15)] transition-all"
          />
        </div>
      </div>

      {/* Series pills */}
      <div className={`flex gap-2 mt-6 overflow-x-auto pb-2 ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '80ms' }}>
        <button
          onClick={() => setActiveSeries(null)}
          className={`flex-shrink-0 h-9 px-4 rounded-lg font-sans text-xs font-medium transition-all duration-200 ${
            !activeSeries ? 'bg-gold text-[#0A0A0A]' : 'bg-surface border border-[rgba(255,255,255,0.06)] text-muted-foreground hover:text-cream'
          }`}
        >
          All
        </button>
        {allSeries.map((s) => (
          <button
            key={s}
            onClick={() => setActiveSeries(activeSeries === s ? null : s)}
            className={`flex-shrink-0 h-9 px-4 rounded-lg font-sans text-xs font-medium transition-all duration-200 ${
              activeSeries === s ? 'bg-gold text-[#0A0A0A]' : 'bg-surface border border-[rgba(255,255,255,0.06)] text-muted-foreground hover:text-cream'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Sermon grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '160ms' }}>
        {filtered.map((sermon, i) => (
          <div
            key={sermon.id}
            className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl overflow-hidden hover:border-gold/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300"
          >
            <WaveformThumb index={i} />
            <div className="p-5">
              <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">{sermon.series}</p>
              <h3 className="font-sans text-cream text-base font-medium mt-1 leading-snug">{sermon.title}</h3>
              <p className="font-sans text-muted-foreground text-xs mt-2">
                {sermon.pastor} &middot;{' '}
                {new Date(sermon.date).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })}
              </p>
              <p className="font-mono text-gold text-xs mt-1">{sermon.duration}</p>
              <div className="flex items-center justify-between mt-4">
                <Link
                  href={`/dashboard/sermons/${sermon.id}`}
                  className="inline-flex items-center gap-1.5 h-9 px-4 border border-gold/30 text-gold font-sans text-xs font-medium rounded-lg hover:bg-gold/10 transition-all"
                >
                  <Play size={14} />
                  Play
                </Link>
                <button
                  onClick={() => setBookmarks((prev) => ({ ...prev, [sermon.id]: !prev[sermon.id] }))}
                  className="p-2 rounded-lg hover:bg-surface-elevated transition-colors"
                  aria-label={bookmarks[sermon.id] ? 'Remove bookmark' : 'Add bookmark'}
                >
                  <Bookmark
                    size={18}
                    className={bookmarks[sermon.id] ? 'text-gold fill-gold' : 'text-muted-foreground'}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="font-serif text-muted-foreground italic text-lg">No sermons found.</p>
        </div>
      )}
    </div>
  )
}
