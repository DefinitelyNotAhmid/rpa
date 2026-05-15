"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  Search,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Paperclip,
  Send,
  RefreshCw,
  Sparkles,
  Shield,
  Trophy,
  BookOpen,
  GraduationCap,
  MapPin,
  Clock,
  FileText,
  Calendar,
  Syringe,
  CheckCircle,
  AlertCircle,
  Mail,
  ClipboardList,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { InquiryThread, InquiryMessage, ThreadStatus, CsrEmail } from "@/lib/types/inquiry";

/* ─── HELPERS ───────────────────────────────────────────────────────────── */

function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

interface FaqCard {
  id: number;
  icon: React.ReactNode;
  title: string;
  tag: string;
  tagColor: string;
  preview: string;
  policy: string;
}

const faqCards: FaqCard[] = [
  {
    id: 1,
    icon: <Shield size={16} />,
    title: "Accreditation",
    tag: "Institutional",
    tagColor: "bg-blue-100 text-blue-700",
    preview: "Rise Preparatory Academy is fully accredited by Cognia (formerly AdvancED).",
    policy: "Our accreditation ensures that RPA meets rigorous educational standards. Cognia accreditation is recognized nationally and internationally, making credits and diplomas transferable. Families requiring verification for financial aid or college applications can request an official accreditation letter from the Registrar's Office.",
  },
  {
    id: 2,
    icon: <Trophy size={16} />,
    title: "Athletics & Extracurriculars",
    tag: "Student Life",
    tagColor: "bg-green-100 text-green-700",
    preview: "RPA students may participate in sports and prom at their zoned public school.",
    policy: "Rise Prep students are permitted to participate in athletics, prom, and other extracurricular activities at their home-zoned Miami-Dade County public school. Students must maintain satisfactory academic standing and attendance at RPA. Parents should contact their zoned school directly to confirm eligibility and registration requirements.",
  },
  {
    id: 3,
    icon: <BookOpen size={16} />,
    title: "Admissions Requirements",
    tag: "Enrollment",
    tagColor: "bg-purple-100 text-purple-700",
    preview: "Required documents: Birth Certificate, Social Security Card, Immunization Records, and more.",
    policy: "To enroll at Rise Preparatory Academy, families must provide: a certified Birth Certificate, Social Security Card, Florida Certificate of Immunization (Form 680), previous school records or transcripts, and proof of Miami-Dade County residency. A placement assessment may be required for new students. Contact the Admissions Office to schedule an enrollment appointment.",
  },
  {
    id: 4,
    icon: <GraduationCap size={16} />,
    title: "Graduation & Diplomas",
    tag: "Academic",
    tagColor: "bg-orange-100 text-orange-700",
    preview: "RPA awards its own accredited diploma recognized by colleges and universities.",
    policy: "RPA awards its own Cognia-accredited diploma upon successful completion of all graduation requirements. Students who participate in athletics at their zoned public school may walk in that school's graduation ceremony; however, their official diploma is issued by Rise Preparatory Academy. Diploma verification letters are available through the Registrar's Office upon request.",
  },
  {
    id: 5,
    icon: <MapPin size={16} />,
    title: "School Location",
    tag: "General",
    tagColor: "bg-gray-100 text-gray-600",
    preview: "18900 SW 106th Ave #205, Cutler Bay, FL 33157.",
    policy: "Rise Preparatory Academy is located at 18900 SW 106th Ave #205, Cutler Bay, FL 33157. We are situated in the Cutler Bay area of Miami-Dade County. Ample parking is available on-site. For directions or transportation inquiries, please contact the school office directly.",
  },
  {
    id: 6,
    icon: <Clock size={16} />,
    title: "Campus Hours",
    tag: "General",
    tagColor: "bg-gray-100 text-gray-600",
    preview: "School hours are 8:30 AM – 3:30 PM, Monday through Friday.",
    policy: "Rise Preparatory Academy campus hours are 8:30 AM – 3:30 PM, Monday through Friday. The administrative office is open from 8:00 AM – 4:00 PM. Campus is closed on all Miami-Dade County Public School holidays and breaks. Early release days follow the district calendar. Students should not arrive before 8:15 AM unless attending a scheduled activity.",
  },
];

const quickActions = [
  { label: "Send Enrollment App",    icon: <FileText size={14} /> },
  { label: "Request Transcript",     icon: <BookOpen size={14} /> },
  { label: "Schedule Interview",     icon: <Calendar size={14} /> },
  { label: "Send Vaccinations List", icon: <Syringe size={14} /> },
];

