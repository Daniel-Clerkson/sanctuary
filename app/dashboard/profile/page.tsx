"use client";

import { useState, useEffect } from "react";
import { departments } from "@/lib/store";
import { Copy, Check, Pencil, X, Save } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function ProfileCompletionBar({ user }: { user: any }) {
  const fields = [
    { label: "Name", filled: !!user?.name },
    { label: "Email", filled: !!user?.email },
    { label: "Phone", filled: !!user?.phone_number },
    { label: "Department", filled: !!user?.department },
  ];
  const filled = fields.filter((f) => f.filled).length;
  const percent = Math.round((filled / fields.length) * 100);

  return (
    <div className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">Profile Completion</p>
        <span className="font-mono text-xs text-gold">{percent}%</span>
      </div>
      <div className="w-full h-1.5 bg-surface-elevated rounded-full overflow-hidden">
        <div className="h-full bg-gold rounded-full transition-all duration-700" style={{ width: `${percent}%` }} />
      </div>
      <div className="flex gap-2 flex-wrap">
        {fields.map((f) => (
          <span key={f.label} className={`font-mono text-[10px] px-2 py-0.5 rounded-md border ${f.filled ? "border-gold/30 text-gold bg-gold/10" : "border-[rgba(255,255,255,0.06)] text-muted-foreground"}`}>
            {f.filled ? "✓" : "○"} {f.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function InviteButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.origin + "/auth/onboarding?ref=invite");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`w-full h-10 flex items-center justify-center gap-2 rounded-xl border font-mono text-xs transition-all duration-200 ${
        copied ? "border-gold/40 bg-gold/10 text-gold" : "border-[rgba(255,255,255,0.06)] text-muted-foreground hover:border-gold/20 hover:text-cream"
      }`}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "Invite link copied!" : "Copy invite link"}
    </button>
  );
}

function EditProfileModal({ user, onClose, onSave }: { user: any; onClose: () => void; onSave: (data: any) => void }) {
  const [form, setForm] = useState({
    name: user?.name || "",
    phone_number: user?.phone_number || "",
    department: user?.department || "",
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await supabase.from("users").update(form).eq("email", user?.email);
    onSave(form);
    setSaving(false);
    onClose();
  };

  const inputClass = "w-full h-10 px-3 bg-surface-elevated border border-[rgba(255,255,255,0.06)] rounded-xl text-cream font-sans text-sm placeholder:text-muted-foreground focus:outline-none focus:border-gold/40 transition-all duration-200";

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 w-full max-w-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-cream text-lg">Edit Profile</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-cream transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 block">Full Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 block">Phone Number</label>
            <input type="tel" value={form.phone_number} onChange={(e) => setForm({ ...form, phone_number: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 block">Department</label>
            <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className={inputClass}>
              {departments.map((d) => (
                <option key={d} value={d} className="bg-surface-elevated text-cream">{d}</option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full h-10 bg-gold text-[#0A0A0A] font-sans font-medium text-sm rounded-xl hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Save size={14} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const { user } = useUser();
  const [localUser, setLocalUser] = useState<any>(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { if (user) setLocalUser(user); }, [user]);

  const displayUser = localUser || user;

  return (
    <div className={`max-w-sm ${mounted ? "animate-fade-up" : "opacity-0"}`}>
      {editOpen && displayUser && (
        <EditProfileModal
          user={displayUser}
          onClose={() => setEditOpen(false)}
          onSave={(data) => setLocalUser({ ...displayUser, ...data })}
        />
      )}

      <div className="space-y-4">
        <div className="bg-surface border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 text-center relative">
          <button
            onClick={() => setEditOpen(true)}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg border border-[rgba(255,255,255,0.06)] text-muted-foreground hover:text-cream hover:border-gold/20 transition-all duration-200"
          >
            <Pencil size={13} />
          </button>

          <div className="w-24 h-24 rounded-full bg-surface-elevated border-[3px] border-gold flex items-center justify-center mx-auto">
            <span className="font-serif text-gold text-3xl">
              {displayUser?.name?.charAt(0) ?? "?"}
            </span>
          </div>

          <h2 className="font-serif text-cream text-xl mt-4">{displayUser?.name}</h2>
          <span className="inline-block font-mono text-[10px] text-gold border border-gold/30 rounded-md px-2 py-0.5 mt-2">
            {displayUser?.department}
          </span>
          <p className="font-mono text-muted-foreground text-[10px] mt-2">
            Joined{" "}
            {displayUser?.created_at
              ? new Date(displayUser.created_at).toLocaleDateString("en-NG", { month: "long", year: "numeric" })
              : "—"}
          </p>
        </div>

        {displayUser && <ProfileCompletionBar user={displayUser} />}
        <InviteButton />
      </div>
    </div>
  );
}