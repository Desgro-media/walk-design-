"use client";

import { useState, useTransition } from "react";
import { updateLead } from "@/lib/admin/actions";
import { LEAD_STATUSES } from "@/lib/admin/types";
import { btn, card, input, label } from "./ui";

export function LeadEditor({ id, status, notes, followUp }: { id: string; status: string; notes: string; followUp: string | null }) {
  const [s, setS] = useState(status);
  const [n, setN] = useState(notes);
  const [f, setF] = useState(followUp ?? "");
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState("");

  return (
    <section className={`${card} p-5 sm:p-6 space-y-4`}>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="status" className={label}>Status</label>
          <select id="status" value={s} onChange={(e) => { setS(e.target.value); setMsg(""); }} className={input}>
            {LEAD_STATUSES.map((x) => <option key={x} value={x}>{x}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="fu" className={label}>Follow up on</label>
          <input id="fu" type="date" value={f} onChange={(e) => { setF(e.target.value); setMsg(""); }} className={input} />
        </div>
      </div>
      <div>
        <label htmlFor="notes" className={label}>Notes</label>
        <textarea id="notes" rows={5} value={n} onChange={(e) => { setN(e.target.value); setMsg(""); }} className={input} placeholder="Call notes, budget, next steps…" />
      </div>
      <div className="flex items-center gap-3">
        <button
          className={btn}
          disabled={pending}
          onClick={() =>
            start(async () => {
              const res = await updateLead(id, { status: s, notes: n, follow_up: f || null });
              setMsg(res.ok ? "Saved." : res.error);
            })
          }
        >
          {pending ? "Saving…" : "Save"}
        </button>
        {msg && <span className="text-[13px] text-[#736E67]">{msg}</span>}
      </div>
    </section>
  );
}
