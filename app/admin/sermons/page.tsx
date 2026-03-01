'use client'

import { useState } from 'react'
import { sermons, allSeries } from '@/lib/store'
import { Plus, Edit3, Trash2, X, Upload } from 'lucide-react'

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

export default function AdminSermons() {
  const [showPanel, setShowPanel] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploading, setUploading] = useState(false)

  const simulateUpload = () => {
    setUploading(true)
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploading(false)
          return 100
        }
        return prev + 5
      })
    }, 100)
  }

  const inputClass =
    'w-full h-11 px-4 bg-surface-elevated border border-[rgba(255,255,255,0.06)] rounded-xl text-cream font-sans text-sm placeholder:text-muted-foreground focus:outline-none focus:border-gold/40 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.15)] transition-all'

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-cream text-3xl">Sermons</h1>
        <button
          onClick={() => setShowPanel(true)}
          className="inline-flex items-center gap-2 h-10 px-5 bg-gold text-[#0A0A0A] font-sans text-sm font-medium rounded-xl hover:scale-[1.02] transition-all"
        >
          <Plus size={16} />
          Upload Sermon
        </button>
      </div>

      {/* Table */}
      <div className="mt-8 bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.06)]">
              <th className="text-left px-5 py-3 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Title</th>
              <th className="text-left px-5 py-3 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Pastor</th>
              <th className="text-left px-5 py-3 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Date</th>
              <th className="text-left px-5 py-3 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Plays</th>
              <th className="text-right px-5 py-3 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sermons.map((sermon) => (
              <tr key={sermon.id} className="border-b border-[rgba(255,255,255,0.06)] last:border-0 hover:bg-surface-elevated/30 transition-colors">
                <td className="px-5 py-4">
                  <p className="font-sans text-cream text-sm">{sermon.title}</p>
                  <p className="font-mono text-muted-foreground text-[10px]">{sermon.series}</p>
                </td>
                <td className="px-5 py-4 font-sans text-cream/70 text-sm">{sermon.pastor}</td>
                <td className="px-5 py-4 font-mono text-muted-foreground text-xs">
                  {new Date(sermon.date).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })}
                </td>
                <td className="px-5 py-4 font-mono text-gold text-xs">{Math.floor(Math.random() * 200) + 50}</td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 rounded-lg hover:bg-surface-elevated text-muted-foreground hover:text-cream transition-all" aria-label="Edit sermon">
                      <Edit3 size={14} />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all" aria-label="Delete sermon">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upload panel */}
      <SlidePanel open={showPanel} onClose={() => setShowPanel(false)}>
        <h2 className="font-serif text-cream text-xl mb-6">Upload Sermon</h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="font-sans text-cream text-xs block mb-1.5">Title</label>
            <input type="text" placeholder="Sermon title" className={inputClass} />
          </div>
          <div>
            <label className="font-sans text-cream text-xs block mb-1.5">Pastor</label>
            <input type="text" placeholder="Pastor name" className={inputClass} />
          </div>
          <div>
            <label className="font-sans text-cream text-xs block mb-1.5">Series</label>
            <select className={inputClass}>
              {allSeries.map((s) => (
                <option key={s} value={s} className="bg-surface-elevated text-cream">{s}</option>
              ))}
              <option value="new" className="bg-surface-elevated text-cream">+ Create new series</option>
            </select>
          </div>
          <div>
            <label className="font-sans text-cream text-xs block mb-1.5">Date</label>
            <input type="date" className={inputClass} />
          </div>
          <div>
            <label className="font-sans text-cream text-xs block mb-1.5">Audio File</label>
            <div
              className="border-2 border-dashed border-[rgba(255,255,255,0.1)] rounded-xl p-6 text-center cursor-pointer hover:border-gold/30 transition-colors"
              onClick={simulateUpload}
            >
              <Upload size={24} className="mx-auto text-muted-foreground mb-2" />
              <p className="font-sans text-muted-foreground text-xs">Click to upload audio file</p>
              <p className="font-mono text-muted-foreground text-[10px] mt-1">MP3, WAV, M4A (max 100MB)</p>
            </div>
            {uploading && (
              <div className="mt-3">
                <div className="w-full h-1.5 bg-surface-elevated rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gold rounded-full transition-all duration-200"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="font-mono text-gold text-[10px] mt-1">{uploadProgress}%</p>
              </div>
            )}
          </div>
          <div>
            <label className="font-sans text-cream text-xs block mb-1.5">Sermon Notes</label>
            <textarea
              placeholder="Write sermon notes..."
              rows={5}
              className={`${inputClass} h-auto py-3 resize-none`}
            />
          </div>
          <button
            type="submit"
            className="w-full h-11 bg-gold text-[#0A0A0A] font-sans font-medium text-sm rounded-xl hover:scale-[1.02] transition-all mt-4"
          >
            Upload Sermon
          </button>
        </form>
      </SlidePanel>
    </div>
  )
}
