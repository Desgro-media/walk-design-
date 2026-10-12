"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export function ContactModal() {
  const { isContactModalOpen, setIsContactModalOpen, language, t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    service: "Architecture",
    scope: "",
    message: "",
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsContactModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsContactModalOpen]);

  if (!isContactModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate high-end submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 900);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      onClick={() => setIsContactModalOpen(false)}
    >
      <div
        data-lenis-prevent
        className="relative w-full max-w-2xl h-full bg-[#F4F1EC] text-[#1A1A1A] overflow-y-auto p-8 sm:p-12 md:p-16 flex flex-col justify-between shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-6 mb-8">
            <span className="text-[10px] tracking-[0.24em] uppercase font-light text-[#736E67]">
              WALK IN DESIGN • COMMISSIONS
            </span>
            <button
              onClick={() => setIsContactModalOpen(false)}
              className="text-[11px] tracking-[0.2em] uppercase font-light text-[#1A1A1A] px-4 py-2 border border-[#1A1A1A]/20 hover:bg-[#1A1A1A] hover:text-[#F4F1EC] transition-colors cursor-pointer"
            >
              <span className="hidden sm:inline">[ESC]</span>
              <span className="sm:hidden">{language === "EN" ? "CLOSE ✕" : "CERRAR ✕"}</span>
            </button>
          </div>

          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-[#1A1A1A]">
            {t.contactModal.title}
          </h2>
          <p className="mt-3 text-[14px] font-light text-[#736E67] leading-relaxed">
            {t.contactModal.subtitle}
          </p>

          {isSuccess ? (
            <div className="mt-12 p-8 border border-[#1A1A1A]/20 bg-[#EBE6DF]">
              <span className="text-[11px] tracking-[0.22em] uppercase font-normal text-[#1A1A1A] block mb-2">
                {language === "EN" ? "COMMISSION RECEIVED" : "SOLICITUD REGISTRADA"}
              </span>
              <p className="text-[14.5px] font-light leading-relaxed text-[#1A1A1A]">
                {t.contactModal.successMsg}
              </p>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setIsContactModalOpen(false);
                }}
                className="mt-6 text-[11px] tracking-[0.2em] uppercase font-light px-6 py-3 bg-[#1A1A1A] text-[#F4F1EC] hover:opacity-80 cursor-pointer"
              >
                {language === "EN" ? "CLOSE" : "CERRAR"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase font-light text-[#736E67] mb-2">
                    {t.contactModal.nameLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-[#1A1A1A]/20 py-2.5 text-[14px] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors font-light"
                    placeholder="e.g. Elena Rostova"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase font-light text-[#736E67] mb-2">
                    {t.contactModal.emailLabel} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b border-[#1A1A1A]/20 py-2.5 text-[14px] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors font-light"
                    placeholder="elena@domain.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase font-light text-[#736E67] mb-2">
                    {t.contactModal.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-transparent border-b border-[#1A1A1A]/20 py-2.5 text-[14px] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors font-light"
                    placeholder="+974 0000 0000"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase font-light text-[#736E67] mb-2">
                    {t.contactModal.locationLabel}
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-transparent border-b border-[#1A1A1A]/20 py-2.5 text-[14px] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors font-light"
                    placeholder=""
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase font-light text-[#736E67] mb-2">
                    {t.contactModal.serviceLabel}
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-transparent border-b border-[#1A1A1A]/20 py-2.5 text-[13px] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors font-light"
                  >
                    <option value="Architecture">Architecture</option>
                    <option value="Interior">Interior Design</option>
                    <option value="Landscape">Landscape Design</option>
                    <option value="Combined">Combined Services</option>
                    <option value="Consultation">Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase font-light text-[#736E67] mb-2">
                    {t.contactModal.scopeLabel}
                  </label>
                  <input
                    type="text"
                    value={formData.scope}
                    onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                    className="w-full bg-transparent border-b border-[#1A1A1A]/20 py-2.5 text-[14px] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors font-light"
                    placeholder=""
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase font-light text-[#736E67] mb-2">
                  {t.contactModal.messageLabel} *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-b border-[#1A1A1A]/20 py-2 text-[14px] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors font-light resize-none"
                  placeholder=""
                />
              </div>

              <p className="text-[11px] font-light text-[#736E67] leading-relaxed">
                {language === "EN"
                  ? "We will use the details you submit to respond to your enquiry. Please read our Privacy Policy for information about how we handle personal data."
                  : "Utilizaremos los datos que nos facilite para responder a su consulta."}
              </p>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#1A1A1A] text-[#F4F1EC] text-[11px] tracking-[0.24em] uppercase font-light hover:opacity-85 transition-opacity cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? t.contactModal.submitting : t.contactModal.submitBtn}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Bottom studio credentials */}
        <div className="mt-12 pt-6 border-t border-[#1A1A1A]/10 text-[10.5px] tracking-[0.18em] uppercase font-light text-[#736E67] flex flex-col sm:flex-row sm:justify-between gap-2">
          <span>QATAR & INDIA</span>
          <span className="flex flex-col gap-1 sm:text-right">
            <span>Qatar: +974 5175 3798 • +974 5175 3799</span>
            <span>India: +91 9747397043 • +91 8330095919</span>
          </span>
        </div>
      </div>
    </div>
  );
}
