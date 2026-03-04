'use client'

import { useState, useEffect } from 'react'
import { 
  ExternalLink, 
  BookOpen, 
  Mic2, 
  Tv, 
  Heart, 
  Globe, 
  MessageSquare, 
  Save, 
  CheckCircle2 
} from 'lucide-react'

const resources = [
  {
    title: "Rhapsody of Realities",
    description: "Read the daily devotional and article of the day.",
    url: "https://read.rhapsodyofrealities.org/",
    icon: BookOpen,
    color: "text-gold"
  },
  {
    title: "Pastor Chris Digital Library",
    description: "Access a vast library of audio and video teachings.",
    url: "https://pcdl.co/",
    icon: Mic2,
    color: "text-blue-400"
  },
  {
    title: "LoveWorld News",
    description: "Stay updated with the latest news from the ministry.",
    url: "https://loveworldnews.com/",
    icon: Globe,
    color: "text-emerald-400"
  },
  {
    title: "Ceflix TV",
    description: "Watch live streams and Christian social video content.",
    url: "https://ceflix.org/",
    icon: Tv,
    color: "text-red-400"
  },
  {
    title: "Healing School",
    description: "Reports and testimonies from the healing ministry.",
    url: "https://enterthehealingschool.org/",
    icon: Heart,
    color: "text-rose-400"
  }
]

export default function ResourcesPage() {
  const [mounted, setMounted] = useState(false)
  const [note, setNote] = useState('')
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success'>('idle')

  useEffect(() => {
    setMounted(true)
    const savedNote = localStorage.getItem('study_note_v1')
    if (savedNote) setNote(savedNote)
  }, [])

  const handleSaveNote = () => {
    if (!note.trim()) return
    localStorage.setItem('study_note_v1', note)
    setSaveStatus('success')
    setTimeout(() => setSaveStatus('idle'), 3000)
  }

  return (
    <div className="max-w-[1000px] mx-auto pb-20 px-6">
      {/* Header */}
      <header className={`pt-16 pb-12 ${mounted ? 'animate-fade-up' : 'opacity-0'}`}>
        <p className="font-mono text-[10px] text-gold uppercase tracking-[0.4em] mb-3">Ministry Portal</p>
        <h1 className="font-serif text-4xl md:text-6xl text-cream mb-6 leading-tight">Official Resources</h1>
        <p className="font-sans text-muted-foreground text-lg max-w-2xl leading-relaxed">
          Access the official platforms of Pastor Chris and the LoveWorld Nation. 
          Use the study section below to record your insights as you explore.
        </p>
      </header>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
        {resources.map((item, index) => (
          <a
            key={item.title}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group block p-6 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-surface hover:border-gold/40 transition-all duration-300 ${mounted ? 'animate-fade-up' : 'opacity-0'}`}
            style={{ animationDelay: `${index * 50 + 100}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-xl bg-white/5 group-hover:bg-gold/10 transition-colors`}>
                <item.icon size={24} className={`${item.color} group-hover:scale-110 transition-transform`} />
              </div>
              <ExternalLink size={16} className="text-muted-foreground group-hover:text-gold transition-colors" />
            </div>
            <h3 className="mt-6 font-sans text-lg font-medium text-cream group-hover:text-gold transition-colors">
              {item.title}
            </h3>
            <p className="mt-2 font-sans text-sm text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </a>
        ))}
      </div>

      {/* Study Area */}
      <section className={`grid md:grid-cols-3 gap-8 ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare size={18} className="text-gold" />
            <h2 className="text-cream font-medium">Study Notes</h2>
          </div>
          <div className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 focus-within:border-gold/30 transition-all">
            <textarea 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What is the Holy Spirit saying to you?"
              className="w-full bg-transparent border-none text-cream font-sans text-base resize-none focus:outline-none min-h-[200px] placeholder:text-muted-foreground/30"
            />
            <div className="flex justify-end mt-4">
              <button 
                onClick={handleSaveNote}
                disabled={!note.trim()}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-sans text-xs font-bold transition-all ${
                  saveStatus === 'success' 
                    ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                    : 'bg-gold text-[#0A0A0A] hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] disabled:opacity-30'
                }`}
              >
                {saveStatus === 'success' ? (
                  <><CheckCircle2 size={16} /> Saved to Local Storage</>
                ) : (
                  <><Save size={16} /> Save Note</>
                )}
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-gold/5 border border-gold/10 rounded-2xl p-6 self-start">
          <h3 className="text-gold font-mono text-[10px] uppercase tracking-widest mb-4">Note Management</h3>
          <p className="text-muted-foreground text-xs leading-relaxed mb-4">
            Your notes are saved locally in your current browser. You can revisit this page anytime to see your saved insights.
          </p>
          <div className="space-y-2">
             <div className="text-[10px] text-cream/50 font-mono flex justify-between">
                <span>LAST SAVED:</span>
                <span>{saveStatus === 'success' ? 'Just Now' : 'Earlier'}</span>
             </div>
          </div>
        </div>
      </section>
    </div>
  )
}