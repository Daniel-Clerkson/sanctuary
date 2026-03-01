'use client'

import { useState } from 'react'
import { announcements } from '@/lib/store'
import { Plus, Edit3, Trash2, X } from 'lucide-react'

const priorityColors: Record<string, string> = {
  urgent: '#C0392B',
  normal: '#C9A84C',
  info: '#666666',
}

export default function AdminAnnouncements() {
  const [showPanel, setShowPanel] = useState(false)

  const inputClass =
    'w-full h-11 px-4 bg-surface-elevated border border-[rgba(255,255,255,0.06)] rounded-xl text-cream font-sans text-sm placeholder:text-muted-foreground focus:outline-none focus:border-gold/40 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.15)] transition-all'

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-cream text-3xl">Announcements</h1>
        <button
          onClick={() => setShowPanel(true)}
          className="inline-flex items-center gap-2 h-10 px-5 bg-gold text-[#0A0A0A] font-sans text-sm font-medium rounded-xl hover:scale-[1.02] transition-all"
        >
          <Plus size={16} />
          Post Announcement
        </button>
      </div>

      <div className="mt-8 bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.06)]">
              <th className="text-left px-5 py-3 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Priority</th>
              <th className="text-left px-5 py-3 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Title</th>
              <th className="text-left px-5 py-3 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Date</th>
              <th className="text-right px-5 py-3 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((a) => (
              <tr key={a.id} className="border-b border-[rgba(255,255,255,0.06)] last:border-0 hover:bg-surface-elevated/30 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: priorityColors[a.priority] }} />
                    <span className="font-mono text-[10px] text-muted-foreground capitalize">{a.priority}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <p className="font-sans text-cream text-sm">{a.title}</p>
                </td>
                <td className="px-5 py-4 font-mono text-muted-foreground text-xs">
                  {new Date(a.timestamp).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })}
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 rounded-lg hover:bg-surface-elevated text-muted-foreground hover:text-cream transition-all" aria-label="Edit">
                      <Edit3 size={14} />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all" aria-label="Delete">
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
      {showPanel && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setShowPanel(false)} />
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-[#0D0D0D] border-l border-[rgba(255,255,255,0.06)] z-50 overflow-y-auto">
            <div className="p-6">
              <button onClick={() => setShowPanel(false)} className="mb-6 text-muted-foreground hover:text-cream transition-colors" aria-label="Close">
                <X size={20} />
              </button>
              <h2 className="font-serif text-cream text-xl mb-6">Post Announcement</h2>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="font-sans text-cream text-xs block mb-1.5">Title</label>
                  <input type="text" placeholder="Announcement title" className={inputClass} />
                </div>
                <div>
                  <label className="font-sans text-cream text-xs block mb-1.5">Content</label>
                  <textarea placeholder="Write your announcement..." rows={5} className={`${inputClass} h-auto py-3 resize-none`} />
                </div>
                <div>
                  <label className="font-sans text-cream text-xs block mb-1.5">Priority</label>
                  <select className={inputClass}>
                    <option value="normal" className="bg-surface-elevated text-cream">Normal</option>
                    <option value="urgent" className="bg-surface-elevated text-cream">Urgent</option>
                    <option value="info" className="bg-surface-elevated text-cream">Info</option>
                  </select>
                </div>
                <div>
                  <label className="font-sans text-cream text-xs block mb-1.5">Category</label>
                  <select className={inputClass}>
                    <option value="general" className="bg-surface-elevated text-cream">General</option>
                    <option value="events" className="bg-surface-elevated text-cream">Events</option>
                    <option value="urgent" className="bg-surface-elevated text-cream">Urgent</option>
                  </select>
                </div>
                <button type="submit" className="w-full h-11 bg-gold text-[#0A0A0A] font-sans font-medium text-sm rounded-xl hover:scale-[1.02] transition-all mt-4">
                  Post Announcement
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
