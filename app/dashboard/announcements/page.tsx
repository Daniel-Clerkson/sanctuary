'use client'

import { useState, useEffect } from 'react'
import { announcements } from '@/lib/store'
import { ChevronRight } from 'lucide-react'

const priorityColors: Record<string, string> = {
  urgent: '#C0392B',
  normal: '#C9A84C',
  info: '#666666',
}

const filterOptions = [
  { key: 'all', label: 'All' },
  { key: 'urgent', label: 'Urgent' },
  { key: 'events', label: 'Events' },
  { key: 'general', label: 'General' },
] as const

export default function AnnouncementsPage() {
  const [mounted, setMounted] = useState(false)
  const [filter, setFilter] = useState<string>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => { setMounted(true) }, [])

  const filtered = announcements.filter((a) => {
    if (filter === 'all') return true
    if (filter === 'urgent') return a.priority === 'urgent'
    return a.category === filter
  })

  // Sort: urgent first, then by timestamp
  const sorted = [...filtered].sort((a, b) => {
    if (a.priority === 'urgent' && b.priority !== 'urgent') return -1
    if (b.priority === 'urgent' && a.priority !== 'urgent') return 1
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  })

  return (
    <div>
      <h1 className={`font-serif text-cream text-3xl md:text-4xl ${mounted ? 'animate-fade-up' : 'opacity-0'}`}>
        {"What's Happening"}
      </h1>

      {/* Filter pills */}
      <div className={`flex gap-2 mt-6 ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '80ms' }}>
        {filterOptions.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`h-8 px-4 rounded-lg font-sans text-xs font-medium transition-all ${
              filter === f.key
                ? 'bg-gold text-[#0A0A0A]'
                : 'bg-surface border border-[rgba(255,255,255,0.06)] text-muted-foreground hover:text-cream'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Announcement list */}
      <div className={`mt-8 ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '160ms' }}>
        {sorted.map((a) => (
          <div
            key={a.id}
            className="border-b border-[rgba(255,255,255,0.06)] last:border-0"
          >
            <button
              onClick={() => setExpandedId(expandedId === a.id ? null : a.id)}
              className="w-full flex items-center gap-4 py-5 text-left group"
            >
              {/* Priority bar */}
              <div
                className="w-[3px] h-10 rounded-full flex-shrink-0"
                style={{ backgroundColor: priorityColors[a.priority] }}
              />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2">
                  <h3 className="font-sans text-cream text-sm font-medium flex-1 text-balance">{a.title}</h3>
                  {a.priority === 'urgent' && (
                    <div className="w-2 h-2 rounded-full bg-destructive pulse-dot flex-shrink-0 mt-1.5" />
                  )}
                </div>
                {expandedId !== a.id && (
                  <p className="font-sans text-muted-foreground text-xs mt-1 line-clamp-2">{a.content}</p>
                )}
                <p className="font-mono text-muted-foreground text-[10px] mt-1.5">
                  {new Date(a.timestamp).toLocaleDateString('en-NG', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>

              {/* Arrow */}
              <ChevronRight
                size={16}
                className={`text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                  expandedId === a.id ? 'rotate-90' : 'group-hover:translate-x-0.5'
                }`}
              />
            </button>

            {/* Expanded content */}
            {expandedId === a.id && (
              <div className="pl-7 pb-5 pr-4">
                <p className="font-sans text-cream/70 text-sm leading-relaxed">{a.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {sorted.length === 0 && (
        <div className="text-center py-20">
          <p className="font-serif text-muted-foreground italic text-lg">All quiet for now.</p>
        </div>
      )}
    </div>
  )
}
