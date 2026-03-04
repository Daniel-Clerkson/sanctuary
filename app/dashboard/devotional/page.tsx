"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { devotionals } from "@/lib/store";
import {
  ChevronLeft,
  ChevronRight,
  Flame,
  Heart,
  HandMetal,
  Lightbulb,
  Send,
  ExternalLink,
  BookOpen,
} from "lucide-react";

const reactionIcons = [
  { key: "fire", icon: Flame, label: "Fire" },
  { key: "heart", icon: Heart, label: "Love" },
  { key: "pray", icon: HandMetal, label: "Pray" },
  { key: "lightbulb", icon: Lightbulb, label: "Insight" },
] as const;

export default function DevotionalPage() {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reactions, setReactions] = useState(
    devotionals[0]?.reactions || { fire: 0, heart: 0, pray: 0, lightbulb: 0 },
  );
  const [userReactions, setUserReactions] = useState<Set<string>>(new Set());
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(devotionals[0]?.comments || []);

  // The Rhapsody URL handles the daily update automatically
  const rhapsodyUrl = "https://read.rhapsodyofrealities.org/";

  useEffect(() => {
    setMounted(true);
  }, []);

  const devotional = devotionals[currentIndex];
  if (!devotional) return null;

  const handleReact = (key: string) => {
    if (userReactions.has(key)) {
      setReactions((prev) => ({
        ...prev,
        [key]: prev[key as keyof typeof prev] - 1,
      }));
      setUserReactions((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    } else {
      setReactions((prev) => ({
        ...prev,
        [key]: prev[key as keyof typeof prev] + 1,
      }));
      setUserReactions((prev) => new Set(prev).add(key));
    }
  };

  const handleComment = () => {
    if (!comment.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        userId: "1",
        userName: "Daniel O.",
        text: comment,
        time: "Just now",
      },
    ]);
    setComment("");
  };

  const goToPrev = () => {
    if (currentIndex < devotionals.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setReactions(devotionals[nextIdx].reactions);
      setComments(devotionals[nextIdx].comments);
      setUserReactions(new Set());
    }
  };

  const goToNext = () => {
    if (currentIndex > 0) {
      const nextIdx = currentIndex - 1;
      setCurrentIndex(nextIdx);
      setReactions(devotionals[nextIdx].reactions);
      setComments(devotionals[nextIdx].comments);
      setUserReactions(new Set());
    }
  };

  return (
    <div className="max-w-[680px] mx-auto pb-20 px-4">
      {/* Header */}
      <div
        className={`text-center ${mounted ? "animate-fade-up" : "opacity-0"}`}
      >
        <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
          {new Date().toLocaleDateString("en-NG", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <p className="font-mono text-[11px] text-gold uppercase tracking-wider mt-2">
          Daily Devotional
        </p>
      </div>

      {/* Main Devotional Reader (The Iframe) */}
      <div
        className={`mt-10 overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.06)] bg-surface shadow-2xl ${mounted ? "animate-fade-up" : "opacity-0"}`}
        style={{ animationDelay: "80ms" }}
      >
        <div className="flex items-center justify-between px-5 py-4 bg-surface-elevated border-b border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-2">
            <BookOpen size={14} className="text-gold" />
            <span className="font-sans text-[11px] text-cream/70 font-medium tracking-[0.1em] uppercase">
              Rhapsody of Realities
            </span>
          </div>
          <a
            href={rhapsodyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-gold transition-colors flex items-center gap-1.5 no-underline"
          >
            <span className="font-mono text-[10px]">FULL SITE</span>
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Iframe Container - Optimized for reading */}
        <div className="relative w-full aspect-[3/4] md:aspect-[4/5] bg-white">
          <iframe
            src={rhapsodyUrl}
            className="absolute inset-0 w-full h-full"
            title="Today's Devotional"
            loading="lazy"
            allow="clipboard-write"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="flex justify-center my-12">
        <div className="w-16 h-[1px] bg-gold/30" />
      </div>

      {/* Reactions */}
      <div
        className={`mt-10 ${mounted ? "animate-fade-up" : "opacity-0"}`}
        style={{ animationDelay: "240ms" }}
      >
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {reactionIcons.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => handleReact(key)}
              className={`flex items-center gap-1.5 h-10 px-4 rounded-xl border font-sans text-sm transition-all duration-200 ${
                userReactions.has(key)
                  ? "border-gold/40 bg-gold/10 text-gold"
                  : "border-[rgba(255,255,255,0.06)] text-muted-foreground hover:border-gold/20 hover:text-cream"
              }`}
              aria-label={label}
            >
              <Icon size={16} />
              <span className="font-mono text-xs">
                {reactions[key as keyof typeof reactions]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Comments */}
      <div
        className={`mt-12 ${mounted ? "animate-fade-up" : "opacity-0"}`}
        style={{ animationDelay: "320ms" }}
      >
        <h3 className="font-sans text-cream text-sm font-medium mb-5">
          Community Thoughts
        </h3>
        <div className="space-y-4">
          {comments.map((c) => (
            <div
              key={c.id}
              className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-surface-elevated flex items-center justify-center border border-[rgba(255,255,255,0.06)]">
                  <span className="text-[10px] font-mono text-gold uppercase">
                    {c.userName.charAt(0)}
                  </span>
                </div>
                <span className="font-sans text-cream text-xs font-medium">
                  {c.userName}
                </span>
                <span className="font-mono text-muted-foreground text-[10px] ml-auto">
                  {c.time}
                </span>
              </div>
              <p className="font-sans text-cream/70 text-[14px] leading-relaxed">
                {c.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
