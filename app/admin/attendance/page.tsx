'use client'

import { useState, useEffect } from 'react'
import { members } from '@/lib/store'
import { Download, ChevronLeft, ChevronRight } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const attendanceData = [
  { date: 'Jan 4', count: 42, dateStr: '2026-01-04' },
  { date: 'Jan 11', count: 38, dateStr: '2026-01-11' },
  { date: 'Jan 18', count: 51, dateStr: '2026-01-18' },
  { date: 'Jan 25', count: 35, dateStr: '2026-01-25' },
  { date: 'Feb 1', count: 48, dateStr: '2026-02-01' },
  { date: 'Feb 8', count: 55, dateStr: '2026-02-08' },
  { date: 'Feb 15', count: 44, dateStr: '2026-02-15' },
  { date: 'Feb 22', count: 61, dateStr: '2026-02-22' },
  { date: 'Mar 1', count: 58, dateStr: '2026-03-01' },
]

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#1A1A1A] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2">
      <p className="font-mono text-[10px] text-muted-foreground">{label}</p>
      <p className="font-sans text-cream text-sm font-medium">{payload[0].value} members</p>
    </div>
  )
}

export default function AdminAttendance() {
  const [mounted, setMounted] = useState(false)
  const [weekOffset, setWeekOffset] = useState(0)

  useEffect(() => { setMounted(true) }, [])

  const totalMembers = members.length

  const handleExport = () => {
    const headers = 'Date,Attendance Count,Percentage of Total\n'
    const rows = attendanceData.map(
      (d) => `${d.dateStr},${d.count},${((d.count / totalMembers) * 100).toFixed(1)}%`
    ).join('\n')
    const csv = headers + rows
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'attendance-report.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`font-serif text-cream text-3xl ${mounted ? 'animate-fade-up' : 'opacity-0'}`}>
            Attendance Reports
          </h1>
          <p className={`font-mono text-muted-foreground text-xs mt-1 ${mounted ? 'animate-fade-up' : 'opacity-0'}`}>
            Track Sunday service attendance over time
          </p>
        </div>
        <button
          onClick={handleExport}
          className={`inline-flex items-center gap-2 h-10 px-5 border border-gold/30 text-gold font-sans text-sm font-medium rounded-xl hover:bg-gold/10 transition-all ${mounted ? 'animate-fade-up' : 'opacity-0'}`}
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {/* Week selector */}
      <div className={`flex items-center justify-between mt-8 mb-6 ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '80ms' }}>
        <button
          onClick={() => setWeekOffset((p) => p + 1)}
          className="flex items-center gap-1 text-muted-foreground hover:text-cream font-sans text-sm transition-colors"
        >
          <ChevronLeft size={16} />
          Earlier
        </button>
        <span className="font-mono text-cream text-xs">Last 3 months</span>
        <button
          onClick={() => setWeekOffset((p) => Math.max(0, p - 1))}
          disabled={weekOffset === 0}
          className="flex items-center gap-1 text-muted-foreground hover:text-cream font-sans text-sm transition-colors disabled:opacity-30"
        >
          Later
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Bar chart */}
      <div className={`bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '160ms' }}>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={attendanceData} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: '#666666', fontSize: 11, fontFamily: 'Space Mono, monospace' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#666666', fontSize: 11, fontFamily: 'Space Mono, monospace' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(201,168,76,0.05)' }} />
            <Bar dataKey="count" fill="#C9A84C" radius={[6, 6, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Attendance table */}
      <div className={`mt-8 bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl overflow-hidden ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '240ms' }}>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.06)]">
              <th className="text-left px-5 py-3 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Date</th>
              <th className="text-left px-5 py-3 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Attendance</th>
              <th className="text-left px-5 py-3 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">% of Members</th>
            </tr>
          </thead>
          <tbody>
            {[...attendanceData].reverse().map((row) => (
              <tr key={row.dateStr} className="border-b border-[rgba(255,255,255,0.06)] last:border-0 hover:bg-surface-elevated/30 transition-colors">
                <td className="px-5 py-4 font-mono text-cream text-xs">{row.date}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-cream text-sm font-medium">{row.count}</span>
                    <div className="flex-1 max-w-[120px] h-1.5 bg-surface-elevated rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gold rounded-full"
                        style={{ width: `${(row.count / 70) * 100}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 font-mono text-gold text-xs">
                  {((row.count / totalMembers) * 100).toFixed(0)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className={`grid grid-cols-3 gap-4 mt-8 ${mounted ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '320ms' }}>
        <div className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl p-5 text-center">
          <p className="font-serif text-cream text-2xl">
            {Math.round(attendanceData.reduce((a, b) => a + b.count, 0) / attendanceData.length)}
          </p>
          <p className="font-sans text-muted-foreground text-xs mt-1">Avg. attendance</p>
        </div>
        <div className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl p-5 text-center">
          <p className="font-serif text-gold text-2xl">
            {Math.max(...attendanceData.map((d) => d.count))}
          </p>
          <p className="font-sans text-muted-foreground text-xs mt-1">Peak attendance</p>
        </div>
        <div className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl p-5 text-center">
          <p className="font-serif text-cream text-2xl">
            {attendanceData.length}
          </p>
          <p className="font-sans text-muted-foreground text-xs mt-1">Sundays tracked</p>
        </div>
      </div>
    </div>
  )
}
