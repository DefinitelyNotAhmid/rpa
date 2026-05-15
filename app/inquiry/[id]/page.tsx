"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Send, CheckCircle, Clock, AlertCircle, ArrowLeft, ArrowRight, DollarSign, Shirt, FileText, GraduationCap, MessageCircle, Lock as LockIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { InquiryMessage, InquiryThread, ThreadStatus, InquiryTopic } from "@/lib/types/inquiry";

/* ── Topic icon map ── */
const TOPIC_ICONS: Record<InquiryTopic, React.ReactNode> = {
  "Tuition & Fees":      <DollarSign size={13} />,
  "Uniforms":            <Shirt size={13} />,
  "Transcript Request":  <FileText size={13} />,
  "Admissions":          <GraduationCap size={13} />,
  "General":             <MessageCircle size={13} />,
};

/* ── Status config ── */
const STATUS_CONFIG: Record<ThreadStatus, { label: string; bar: string; badge: string; icon: React.ReactNode }> = {
  open:        { label: "Open — waiting for response", bar: "bg-amber-400",  badge: "bg-amber-50 text-amber-700 border border-amber-200",  icon: <AlertCircle size={11} /> },
  in_progress: { label: "In Progress",                 bar: "bg-blue-500",   badge: "bg-blue-50 text-blue-700 border border-blue-200",      icon: <Clock size={11} /> },
  resolved:    { label: "Resolved",                    bar: "bg-green-500",  badge: "bg-green-50 text-green-700 border border-green-200",   icon: <CheckCircle size={11} /> },
};

