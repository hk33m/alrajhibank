"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguageStore } from "@/store/languageStore";

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState("");
  const { language } = useLanguageStore();

  const isAr = language !== "en";

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // يمكنك توجيه المستخدم لصفحة البحث أو تنفيذ منطق البحث هنا
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      {/* الهيدر */}
      <Header />

      {/* ================= محتوى صفحة 404 ================= */}
      <main
        dir={isAr ? "rtl" : "ltr"}
        className="flex flex-1 flex-col items-center justify-center px-4 py-20 md:py-28 text-center"
      >
        <div className="w-full max-w-md mx-auto flex flex-col items-center">
          
          {/* رقم الخطأ الكبير 404 */}
          <h1 className="text-[76px] sm:text-[92px] md:text-[104px] font-extrabold text-[#000B49] leading-none tracking-tight mb-4">
            404
          </h1>

          {/* النص التوضيحي */}
          <p className="text-[16px] sm:text-[18px] font-medium text-[#000B49] mb-8">
            {isAr
              ? "الصفحة التي تبحث عنها غير موجودة."
              : "The page you are looking for does not exist."}
          </p>

          {/* حقل البحث الدائري (Pill Search Input) */}
          <form onSubmit={handleSearch} className="w-full max-w-[330px] mb-10">
            <div className="relative flex items-center">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? "أدخل كلمة البحث هنا" : "Enter search keyword here"}
                className={`h-12 w-full rounded-full border border-[#E2E8F0] bg-white text-[14px] text-[#001A49] placeholder:text-[#9CA8C2] focus-visible:border-[#002BFF] focus-visible:ring-2 focus-visible:ring-[#002BFF]/15 shadow-none transition-all ${
                  isAr ? "pr-5 pl-12 text-right" : "pl-5 pr-12 text-left"
                }`}
              />
              <button
                type="submit"
                aria-label={isAr ? "بحث" : "Search"}
                className={`absolute flex items-center justify-center text-[#001A49] hover:text-[#002BFF] transition-colors ${
                  isAr ? "left-4" : "right-4"
                }`}
              >
                <Search size={19} strokeWidth={2} />
              </button>
            </div>
          </form>

          {/* زر العودة إلى الصفحة الرئيسية */}
          <Button
            asChild
            className="h-12 md:h-[52px] px-8 md:px-9 rounded-[14px] bg-[#002BFF] hover:bg-[#0022CC] active:scale-[0.99] text-white font-bold text-[14px] sm:text-[15px] shadow-sm hover:shadow-md transition-all"
          >
            <Link href="/">
              {isAr ? "العودة إلى الصفحة الرئيسية" : "Back to Home Page"}
            </Link>
          </Button>

        </div>
      </main>

      {/* الفوتر */}
      <Footer />
    </div>
  );
}