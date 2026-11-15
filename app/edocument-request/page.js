"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { useLanguageStore } from "@/store/languageStore";
import { translations } from "@/utils/translations";

// ================= إعدادات البيانات الصحيحة ومسار الملف =================
const VALID_NATIONAL_ID = "1234"; // ضع رقم الهوية أو المنشأة الصحيح هنا
const VALID_SERIAL_NUMBER = "1234"; // ضع الرقم التسلسلي الصحيح هنا
const FILE_PATH = "/document_1793195064216.pdf"; // ضع اسم الملف الموجود داخل مجلد public هنا

export default function DocumentVerification() {
  const [nationalId, setNationalId] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [isValid, setIsValid] = useState(false); // حالة التحقق لإظهار أو إخفاء النص

  const { language, toggleLanguage } = useLanguageStore();
  const t = translations[language];

  // دالة مساعدة لتشغيل تنزيل الملف من مجلد public
  const triggerDownload = () => {
    const link = document.createElement("a");
    link.href = FILE_PATH;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // التحقق من صحة الرقمين (مع إزالة المسافات الزائدة إن وجدت)
    if (
      nationalId.trim() === VALID_NATIONAL_ID &&
      serialNumber.trim() === VALID_SERIAL_NUMBER
    ) {
      setIsValid(true);
      
    } else {
      setIsValid(false); // إخفاء النص وعدم فعل شيء إذا كانت البيانات خاطئة
    }
  };

  return (
    <div>
      <Header></Header>

      <div
        dir={language === "ar" ? "rtl" : "ltr"}
        className="w-full min-h-screen bg-[#F6F9FC] font-sans"
      >
        {/* ================= قسم البانر العلوي (Hero Section) ================= */}
        <section className="relative w-full bg-white overflow-hidden min-h-[280px] md:min-h-[380px] flex items-center">
          {/* الشكل الهندسي المائل في الخلفية */}
          <div
            className="absolute top-0 left-0 w-[85%] md:w-[58%] h-[85%] md:h-full bg-gradient-to-br from-[#F2F5FA] to-[#F8FAFC] rounded-br-[120px] md:rounded-br-[220px] pointer-events-none z-0 transform -skew-x-12 md:-skew-x-20 -translate-x-10"
            aria-hidden="true"
          />

          <div className="container mx-auto px-4 md:px-12 lg:px-20 relative z-10 w-full h-full">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* النصوص (العنوان والوصف الفرعي) */}
              <div className="w-full md:w-1/2 py-12 md:py-0">
                <h1 className="text-3xl sm:text-4xl md:text-[44px] font-extrabold text-[#001A49] leading-[1.35] tracking-tight mb-3 md:mb-4">
                  {t.t1}
                  <br className="hidden md:inline" />
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-[#5A6B8C] font-medium">
                  {t.t1}
                </p>
              </div>

              {/* صورة الشخصية (تظهر في الشاشات المتوسطة والكبيرة فقط) */}
              <div className="hidden md:flex md:w-1/2 justify-end items-end self-end">
                <div className="relative w-[360px] lg:w-[420px] h-[320px] lg:h-[360px]">
                  <img src="/man.png" alt="banner" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= قسم بطاقة النموذج (Form Section) ================= */}
        <section className="w-full py-10 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Card className="bg-white border-none rounded-[20px] md:rounded-[24px] shadow-[0_12px_40px_rgba(0,26,73,0.05)]">
              <CardContent className="p-6 sm:p-10 md:p-14">
                <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
                  {/* شبكة الحقول: عمود واحد في الجوال، عمودين في الشاشات الكبيرة */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {/* الحقل الأول: رقم الهوية / الإقامة / المنشأة */}
                    <div className="flex flex-col space-y-3 text-right">
                      <Label
                        htmlFor="national-id"
                        className="text-[#001A49] text-sm sm:text-base pr-1"
                      >
                        {t.input1}
                      </Label>
                      <Input
                        id="national-id"
                        type="text"
                        value={nationalId}
                        onChange={(e) => {
                          setNationalId(e.target.value);
                          if (isValid) setIsValid(false); // إخفاء النص عند تعديل الرقم
                        }}
                        placeholder={t.p1}
                        className="h-14 md:h-16 rounded-2xl bg-[#F3F6FC] border-transparent focus-visible:border-[#002BFF] focus-visible:ring-2 focus-visible:ring-[#002BFF]/20 focus-visible:bg-white text-[#001A49] placeholder:text-[#9CA8C2] placeholder:text-xs sm:placeholder:text-sm px-5 transition-all shadow-none"
                      />
                    </div>

                    {/* الحقل الثاني: الرقم التسلسلي */}
                    <div className="flex flex-col space-y-3 text-right">
                      <Label
                        htmlFor="serial-number"
                        className="text-[#001A49] text-sm sm:text-base pr-1"
                      >
                        {t.input2}
                      </Label>
                      <Input
                        id="serial-number"
                        type="text"
                        value={serialNumber}
                        onChange={(e) => {
                          setSerialNumber(e.target.value);
                          if (isValid) setIsValid(false); // إخفاء النص عند تعديل الرقم
                        }}
                        placeholder={t.p2}
                        className="h-14 md:h-16 rounded-2xl bg-[#F3F6FC] border-transparent focus-visible:border-[#002BFF] focus-visible:ring-2 focus-visible:ring-[#002BFF]/20 focus-visible:bg-white text-[#001A49] placeholder:text-[#9CA8C2] placeholder:text-xs sm:placeholder:text-sm px-5 transition-all shadow-none"
                      />
                    </div>
                  </div>

                  {/* زر الإرسال + نص التحميل أسفل الزر */}
                  <div className="flex flex-col items-center justify-center pt-2 space-y-4">
                    <Button
                      type="submit"
                      className="h-12 md:h-14 px-8 md:px-10 rounded-xl bg-[#002BFF] hover:bg-[#0022CC] active:scale-[0.99] text-white font-bold text-sm sm:text-base transition-all shadow-md hover:shadow-lg shadow-[#002BFF]/20"
                    >
                     {t.button}
                    </Button>

                    {/* يظهر النص باللون الأسود فقط إذا كانت البيانات صحيحة */}
                    {isValid && (
                      <a
                        href={FILE_PATH}
                        download
                        className="text-black font-bold text-sm sm:text-base hover:underline cursor-pointer transition-opacity"
                      >
                         {t.Download}
                      </a>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
}