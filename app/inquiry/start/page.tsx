"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { InquiryTopic } from "@/lib/types/inquiry";
import { useToast } from "@/components/ui/Toast";
import {
  MessageSquare, DollarSign, Shirt, FileText,
  GraduationCap, ArrowRight, User, Mail, Lock, Clock, CheckCircle, RotateCcw, ChevronRight, Eye, EyeOff,
} from "lucide-react";

const TOPIC_OPTIONS: { value: InquiryTopic; icon: React.ReactNode; desc: string }[] = [
  { value: "Tuition & Fees",     icon: <DollarSign size={20} />,    desc: "Costs & payment plans" },
  { value: "Uniforms",           icon: <Shirt size={20} />,         desc: "Dress code & ordering" },
  { value: "Transcript Request", icon: <FileText size={20} />,      desc: "Academic records" },
  { value: "Admissions",         icon: <GraduationCap size={20} />, desc: "Enrollment process" },
  { value: "General",            icon: <MessageSquare size={20} />, desc: "Other questions" },
];

const TRUST_BADGES = [
  { icon: <Clock size={14} />,        text: "Avg. response under 2 hrs" },
  { icon: <Lock size={14} />,         text: "Private & secure" },
  { icon: <CheckCircle size={14} />,  text: "Real staff — no bots" },
];