const SCRIPT_STEPS = [
  {
    id: "greeting",
    step: "1",
    title: "Opening Greeting",
    say: `"Thank you for calling Rise Preparatory Academy! My name is [Your Name]. How may I help you today?"`,
    checklist: [
      { id: "greet", label: "Delivered opening greeting" },
    ],
  },
  {
    id: "collect",
    step: "2",
    title: "Collect Information",
    prompts: [
      { badge: "PARENT NAME",       say: `"May I have your full name, please?"`,                                          note: "→ Enter in Contact Name field" },
      { badge: "STUDENT NAME",      say: `"And what is the student's full name?"`,                                        note: null },
      { badge: "GRADE LEVEL",       say: `"What grade will the student be entering?"`,                                    note: "RPA serves grades K–12" },
      { badge: "ENROLLMENT STATUS", say: `"Is your child currently enrolled at Rise Preparatory Academy, or is this a new enrollment inquiry?"`, note: "Enrolled → tag Returning · New → tag New Lead" },
    ],
    checklist: [
      { id: "parent",  label: "Collected parent name" },
      { id: "student", label: "Collected student name" },
      { id: "grade",   label: "Collected grade level" },
      { id: "status",  label: "Asked enrollment status" },
    ],
  },
  {
    id: "kb",
    step: "3",
    title: "Answering Questions (Knowledge Base)",
    howTo: [
      "Look at the Knowledge Base panel on the right side of your screen.",
      `Type the parent's question into the search bar (e.g., "tuition fees", "uniform policy").`,
      "Review the matching articles that appear.",
      "Read the relevant answer back to the caller in a conversational tone — do not read word-for-word.",
      `If no results found, say: "That's a great question. Let me find out and get back to you."`,
    ],
    topics: [
      "Enrollment requirements & deadlines",
      "Tuition & financial aid",
      "School hours & calendar",
      "Uniform & dress code",
      "Transportation",
      "Athletics eligibility (transfer rules)",
    ],
    checklist: [
      { id: "kb", label: "Answered questions using KB" },
    ],
  },
  {
    id: "closing",
    step: "4",
    title: "Closing the Call",
    closing: [
      { badge: "SAY THIS",   say: `"Is there anything else I can help you with today?"` },
      { badge: "SIGN OFF",   say: `"Thank you for your interest in Rise Preparatory Academy! We look forward to welcoming [Student Name]. Have a wonderful day!"` },
    ],
    afterCall: [
      "Log contact in the queue with correct tags",
      "Send enrollment application if requested",
      "Add any internal notes about special requests",
    ],
    checklist: [
      { id: "closing", label: "Asked if anything else needed" },
      { id: "signoff", label: "Delivered sign-off" },
      { id: "log",     label: "Logged contact in queue" },
    ],
  },
];

