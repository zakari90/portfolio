"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Mail, MessageSquare, Pin, Send, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Lottie from "lottie-react";
import contactAnimation from "../../public/contact-me.json";
import emailjs from "@emailjs/browser";

type ContactForm = z.infer<typeof contactSchema>;

// Define base schema for type inference, but actual schema will be created in component
const contactSchema = z.object({
  name: z.string(),
  email: z.string(),
  message: z.string(),
});

export default function Contact() {
  const t = useTranslations("Contact");

  // Create schema with translated error messages
  const formSchema = z.object({
    name: z.string().min(2, { message: t("err_name_min") }),
    email: z.string().email({ message: t("err_email_invalid") }),
    message: z.string().min(10, { message: t("err_message_min") }),
  });

  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);
    setApiError("");

    try {
      formSchema.parse(formData);

      // Send via EmailJS
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
      );

      // Clear form inputs
      setFormData({ name: "", email: "", message: "" });
      setIsSuccess(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<ContactForm> = {};
        error.issues.forEach((issue: z.ZodIssue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0] as keyof ContactForm] = issue.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        console.error("Error sending email:", error);
        setApiError(t("err_api_failed"));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="relative">
      <div className="bg-slate-50 border border-slate-200 p-6 md:p-10 rounded-[32px] shadow-sm overflow-hidden">
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="text-green-600" size={32} />
            </div>
            <h3 className="text-2xl font-extrabold text-[#000080] mb-2">
              {t("success_title")}
            </h3>
            <p className="text-slate-500">{t("success_msg")}</p>
            <button
              onClick={() => setIsSuccess(false)}
              className="mt-8 px-8 py-3 bg-[#000080] hover:bg-[#3b3bb1] text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/10"
            >
              {t("send_another")}
            </button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-slate-500 text-lg leading-relaxed text-start max-w-md">
                  {t("description")}
                </p>
              </div>

              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#3b3bb1]">
                    <Mail size={20} />
                  </div>
                  <div className="text-start">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {t("email")}
                    </p>
                    <p className="text-sm font-bold text-[#000080]">
                      contact@zakaria.com
                    </p>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-[#3b3bb1]">
                    <User size={20} />
                  </div>
                  <div className="text-start">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <Pin />
                    </p>
                    <p className="text-sm font-bold text-[#000080]">
                      Sale, Morocco
                    </p>
                  </div>
                </div>
              </div>

              {/* Lottie Animation */}
              <div className="hidden lg:block w-full max-w-[320px] mx-auto opacity-80">
                <Lottie animationData={contactAnimation} loop={true} />
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-[24px] border border-slate-100 shadow-xl shadow-blue-900/5">
              <form onSubmit={handleSubmit} className="space-y-6">
                {apiError && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                    {apiError}
                  </div>
                )}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-xs font-bold text-[#000080] uppercase tracking-widest ml-1 block text-start"
                    >
                      {t("name")}
                    </label>
                    <div className="relative group">
                      <User
                        className="absolute left-4 rtl:left-auto rtl:right-4 top-3.5 text-slate-400 group-focus-within:text-[#3b3bb1] transition-colors"
                        size={20}
                      />
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                        }}
                        className={`w-full bg-slate-50 border rounded-xl py-3 pl-12 pr-4 rtl:pr-12 rtl:pl-4 font-medium focus:outline-none transition-all text-start ${
                          errors.name
                            ? "border-red-500 text-red-500 focus:border-red-500"
                            : "border-slate-100 text-[#000080] focus:border-[#3b3bb1] focus:bg-white focus:shadow-sm"
                        }`}
                        placeholder={t("name_placeholder")}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1 ml-1 font-medium text-start">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-xs font-bold text-[#000080] uppercase tracking-widest ml-1 block text-start"
                    >
                      {t("email")}
                    </label>
                    <div className="relative group">
                      <Mail
                        className="absolute left-4 rtl:left-auto rtl:right-4 top-3.5 text-slate-400 group-focus-within:text-[#3b3bb1] transition-colors"
                        size={20}
                      />
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                        }}
                        className={`w-full bg-slate-50 border rounded-xl py-3 pl-12 pr-4 rtl:pr-12 rtl:pl-4 font-medium focus:outline-none transition-all text-start ${
                          errors.email
                            ? "border-red-500 text-red-500 focus:border-red-500"
                            : "border-slate-100 text-[#000080] focus:border-[#3b3bb1] focus:bg-white focus:shadow-sm"
                        }`}
                        placeholder={t("email_placeholder")}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1 ml-1 font-medium text-start">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-xs font-bold text-[#000080] uppercase tracking-widest ml-1 block text-start"
                    >
                      {t("message")}
                    </label>
                    <div className="relative group">
                      <MessageSquare
                        className="absolute left-4 rtl:left-auto rtl:right-4 top-4 text-slate-400 group-focus-within:text-[#3b3bb1] transition-colors"
                        size={20}
                      />
                      <textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                        }}
                        className={`w-full bg-slate-50 border rounded-xl py-3 pl-12 pr-4 rtl:pr-12 rtl:pl-4 font-medium focus:outline-none transition-all resize-none text-start ${
                          errors.message
                            ? "border-red-500 text-red-500 focus:border-red-500"
                            : "border-slate-100 text-[#000080] focus:border-[#3b3bb1] focus:bg-white focus:shadow-sm"
                        }`}
                        placeholder={t("message_placeholder")}
                      />
                    </div>
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1 ml-1 font-medium text-start">
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#000080] hover:bg-[#3b3bb1] text-white font-bold py-4 rounded-xl shadow-xl shadow-blue-900/10 transition-all transform hover:scale-[1.01] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      {t("send")} <Send size={18} className="rtl:rotate-180" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
