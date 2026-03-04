"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Headphones,
  CalendarDays,
  BookOpen,
  Megaphone,
  CheckCircle2,
  User,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { useUser } from "@/hooks/use-user";

const navItems = [
  { label: "Home", href: "/dashboard", icon: Home },
  { label: "Events", href: "/dashboard/events", icon: CalendarDays },
  { label: "Devotional", href: "/dashboard/devotional", icon: BookOpen },
  { label: "Profile", href: "/dashboard/profile", icon: User },
];

const mobileNavItems = [
  { label: "Home", href: "/dashboard", icon: Home },
  { label: "Events", href: "/dashboard/events", icon: CalendarDays },
  { label: "Devotional", href: "/dashboard/devotional", icon: BookOpen },
  { label: "Profile", href: "/dashboard/profile", icon: User },
];

function Sidebar() {
  const pathname = usePathname();
  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };
  const { user, loading } = useUser();

  return (
    <aside className="hidden lg:flex flex-col w-[240px] fixed left-0 top-0 bottom-0 bg-sidebar border-r border-[rgba(255,255,255,0.06)] z-40">
      {/* User section */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-surface-elevated border-2 border-gold flex items-center justify-center text-gold font-serif text-sm">
            {user?.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="font-sans text-cream text-sm font-medium truncate">
              {user?.name}
            </p>
            <span className="inline-block font-mono text-[10px] text-gold/70 border border-gold/30 rounded-md px-1.5 py-0.5 mt-0.5">
              {user?.department}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 transition-all duration-200 group ${
                active
                  ? "bg-surface-elevated border-l-2 border-gold text-cream"
                  : "text-muted-foreground hover:bg-surface-elevated/50 hover:text-cream border-l-2 border-transparent"
              }`}
            >
              <Icon
                size={18}
                className={active ? "text-gold" : "group-hover:text-cream"}
              />
              <span className="font-sans text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-4 space-y-3">
        {user?.isAdmin && (
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-surface-elevated/50 hover:text-cream transition-all duration-200"
          >
            <ShieldCheck size={18} />
            <span className="font-sans text-sm">Admin Panel</span>
          </Link>
        )}

        <div className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-xl p-3">
          <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
            Next Up
          </p>
          <p className="font-sans text-cream text-xs mt-1">Sunday Service</p>
          <p className="font-mono text-gold text-[10px] mt-0.5">2 days away</p>
        </div>
      </div>
    </aside>
  );
}

function MobileTabBar() {
  const pathname = usePathname();
  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0D0D0D] border-t border-[rgba(255,255,255,0.06)] z-50 safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 py-2 px-3 transition-colors ${
                active ? "text-gold" : "text-muted-foreground"
              }`}
            >
              <Icon size={20} />
              <span className="font-sans text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileTabBar />
      <main className="lg:ml-[240px] pb-20 lg:pb-0">
        <div className="max-w-[1100px] mx-auto px-6 py-8 lg:px-12 lg:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
