'use client'

import { useState } from 'react'
import { events, members } from '@/lib/store'
import { Plus, Edit3, Trash2, X, Users } from 'lucide-react'

function SlidePanel({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null
  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-[#0D0D0D] border-l border-[rgba(255,255,255,0.06)] z-50 overflow-y-auto">
        <div className="p-6">
          <button onClick={onClose} className="mb-6 text-muted-foreground hover:text-cream transition-colors" aria-label="Close panel">
            <X size={20} />
          </button>
          {children}
        </div>
      </div>
    </>
  )
}

export default function AdminEvents() {
  const [showPanel, setShowPanel] = useState(false)
  const [showRsvps, setShowRsvps] = useState<string | null>(null)

  const inputClass =
    'w-full h-11 px-4 bg-surface-elevated border border-[rgba(255,255,255,0.06)] rounded-xl text-cream font-sans text-sm placeholder:text-muted-foreground focus:outline-none focus:border-gold/40 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.15)] transition-all'

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-cream text-3xl">Events</h1>
        <button
          onClick={() => { setShowPanel(true); setShowRsvps(null) }}
          className="inline-flex items-center gap-2 h-10 px-5 bg-gold text-[#0A0A0A] font-sans text-sm font-medium rounded-xl hover:scale-[1.02] transition-all"
        >
          <Plus size={16} />
          Create Event
        </button>
      </div>

      {/* Table */}
      <div className="mt-8 bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.06)]">
              <th className="text-left px-5 py-3 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Event</th>
              <th className="text-left px-5 py-3 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Date</th>
              <th className="text-left px-5 py-3 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Location</th>
              <th className="text-left px-5 py-3 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">RSVPs</th>
              <th className="text-right px-5 py-3 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-b border-[rgba(255,255,255,0.06)] last:border-0 hover:bg-surface-elevated/30 transition-colors">
                <td className="px-5 py-4">
                  <p className="font-sans text-cream text-sm">{event.name}</p>
                  <p className="font-mono text-muted-foreground text-[10px]">{event.time}</p>
                </td>
                <td className="px-5 py-4 font-mono text-gold text-xs">
                  {new Date(event.date).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })}
                </td>
                <td className="px-5 py-4 font-sans text-cream/70 text-xs">{event.location}</td>
                <td className="px-5 py-4">
                  <button
                    onClick={() => { setShowRsvps(event.id); setShowPanel(true) }}
                    className="inline-flex items-center gap-1.5 font-mono text-gold text-xs hover:text-cream transition-colors"
                  >
                    <Users size={12} />
                    {event.attendees.length}
                  </button>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 rounded-lg hover:bg-surface-elevated text-muted-foreground hover:text-cream transition-all" aria-label="Edit event">
                      <Edit3 size={14} />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all" aria-label="Delete event">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Slide panel */}
      <SlidePanel open={showPanel} onClose={() => { setShowPanel(false); setShowRsvps(null) }}>
        {showRsvps ? (
          <>
            <h2 className="font-serif text-cream text-xl mb-6">
              RSVPs — {events.find((e) => e.id === showRsvps)?.name}
            </h2>
            <div className="space-y-3">
              {events.find((e) => e.id === showRsvps)?.attendees.map((uid) => {
                const member = members.find((m) => m.id === uid)
                if (!member) return null
                return (
                  <div key={uid} className="flex items-center gap-3 bg-surface border border-[rgba(255,255,255,0.06)] rounded-xl p-3">
                    <div className="w-8 h-8 rounded-full bg-surface-elevated flex items-center justify-center">
                      <span className="font-mono text-gold text-[10px]">{member.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-sans text-cream text-sm">{member.name}</p>
                      <p className="font-sans text-muted-foreground text-[10px]">{member.email}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        ) : (
          <>
            <h2 className="font-serif text-cream text-xl mb-6">Create Event</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="font-sans text-cream text-xs block mb-1.5">Event Name</label>
                <input type="text" placeholder="Event name" className={inputClass} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-sans text-cream text-xs block mb-1.5">Date</label>
                  <input type="date" className={inputClass} />
                </div>
                <div>
                  <label className="font-sans text-cream text-xs block mb-1.5">Time</label>
                  <input type="time" className={inputClass} />
                </div>
              </div>
              <div>
                <label className="font-sans text-cream text-xs block mb-1.5">Location</label>
                <input type="text" placeholder="Event location" className={inputClass} />
              </div>
              <div>
                <label className="font-sans text-cream text-xs block mb-1.5">Description</label>
                <textarea placeholder="Event description..." rows={4} className={`${inputClass} h-auto py-3 resize-none`} />
              </div>
              <div>
                <label className="font-sans text-cream text-xs block mb-1.5">Max Capacity (optional)</label>
                <input type="number" placeholder="Leave empty for unlimited" className={inputClass} />
              </div>
              <button type="submit" className="w-full h-11 bg-gold text-[#0A0A0A] font-sans font-medium text-sm rounded-xl hover:scale-[1.02] transition-all mt-4">
                Create Event
              </button>
            </form>
          </>
        )}
      </SlidePanel>
    </div>
  )
}
