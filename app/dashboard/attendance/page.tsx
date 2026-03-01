'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { attendanceHistory } from '@/lib/store'
import { Flame, Check } from 'lucide-react'

function ConfettiBurst() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const colors = ['#C9A84C', '#E8D5A3', '#27AE60', '#C0392B', '#FFFFFF']
    const particles: { x: number; y: number; vx: number; vy: number; color: string; size: number; rotation: number; rotSpeed: number; life: number }[] = []

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 1) * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 6 + 3,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
        life: 1,
      })
    }

    let frame = 0
    const animate = () => {
      if (frame > 80) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.vy += 0.2
        p.y += p.vy
        p.rotation += p.rotSpeed
        p.life -= 0.012

        if (p.life > 0) {
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate(p.rotation)
          ctx.globalAlpha = p.life
          ctx.fillStyle = p.color
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
          ctx.restore()
        }
      })

      frame++
      requestAnimationFrame(animate)
    }
    animate()
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />
}

function AttendanceCalendar() {
  const today = new Date()
  const months: Date[] = []
  for (let i = 2; i >= 0; i--) {
    months.push(new Date(today.getFullYear(), today.getMonth() - i, 1))
  }

  const attendedDates = new Set(
    attendanceHistory.filter((r) => r.checkedIn).map((r) => r.date)
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {months.map((month) => {
        const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
        const firstDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay()

        return (
          <div key={month.toISOString()} className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl p-4">
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
                const isSunday = new Date(dateStr).getDay() === 0
                const attended = attendedDates.has(dateStr)
                const missed = isSunday && !attended && new Date(dateStr) < today

                return (
                  <div
                    key={day}
                    className={`w-full aspect-square rounded-md flex items-center justify-center text-[10px] font-mono ${
                      attended
                        ? 'bg-gold/20 text-gold font-bold'
                        : missed
                        ? 'bg-surface-elevated/50 text-muted-foreground/40'
                        : isSunday
                        ? 'text-cream/40'
                        : 'text-cream/20'
                    }`}
                  >
                    {day}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function AttendancePage() {
  const [mounted, setMounted] = useState(false)
  const [checkedIn, setCheckedIn] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [checkinCount, setCheckinCount] = useState(18)

  // Determine if check-in is open (Sunday between 7-12)
  const now = new Date()
  const isSunday = now.getDay() === 0
  const isCheckInTime = isSunday && now.getHours() >= 7 && now.getHours() < 12
  // For demo purposes, always show check-in option
  const checkInOpen = true

  useEffect(() => { setMounted(true) }, [])

  const streak = attendanceHistory.filter((r) => r.checkedIn).length
  const bestStreak = 7
  const totalAttended = attendanceHistory.filter((r) => r.checkedIn).length

  const handleCheckIn = useCallback(() => {
    setCheckedIn(true)
    setShowConfetti(true)
    setCheckinCount((prev) => prev + 1)
    setTimeout(() => setShowConfetti(false), 3000)
  }, [])

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState('1:45:00')
  useEffect(() => {
    if (!checkInOpen || checkedIn) return
    const interval = setInterval(() => {
      const endTime = new Date()
      endTime.setHours(12, 0, 0, 0)
      const diff = endTime.getTime() - Date.now()
      if (diff <= 0) {
        setTimeLeft('0:00:00')
        return
      }
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setTimeLeft(`${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`)
    }, 1000)
    return () => clearInterval(interval)
  }, [checkInOpen, checkedIn])

  return (
    <div>
      {showConfetti && <ConfettiBurst />}

      {/* Check-in section */}
      {checkInOpen && (
        <div className={`text-center py-8 ${mounted ? 'animate-fade-up' : 'opacity-0'}`}>
          <h1 className="font-serif text-cream text-3xl md:text-4xl">Service Check-In</h1>
          <p className="font-mono text-muted-foreground text-xs mt-3 uppercase tracking-wider">
            {now.toLocaleDateString('en-NG', { weekday: 'long', month: 'long', day: 'numeric' })} &middot; 9:00 AM
          </p>

          <div className="mt-8">
            {!checkedIn ? (
              <button
                onClick={handleCheckIn}
                className="h-16 px-12 bg-gold text-[#0A0A0A] font-sans font-medium text-lg rounded-2xl hover:scale-[1.03] transition-all duration-200 shadow-lg shadow-gold/20"
              >
                {"I'm Here"} <Check size={20} className="inline ml-1" />
              </button>
            ) : (
              <div className="inline-flex items-center gap-3 h-16 px-12 bg-success/20 text-success border border-success/30 font-sans font-medium text-lg rounded-2xl">
                <Check size={24} />
                Attendance recorded!
              </div>
            )}
          </div>

          <p className="font-sans text-muted-foreground text-sm mt-4">
            {checkinCount} members have checked in
          </p>

          {!checkedIn && (
            <p className="font-mono text-gold/60 text-xs mt-2 mono-digits">
              Closes in {timeLeft}
            </p>
          )}
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-[rgba(255,255,255,0.06)] my-8" />

      {/* Stats */}
      <div className={`${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '80ms' }}>
        <div className="flex items-center gap-3 mb-8">
          <Flame size={28} className="text-gold" />
          <div>
            <span className="font-serif text-gold text-4xl">{streak}</span>
            <p className="font-sans text-muted-foreground text-sm">Sunday streak</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl p-4 text-center">
            <p className="font-serif text-cream text-2xl">{totalAttended}</p>
            <p className="font-sans text-muted-foreground text-xs mt-1">Total attended</p>
          </div>
          <div className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl p-4 text-center">
            <p className="font-serif text-gold text-2xl">{streak}</p>
            <p className="font-sans text-muted-foreground text-xs mt-1">Current streak</p>
          </div>
          <div className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl p-4 text-center">
            <p className="font-serif text-cream text-2xl">{bestStreak}</p>
            <p className="font-sans text-muted-foreground text-xs mt-1">Best streak</p>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className={`${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '160ms' }}>
        <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider mb-4">Attendance History</p>
        <AttendanceCalendar />
      </div>

      <p className="font-sans text-muted-foreground text-sm text-center mt-8">Keep showing up</p>
    </div>
  )
}
