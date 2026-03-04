"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { events } from "@/lib/store";
import { Calendar, BookOpen, MapPin } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

function StatCard({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <div className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl p-4 hover:border-gold/20 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="text-gold">{icon}</div>
      </div>
      <p className="font-sans text-cream text-lg font-medium">{value}</p>
      <p className="font-sans text-muted-foreground text-xs mt-0.5">{label}</p>
    </div>
  );
  return href ? <Link href={href}>{content}</Link> : content;
}

function EventStrip() {
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">Upcoming Events</p>
        <Link href="/dashboard/events" className="font-sans text-xs text-gold hover:text-cream transition-colors">View all</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {events.map((event) => (
          <Link key={event.id} href="/dashboard/events">
            <div className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl p-5 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/5 hover:border-gold/20 transition-all duration-300">
              <h4 className="font-sans text-cream text-base font-medium">{event.name}</h4>
              <p className="font-mono text-gold text-xs mt-2">
                {new Date(event.date).toLocaleDateString("en-NG", { weekday: "short", month: "short", day: "numeric" })}
                {" · "}{event.time}
              </p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <MapPin size={12} className="text-muted-foreground" />
                <p className="font-sans text-muted-foreground text-xs">{event.location}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function DashboardHome() {
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) { router.push("/auth"); return; }

    async function checkOnboarded() {
      const { data } = await supabase
        .from("users")
        .select("onboarded")
        .eq("email", session?.user?.email)
        .single();
      if (data && !data.onboarded) router.push("/auth/onboarding");
    }

    checkOnboarded();
  }, [session, status]);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div>
      <div className={mounted ? "animate-fade-up" : "opacity-0"} style={{ animationDelay: "0ms" }}>
        <h1 className="font-serif text-cream text-3xl md:text-4xl">
          {greeting}, {session?.user?.name?.split(" ")[0]}
        </h1>
        <p className="font-mono text-muted-foreground text-xs mt-2 uppercase tracking-wider">
          {new Date().toLocaleDateString("en-NG", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>

      <div className={`grid grid-cols-2 gap-3 md:gap-4 mt-8 ${mounted ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "80ms" }}>
        <StatCard icon={<Calendar size={20} />} label="Next event" value="Youth Night — Friday" href="/dashboard/events" />
        <StatCard icon={<BookOpen size={20} />} label="Daily devotional" value="Read today's verse" href="/dashboard/devotional" />
      </div>

      <div className={mounted ? "animate-fade-up" : "opacity-0"} style={{ animationDelay: "160ms" }}>
        <EventStrip />
      </div>
    </div>
  );
}