function EmailPanel({ threadId, contactEmail }: { threadId: string; contactEmail?: string }) {
  const [folder, setFolder]       = React.useState<"inbox" | "sent">("inbox");
  const [emails, setEmails]       = React.useState<CsrEmail[]>([]);
  const [loading, setLoading]     = React.useState(true);
  const [selected, setSelected]   = React.useState<CsrEmail | null>(null);
  const [composing, setComposing] = React.useState(false);
  const [to, setTo]               = React.useState(contactEmail ?? "");
  const [subject, setSubject]     = React.useState("");
  const [body, setBody]           = React.useState("");
  const [sending, setSending]     = React.useState(false);
  const [sentOk, setSentOk]       = React.useState(false);

  /* ── fetch emails for this thread ── */
  const fetchEmails = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("csr_emails")
      .select("*")
      .eq("thread_id", threadId)
      .order("created_at", { ascending: false });
    setEmails((data as CsrEmail[]) ?? []);
    setLoading(false);
  }, [threadId]);

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);


  /* ── mark as read ── */
  const openEmail = async (email: CsrEmail) => {
    setSelected(email);
    if (!email.is_read) {
      await supabase.from("csr_emails").update({ is_read: true }).eq("id", email.id);
      setEmails((prev) => prev.map((e) => e.id === email.id ? { ...e, is_read: true } : e));
    }
  };

  /* ── send email ── */
  const handleSend = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setSending(true);
    const { error } = await supabase.from("csr_emails").insert({
      thread_id:    threadId,
      folder:       "sent",
      from_address: "admissions@riseprep.edu",
      to_address:   to,
      subject,
      body,
      is_read:      true,
    });
    setSending(false);
    if (!error) {
      setSentOk(true);
      setTimeout(() => {
        setSentOk(false);
        setComposing(false);
        setTo(contactEmail ?? "");
        setSubject("");
        setBody("");
        fetchEmails();
      }, 1500);
    }
  };

  const visible = emails.filter((e) => e.folder === folder);

  const FOLDERS: { key: "inbox" | "sent"; label: string; icon: React.ReactNode }[] = [
    { key: "inbox", label: "Inbox", icon: <Mail size={13} /> },
    { key: "sent",  label: "Sent",  icon: <Send size={13} /> },
  ];

  const fmtDate = (iso: string) => {
    const d = new Date(iso);
    const today = new Date();
    if (d.toDateString() === today.toDateString()) return `Today, ${d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
    if (d.toDateString() === yesterday.toDateString()) return `Yesterday`;
    return d.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 bg-gray-50">
        <div className="flex gap-1">
          {FOLDERS.map((f) => (
            <button
              key={f.key}
              onClick={() => { setFolder(f.key); setSelected(null); }}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                folder === f.key ? "bg-[#1C2956] text-white" : "text-gray-500 hover:bg-gray-200"
              }`}
            >
              {f.icon}{f.label}
              {f.key === "inbox" && emails.filter((e) => e.folder === "inbox" && !e.is_read).length > 0 && (
                <span className="ml-1 bg-[#C9A84C] text-[#030349] text-[9px] font-bold rounded-full px-1.5 py-0.5">
                  {emails.filter((e) => e.folder === "inbox" && !e.is_read).length}
                </span>
              )}
            </button>
          ))}
        </div>
        <button
          onClick={() => { setComposing(true); setSelected(null); setTo(contactEmail ?? ""); }}
          className="flex items-center gap-1.5 text-xs font-semibold bg-[#C9A84C] hover:bg-[#b8912f] text-[#030349] px-3 py-1.5 rounded-lg transition-colors"
        >
          <Mail size={12} /> Compose
        </button>
      </div>

      {composing ? (
        /* ── Compose form ── */
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#1C2956]">
              <span className="text-xs font-bold text-white">New Email</span>
              <button onClick={() => setComposing(false)} className="text-white/60 hover:text-white text-xs">✕ Discard</button>
            </div>
            <form onSubmit={handleSend} className="p-4 space-y-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-1">To</label>
                <input
                  type="email" value={to} onChange={(e) => setTo(e.target.value)} required
                  className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#1C2956] bg-white"
                  placeholder="recipient@email.com"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-1">Subject</label>
                <input
                  type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required
                  className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#1C2956] bg-white"
                  placeholder="e.g. Enrollment Application — Rise Prep"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-1">Message</label>
                <textarea
                  value={body} onChange={(e) => setBody(e.target.value)} required rows={8}
                  className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#1C2956] bg-white resize-none leading-relaxed"
                  placeholder="Write your message…"
                />
              </div>
              <button
                type="submit"
                disabled={sending || sentOk}
                className={`w-full flex items-center justify-center gap-2 text-xs font-bold py-2.5 rounded-lg transition-all disabled:opacity-70 ${
                  sentOk ? "bg-green-500 text-white" : "bg-[#1C2956] hover:bg-[#030349] text-white"
                }`}
              >
                {sentOk ? <><CheckCircle size={13} /> Sent!</> : sending ? "Sending…" : <><Send size={13} /> Send Email</>}
              </button>
            </form>
          </div>
        </div>

      ) : selected ? (
        /* ── Email viewer ── */
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-100">
              <button onClick={() => setSelected(null)} className="text-[10px] text-gray-400 hover:text-gray-600 transition-colors">← Back</button>
            </div>
            <div className="px-4 pt-3 pb-2 border-b border-gray-100">
              <h3 className="text-sm font-bold text-[#030349] mb-1">{selected.subject}</h3>
              <p className="text-[11px] text-gray-500">
                From: <span className="font-medium text-gray-700">{selected.from_address}</span>
              </p>
              <p className="text-[11px] text-gray-500">
                To: <span className="font-medium text-gray-700">{selected.to_address}</span>
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">{fmtDate(selected.created_at)}</p>
            </div>
            <div className="px-4 py-4">
              <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">{selected.body}</p>
            </div>
            {selected.folder === "inbox" && (
              <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                <button
                  onClick={() => {
                    setComposing(true);
                    setSelected(null);
                    setTo(selected.from_address);
                    setSubject(selected.subject.startsWith("Re:") ? selected.subject : `Re: ${selected.subject}`);
                    setBody("");
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold bg-[#1C2956] hover:bg-[#030349] text-white px-3 py-2 rounded-lg transition-colors"
                >
                  <Mail size={12} /> Reply
                </button>
              </div>
            )}
          </div>
        </div>

      ) : (
        /* ── Email list ── */
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
          {loading ? (
            <div className="flex items-center justify-center h-24 text-xs text-gray-400">Loading…</div>
          ) : visible.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 gap-2 text-gray-400">
              <Mail size={24} className="opacity-40" />
              <p className="text-xs">No emails in {folder}</p>
            </div>
          ) : (
            visible.map((email) => (
              <button
                key={email.id}
                onClick={() => openEmail(email)}
                className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${!email.is_read ? "bg-[#1C2956]/[0.03]" : ""}`}
              >
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <span className={`text-xs truncate ${!email.is_read ? "font-bold text-[#030349]" : "font-medium text-gray-700"}`}>
                    {folder === "inbox" ? email.from_address : email.to_address}
                  </span>
                  <span className="text-[10px] text-gray-400 flex-shrink-0">{fmtDate(email.created_at)}</span>
                </div>
                <p className={`text-[11px] truncate mb-0.5 ${!email.is_read ? "font-semibold text-[#1C2956]" : "text-gray-600"}`}>{email.subject}</p>
                <p className="text-[10px] text-gray-400 truncate">{email.body.split("\n")[0]}</p>
                {!email.is_read && (
                  <span className="inline-block mt-1 text-[9px] font-bold bg-[#1C2956] text-white px-1.5 py-0.5 rounded-full">New</span>
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function ScriptPanel() {
  const [checked, setChecked] = React.useState<Set<string>>(new Set());
  const toggle = (id: string) =>
    setChecked((prev) => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });

  const totalItems = SCRIPT_STEPS.flatMap((s) => s.checklist).length;
  const done = checked.size;
  const pct = Math.round((done / totalItems) * 100);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
      {/* Progress */}
      <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold text-[#030349]">Agent Call Script</p>
          <span className="text-[10px] font-semibold text-gray-500">{done}/{totalItems}</span>
        </div>
        <p className="text-[10px] text-gray-500 mb-2">Rise Preparatory Academy — Enrollment Inquiry Guide</p>
        <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#1C2956] transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {SCRIPT_STEPS.map((step) => (
        <div key={step.id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          {/* Step header */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-100 bg-gray-50">
            <span className="w-5 h-5 rounded-full bg-[#1C2956] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">{step.step}</span>
            <span className="text-xs font-bold text-[#030349]">{step.title}</span>
          </div>

          <div className="px-4 py-3 space-y-3">
            {/* Opening / Closing say blocks */}
            {"say" in step && (
              <div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#1C2956] bg-[#1C2956]/8 px-2 py-0.5 rounded">SAY THIS</span>
                <p className="mt-1.5 text-xs italic text-gray-700 leading-relaxed">{step.say as string}</p>
              </div>
            )}

            {/* Prompts (step 2) */}
            {"prompts" in step && (step.prompts as { badge: string; say: string; note: string | null }[]).map((p) => (
              <div key={p.badge} className="space-y-1">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#1C2956] bg-[#1C2956]/8 px-2 py-0.5 rounded">{p.badge}</span>
                <p className="text-xs italic text-gray-700 leading-relaxed">{p.say}</p>
                {p.note && <p className="text-[10px] text-gray-600">{p.note}</p>}
              </div>
            ))}

            {/* How-to list (step 3) */}
            {"howTo" in step && (
              <div className="space-y-2">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#1C2956] bg-[#1C2956]/8 px-2 py-0.5 rounded">HOW TO USE KB</span>
                <ol className="space-y-1.5 list-decimal ml-4">
                  {(step.howTo as string[]).map((item, i) => (
                    <li key={i} className="text-xs text-gray-700 leading-relaxed">{item}</li>
                  ))}
                </ol>
              </div>
            )}
            {"topics" in step && (
              <div className="space-y-2">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#1C2956] bg-[#1C2956]/8 px-2 py-0.5 rounded">COMMON TOPICS</span>
                <ul className="space-y-1 list-disc ml-4">
                  {(step.topics as string[]).map((t) => (
                    <li key={t} className="text-xs text-gray-500">{t}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Closing blocks (step 4) */}
            {"closing" in step && (step.closing as { badge: string; say: string }[]).map((c) => (
              <div key={c.badge} className="space-y-1">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#1C2956] bg-[#1C2956]/8 px-2 py-0.5 rounded">{c.badge}</span>
                <p className="text-xs italic text-gray-700 leading-relaxed">{c.say}</p>
              </div>
            ))}
            {"afterCall" in step && (
              <div className="space-y-2">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#1C2956] bg-[#1C2956]/8 px-2 py-0.5 rounded">AFTER CALL</span>
                <ul className="space-y-1 list-disc ml-4">
                  {(step.afterCall as string[]).map((a) => (
                    <li key={a} className="text-xs text-gray-500">{a}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Checklist */}
            <div className="space-y-1.5 pt-1 border-t border-gray-100">
              {step.checklist.map((item) => (
                <label
                  key={item.id}
                  className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 cursor-pointer transition-colors text-xs ${
                    checked.has(item.id)
                      ? "border-[#1C2956]/30 bg-[#1C2956]/5 text-gray-500 line-through"
                      : "border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked.has(item.id)}
                    onChange={() => toggle(item.id)}
                    className="accent-[#1C2956] w-3.5 h-3.5 flex-shrink-0"
                  />
                  {item.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Reset */}
      <button
        onClick={() => setChecked(new Set())}
        className="w-full text-xs text-gray-500 hover:text-gray-700 transition-colors py-2"
      >
        Reset checklist
      </button>
    </div>
  );
}

/* ─── SUB-COMPONENTS ────────────────────────────────────────────────────── */

function StatusDot({ status }: { status: ThreadStatus }) {
  if (status === "resolved") return <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />;
  if (status === "in_progress") return <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />;
  return <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0 animate-pulse" />;
}

function ThreadItem({
  thread,
  active,
  lastMsg,
  onClick,
}: {
  thread: InquiryThread;
  active: boolean;
  lastMsg?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors ${
        active ? "bg-white/15" : "hover:bg-white/8"
      }`}
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mt-0.5">
        <MessageSquare size={14} className="text-[#C9A84C]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1 mb-0.5">
          <span className="text-white text-sm font-semibold truncate">{thread.name}</span>
          <span className="text-[10px] text-white/90 flex-shrink-0">{timeAgo(thread.created_at)}</span>
        </div>
        <p className="text-[11px] text-white/90 truncate leading-snug mb-1.5">
          {lastMsg ?? thread.topic}
        </p>
        <div className="flex items-center gap-1.5">
          <StatusDot status={thread.status} />
          <span className="text-[10px] text-white/90 capitalize">{thread.status.replace("_", " ")}</span>
          <span className="text-[10px] text-[#f5d98b] ml-1">{thread.topic}</span>
        </div>
      </div>
    </button>
  );
}

function CsrChatBubble({ msg }: { msg: InquiryMessage }) {
  const isCSR = msg.sender === "csr";
  return (
    <div className={`flex ${isCSR ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`max-w-[72%] ${isCSR ? "items-end" : "items-start"} flex flex-col`}>
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
            isCSR
              ? "bg-[#1C2956] text-white rounded-br-sm"
              : "bg-gray-100 text-gray-800 rounded-bl-sm"
          }`}
        >
          {msg.body}
        </div>
        <span className="text-[10px] text-gray-500 mt-1 px-1">{formatTime(msg.created_at)}</span>
      </div>
    </div>
  );
}

function FaqCardItem({ card }: { card: FaqCard }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(card.policy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#1C2956]/8 flex items-center justify-center text-[#1C2956]">
          {card.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-[#030349]">{card.title}</span>
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${card.tagColor}`}>
              {card.tag}
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-0.5 leading-snug line-clamp-2">{card.preview}</p>
        </div>
        <div className="flex-shrink-0 text-gray-400">
          {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </button>

      {open && (
        <div className="border-t border-gray-100">
          {/* Policy snippet header */}
          <div className="flex items-center justify-between px-4 pt-3 pb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#1C2956]">Policy Snippet</span>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg border transition-all duration-150 ${
                copied
                  ? "bg-[#1C2956] text-white border-[#1C2956]"
                  : "bg-white text-gray-600 border-gray-300 hover:border-[#1C2956] hover:text-[#1C2956]"
              }`}
            >
              {copied ? (
                <><CheckCircle size={11} /> Copied!</>
              ) : (
                <><ClipboardList size={11} /> Copy</>
              )}
            </button>
          </div>
          {/* Policy text */}
          <div className="px-4 pb-4 text-xs text-gray-700 leading-relaxed">
            {card.policy}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── REUSABLE PANEL CONTENTS ───────────────────────────────────────────── */

function SidebarContents({
  threads,
  activeId,
  setActiveId,
  onSelect,
  search,
  setSearch,
}: {
  threads: InquiryThread[];
  activeId: string | null;
  setActiveId: (id: string) => void;
  onSelect?: () => void;
  search: string;
  setSearch: (v: string) => void;
}) {
  const openCount = threads.filter((t) => t.status === "open").length;
  const filtered = threads.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.topic.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Logo header */}
      <div className="px-4 pt-5 pb-4 border-b border-white/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#030349] flex items-center justify-center flex-shrink-0 overflow-hidden">
          <Image
            src="/slazzer-preview-u8tbq.png"
            alt="RPA"
            width={36}
            height={36}
            className="object-contain"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </div>
        <div>
          <p className="text-white text-xs font-bold leading-tight">Rise Preparatory Academy</p>
          <p className="text-white/70 text-[9px] leading-tight mt-0.5">Empowering students to become scholars</p>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 py-3">
        <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
          <Search size={12} className="text-white/70 flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search interactions..."
            className="bg-transparent text-white text-xs placeholder:text-white/80 outline-none w-full"
          />
        </div>
      </div>

      {/* Section label */}
      <div className="px-4 pb-2 flex items-center justify-between">
        <span className="text-[9px] font-bold uppercase tracking-widest text-white/70">
          Active Interactions
        </span>
        {openCount > 0 && (
          <span className="text-[10px] font-semibold bg-[#C9A84C] text-[#030349] px-1.5 py-0.5 rounded-full">
            {openCount} new
          </span>
        )}
      </div>

      {/* Thread list */}
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full">
        {filtered.length === 0 && (
          <p className="text-white/40 text-xs text-center mt-8 px-4">
            {threads.length === 0 ? "No inquiries yet." : "No results."}
          </p>
        )}
        {filtered.map((thread) => (
          <ThreadItem
            key={thread.id}
            thread={thread}
            active={thread.id === activeId}
            onClick={() => { setActiveId(thread.id); onSelect?.(); }}
          />
        ))}
      </div>
    </>
  );
}

function ChatContents({
  thread,
  messages,
  activeTab,
  setActiveTab,
  reply,
  setReply,
  onSend,
  onStatusChange,
}: {
  thread: InquiryThread | null;
  messages: InquiryMessage[];
  activeTab: "Chat" | "Email" | "Script";
  setActiveTab: (t: "Chat" | "Email" | "Script") => void;
  reply: string;
  setReply: (v: string) => void;
  onSend: () => void;
  onStatusChange: (s: ThreadStatus) => void;
}) {
  const tabs: ("Chat" | "Email" | "Script")[] = ["Chat", "Email", "Script"];
  const msgEndRef = React.useRef<HTMLDivElement>(null);
  const [parentTyping, setParentTyping] = React.useState(false);
  const presenceRef = React.useRef<ReturnType<typeof supabase.channel> | null>(null);
  const typingTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* Broadcast channel for typing indicator */
  useEffect(() => {
    if (!thread) return;

    if (presenceRef.current) {
      supabase.removeChannel(presenceRef.current);
      presenceRef.current = null;
    }

    const ch = supabase.channel(`typing-${thread.id}`, { config: { broadcast: { self: false } } });
    presenceRef.current = ch;

    ch
      .on("broadcast", { event: "typing" }, (payload: { payload: { role: string; typing: boolean } }) => {
        if (payload.payload.role === "parent") setParentTyping(payload.payload.typing);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(ch);
      presenceRef.current = null;
    };
  }, [thread?.id]);

  const broadcastCsrTyping = React.useCallback((typing: boolean) => {
    presenceRef.current?.send({ type: "broadcast", event: "typing", payload: { role: "csr", typing } });
  }, []);

  const handleReplyKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { broadcastCsrTyping(false); return; }
    broadcastCsrTyping(true);
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => broadcastCsrTyping(false), 2000);
  };

  if (!thread) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-3">
        <MessageSquare size={40} className="opacity-20" />
        <p className="text-sm">Select an inquiry to start replying</p>
      </div>
    );
  }

  return (
    <>
      {/* Tab bar */}
      <div className="flex items-center gap-1 px-4 pt-3 pb-0 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? "border-[#1C2956] text-[#1C2956]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <span className="inline-flex items-center gap-1.5">
              {tab === "Chat"   && <MessageSquare size={13} />}
              {tab === "Email"  && <Mail size={13} />}
              {tab === "Script" && <ClipboardList size={13} />}
              {tab}
            </span>
          </button>
        ))}
      </div>

      {/* Contact header */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-base font-bold text-[#030349]">{thread.name}</span>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200">
            {thread.topic}
          </span>
          <span className="text-[11px] text-gray-500">{thread.email}</span>
        </div>
        <select
          aria-label="Thread status"
          value={thread.status}
          onChange={(e) => onStatusChange(e.target.value as ThreadStatus)}
          className="text-xs font-medium border border-gray-300 text-gray-600 px-2 py-1.5 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#1C2956] transition-colors cursor-pointer"
        >
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {/* Tab body */}
      {activeTab === "Script" ? (
        <ScriptPanel />
      ) : activeTab === "Email" ? (
        <EmailPanel threadId={thread.id} contactEmail={thread.email} />
      ) : (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-5">
            <p className="text-center text-[11px] text-gray-400 mb-5">
              {new Date(thread.created_at).toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" })}
            </p>
            {messages.map((msg) => (
              <CsrChatBubble key={msg.id} msg={msg} />
            ))}

            {/* Parent typing indicator */}
            {parentTyping && (
              <div className="flex justify-start mb-4 mt-2">
                <div className="bg-gray-100 px-4 py-2.5 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce [animation-delay:300ms]" />
                </div>
                <span className="text-[10px] text-gray-400 ml-2 self-end mb-0.5">Parent typing…</span>
              </div>
            )}

            <div ref={msgEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-3 border-t border-gray-100 flex items-center gap-2 flex-wrap">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className="flex items-center gap-1.5 text-xs font-semibold bg-[#1C2956] hover:bg-[#030349] text-white px-3 py-2 rounded-lg transition-colors"
              >
                {action.icon}
                {action.label}
              </button>
            ))}
          </div>

          {/* Reply input */}
          <div className="px-4 pb-4 pt-2">
            <form
              onSubmit={(e) => { e.preventDefault(); onSend(); }}
              className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 bg-white shadow-sm"
            >
              <button type="button" aria-label="Attach file" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Paperclip size={16} />
              </button>
              <input
                type="text"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                onKeyDown={handleReplyKeyDown}
                placeholder="Type your reply..."
                className="flex-1 text-sm text-gray-700 placeholder:text-gray-400 outline-none bg-transparent"
              />
              <button
                type="submit"
                aria-label="Send reply"
                disabled={!reply.trim()}
                className="w-8 h-8 rounded-lg bg-[#1C2956] hover:bg-[#030349] disabled:opacity-40 flex items-center justify-center transition-colors flex-shrink-0"
              >
                <Send size={14} className="text-white" />
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
}

function KbContents({ aiQuery, setAiQuery }: { aiQuery: string; setAiQuery: (v: string) => void }) {
  return (
    <>
      {/* Header */}
      <div className="px-4 pt-5 pb-3 border-b border-gray-200">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-bold text-[#030349]">RPA Knowledge Base</h2>
          <button className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-[#1C2956] transition-colors border border-gray-200 rounded px-2 py-1 bg-white">
            <RefreshCw size={10} />
            Sync
          </button>
        </div>
        <p className="text-[10px] text-gray-600">AI-powered policy search &amp; FAQ reference</p>
      </div>

      {/* AI search */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <Search size={12} className="text-gray-400 ml-3 flex-shrink-0" />
          <input
            type="text"
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
            placeholder="Ask RPA Knowledge Base..."
            className="flex-1 text-xs text-gray-700 placeholder:text-gray-400 outline-none py-2.5 bg-transparent"
          />
          <button className="flex items-center gap-1 bg-[#1C2956] hover:bg-[#030349] text-[#C9A84C] text-[11px] font-semibold px-3 py-2.5 transition-colors flex-shrink-0">
            <Sparkles size={11} />
            Ask AI
          </button>
        </div>
      </div>

      {/* FAQ label */}
      <div className="px-4 pt-3 pb-2">
        <span className="text-[9px] font-bold uppercase tracking-widest text-gray-700">
          FAQ Quick-Cards
        </span>
      </div>

      {/* FAQ cards */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
        {faqCards.map((card) => (
          <FaqCardItem key={card.id} card={card} />
        ))}
      </div>
    </>
  );
}

/* ─── PAGE ──────────────────────────────────────────────────────────────── */

type MobilePanel = "sidebar" | "chat" | "kb";

export default function CsrPage() {
  const [threads, setThreads] = useState<InquiryThread[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [threadMessages, setThreadMessages] = useState<InquiryMessage[]>([]);
  const [activeTab, setActiveTab] = useState<"Chat" | "Email" | "Script">("Chat");
  const [reply, setReply] = useState("");
  const [aiQuery, setAiQuery] = useState("");
  const [search, setSearch] = useState("");
  const [mobilePanel, setMobilePanel] = useState<MobilePanel>("chat");

  const activeThread = threads.find((t) => t.id === activeId) ?? null;

  /* ── Load threads ── */
  const loadThreads = useCallback(async () => {
    const { data } = await supabase
      .from("inquiry_threads")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setThreads(data);
  }, []);

  useEffect(() => { loadThreads(); }, [loadThreads]);

  /* ── Load messages when active thread changes ── */
  useEffect(() => {
    if (!activeId) return;
    supabase
      .from("inquiry_messages")
      .select("*")
      .eq("thread_id", activeId)
      .order("created_at", { ascending: true })
      .then(({ data }: { data: InquiryMessage[] | null }) => setThreadMessages(data ?? []));
  }, [activeId]);

  /* ── Realtime: threads (INSERT + UPDATE) ── */
  useEffect(() => {
    const channelId = `csr-threads-${Date.now()}`;
    const ch = supabase
      .channel(channelId)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "inquiry_threads" },
        (payload: { new: InquiryThread }) => {
          setThreads((prev) =>
            prev.some((t) => t.id === payload.new.id) ? prev : [payload.new, ...prev]
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "inquiry_threads" },
        (payload: { new: InquiryThread }) => {
          setThreads((prev) =>
            prev.map((t) => (t.id === payload.new.id ? { ...t, ...payload.new } : t))
          );
        }
      )
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);

  /* ── Realtime: messages for active thread (no filter — check client-side) ── */
  useEffect(() => {
    if (!activeId) return;
    const channelId = `csr-msgs-${activeId}-${Date.now()}`;
    const ch = supabase
      .channel(channelId)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "inquiry_messages" },
        (payload: { new: InquiryMessage }) => {
          if (payload.new.thread_id !== activeId) return;
          setThreadMessages((prev) =>
            prev.some((m) => m.id === payload.new.id) ? prev : [...prev, payload.new]
          );
        }
      )
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [activeId]);

  /* ── Send CSR reply ── */
  const handleSend = useCallback(async () => {
    if (!reply.trim() || !activeId) return;
    await supabase.from("inquiry_messages").insert({
      thread_id: activeId,
      sender: "csr",
      body: reply.trim(),
    });
    setReply("");
  }, [reply, activeId]);

  /* ── Change thread status ── */
  const handleStatusChange = useCallback(async (status: ThreadStatus) => {
    if (!activeId) return;
    await supabase.from("inquiry_threads").update({ status }).eq("id", activeId);
  }, [activeId]);

  const sidebarProps = {
    threads,
    activeId,
    setActiveId,
    search,
    setSearch,
  };

  const chatProps = {
    thread: activeThread,
    messages: threadMessages,
    activeTab,
    setActiveTab,
    reply,
    setReply,
    onSend: handleSend,
    onStatusChange: handleStatusChange,
  };

  /* ── Resizable sidebar widths ── */
  const [leftW,  setLeftW]  = React.useState(256);
  const [rightW, setRightW] = React.useState(288);
  const containerRef = useRef<HTMLDivElement>(null);

  const startDrag = (side: "left" | "right", e: React.MouseEvent) => {
    e.preventDefault();
    const startX   = e.clientX;
    const startVal = side === "left" ? leftW : rightW;

    const onMove = (mv: MouseEvent) => {
      const delta = mv.clientX - startX;
      if (side === "left") {
        setLeftW(Math.max(160, Math.min(480, startVal + delta)));
      } else {
        setRightW(Math.max(160, Math.min(520, startVal - delta)));
      }
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup",   onUp);
      document.body.style.cursor     = "";
      document.body.style.userSelect = "";
    };
    document.body.style.cursor     = "col-resize";
    document.body.style.userSelect = "none";
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",   onUp);
  };

  return (
    <div ref={containerRef} className="flex flex-col h-screen w-screen overflow-hidden bg-[#f7f3f3] font-sans md:flex-row">

      {/* ── DESKTOP: COL 1 Sidebar ───────────────────────────────────────── */}
      <aside
        className="hidden md:flex flex-shrink-0 bg-[#1C2956] flex-col h-full"
        style={{ width: leftW }}
      >
        <SidebarContents {...sidebarProps} />
      </aside>

      {/* LEFT drag handle */}
      <div
        className="hidden md:flex flex-shrink-0 w-1.5 h-full cursor-col-resize items-center justify-center bg-[#1C2956] hover:bg-[#C9A84C]/60 active:bg-[#C9A84C] transition-colors z-20 group"
        onMouseDown={(e) => startDrag("left", e)}
        title="Drag to resize"
      >
        <div className="h-8 w-0.5 rounded-full bg-white/20 group-hover:bg-white/60 transition-colors" />
      </div>

      {/* ── MOBILE: panels ───────────────────────────────────────────────── */}
      <aside className={`md:hidden flex-col h-full bg-[#1C2956] w-full ${mobilePanel === "sidebar" ? "flex" : "hidden"}`}>
        <SidebarContents {...sidebarProps} onSelect={() => setMobilePanel("chat")} />
      </aside>

      <div className={`md:hidden flex-col h-full bg-white w-full ${mobilePanel === "chat" ? "flex" : "hidden"}`}>
        <ChatContents {...chatProps} />
      </div>

      <div className={`md:hidden flex-col h-full bg-[#f7f3f3] w-full ${mobilePanel === "kb" ? "flex" : "hidden"}`}>
        <KbContents aiQuery={aiQuery} setAiQuery={setAiQuery} />
      </div>

      {/* ── DESKTOP: COL 2 Chat ──────────────────────────────────────────── */}
      <div className="hidden md:flex flex-1 flex-col h-full bg-white border-x border-gray-200 min-w-0">
        <ChatContents {...chatProps} />
      </div>

      {/* RIGHT drag handle */}
      <div
        className="hidden md:flex flex-shrink-0 w-1.5 h-full cursor-col-resize items-center justify-center bg-gray-200 hover:bg-[#C9A84C]/60 active:bg-[#C9A84C] transition-colors z-20 group"
        onMouseDown={(e) => startDrag("right", e)}
        title="Drag to resize"
      >
        <div className="h-8 w-0.5 rounded-full bg-gray-400 group-hover:bg-white/60 transition-colors" />
      </div>

      {/* ── DESKTOP: COL 3 Knowledge Base ────────────────────────────────── */}
      <aside
        className="hidden md:flex flex-shrink-0 bg-[#f7f3f3] flex-col h-full"
        style={{ width: rightW }}
      >
        <KbContents aiQuery={aiQuery} setAiQuery={setAiQuery} />
      </aside>

      {/* ── MOBILE: Bottom nav ───────────────────────────────────────────── */}
      <nav className="md:hidden flex-shrink-0 flex items-center bg-[#1C2956] border-t border-white/10">
        {(
          [
            { panel: "sidebar" as MobilePanel, icon: <MessageSquare size={20} />, label: "Contacts" },
            { panel: "chat"    as MobilePanel, icon: <Send size={20} />,           label: "Chat"     },
            { panel: "kb"      as MobilePanel, icon: <BookOpen size={20} />,       label: "KB"       },
          ] as { panel: MobilePanel; icon: React.ReactNode; label: string }[]
        ).map(({ panel, icon, label }) => (
          <button
            key={panel}
            onClick={() => setMobilePanel(panel)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-[10px] font-semibold transition-colors ${
              mobilePanel === panel ? "text-[#C9A84C]" : "text-white/60 hover:text-white/90"
            }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}