export default function InquiryStartPage() {
  const router = useRouter();
  const { show } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "" as InquiryTopic | "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Return-to-chat state
  const [showReturn, setShowReturn]       = useState(false);
  const [returnEmail, setReturnEmail]     = useState("");
  const [returnPass, setReturnPass]       = useState("");
  const [showPass, setShowPass]           = useState(false);
  const [returnLoading, setReturnLoading] = useState(false);
  const [returnError, setReturnError]     = useState("");
  const [returnThreads, setReturnThreads] = useState<{ id: string; topic: string; status: string; created_at: string }[]>([]);

  const handleReturn = async (e: React.FormEvent) => {
    e.preventDefault();
    setReturnLoading(true);
    setReturnError("");
    setReturnThreads([]);
    const { data, error: err } = await supabase
      .from("inquiry_threads")
      .select("id, topic, status, created_at")
      .eq("email", returnEmail.trim().toLowerCase())
      .order("created_at", { ascending: false })
      .limit(5);
    setReturnLoading(false);
    if (err || !data || data.length === 0) {
      setReturnError("No active chat found for that email. Double-check the address or start a new chat below.");
      return;
    }
    if (data.length === 1) {
      router.push(`/inquiry/${data[0].id}`);
      return;
    }
    setReturnThreads(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.topic) { setError("Please select a topic."); return; }
    setLoading(true);
    setError("");

    const { data: thread, error: threadErr } = await supabase
      .from("inquiry_threads")
      .insert({ name: form.name, email: form.email, topic: form.topic, status: "open" })
      .select("id")
      .single();

    if (threadErr || !thread) {
      show("Something went wrong. Please try again.", "error");
      setLoading(false);
      return;
    }

    await supabase.from("inquiry_messages").insert({
      thread_id: thread.id,
      sender: "parent",
      body: form.message,
    });

    router.push(`/inquiry/${thread.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans">

      {/* ── Left panel ── */}
      <div className="relative hidden md:flex md:w-5/12 flex-col justify-between p-10 overflow-hidden bg-[#030349]">
        <Image
          src="/18900-SW-106th-Ave-Miami-FL-Building-Photo-2-LargeHighDefinition.webp"
          alt="Rise Preparatory Academy campus"
          fill
          className="object-cover opacity-20"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030349] via-[#030349]/60 to-transparent z-0" />

        <div className="relative z-10">
          <Link href="/">
            <Image
              src="/slazzer-preview-u8tbq.png"
              alt="Rise Preparatory Academy"
              width={150}
              height={45}
              className="object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </Link>
        </div>

        <div className="relative z-10 max-w-sm space-y-8">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#C9A84C] flex items-center justify-center mb-4 shadow-lg">
              <MessageSquare size={22} className="text-[#030349]" />
            </div>
            <p className="text-white/90 text-xs font-semibold uppercase tracking-widest mb-3">Admissions Support</p>
            <blockquote className="border-l-4 border-[#C9A84C] pl-5">
              <p className="font-serif italic text-white text-xl leading-relaxed">
                &ldquo;We&rsquo;re here to answer every question &mdash; big or small.&rdquo;
              </p>
            </blockquote>
          </div>

          {/* Trust badges */}
          <div className="space-y-3">
            {TRUST_BADGES.map((b) => (
              <div key={b.text} className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[#C9A84C] flex-shrink-0">
                  {b.icon}
                </span>
                <span className="text-white/80 text-sm">{b.text}</span>
              </div>
            ))}
          </div>

          <p className="text-white/80 text-xs uppercase tracking-widest">
            Rise Preparatory Academy &middot; Cutler Bay, FL
          </p>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex flex-col justify-center items-center w-full md:w-7/12 min-h-screen bg-gray-50 px-6 py-14">

        {/* Mobile logo */}
        <div className="md:hidden mb-8">
          <Link href="/">
            <Image
              src="/slazzer-preview-u8tbq.png"
              alt="Rise Preparatory Academy"
              width={140}
              height={42}
              className="object-contain"
              style={{ filter: "brightness(0) saturate(100%) invert(13%) sepia(61%) saturate(700%) hue-rotate(199deg)" }}
            />
          </Link>
        </div>

        <div className="w-full max-w-lg">

          {/* Heading */}
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-[#7a5518] mb-2">Admissions Chat</p>
            <h1 className="font-serif text-[#1C2956] text-3xl md:text-4xl mb-2">How can we help you?</h1>
            <p className="text-gray-500 text-sm">Fill in your details and a staff member will respond shortly.</p>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/80 p-8 space-y-6">

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Maria Santos"
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-[#030349] bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1C2956]/30 focus:border-[#1C2956] placeholder:text-gray-300 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-[#030349] bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1C2956]/30 focus:border-[#1C2956] placeholder:text-gray-300 transition-all"
                />
              </div>
            </div>

            {/* Topic picker */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                What&rsquo;s this about?
              </label>
              {error && error.includes("topic") && (
                <p className="text-red-500 text-xs mb-2">{error}</p>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {TOPIC_OPTIONS.map((t) => {
                  const selected = form.topic === t.value;
                  return (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => { setForm({ ...form, topic: t.value }); setError(""); }}
                      className={`flex flex-col items-start gap-1.5 p-3.5 rounded-xl border-2 text-left transition-all duration-150 ${
                        selected
                          ? "border-[#1C2956] bg-[#1C2956] text-white shadow-md"
                          : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-white"
                      }`}
                    >
                      <span className={selected ? "text-[#C9A84C]" : "text-gray-400"}>{t.icon}</span>
                      <span className="text-xs font-semibold leading-tight">{t.value}</span>
                      <span className={`text-[10px] leading-tight ${selected ? "text-white/90" : "text-gray-500"}`}>{t.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                Your Question
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us what you'd like to know…"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#030349] bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1C2956]/30 focus:border-[#1C2956] placeholder:text-gray-300 resize-none transition-all"
              />
              <p className="text-right text-[10px] text-gray-600 mt-1">{form.message.length} chars</p>
            </div>


            <button
              type="submit"
              form="inquiry-form"
              disabled={loading || !form.topic}
              onClick={handleSubmit}
              className="w-full flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#b8912f] text-[#030349] font-bold text-sm uppercase tracking-widest py-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg hover:-translate-y-px"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-[#030349]/30 border-t-[#030349] animate-spin" />
                  Starting chat…
                </span>
              ) : (
                <>Start Chat <ArrowRight size={16} /></>
              )}
            </button>
          </div>

          {/* Return to chat */}
          <div className="mt-5">
            {!showReturn ? (
              <p className="text-center text-xs text-gray-500">
                Already started a chat?{" "}
                <button
                  type="button"
                  onClick={() => setShowReturn(true)}
                  className="text-[#1C2956] underline underline-offset-2 hover:text-[#C9A84C] transition-colors font-medium"
                >
                  Return to my chat
                </button>
              </p>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/80 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RotateCcw size={15} className="text-[#1C2956]" />
                    <span className="text-sm font-bold text-[#030349]">Return to my chat</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setShowReturn(false); setReturnError(""); setReturnThreads([]); setReturnEmail(""); setReturnPass(""); }}
                    className="text-gray-400 hover:text-gray-600 text-xs transition-colors"
                  >
                    ✕ Cancel
                  </button>
                </div>
                <p className="text-xs text-gray-500">Enter the email and password you used when you started your chat.</p>

                <form onSubmit={handleReturn} className="space-y-3">
                  {/* Email */}
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={returnEmail}
                      onChange={(e) => { setReturnEmail(e.target.value); setReturnError(""); setReturnThreads([]); }}
                      placeholder="you@example.com"
                      className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-[#030349] bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1C2956]/30 focus:border-[#1C2956] placeholder:text-gray-300 transition-all"
                    />
                  </div>

                  {/* Password (UI-only mockup) */}
                  <div className="relative">
                    <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      type={showPass ? "text" : "password"}
                      value={returnPass}
                      onChange={(e) => setReturnPass(e.target.value)}
                      placeholder="Password"
                      className="w-full border border-gray-200 rounded-xl pl-9 pr-10 py-2.5 text-sm text-[#030349] bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1C2956]/30 focus:border-[#1C2956] placeholder:text-gray-300 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label={showPass ? "Hide password" : "Show password"}
                    >
                      {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={returnLoading}
                    className="w-full flex items-center justify-center gap-2 bg-[#1C2956] hover:bg-[#030349] disabled:opacity-50 text-white text-sm font-bold py-2.5 rounded-xl transition-colors"
                  >
                    {returnLoading ? (
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    ) : (
                      <>Continue <ChevronRight size={15} /></>
                    )}
                  </button>
                </form>

                {returnError && (
                  <p className="text-xs text-red-500">{returnError}</p>
                )}

                {returnThreads.length > 1 && (
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Select your chat</p>
                    {returnThreads.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => router.push(`/inquiry/${t.id}`)}
                        className="w-full flex items-center justify-between gap-3 border border-gray-200 rounded-xl px-4 py-3 hover:border-[#1C2956] hover:bg-[#1C2956]/5 transition-all text-left group"
                      >
                        <div>
                          <p className="text-sm font-semibold text-[#030349]">{t.topic}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">
                            {new Date(t.created_at).toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })}
                            {" · "}
                            <span className={`font-medium capitalize ${
                              t.status === "resolved" ? "text-green-600" :
                              t.status === "in_progress" ? "text-blue-600" : "text-amber-600"
                            }`}>{t.status.replace("_", " ")}</span>
                          </p>
                        </div>
                        <ChevronRight size={15} className="text-gray-300 group-hover:text-[#1C2956] transition-colors flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
