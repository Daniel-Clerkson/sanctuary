'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { demoUser, sermons, events, announcements } from '@/lib/store'
import { Flame, Calendar, Headphones, BookOpen, Play, MapPin, Check } from 'lucide-react'

function StatCard({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <div className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl p-4 hover:border-gold/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-3">
        <div className="text-gold">{icon}</div>
      </div>
      <p className="font-sans text-cream text-lg font-medium">{value}</p>
      <p className="font-sans text-muted-foreground text-xs mt-0.5">{label}</p>
    </div>
  )
  return href ? <Link href={href}>{content}</Link> : content
}

function WaveformBars() {
  return (
    <div className="flex items-end gap-[3px] h-10">
      {[0.4, 0.8, 0.5, 1, 0.6, 0.9, 0.3, 0.7].map((_, i) => (
        <div
          key={i}
          className="w-1 bg-gold/60 rounded-full waveform-bar"
          style={{ animationDelay: `${i * 0.12}s`, animationDuration: `${0.7 + i * 0.15}s` }}
        />
      ))}
    </div>
  )
}

function FeaturedSermon() {
  const sermon = sermons[0]
  return (
    <div className="mt-8">
      <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider mb-4">Latest from the pulpit</p>
      <div className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:border-gold/20 transition-all duration-300">
        {/* Artwork / Waveform */}
        <div className="w-full md:w-48 h-32 md:h-auto bg-surface-elevated rounded-xl flex items-center justify-center adire-pattern flex-shrink-0">
          <WaveformBars />
        </div>
        {/* Info */}
        <div className="flex flex-col justify-between flex-1">
          <div>
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">{sermon.series}</p>
            <h3 className="font-serif text-cream text-2xl md:text-3xl mt-1">{sermon.title}</h3>
            <p className="font-sans text-muted-foreground text-sm mt-2">{sermon.pastor} &middot; {new Date(sermon.date).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            <p className="font-mono text-gold text-xs mt-1">{sermon.duration}</p>
          </div>
          <div className="mt-4">
            <Link
              href={`/dashboard/sermons/${sermon.id}`}
              className="inline-flex items-center gap-2 h-11 px-6 bg-gold text-[#0A0A0A] font-sans font-medium text-sm rounded-xl hover:scale-[1.02] transition-all duration-200"
            >
              <Play size={16} fill="#0A0A0A" />
              Listen Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function EventStrip() {
  const [rsvps, setRsvps] = useState<Record<string, boolean>>({ '1': true })

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">Upcoming Events</p>
        <Link href="/dashboard/events" className="font-sans text-xs text-gold hover:text-cream transition-colors">View all</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:overflow-visible overflow-x-auto">
        {events.map((event) => (
          <div
            key={event.id}
            className={`bg-surface border rounded-2xl p-5 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300 flex-shrink-0 ${
              rsvps[event.id] ? 'border-success/30' : 'border-[rgba(255,255,255,0.06)]'
            }`}
          >
            <h4 className="font-sans text-cream text-base font-medium">{event.name}</h4>
            <p className="font-mono text-gold text-xs mt-2">
              {new Date(event.date).toLocaleDateString('en-NG', { weekday: 'short', month: 'short', day: 'numeric' })}
              {' \u00B7 '}{event.time}
            </p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <MapPin size={12} className="text-muted-foreground" />
              <p className="font-sans text-muted-foreground text-xs">{event.location}</p>
            </div>
            <button
              onClick={() => setRsvps((prev) => ({ ...prev, [event.id]: !prev[event.id] }))}
              className={`mt-4 h-9 px-4 text-xs font-sans font-medium rounded-lg transition-all duration-200 ${
                rsvps[event.id]
                  ? 'bg-success/10 text-success border border-success/30'
                  : 'bg-transparent border border-gold/30 text-gold hover:bg-gold/10'
              }`}
            >
              {rsvps[event.id] ? (
                <span className="flex items-center gap-1.5"><Check size={14} /> {"You're going"}</span>
              ) : (
                'RSVP'
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function AnnouncementsFeed() {
  const priorityColors = {
    urgent: '#C0392B',
    normal: '#C9A84C',
    info: '#666666',
  }

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">Announcements</p>
        <Link href="/dashboard/announcements" className="font-sans text-xs text-gold hover:text-cream transition-colors">View all</Link>
      </div>
      <div className="space-y-0">
        {announcements.slice(0, 3).map((a) => (
          <div key={a.id} className="flex gap-4 py-4 border-b border-[rgba(255,255,255,0.06)] last:border-0">
            <div className="w-[3px] rounded-full flex-shrink-0" style={{ backgroundColor: priorityColors[a.priority] }} />
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2">
                <h4 className="font-sans text-cream text-sm font-medium flex-1">{a.title}</h4>
                {a.priority === 'urgent' && (
                  <div className="w-2 h-2 rounded-full bg-destructive pulse-dot flex-shrink-0 mt-1.5" />
                )}
              </div>
              <p className="font-sans text-muted-foreground text-xs mt-1 line-clamp-1">{a.content}</p>
              <p className="font-mono text-muted-foreground text-[10px] mt-1.5">
                {new Date(a.timestamp).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DashboardHome() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div>
      {/* Greeting */}
      <div className={mounted ? 'animate-fade-up' : 'opacity-0'} style={{ animationDelay: '0ms' }}>
        <h1 className="font-serif text-cream text-3xl md:text-4xl">
          {greeting}, {demoUser.name.split(' ')[0]}
        </h1>
        <p className="font-mono text-muted-foreground text-xs mt-2 uppercase tracking-wider">
          {new Date().toLocaleDateString('en-NG', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      {/* Stat cards */}
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-8 ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '80ms' }}>
        <StatCard icon={<Flame size={20} />} label="Sunday streak" value="5 Sundays" href="/dashboard/attendance" />
        <StatCard icon={<Calendar size={20} />} label="Next event" value="Youth Night — Friday" href="/dashboard/events" />
        <StatCard icon={<Headphones size={20} />} label="New sermons" value="3 new this week" href="/dashboard/sermons" />
        <StatCard icon={<BookOpen size={20} />} label="Daily devotional" value="Read today's verse" href="/dashboard/devotional" />
      </div>

      <div className={mounted ? 'animate-fade-up' : 'opacity-0'} style={{ animationDelay: '160ms' }}>
        <FeaturedSermon />
      </div>

      <div className={mounted ? 'animate-fade-up' : 'opacity-0'} style={{ animationDelay: '240ms' }}>
        <EventStrip />
      </div>

      <div className={mounted ? 'animate-fade-up' : 'opacity-0'} style={{ animationDelay: '320ms' }}>
        <AnnouncementsFeed />
      </div>
    </div>
  )
}
