'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Headphones,
  CalendarDays,
  Megaphone,
  Users,
  BarChart3,
} from 'lucide-react'

const adminNav = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Sermons', href: '/admin/sermons', icon: Headphones },
  { label: 'Events', href: '/admin/events', icon: CalendarDays },
  { label: 'Announcements', href: '/admin/announcements', icon: Megaphone },
  { label: 'Members', href: '/admin/members', icon: Users },
  { label: 'Attendance', href: '/admin/attendance', icon: BarChart3 },
]

function AdminSidebar() {
  const pathname = usePathname()
  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <aside className="hidden lg:flex flex-col w-[240px] fixed left-0 top-0 bottom-0 bg-[#080808] border-r border-[rgba(255,255,255,0.06)] z-40">
      <div className="p-6 pb-4">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="font-serif text-gold text-lg">Sanctuary</span>
        </Link>
        <span className="font-mono text-destructive text-[10px] uppercase tracking-wider mt-1 block">Admin</span>
      </div>

      <nav className="flex-1 px-3">
        {adminNav.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 transition-all duration-200 group ${
                active
                  ? 'bg-surface border-l-2 border-gold text-cream'
                  : 'text-muted-foreground hover:bg-surface/50 hover:text-cream border-l-2 border-transparent'
              }`}
            >
              <Icon size={18} className={active ? 'text-gold' : 'group-hover:text-cream'} />
              <span className="font-sans text-sm">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-cream transition-colors font-sans text-sm"
        >
          Back to App
        </Link>
      </div>
    </aside>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile block */}
      <div className="lg:hidden min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="font-serif text-cream text-xl">Admin Panel</h2>
          <p className="font-sans text-muted-foreground text-sm mt-2 max-w-xs mx-auto">
            Please use a desktop to access admin features. The admin panel requires a larger screen for the best experience.
          </p>
          <Link href="/dashboard" className="inline-flex items-center h-10 px-6 bg-gold text-[#0A0A0A] font-sans text-sm font-medium rounded-xl mt-6 hover:scale-[1.02] transition-all">
            Back to App
          </Link>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        <AdminSidebar />
        <main className="lg:ml-[240px]">
          <div className="max-w-[1100px] mx-auto px-12 py-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