function StatusBadge({ status }: { status: ThreadStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full ${cfg.badge}`}>
      {cfg.icon} {cfg.label}
    </span>
  );
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function refId(id: string) {
  return `#${id.replace(/-/g, "").slice(0, 8).toUpperCase()}`;
}

export default function InquiryThreadPage() {
  const { id } = useParams<{ id: string }>();
  const [thread, setThread] = useState<InquiryThread | null>(null);
  const [messages, setMessages] = useState<InquiryMessage[]>([]);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [csrTyping, setCsrTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const presenceChannelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  /* ── Initial load ── */
  useEffect(() => {
    async function load() {
      const { data: t } = await supabase
        .from("inquiry_threads")
        .select("*")
        .eq("id", id)
        .single();

      if (!t) { setNotFound(true); return; }
      setThread(t);

      const { data: msgs } = await supabase
        .from("inquiry_messages")
        .select("*")
        .eq("thread_id", id)
        .order("created_at", { ascending: true });

      setMessages(msgs ?? []);
    }
    load();
  }, [id]);

  /* ── Realtime subscription ── */
  useEffect(() => {
    const channelId = `thread-${id}-${Date.now()}`;
    const channel = supabase
      .channel(channelId)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "inquiry_messages" },
        (payload: { new: InquiryMessage }) => {
          if (payload.new.thread_id !== id) return;
          setMessages((prev) =>
            prev.some((m) => m.id === payload.new.id) ? prev : [...prev, payload.new]
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "inquiry_threads" },
        (payload: { new: InquiryThread }) => {
          if (payload.new.id !== id) return;
          setThread((prev) => prev ? { ...prev, ...payload.new } : prev);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [id]);

  /* ── Broadcast: typing indicator ── */
  useEffect(() => {
    if (presenceChannelRef.current) {
      supabase.removeChannel(presenceChannelRef.current);
      presenceChannelRef.current = null;
    }

    const ch = supabase.channel(`typing-${id}`, { config: { broadcast: { self: false } } });
    presenceChannelRef.current = ch;

    ch
      .on("broadcast", { event: "typing" }, (payload: { payload: { role: string; typing: boolean } }) => {
        if (payload.payload.role === "csr") setCsrTyping(payload.payload.typing);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(ch);
      presenceChannelRef.current = null;
    };
  }, [id]);

  /* ── Auto-scroll ── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const sendReply = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!reply.trim() || sending) return;
    setSending(true);
    const body = reply.trim();
    setReply("");
    if (textareaRef.current) { textareaRef.current.style.height = "auto"; }
    await supabase.from("inquiry_messages").insert({ thread_id: id, sender: "parent", body });
    setSending(false);
  }, [reply, sending, id]);

  const broadcastTyping = useCallback((typing: boolean) => {
    presenceChannelRef.current?.send({ type: "broadcast", event: "typing", payload: { role: "parent", typing } });
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      broadcastTyping(false);
      sendReply();
      return;
    }
    broadcastTyping(true);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => broadcastTyping(false), 2000);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReply(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7f3f3] px-6 text-center font-sans">
        <h1 className="font-serif text-[#1C2956] text-3xl mb-3">Thread not found</h1>
        <p className="text-gray-600 text-sm mb-6">This inquiry link may be invalid or expired.</p>
        <Link href="/inquiry/start" className="btn-primary">Start a new inquiry</Link>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f3f3] font-sans">
        <div className="w-6 h-6 rounded-full border-2 border-[#1C2956] border-t-transparent animate-spin" />
      </div>
    );
  }

  const statusCfg = STATUS_CONFIG[thread.status];
  const topicIcon = TOPIC_ICONS[thread.topic as InquiryTopic];

  return (
    <div className="min-h-screen flex flex-col font-sans"
      style={{ background: "radial-gradient(circle, #d1d5db22 1px, transparent 1px) center / 22px 22px, #f0eef0" }}>

      {/* ── Header ── */}
      <header className="bg-[#030349] text-white sticky top-0 z-10 shadow-lg">

        {/* Row 1 */}
        <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-white/10 relative">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-xs transition-colors"
            aria-label="Back to Rise Prep site"
          >
            <ArrowLeft size={13} />
            <span className="hidden sm:inline">Rise Preparatory Academy</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <Image
            src="/slazzer-preview-u8tbq.png"
            alt="Rise Preparatory Academy"
            width={80}
            height={24}
            className="object-contain absolute left-1/2 -translate-x-1/2"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <span className="text-[10px] font-mono text-white/70 tracking-wider">{refId(id)}</span>
        </div>

        {/* Row 2 */}
        <div className="flex items-center gap-3 px-4 py-2.5 flex-wrap border-b-2 border-[#C9A84C]/30">
          <span className="inline-flex items-center gap-1.5 bg-white/10 text-white/90 text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/10">
            {topicIcon}
            {thread.topic}
          </span>
          <span className="text-white font-semibold text-sm truncate flex-1 min-w-0">{thread.name}</span>
          <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full ${statusCfg.badge}`}>
            {statusCfg.icon} {statusCfg.label}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 w-full bg-white/10">
          <div className={`h-full transition-all duration-700 ${statusCfg.bar} ${
            thread.status === "open" ? "w-1/3" :
            thread.status === "in_progress" ? "w-2/3" : "w-full"
          }`} />
        </div>
      </header>

      {/* Resolved banner */}
      {thread.status === "resolved" && (
        <div className="bg-green-50 border-b border-green-200 px-4 py-3 text-center text-sm text-green-700 font-semibold">
          ✓ This inquiry has been resolved.{" "}
          <Link href="/inquiry/start" className="underline underline-offset-2 hover:text-green-900 font-bold">Start a new inquiry →</Link>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-8 max-w-3xl w-full mx-auto">

        {/* Date pill */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-px bg-gray-300/50" />
          <div className="bg-white border border-gray-200 text-gray-500 text-xs px-4 py-1.5 rounded-full shadow-sm whitespace-nowrap font-medium">
            {new Date(thread.created_at).toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}
          </div>
          <div className="flex-1 h-px bg-gray-300/50" />
        </div>

        {/* Bubbles */}
        {messages.map((msg, idx) => {
          const isParent = msg.sender === "parent";
          const prev = messages[idx - 1];
          const next = messages[idx + 1];
          const isGrouped = prev && prev.sender === msg.sender;
          const isLastInGroup = !next || next.sender !== msg.sender;

          return (
            <div key={msg.id} className={`flex ${isParent ? "justify-end" : "justify-start"} ${isGrouped ? "mt-0.5" : "mt-5"}`}>

              {/* CSR avatar */}
              {!isParent && (
                <div className={`w-8 h-8 rounded-full flex-shrink-0 mr-2.5 self-end ${
                  isLastInGroup
                    ? "bg-[#1C2956] flex items-center justify-center text-[9px] font-bold text-[#C9A84C] shadow-md"
                    : "opacity-0"
                }`}>
                  {isLastInGroup && "RPA"}
                </div>
              )}

              <div className={`max-w-[72%] flex flex-col ${isParent ? "items-end" : "items-start"}`}>
                {!isParent && !isGrouped && (
                  <p className="text-[10px] text-gray-500 mb-1 ml-1 font-semibold uppercase tracking-wide">Rise Prep Admissions</p>
                )}

                {/* Bubble */}
                <div className={`group relative text-sm leading-relaxed whitespace-pre-line px-4 py-3 ${
                  isParent
                    ? [
                        "bg-[#1C2956] text-white shadow-md",
                        !isGrouped           ? "rounded-2xl rounded-br-md" : "",
                        isGrouped && isLastInGroup ? "rounded-2xl rounded-tr-md rounded-br-md" : "",
                        isGrouped && !isLastInGroup ? "rounded-xl" : "",
                      ].join(" ")
                    : [
                        "bg-white text-gray-800 shadow-md border border-gray-100/80",
                        !isGrouped           ? "rounded-2xl rounded-bl-md" : "",
                        isGrouped && isLastInGroup ? "rounded-2xl rounded-tl-md rounded-bl-md" : "",
                        isGrouped && !isLastInGroup ? "rounded-xl" : "",
                      ].join(" ")
                }`}>
                  {msg.body}
                  {/* Hover timestamp */}
                  <span className={`pointer-events-none absolute ${isParent ? "-left-14 right-auto" : "-right-14 left-auto"} bottom-1 text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap ${isParent ? "text-right" : "text-left"}`}>
                    {formatTime(msg.created_at)}
                  </span>
                </div>

                {/* Gold accent bar on parent's first bubble */}
                {isParent && !isGrouped && (
                  <div className="w-8 h-0.5 bg-[#C9A84C]/60 rounded-full mt-1 mr-1" />
                )}
              </div>
            </div>
          );
        })}

        {/* CSR typing indicator */}
        {csrTyping && thread.status !== "resolved" && (
          <div className="flex items-end gap-2.5 mt-5 ml-10">
            <div className="bg-white border border-gray-100 shadow-md px-4 py-3 rounded-2xl rounded-bl-md flex gap-1.5 items-center">
              <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce [animation-delay:0ms]" />
              <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce [animation-delay:160ms]" />
              <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce [animation-delay:320ms]" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Reply bar */}
      {thread.status !== "resolved" ? (
        <div className="sticky bottom-0 px-4 pb-4 pt-2"
          style={{ background: "linear-gradient(to top, #f0eef0 80%, transparent)" }}>
          <div className="max-w-3xl mx-auto">
            <p className="text-center text-[10px] text-gray-400 mb-2 flex items-center justify-center gap-1">
              <LockIcon size={9} className="opacity-60" /> Rise Prep Admissions · Secure Chat
            </p>
            <form
              onSubmit={sendReply}
              className="flex items-end gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-lg shadow-gray-200/60 focus-within:border-[#1C2956]/40 focus-within:shadow-[#1C2956]/10 transition-all"
            >
              <textarea
                ref={textareaRef}
                rows={1}
                value={reply}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder="Type your message…"
                className="flex-1 text-sm text-gray-700 placeholder:text-gray-300 outline-none bg-transparent resize-none leading-relaxed max-h-[120px] overflow-y-auto"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={!reply.trim() || sending}
                className="w-9 h-9 rounded-xl bg-[#C9A84C] hover:bg-[#b8912f] disabled:opacity-30 flex items-center justify-center transition-all flex-shrink-0 mb-0.5 shadow-sm hover:-translate-y-px"
              >
                <Send size={14} className="text-[#030349]" />
              </button>
            </form>
            <p className="text-center text-[10px] text-gray-400 mt-1.5">Enter to send · Shift+Enter for new line</p>
          </div>
        </div>
      ) : (
        <div className="bg-white border-t border-gray-200 px-4 py-5 text-center">
          <Link href="/inquiry/start" className="btn-primary inline-flex items-center gap-2">
            Start a New Inquiry <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}
