'use client'

import { useState } from 'react'
import { members, departments } from '@/lib/store'
import { Search, X } from 'lucide-react'

export default function AdminMembers() {
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState<string>('all')
  const [selectedMember, setSelectedMember] = useState<string | null>(null)

  const filtered = members.filter((m) => {
    const matchesSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase())
    const matchesDept = deptFilter === 'all' || m.department === deptFilter
    return matchesSearch && matchesDept
  })

  const selected = members.find((m) => m.id === selectedMember)

  return (
    <div>
      <h1 className="font-serif text-cream text-3xl">Members</h1>

      <div className="flex flex-wrap items-center gap-3 mt-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-surface border border-[rgba(255,255,255,0.06)] rounded-xl text-cream font-sans text-sm placeholder:text-muted-foreground focus:outline-none focus:border-gold/40 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.15)] transition-all"
          />
        </div>
        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="h-10 px-4 bg-surface border border-[rgba(255,255,255,0.06)] rounded-xl text-cream font-sans text-sm focus:outline-none focus:border-gold/40 transition-all"
        >
          <option value="all" className="bg-surface-elevated text-cream">All Departments</option>
          {departments.map((d) => (
            <option key={d} value={d} className="bg-surface-elevated text-cream">{d}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="mt-6 bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.06)]">
              <th className="text-left px-5 py-3 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Member</th>
              <th className="text-left px-5 py-3 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Email</th>
              <th className="text-left px-5 py-3 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Department</th>
              <th className="text-left px-5 py-3 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Joined</th>
              <th className="text-left px-5 py-3 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((member) => (
              <tr
                key={member.id}
                onClick={() => setSelectedMember(member.id)}
                className="border-b border-[rgba(255,255,255,0.06)] last:border-0 hover:bg-surface-elevated/30 transition-colors cursor-pointer"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-elevated flex items-center justify-center flex-shrink-0">
                      <span className="font-mono text-gold text-[10px]">{member.name.charAt(0)}</span>
                    </div>
                    <span className="font-sans text-cream text-sm">{member.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 font-sans text-cream/70 text-xs">{member.email}</td>
                <td className="px-5 py-4">
                  <span className="font-mono text-[10px] text-gold border border-gold/30 rounded-md px-1.5 py-0.5">
                    {member.department}
                  </span>
                </td>
                <td className="px-5 py-4 font-mono text-muted-foreground text-xs">
                  {new Date(member.joinDate).toLocaleDateString('en-NG', { month: 'short', year: 'numeric' })}
                </td>
                <td className="px-5 py-4 font-mono text-gold text-xs">{Math.floor(Math.random() * 20) + 5}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Member detail panel */}
      {selected && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setSelectedMember(null)} />
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-[#0D0D0D] border-l border-[rgba(255,255,255,0.06)] z-50 overflow-y-auto">
            <div className="p-6">
              <button onClick={() => setSelectedMember(null)} className="mb-6 text-muted-foreground hover:text-cream transition-colors" aria-label="Close">
                <X size={20} />
              </button>

              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-full bg-surface-elevated border-2 border-gold flex items-center justify-center mx-auto">
                  <span className="font-serif text-gold text-2xl">{selected.name.charAt(0)}</span>
                </div>
                <h3 className="font-serif text-cream text-xl mt-3">{selected.name}</h3>
                <span className="inline-block font-mono text-[10px] text-gold border border-gold/30 rounded-md px-2 py-0.5 mt-1">
                  {selected.department}
                </span>
              </div>

              <div className="space-y-3">
                <div className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-xl p-4">
                  <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Email</p>
                  <p className="font-sans text-cream text-sm mt-1">{selected.email}</p>
                </div>
                <div className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-xl p-4">
                  <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Phone</p>
                  <p className="font-sans text-cream text-sm mt-1">{selected.phone}</p>
                </div>
                <div className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-xl p-4">
                  <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Joined</p>
                  <p className="font-sans text-cream text-sm mt-1">
                    {new Date(selected.joinDate).toLocaleDateString('en-NG', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
