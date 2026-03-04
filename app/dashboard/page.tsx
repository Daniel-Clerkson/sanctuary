"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { events, devotionals } from "@/lib/store";
import { 
  Calendar, 
  BookOpen, 
  MapPin, 
  ExternalLink, 
  PlayCircle, 
  Mic2, 
  Tv, 
  Save, 
  CheckCircle2 
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const resourceLinks = [
  { title: "PCDL Library", url: "https://pcdl.co/", icon: Mic2, color: "text-blue-400" },
  { title: "LoveWorld TV", url: "https://ceflix.org/", icon: Tv, color: "text-red-400" },
];

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

export default function DashboardHome() {
  const [mounted, setMounted] = useState(false);
  const [note, setNote] = useState("");
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success'>('idle');
  const { data: session, status } = useSession();
  const router = useRouter();

  const rhapsodyUrl = "https://read.rhapsodyofrealities.org/";
  const spotifyPlaylistUrl = "http://googleusercontent.com/spotify.com/7";

  useEffect(() => { 
    setMounted(true);
    const saved = localStorage.getItem('global_study_note');
    if (saved) setNote(saved);
  }, []);

  // Auth & Onboarding check logic remains the same
  useEffect(() => {
    if (status === "loading") return;
    if (!session) { router.push("/auth"); return; }
    async function checkOnboarded() {
      const { data } = await supabase.from("users").select("onboarded").eq("email", session?.user?.email).single();
      if (data && !data.onboarded) router.push("/auth/onboarding");
    }
    checkOnboarded();
  }, [session, status]);

  const handleSaveNote = () => {
    localStorage.setItem('global_study_note', note);
    setSaveStatus('success');
    setTimeout(() => setSaveStatus('idle'), 3000);
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      {/* 1. WELCOME SECTION */}
      <div className={mounted ? "animate-fade-up" : "opacity-0"} style={{ animationDelay: "0ms" }}>
        <h1 className="font-serif text-cream text-3xl md:text-4xl">
          {greeting}, {session?.user?.name?.split(" ")[0]}
        </h1>
        <p className="font-mono text-muted-foreground text-xs mt-2 uppercase tracking-wider">
          {new Date().toLocaleDateString("en-NG", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>

      {/* 2. STAT CARDS */}
      <div className={`grid grid-cols-2 gap-3 md:gap-4 ${mounted ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "80ms" }}>
        <StatCard icon={<Calendar size={20} />} label="Next event" value="Youth Night — Friday" href="/dashboard/events" />
        <StatCard icon={<BookOpen size={20} />} label="Daily devotional" value="Read today's verse" href="/dashboard/devotional" />
      </div>

      {/* 3. DAILY RHAPSODY (IFRAME) */}
      <div className={mounted ? "animate-fade-up" : "opacity-0"} style={{ animationDelay: "160ms" }}>
        <div className="flex items-center justify-between mb-4">
          <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">Today's Rhapsody</p>
          <a href={rhapsodyUrl} target="_blank" className="text-gold hover:text-cream text-xs flex items-center gap-1">
            Fullscreen <ExternalLink size={12} />
          </a>
        </div>
        <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-surface overflow-hidden shadow-xl aspect-[3/4] md:aspect-video max-h-[500px] relative">
           <iframe src={rhapsodyUrl} className="absolute inset-0 w-full h-full" title="Rhapsody" loading="lazy" />
        </div>
      </div>

      {/* 4. SERMON & RESOURCES SECTION */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${mounted ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "240ms" }}>
        {/* Sermon Card */}
        <div className="space-y-4">
          <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">Latest Sermon</p>
          <button 
            onClick={() => window.open(spotifyPlaylistUrl, '_blank')}
            className="w-full group relative overflow-hidden rounded-2xl border border-gold/10 bg-gold/5 p-6 text-left transition-all hover:border-gold/30"
          >
            <div className="flex items-center justify-between mb-4">
               <Mic2 size={20} className="text-gold" />
               <PlayCircle size={20} className="text-gold opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="text-cream font-medium">Pastor Chris Digital Library</h3>
            <p className="text-xs text-muted-foreground mt-1">Listen to the message of the year and other deep teachings.</p>
          </button>
        </div>

        {/* Resources Card */}
        <div className="space-y-4">
          <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">Quick Resources</p>
          <div className="grid grid-cols-1 gap-3">
            {resourceLinks.map((item) => (
              <a key={item.title} href={item.url} target="_blank" className="flex items-center justify-between p-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-surface hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-3">
                  <item.icon size={16} className={item.color} />
                  <span className="font-sans text-xs text-cream/80 font-medium">{item.title}</span>
                </div>
                <ExternalLink size={12} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 5. PERSONAL STUDY NOTES */}
      <div className={mounted ? "animate-fade-up" : "opacity-0"} style={{ animationDelay: "320ms" }}>
        <div className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl p-6">
          <h3 className="font-sans text-cream text-sm font-medium mb-4 flex items-center gap-2">
            <Save size={14} className="text-gold" /> Study Notes
          </h3>
          <textarea 
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What is the Spirit saying to you today?"
            className="w-full bg-transparent border-none text-cream/70 font-sans text-sm resize-none focus:outline-none min-h-[100px] placeholder:text-muted-foreground/30"
          />
          <div className="flex justify-end mt-4">
            <button 
              onClick={handleSaveNote}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                saveStatus === 'success' ? 'bg-green-500/20 text-green-500' : 'bg-gold text-black'
              }`}
            >
              {saveStatus === 'success' ? <><CheckCircle2 size={14} /> Saved</> : "Save Note"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}