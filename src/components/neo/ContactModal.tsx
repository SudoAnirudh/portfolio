"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Copy, Check, Mail, MapPin } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { submitContactForm } from "@/app/actions/contact";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_SUBJECTS = [
  {
    label: "Full-Time / Contract",
    subject: "Full-Time AI/ML Engineering Opportunity",
    template: "Hi Anirudh,\n\nWe would love to discuss a full-time / contract AI/ML role with our team at [Company]. We were impressed by your work on agentic workflows and FastAPI backends.\n\nBest regards,"
  },
  {
    label: "Collaboration",
    subject: "Project Collaboration",
    template: "Hi Anirudh,\n\nI saw your open-source projects and would love to collaborate with you on [Project/Topic].\n\nBest regards,"
  },
  {
    label: "Freelance",
    subject: "Freelance / Consulting Project",
    template: "Hi Anirudh,\n\nI have an AI/ML consulting requirement involving [Brief Scope] and would like to check your availability.\n\nBest regards,"
  },
  {
    label: "General Inquiry",
    subject: "General Inquiry",
    template: "Hi Anirudh,\n\nReaching out to connect regarding..."
  }
];

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(portfolioData.personal.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleSelectPreset = (preset: typeof PRESET_SUBJECTS[number]) => {
    setFormData(prev => ({
      ...prev,
      subject: preset.subject,
      message: preset.template
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Please fill in all required fields.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await submitContactForm({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || "Portfolio Contact Inquiry",
        message: formData.message,
      });
      if (res.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(res.error || "Failed to send message. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error occurred. Please copy email directly.");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white border-[3px] border-[#0D0D0D] shadow-[8px_8px_0px_0px_#0D0D0D] w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden relative"
        >
          {/* Header */}
          <div className="bg-[#6D4AFF] text-white border-b-[2.5px] border-[#0D0D0D] p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <span className="font-display text-base sm:text-lg font-black uppercase tracking-tight">
                GET IN TOUCH // SEND A MESSAGE
              </span>
            </div>
            <motion.button
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-8 h-8 bg-white text-black border-[2px] border-[#0D0D0D] shadow-[2px_2px_0px_0px_#0D0D0D] flex items-center justify-center cursor-pointer hover:bg-red-400 transition-colors"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </motion.button>
          </div>

          {/* Quick Direct Info Strip */}
          <div className="p-3 sm:p-4 bg-[#B5E635] border-b-[2px] border-[#0D0D0D] flex flex-wrap items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-black">
              <MapPin className="w-3.5 h-3.5" />
              <span>Kozhikode, India · Open for Relocation &amp; Remote</span>
            </div>
            <button
              onClick={handleCopyEmail}
              className="bg-white hover:bg-zinc-100 text-black border-[1.8px] border-black px-2.5 py-1 font-mono text-xs font-bold shadow-[2px_2px_0px_0px_#0D0D0D] active:shadow-none flex items-center gap-1.5 cursor-pointer"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEmail ? "COPIED TO CLIPBOARD!" : portfolioData.personal.email}</span>
            </button>
          </div>

          {/* Form Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 graph-paper">
            {status === "success" ? (
              <div className="bg-[#B5E635] border-[2.5px] border-[#0D0D0D] p-8 text-center shadow-[4px_4px_0px_0px_#0D0D0D] space-y-4 my-6">
                <div className="w-12 h-12 bg-white border-2 border-black mx-auto flex items-center justify-center shadow-[2px_2px_0px_0px_#0D0D0D]">
                  <Check className="w-7 h-7 text-emerald-600 stroke-[3]" />
                </div>
                <h3 className="font-display text-2xl font-black uppercase text-[#0D0D0D]">
                  MESSAGE DISPATCHED SUCCESSFULLY!
                </h3>
                <p className="font-mono text-xs text-zinc-800 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out! Your inquiry has been received and Anirudh will reply directly to your email shortly.
                </p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setFormData({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="bg-white hover:bg-zinc-100 text-black border-2 border-black font-mono text-xs font-bold uppercase px-4 py-2 shadow-[2px_2px_0px_0px_#0D0D0D] cursor-pointer"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Subject Presets */}
                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] font-bold text-zinc-700 uppercase tracking-wider block">
                    QUICK PRESETS:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_SUBJECTS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectPreset(preset)}
                        className="bg-zinc-100 hover:bg-[#FF7A9E] hover:text-black border-[1.8px] border-[#0D0D0D] px-2.5 py-1 font-mono text-[10px] font-bold uppercase shadow-[1.5px_1.5px_0px_0px_#0D0D0D] active:shadow-none cursor-pointer transition-colors"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="font-mono text-xs font-bold text-zinc-800 uppercase block">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full bg-white border-[2px] border-[#0D0D0D] p-2.5 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#6D4AFF] shadow-[2px_2px_0px_0px_#0D0D0D]"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="font-mono text-xs font-bold text-zinc-800 uppercase block">
                      YOUR EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full bg-white border-[2px] border-[#0D0D0D] p-2.5 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#6D4AFF] shadow-[2px_2px_0px_0px_#0D0D0D]"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label className="font-mono text-xs font-bold text-zinc-800 uppercase block">
                    SUBJECT
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Full-Time AI/ML Opportunity / Collaboration"
                    className="w-full bg-white border-[2px] border-[#0D0D0D] p-2.5 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#6D4AFF] shadow-[2px_2px_0px_0px_#0D0D0D]"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="font-mono text-xs font-bold text-zinc-800 uppercase block">
                    MESSAGE *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, timeline, or engineering opportunity..."
                    className="w-full bg-white border-[2px] border-[#0D0D0D] p-2.5 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#6D4AFF] shadow-[2px_2px_0px_0px_#0D0D0D]"
                  />
                </div>

                {/* Error Banner */}
                {status === "error" && (
                  <div className="bg-red-100 border-[2px] border-red-600 text-red-700 p-3 font-mono text-xs">
                    {errorMessage}
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-2 flex justify-end">
                  <motion.button
                    whileHover={{ x: -1, y: -1 }}
                    whileTap={{ x: 2, y: 2 }}
                    type="submit"
                    disabled={status === "submitting"}
                    className="bg-[#6D4AFF] hover:bg-violet-700 text-white font-mono font-bold text-xs uppercase tracking-wider px-6 py-3 border-[2.2px] border-[#0D0D0D] shadow-[4px_4px_0px_0px_#0D0D0D] active:shadow-[1px_1px_0px_0px_#0D0D0D] inline-flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                  >
                    <span>{status === "submitting" ? "SENDING..." : "SEND MESSAGE"}</span>
                    <Send className="w-4 h-4 stroke-[2.5]" />
                  </motion.button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactModal;
