'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { demoUser, sermons, events, attendanceHistory } from '@/lib/store'
import { Camera, Edit3, Bookmark, Calendar, CheckCircle2 } from 'lucide-react'

function AttendanceMiniCalendar() {
  const today = new Date()
  const month = new Date(today.getFullYear(), today.getMonth(), 1)
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay()
  const attendedDates = new Set(attendanceHistory.filter((r) => r.checkedIn).map((r) => r.date))

  return (
    <div className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl p-4">
      <h4 className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider mb-3 text-center">
        {month.toLocaleDateString('en-NG', { month: 'long', year: 'numeric' })}
      </h4>
      <div className="grid grid-cols-7 gap-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={`${d}-${i}`} className="text-center font-mono text-[9px] text-muted-foreground py-0.5">{d}</div>
        ))}
        {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const dateStr = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const attended = attendedDates.has(dateStr)
          return (
            <div
              key={day}
              className={`w-full aspect-square rounded-md flex items-center justify-center text-[10px] font-mono ${
                attended ? 'bg-gold/20 text-gold font-bold' : 'text-cream/20'
              }`}
            >
              {day}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'rsvps' | 'attendance'>('bookmarks')

  useEffect(() => { setMounted(true) }, [])

  const totalAttended = attendanceHistory.filter((r) => r.checkedIn).length
  const bookmarkedSermons = sermons.slice(0, 3)
  const rsvpEvents = events.slice(0, 2)

  const tabs = [
    { key: 'bookmarks', label: 'My Bookmarks', icon: Bookmark },
    { key: 'rsvps', label: 'My RSVPs', icon: Calendar },
    { key: 'attendance', label: 'Attendance History', icon: CheckCircle2 },
  ] as const

  return (
    <div>
      <div className={`grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 ${mounted ? 'animate-fade-up' : 'opacity-0'}`}>
        {/* Profile card */}
        <div className="space-y-6">
          <div className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 text-center">
            {/* Avatar */}
            <div className="relative inline-block group cursor-pointer">
              <div className="w-24 h-24 rounded-full bg-surface-elevated border-[3px] border-gold flex items-center justify-center mx-auto">
                <span className="font-serif text-gold text-3xl">{demoUser.name.charAt(0)}</span>
              </div>
              <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={20} className="text-cream" />
              </div>
            </div>

            <h2 className="font-serif text-cream text-xl mt-4">{demoUser.name}</h2>
            <span className="inline-block font-mono text-[10px] text-gold border border-gold/30 rounded-md px-2 py-0.5 mt-2">
              {demoUser.department}
            </span>
            <p className="font-mono text-muted-foreground text-[10px] mt-2">
              Joined {new Date(demoUser.joinDate).toLocaleDateString('en-NG', { month: 'long', year: 'numeric' })}
            </p>

            <button className="inline-flex items-center gap-2 h-9 px-4 border border-gold/30 text-gold font-sans text-xs font-medium rounded-lg hover:bg-gold/10 transition-all mt-4">
              <Edit3 size={14} />
              Edit Profile
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-xl p-3 text-center">
              <p className="font-serif text-cream text-lg">{totalAttended}</p>
              <p className="font-sans text-muted-foreground text-[10px]">Attended</p>
            </div>
            <div className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-xl p-3 text-center">
              <p className="font-serif text-cream text-lg">{bookmarkedSermons.length}</p>
              <p className="font-sans text-muted-foreground text-[10px]">Bookmarked</p>
            </div>
            <div className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-xl p-3 text-center">
              <p className="font-serif text-cream text-lg">{rsvpEvents.length}</p>
              <p className="font-sans text-muted-foreground text-[10px]">Events</p>
            </div>
          </div>
        </div>

        {/* Activity */}
        <div>
          {/* Tabs */}
          <div className="flex gap-1 mb-6 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 h-9 px-4 rounded-lg font-sans text-xs font-medium transition-all flex-shrink-0 ${
                    activeTab === tab.key
                      ? 'bg-gold text-[#0A0A0A]'
                      : 'bg-surface border border-[rgba(255,255,255,0.06)] text-muted-foreground hover:text-cream'
                  }`}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Tab content */}
          {activeTab === 'bookmarks' && (
            <div className="space-y-3">
              {bookmarkedSermons.map((sermon) => (
                <Link
                  key={sermon.id}
                  href={`/dashboard/sermons/${sermon.id}`}
                  className="flex items-center gap-4 bg-surface border border-[rgba(255,255,255,0.06)] rounded-xl p-4 hover:border-gold/20 transition-all"
                >
                  <div className="w-12 h-12 bg-surface-elevated rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bookmark size={16} className="text-gold fill-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-sans text-cream text-sm font-medium truncate">{sermon.title}</h4>
                    <p className="font-sans text-muted-foreground text-xs mt-0.5">{sermon.pastor}</p>
                  </div>
                  <span className="font-mono text-gold text-xs flex-shrink-0">{sermon.duration}</span>
                </Link>
              ))}
              {bookmarkedSermons.length === 0 && (
                <p className="font-serif text-muted-foreground italic text-center py-12">No bookmarks yet.</p>
              )}
            </div>
          )}

          {activeTab === 'rsvps' && (
            <div className="space-y-3">
              {rsvpEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-xl p-4"
                >
                  <h4 className="font-sans text-cream text-sm font-medium">{event.name}</h4>
                  <p className="font-mono text-gold text-xs mt-1">
                    {new Date(event.date).toLocaleDateString('en-NG', { weekday: 'short', month: 'short', day: 'numeric' })}
                    {' \u00B7 '}{event.time}
                  </p>
                  <p className="font-sans text-muted-foreground text-xs mt-1">{event.location}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'attendance' && <AttendanceMiniCalendar />}
        </div>
      </div>
    </div>
  )
}
