'use client'

import { useState, useEffect, useMemo } from 'react'
import { events } from '@/lib/store'
import { MapPin, Check, ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function MiniCalendar({
  selectedDate,
  onSelectDate,
  eventDates,
}: {
  selectedDate: Date | null
  onSelectDate: (d: Date) => void
  eventDates: Set<string>
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2, 1)) // March 2026

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const firstDayOfWeek = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))

  return (
    <div className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-surface-elevated text-muted-foreground hover:text-cream transition-all" aria-label="Previous month">
          <ChevronLeft size={16} />
        </button>
        <h3 className="font-sans text-cream text-sm font-medium">
          {currentMonth.toLocaleDateString('en-NG', { month: 'long', year: 'numeric' })}
        </h3>
        <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-surface-elevated text-muted-foreground hover:text-cream transition-all" aria-label="Next month">
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((d) => (
          <div key={d} className="text-center font-mono text-[10px] text-muted-foreground py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const hasEvent = eventDates.has(dateStr)
          const isSelected = selectedDate && selectedDate.toISOString().split('T')[0] === dateStr
          const isToday = new Date().toISOString().split('T')[0] === dateStr

          return (
            <button
              key={day}
              onClick={() => onSelectDate(new Date(dateStr))}
              className={`relative w-full aspect-square rounded-lg flex flex-col items-center justify-center text-xs font-sans transition-all ${
                isSelected
                  ? 'bg-gold text-[#0A0A0A] font-medium'
                  : isToday
                  ? 'bg-surface-elevated text-cream'
                  : 'text-cream/60 hover:bg-surface-elevated/50'
              }`}
            >
              {day}
              {hasEvent && !isSelected && (
                <div className="absolute bottom-1 w-1 h-1 rounded-full bg-gold" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function AvatarStack({ count }: { count: number }) {
  const shown = Math.min(count, 3)
  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {Array.from({ length: shown }).map((_, i) => (
          <div
            key={i}
            className="w-6 h-6 rounded-full border-2 border-surface bg-surface-elevated flex items-center justify-center"
          >
            <span className="text-[8px] font-mono text-muted-foreground">{String.fromCharCode(65 + i)}</span>
          </div>
        ))}
      </div>
      <span className="font-sans text-[11px] text-muted-foreground ml-2">{count} going</span>
    </div>
  )
}

export default function EventsPage() {
  const [mounted, setMounted] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [filter, setFilter] = useState<'all' | 'week' | 'month' | 'going'>('all')
  const [rsvps, setRsvps] = useState<Record<string, boolean>>({ '1': true })

  useEffect(() => { setMounted(true) }, [])

  const eventDates = useMemo(() => new Set(events.map((e) => e.date)), [])

  const filteredEvents = useMemo(() => {
    let result = events

    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split('T')[0]
      result = result.filter((e) => e.date === dateStr)
    }

    if (filter === 'going') {
      result = result.filter((e) => rsvps[e.id])
    }

    return result
  }, [selectedDate, filter, rsvps])

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
    { key: 'going', label: "I'm Going" },
  ] as const

  return (
    <div>
      <h1 className={`font-serif text-cream text-3xl md:text-4xl ${mounted ? 'animate-fade-up' : 'opacity-0'}`}>Events</h1>

      <div className={`grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 mt-8 ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '80ms' }}>
        {/* Calendar */}
        <div>
          <MiniCalendar selectedDate={selectedDate} onSelectDate={setSelectedDate} eventDates={eventDates} />
          {selectedDate && (
            <button
              onClick={() => setSelectedDate(null)}
              className="font-sans text-xs text-gold mt-3 hover:text-cream transition-colors"
            >
              Clear date filter
            </button>
          )}
        </div>

        {/* Events list */}
        <div>
          <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`flex-shrink-0 h-8 px-4 rounded-lg font-sans text-xs font-medium transition-all ${
                  filter === f.key
                    ? 'bg-gold text-[#0A0A0A]'
                    : 'bg-surface border border-[rgba(255,255,255,0.06)] text-muted-foreground hover:text-cream'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className={`bg-surface border rounded-2xl p-5 flex gap-5 hover:border-gold/20 hover:-translate-y-0.5 transition-all duration-300 ${
                  rsvps[event.id] ? 'border-success/30' : 'border-[rgba(255,255,255,0.06)]'
                }`}
              >
                {/* Date display */}
                <div className="flex flex-col items-center flex-shrink-0 min-w-[56px]">
                  <span className="font-serif text-gold text-3xl leading-none">
                    {new Date(event.date).getDate()}
                  </span>
                  <span className="font-mono text-muted-foreground text-[10px] uppercase mt-1">
                    {new Date(event.date).toLocaleDateString('en-NG', { month: 'short' })}
                  </span>
                </div>

                {/* Event info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-sans text-cream text-base font-medium">{event.name}</h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="font-mono text-gold text-xs">{event.time}</span>
                    <span className="flex items-center gap-1 font-sans text-muted-foreground text-xs">
                      <MapPin size={12} />
                      {event.location}
                    </span>
                  </div>
                  <p className="font-sans text-muted-foreground text-xs mt-2 line-clamp-2">{event.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <AvatarStack count={event.attendees.length} />
                    <button
                      onClick={() => setRsvps((prev) => ({ ...prev, [event.id]: !prev[event.id] }))}
                      className={`h-9 px-4 text-xs font-sans font-medium rounded-lg transition-all duration-200 ${
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
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <CalendarDays size={40} className="mx-auto text-muted-foreground/30 mb-4" />
              <p className="font-serif text-muted-foreground italic text-lg">Nothing yet — check back soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
