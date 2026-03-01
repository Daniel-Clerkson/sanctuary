'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { devotionals } from '@/lib/store'
import { ChevronLeft, ChevronRight, Flame, Heart, HandMetal, Lightbulb, Send } from 'lucide-react'

const reactionIcons = [
  { key: 'fire', icon: Flame, label: 'Fire' },
  { key: 'heart', icon: Heart, label: 'Love' },
  { key: 'pray', icon: HandMetal, label: 'Pray' },
  { key: 'lightbulb', icon: Lightbulb, label: 'Insight' },
] as const

export default function DevotionalPage() {
  const [mounted, setMounted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [reactions, setReactions] = useState(devotionals[0]?.reactions || { fire: 0, heart: 0, pray: 0, lightbulb: 0 })
  const [userReactions, setUserReactions] = useState<Set<string>>(new Set())
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(devotionals[0]?.comments || [])

  useEffect(() => { setMounted(true) }, [])

  const devotional = devotionals[currentIndex]
  if (!devotional) return null

  const handleReact = (key: string) => {
    if (userReactions.has(key)) {
      setReactions((prev) => ({ ...prev, [key]: prev[key as keyof typeof prev] - 1 }))
      setUserReactions((prev) => { const next = new Set(prev); next.delete(key); return next })
    } else {
      setReactions((prev) => ({ ...prev, [key]: prev[key as keyof typeof prev] + 1 }))
      setUserReactions((prev) => new Set(prev).add(key))
    }
  }

  const handleComment = () => {
    if (!comment.trim()) return
    setComments((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        userId: '1',
        userName: 'Daniel O.',
        text: comment,
        time: 'Just now',
      },
    ])
    setComment('')
  }

  const goToPrev = () => {
    if (currentIndex < devotionals.length - 1) {
      const nextIdx = currentIndex + 1
      setCurrentIndex(nextIdx)
      setReactions(devotionals[nextIdx].reactions)
      setComments(devotionals[nextIdx].comments)
      setUserReactions(new Set())
    }
  }

  const goToNext = () => {
    if (currentIndex > 0) {
      const nextIdx = currentIndex - 1
      setCurrentIndex(nextIdx)
      setReactions(devotionals[nextIdx].reactions)
      setComments(devotionals[nextIdx].comments)
      setUserReactions(new Set())
    }
  }

  return (
    <div className="max-w-[680px] mx-auto">
      {/* Header */}
      <div className={`text-center ${mounted ? 'animate-fade-up' : 'opacity-0'}`}>
        <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
          {new Date(devotional.date).toLocaleDateString('en-NG', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
        <p className="font-mono text-[11px] text-gold uppercase tracking-wider mt-2">Daily Devotional</p>
      </div>

      {/* Verse */}
      <div className={`mt-10 ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '80ms' }}>
        <blockquote className="font-serif italic text-cream/90 text-xl md:text-2xl lg:text-3xl text-center leading-[1.8]">
          {devotional.verse}
        </blockquote>
        <p className="font-mono text-gold text-xs mt-4 text-right">{devotional.reference}</p>
      </div>

      {/* Divider */}
      <div className="flex justify-center my-10">
        <div className="w-20 h-[1px] bg-gold/40" />
      </div>

      {/* Reflection */}
      <div className={mounted ? 'animate-fade-up' : 'opacity-0'} style={{ animationDelay: '160ms' }}>
        <h2 className="font-sans text-cream text-lg font-medium mb-4">{"Today's Reflection"}</h2>
        {devotional.reflection.split('\n').map((para, i) => (
          <p key={i} className="font-sans text-cream/70 text-[15px] md:text-[17px] leading-relaxed mb-4">
            {para}
          </p>
        ))}
      </div>

      {/* Reactions */}
      <div className={`mt-10 ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '240ms' }}>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {reactionIcons.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => handleReact(key)}
              className={`flex items-center gap-1.5 h-10 px-4 rounded-xl border font-sans text-sm transition-all duration-200 ${
                userReactions.has(key)
                  ? 'border-gold/40 bg-gold/10 text-gold'
                  : 'border-[rgba(255,255,255,0.06)] text-muted-foreground hover:border-gold/20 hover:text-cream'
              }`}
              aria-label={label}
            >
              <Icon size={16} />
              <span className="font-mono text-xs">{reactions[key as keyof typeof reactions]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Comments */}
      <div className={`mt-10 ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '320ms' }}>
        <h3 className="font-sans text-cream text-sm font-medium mb-4">Community Thoughts</h3>
        <div className="space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-surface-elevated flex items-center justify-center">
                  <span className="text-[10px] font-mono text-gold">{c.userName.charAt(0)}</span>
                </div>
                <span className="font-sans text-cream text-xs font-medium">{c.userName}</span>
                <span className="font-mono text-muted-foreground text-[10px]">{c.time}</span>
              </div>
              <p className="font-sans text-cream/70 text-sm leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>

        {/* Comment input */}
        <div className="flex gap-3 mt-4">
          <input
            type="text"
            placeholder="Share your thoughts..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleComment()}
            className="flex-1 h-11 px-4 bg-surface border border-[rgba(255,255,255,0.06)] rounded-xl text-cream font-sans text-sm placeholder:text-muted-foreground focus:outline-none focus:border-gold/40 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.15)] transition-all"
          />
          <button
            onClick={handleComment}
            className="h-11 w-11 bg-gold rounded-xl flex items-center justify-center hover:scale-105 transition-transform flex-shrink-0"
            aria-label="Submit comment"
          >
            <Send size={16} className="text-[#0A0A0A]" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-12 pt-8 border-t border-[rgba(255,255,255,0.06)]">
        <button
          onClick={goToPrev}
          disabled={currentIndex >= devotionals.length - 1}
          className="flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-cream transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} />
          Yesterday
        </button>
        <Link href="#" className="font-sans text-xs text-gold hover:text-cream transition-colors">
          View Archive
        </Link>
        <button
          onClick={goToNext}
          disabled={currentIndex <= 0}
          className="flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-cream transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Tomorrow
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
