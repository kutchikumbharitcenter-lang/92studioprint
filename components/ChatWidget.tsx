"use client";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };
const HELLO: Msg = { role: "assistant", content: "Hi! Ask about T-shirts, mugs, caps, bags or business printing." };
const CHIPS = ["T-shirt printing price?", "Bulk order for team", "Design help"];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([HELLO]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, open]);
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  async function send(q: string) {
    const content = q.trim();
    if (!content || busy) return;
    const next = [...msgs, { role: "user", content } as Msg];
    setMsgs(next); setText(""); setBusy(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.filter((m) => m !== HELLO) }),
      });
      const d = await r.json();
      setMsgs([...next, { role: "assistant", content: d.reply ?? d.error ?? "Something went wrong." }]);
    } catch {
      setMsgs([...next, { role: "assistant", content: "No connection. Try WhatsApp: +92 321 3283881" }]);
    } finally { setBusy(false); }
  }

  return (
    <>
      {!open && (
        <button className="chat-fab" onClick={() => setOpen(true)} aria-label="Open chat">
          <MessageCircle size={26} />
        </button>
      )}
      {open && (
        <section className="chat" role="dialog" aria-label="Chat with 92 Print Studio">
          <header className="chat-head">
            <strong>92 Print Studio Chat</strong>
            <button onClick={() => setOpen(false)} aria-label="Close chat"><X size={20} /></button>
          </header>
          <div className="chat-body" aria-live="polite">
            {msgs.map((m, i) => <p key={i} className={`bub ${m.role}`}>{m.content}</p>)}
            {busy && <p className="bub assistant">Typing…</p>}
            {msgs.length === 1 && (
              <div className="chips">{CHIPS.map((c) => <button key={c} onClick={() => send(c)}>{c}</button>)}</div>
            )}
            <div ref={end} />
          </div>
          <form className="chat-in" onSubmit={(e) => { e.preventDefault(); send(text); }}>
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your question" maxLength={500} aria-label="Message" />
            <button type="submit" disabled={busy || !text.trim()} aria-label="Send"><Send size={18} /></button>
          </form>
        </section>
      )}
    </>
  );
}
