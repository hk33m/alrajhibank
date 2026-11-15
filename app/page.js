"use client";
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import { useLanguageStore } from "@/store/languageStore";

export default function Home() {
    const language = useLanguageStore((state) => state.language);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir =
      language === "ar" ? "rtl" : "ltr";
  }, [language]);

  return (
    <main className="min-h-screen bg-white" dir={language === "ar" ? "rtl" : "ltr"}>
      <Header />
      <Hero />
      <Footer />
    </main>
  );
}
