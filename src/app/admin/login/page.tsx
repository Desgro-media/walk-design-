"use client";

import { useActionState } from "react";
import { login } from "@/lib/admin/actions";
import { btn, input, label } from "@/components/admin/ui";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <form action={action} className="w-full max-w-sm bg-white border border-[#1A1A1A]/10 p-8 space-y-6">
        <div>
          <p className="text-[10px] tracking-[0.24em] uppercase text-[#736E67]">Walk In Design</p>
          <h1 className="mt-2 text-2xl font-light tracking-tight">Admin sign in</h1>
        </div>
        <div>
          <label htmlFor="password" className={label}>Password</label>
          <input id="password" name="password" type="password" required autoFocus autoComplete="current-password" className={input} />
        </div>
        {state?.error && <p role="alert" className="text-[13px] text-[#9B2C2C]">{state.error}</p>}
        <button type="submit" disabled={pending} className={`${btn} w-full`}>
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
