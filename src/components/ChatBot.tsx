"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MessageCircle, Send, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { Project } from "@/data/projects";
import { useProjects } from "@/context/ProjectsContext";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content: "Hello! I'm the Walk In Design assistant. Ask me about our services, process, projects or how to get in touch.",
};

// The model may end a reply with [[project:ID]] tags; show those as photo cards (known ids only, max 3)
const TAG = /\[\[(?:project:)?([a-z0-9-]+)\]\]/g;
function parseReply(content: string, projectsData: Project[]) {
  const ids: string[] = [];
  const text = content
    .replace(TAG, (_, id: string) => {
      if (!ids.includes(id) && projectsData.some((p) => p.id === id)) ids.push(id);
      return "";
    })
    .trim();
  return { text, projects: ids.slice(0, 3).map((id) => projectsData.find((p) => p.id === id)!) };
}

const SUGGESTIONS = ["What services do you offer?", "How does your process work?", "Where are you based?", "Show me some of your work", "How can I start a project?"];

export function ChatBot() {
  const { setIsContactModalOpen, setSelectedProjectId } = useLanguage();
  const projectsData = useProjects();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // the greeting is UI-only, so it isn't sent to the model
        body: JSON.stringify({ messages: next.slice(1) }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.reply ?? data.error ?? "Sorry, something went wrong." }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Sorry, I couldn't connect. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 [font-family:var(--font-work-sans),sans-serif]">
      {open && (
        <div
          role="dialog"
          aria-label="Chat with Walk In Design"
          className="mb-3 flex w-[calc(100vw-2rem)] sm:w-[22rem] h-[min(32rem,calc(100svh-6.5rem))] flex-col overflow-hidden bg-[#F4F1EC] text-[#1A1A1A] shadow-2xl border border-[#1A1A1A]/10"
        >
          <div className="flex items-center justify-between bg-[#141312] px-4 py-3 text-[#F4F1EC]">
            <div>
              <p className="text-[12px] tracking-[0.2em] uppercase">Walk In Design</p>
              <p className="text-[10.5px] tracking-[0.12em] text-[#F4F1EC]/60">Ask us anything</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="p-1 cursor-pointer hover:opacity-60 transition-opacity">
              <X size={18} />
            </button>
          </div>

          <div ref={scrollRef} data-lenis-prevent className="flex-1 overflow-y-auto px-4 py-4 space-y-3 text-[13.5px] font-light leading-relaxed">
            {messages.map((m, i) => {
              const { text, projects } = m.role === "assistant" ? parseReply(m.content, projectsData) : { text: m.content, projects: [] };
              return (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex flex-col items-start gap-2"}>
                  <p
                    className={`max-w-[85%] whitespace-pre-wrap px-3 py-2 ${
                      m.role === "user" ? "bg-[#141312] text-[#F4F1EC]" : "bg-white text-[#1A1A1A] border border-[#1A1A1A]/8"
                    }`}
                  >
                    {text}
                  </p>
                  {projects.length > 0 && (
                    <div className="flex w-full gap-2 overflow-x-auto pb-1" data-lenis-prevent>
                      {projects.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setSelectedProjectId(p.id)}
                          className="group w-[9.5rem] shrink-0 text-left cursor-pointer"
                          aria-label={`View ${p.title}, ${p.location}`}
                        >
                          <span className="relative block aspect-[4/3] w-full overflow-hidden bg-[#E8E5E0]">
                            <Image
                              src={p.image}
                              alt={`${p.title}, ${p.location}`}
                              fill
                              sizes="152px"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </span>
                          <span className="mt-1 block text-[10.5px] tracking-[0.12em] uppercase leading-snug">{p.title}</span>
                          <span className="block text-[10px] text-[#736E67]">{p.location}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            {loading && (
              <div className="flex justify-start">
                <p className="bg-white border border-[#1A1A1A]/8 px-3 py-2 text-[#736E67]" aria-live="polite">
                  Typing…
                </p>
              </div>
            )}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-[11.5px] px-3 py-1.5 border border-[#1A1A1A]/25 hover:bg-[#141312] hover:text-[#F4F1EC] transition-colors cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-[#1A1A1A]/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 px-3 py-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={500}
                placeholder="Type your question…"
                aria-label="Your message"
                className="flex-1 bg-transparent py-2 text-[13.5px] font-light outline-none placeholder:text-[#736E67]"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="p-2 cursor-pointer disabled:opacity-30 hover:opacity-60 transition-opacity"
              >
                <Send size={18} />
              </button>
            </form>
            <button
              onClick={() => {
                setOpen(false);
                setIsContactModalOpen(true);
              }}
              className="w-full border-t border-[#1A1A1A]/10 py-2 text-[10.5px] tracking-[0.2em] uppercase font-light text-[#736E67] hover:text-[#1A1A1A] cursor-pointer transition-colors"
            >
              Send project enquiry →
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        className="ml-auto flex items-center gap-3 rounded-full bg-[#F4F1EC] p-1.5 sm:py-2 sm:pl-2 sm:pr-5 text-[#141312] shadow-[0_8px_30px_rgba(0,0,0,0.35)] ring-1 ring-black/10 hover:bg-white hover:shadow-[0_10px_34px_rgba(0,0,0,0.45)] transition-all cursor-pointer"
      >
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#4A543B] text-white">
          {!open && <span className="absolute inset-0 rounded-full bg-[#4A543B]/50 animate-ping [animation-duration:2.6s]" aria-hidden="true" />}
          <span className="relative">{open ? <X size={18} /> : <MessageCircle size={18} />}</span>
        </span>
        <span className="hidden sm:inline text-[12px] tracking-[0.18em] uppercase font-normal">{open ? "Close" : "Chat with us"}</span>
      </button>
    </div>
  );
}
