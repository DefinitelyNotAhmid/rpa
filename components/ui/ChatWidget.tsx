"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";

const HIDE_ON = ["/inquiry", "/student-login", "/admin", "/csr"];

export function ChatWidget() {
  const pathname = usePathname();
  const hide = HIDE_ON.some((p) => pathname === p || pathname.startsWith(p + "/"));
  if (hide) return null;

  return (
    <Link
      href="/inquiry/start"
      aria-label="Chat with admissions"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#1C2956] hover:bg-[#030349] text-white text-sm font-semibold px-4 py-3 rounded-full shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl group"
    >
      <MessageCircle size={18} className="text-[#C9A84C]" />
      <span className="hidden sm:inline">Chat with Admissions</span>
    </Link>
  );
}
