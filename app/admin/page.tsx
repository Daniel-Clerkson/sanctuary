'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { members, events, attendanceHistory } from '@/lib/store'
import { Users, CheckCircle2, CalendarDays, UserPlus, Megaphone, CalendarPlus, Upload } from 'lucide-react'

const recentActivity = [
  { text: 'Daniel checked in to Sunday Service', time: '2 hours ago' },
  { text: 'Pastor Adebayo uploaded "The Weight of Grace"', time: '5 hours ago' },
  { text: '5 new RSVPs for Youth Night: Unfiltered', time: '1 day ago' },
  { text: 'Amaka Nwosu joined the community', time: '2 days ago' },
  { text: 'New announcement posted: Venue Change', time: '3 days ago' },
]

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color?: string }) {
  return (
    <div className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl p-5 hover:border-gold/20 transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <div style={{ color: color || '#C9A84C' }}>{icon}</div>
      </div>
      <p className="font-serif text-cream text-2xl">{value}</p>
      <p className="font-sans text-muted-foreground text-xs mt-1">{label}</p>
    </div>
  )
}

export default function AdminOverview() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const sundayAttendance = attendanceHistory.filter((r) => r.checkedIn).length
  const thisMonthEvents = events.filter((e) => {
    const d = new Date(e.date)
    const now = new Date()
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length

  return (
    <div>
      <h1 className={`font-serif text-cream text-3xl ${mounted ? 'animate-fade-up' : 'opacity-0'}`}>Overview</h1>
      <p className={`font-mono text-muted-foreground text-xs mt-1 ${mounted ? 'animate-fade-up' : 'opacity-0'}`}>
        Sanctuary Admin Dashboard
      </p>

      {/* Stats */}
      <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '80ms' }}>
        <StatCard icon={<Users size={20} />} label="Total members" value={String(members.length)} />
        <StatCard icon={<CheckCircle2 size={20} />} label="This Sunday" value={String(sundayAttendance)} color="#27AE60" />
        <StatCard icon={<CalendarDays size={20} />} label="Events this month" value={String(thisMonthEvents)} />
        <StatCard icon={<UserPlus size={20} />} label="New this week" value="2" />
      </div>

      {/* Quick actions */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '160ms' }}>
        <Link
          href="/admin/announcements"
          className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 flex items-center gap-4 hover:border-gold/20 hover:-translate-y-1 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-xl bg-surface-elevated flex items-center justify-center flex-shrink-0">
            <Megaphone size={20} className="text-gold" />
          </div>
          <div>
            <h3 className="font-sans text-cream text-sm font-medium">Post Announcement</h3>
            <p className="font-sans text-muted-foreground text-xs mt-0.5">Share with the community</p>
          </div>
        </Link>
        <Link
          href="/admin/events"
          className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 flex items-center gap-4 hover:border-gold/20 hover:-translate-y-1 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-xl bg-surface-elevated flex items-center justify-center flex-shrink-0">
            <CalendarPlus size={20} className="text-gold" />
          </div>
          <div>
            <h3 className="font-sans text-cream text-sm font-medium">Create Event</h3>
            <p className="font-sans text-muted-foreground text-xs mt-0.5">Schedule a new gathering</p>
          </div>
        </Link>
        <Link
          href="/admin/sermons"
          className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 flex items-center gap-4 hover:border-gold/20 hover:-translate-y-1 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-xl bg-surface-elevated flex items-center justify-center flex-shrink-0">
            <Upload size={20} className="text-gold" />
          </div>
          <div>
            <h3 className="font-sans text-cream text-sm font-medium">Upload Sermon</h3>
            <p className="font-sans text-muted-foreground text-xs mt-0.5">Add a new message</p>
          </div>
        </Link>
      </div>

      {/* Recent activity */}
      <div className={`mt-10 ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '240ms' }}>
        <h2 className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider mb-4">Recent Activity</h2>
        <div className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl divide-y divide-[rgba(255,255,255,0.06)]">
          {recentActivity.map((item, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-4">
              <p className="font-sans text-cream text-sm">{item.text}</p>
              <span className="font-mono text-muted-foreground text-[10px] flex-shrink-0 ml-4">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
