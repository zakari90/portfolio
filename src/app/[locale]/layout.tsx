import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css"; // Fixed import path
import { NextIntlClientProvider } from "next-intl";
import Sidebar from "@/components/Sidebar";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zakaria | Full Stack Developer",
  description: "High-performance portfolio website of a Full Stack Developer.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const isRtl = locale === "ar";

  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"} className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var script = document.createElement('script');
                script.src = '/nf-analytics.js';
                script.async = true;
                document.head.appendChild(script);
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-slate-50 text-[#000080] selection:bg-blue-100 font-sans`}
      >
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 transition-all duration-300 ltr:pl-15 ltr:md:pl-40  rtl:pr-15 rtl:md:pr-40 overflow-x-hidden">
              <div className="container mx-auto max-w-7xl">{children}</div>
            </main>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
