"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Eye,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  User,
} from "lucide-react";
import { useLanguageStore } from "@/store/languageStore";
import { translations } from "@/utils/translations";

// ================= أيقونات مخصصة مطابقة للتصميم =================

// علم بريطانيا الدائري
const UKFlagIcon = () => (
  <svg viewBox="0 0 60 60" className="h-[22px] w-[22px] rounded-full object-cover shadow-sm">
    <clipPath id="uk-clip">
      <circle cx="30" cy="30" r="30" />
    </clipPath>
    <g clipPath="url(#uk-clip)">
      <rect width="60" height="60" fill="#012169" />
      <path d="M0,0 L60,60 M60,0 L0,60" stroke="#fff" strokeWidth="10" />
      <path d="M0,0 L60,60 M60,0 L0,60" stroke="#C8102E" strokeWidth="6" />
      <path d="M30,0 v60 M0,30 h60" stroke="#fff" strokeWidth="16" />
      <path d="M30,0 v60 M0,30 h60" stroke="#C8102E" strokeWidth="10" />
    </g>
  </svg>
);

// علم السعودية الدائري
const SAFlagIcon = () => (
  <svg viewBox="0 0 60 60" className="h-[22px] w-[22px] rounded-full object-cover shadow-sm">
    <clipPath id="sa-clip">
      <circle cx="30" cy="30" r="30" />
    </clipPath>
    <g clipPath="url(#sa-clip)">
      <rect width="60" height="60" fill="#006C35" />
      <path
        d="M18,38 h24 a2,2 0 0,1 0,3 h-24 a2,2 0 0,1 0,-3 z"
        fill="#fff"
      />
      <text
        x="30"
        y="30"
        fill="#fff"
        fontSize="10"
        fontWeight="bold"
        textAnchor="middle"
      >
        لا إله إلا الله
      </text>
    </g>
  </svg>
);

// أيقونة القائمة في الجوال (3 خطوط متدرجة كما في الصورة)
const CustomMobileMenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#001A49]">
    <path d="M4 6H12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M4 12H20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M4 18H15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

// أيقونة التباين المخصصة (مربع مقسوم قطرياً كما في الشريط العلوي)
const CustomContrastIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#001A49]">
    <rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M1 15L15 1V15H1Z" fill="currentColor" />
  </svg>
);

// ================= بيانات القوائم المنسدلة الاحتياطية =================

const megaMenuData = {
  // 0: قطاع الأفراد
  0: {
    0: [ // الحسابات
      {
        title: "الحسابات الجارية",
        items: ["الحساب الجاري", "حساب المستقبل", "حساب العائلة", "حساب الطفل"],
      },
      {
        title: "حسابات الادخار والاستثمار",
        items: ["حساب حصاد", "حساب عوائد", "حساب الادخار الذكي"],
      },
      {
        title: "الخدمات المصرفية المميزة",
        items: ["التميز", "التميز الماسي", "المصرفية الخاصة (Private)"],
      },
    ],
    1: [ // البطاقات
      {
        title: "بطاقات الأميال",
        items: [
          "بطاقة طيران ناس سجنتشر الائتمانية",
          "بطاقة إنفينيت الفرسان الائتمانية",
          "بطاقة الفرسان بلاتينيوم الائتمانية",
        ],
      },
      {
        title: "البطاقات الائتمانية",
        items: [
          "بطاقة Marriott Bonvoy® الائتمانية",
          "بطاقة بلاتينيوم الائتمانية",
          "بطاقة إنفينيت الائتمانية",
          "بطاقة سيجنتشر الائتمانية",
          "بطاقة سيليكتيف الائتمانية",
        ],
      },
      {
        title: "بطاقات الحسم الشهري",
        items: [
          'البطاقة البلاتينية "الحسم الشهري" الائتمانية',
          'بطاقة إنفينيت الائتمانية "الحسم الشهري"',
          'البطاقة الكلاسيكية الائتمانية "الحسم الشهر...',
        ],
      },
      {
        title: "بطاقات مسبقة الدفع",
        items: ["بطاقة لايت", "بطاقة سفر بلس", "بطاقة الألعاب والترفيه"],
      },
      {
        title: "بطاقات الاسترداد النقدي",
        items: ["بطاقة كاش باك بلس سيجنيتشر الائتمانية", "بطاقة كاش باك بلاتينيوم"],
      },
      {
        title: "خاتم مصرف الراجحي",
        items: ["خاتم مصرف الراجحي - الدفع أصبح في متنا..."],
      },
    ],
    2: [ // التمويل
      {
        title: "التمويل الشخصي",
        items: ["التمويل الشخصي الجديد", "إعادة التمويل الشخصي", "تمويل الأسهم المحلية", "تمويل وطني"],
      },
      {
        title: "التمويل العقاري",
        items: ["شراء وحدة سكنية جاهزة", "البناء الذاتي", "البيع على الخارطة", "رهن العقار"],
      },
      {
        title: "تمويل السيارات",
        items: ["التأجير التمويلي للسيارات", "المرابحة للسيارات", "تمويل السيارات المستعملة"],
      },
    ],
    3: [ // التأمين
      {
        title: "تأمين المركبات",
        items: ["التأمين الشامل للمركبات", "تأمين ضد الغير (الطرف الثالث)"],
      },
      {
        title: "تأمين السفر والحماية",
        items: ["تأمين السفر الدولي", "تأمين الحماية والادخار", "تأمين المسكن"],
      },
      {
        title: "التأمين الصحي",
        items: ["تأمين العمالة المنزلية", "تأمين الزيارة العائلية"],
      },
    ],
    4: [ // العروض
      {
        title: "عروض البطاقات",
        items: ["عروض المطاعم والمقاهي", "عروض السفر والفنادق", "عروض التسوق والأزياء"],
      },
      {
        title: "برامج المكافآت",
        items: ["برنامج نقاط مكافأة", "استبدال النقاط الفوري", "شركاء مكافأة"],
      },
      {
        title: "عروض التقسيط",
        items: ["تقسيط 0% هامش ربح", "عروض الإلكترونيات والأجهزة"],
      },
    ],
    5: [ // الفئات
      {
        title: "شرائح العملاء",
        items: ["الشباب والطلاب", "المتقاعدين", "السيدات", "المقيمين"],
      },
      {
        title: "الخدمات الرقمية",
        items: ["تطبيق مصرف الراجحي", "تحويل الراجحي", "خدمة أبشر المصرفية"],
      },
      {
        title: "أجهزة الخدمة الذاتية",
        items: ["أجهزة الصراف الآلي التفاعلي", "أجهزة طباعة البطاقات الفورية"],
      },
    ],
  },
  // 1: قطاع الأعمال
  1: {
    0: [
      {
        title: "حسابات الشركات",
        items: ["الحساب الجاري للأعمال", "حساب الودائع لأجل", "حساب الضمان العقاري"],
      },
      {
        title: "إدارة النقد والسيولة",
        items: ["إدارة التدفقات النقدية", "خدمة حماية الأجور والرواتب", "التحصيل المباشر"],
      },
      {
        title: "الخدمات الإلكترونية للأعمال",
        items: ["مباشر الشركات", "الربط المباشر (B2B)", "نقاط البيع (POS)"],
      },
    ],
    1: [
      {
        title: "بطاقات الأعمال الائتمانية",
        items: ["بطاقة الأعمال بلاتينيوم", "بطاقة الأعمال سيجنتشر", "بطاقة المشتريات للشركات"],
      },
      {
        title: "بطاقات الإيداع والرواتب",
        items: ["بطاقة إيداع الأعمال", "بطاقة الرواتب مسبقة الدفع"],
      },
    ],
    2: [
      {
        title: "تمويل المنشآت الصغيرة والمتوسطة",
        items: ["تمويل نقاط البيع", "تمويل رأس المال العامل", "برنامج كفالة", "تمويل الأسطول"],
      },
      {
        title: "تمويل الشركات الكبرى",
        items: ["التمويل التجاري والمشاريع", "الاعتمادات المستندية", "خطابات الضمان"],
      },
    ],
    3: [
      {
        title: "تأمين الأعمال",
        items: ["التأمين الطبي للمنشآت", "تأمين الممتلكات والحوادث", "تأمين أسطول المركبات"],
      },
    ],
    4: [
      {
        title: "عروض وحلول الأعمال",
        items: ["عروض نقاط البيع الترحيبية", "باقات رواد الأعمال", "خصومات الشركاء التجاريين"],
      },
    ],
    5: [
      {
        title: "قطاعات الأعمال",
        items: ["المنشآت متناهية الصغر", "المنشآت الصغيرة والمتوسطة", "الشركات الكبرى والمؤسسات"],
      },
    ],
  },
};

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeType, setActiveType] = useState(0); // 0: الأفراد | 1: الأعمال
  const [hoveredNav, setHoveredNav] = useState(null); // تتبع العنصر النشط في الـ Mega Menu
  const [expandedMobileNav, setExpandedMobileNav] = useState(null); // تتبع الأكورديون في الجوال

  const { language, toggleLanguage } = useLanguageStore();
  const t = translations?.[language] || {};

  // نصوص افتراضية مطابقة للصورة في حال عدم توفر الترجمة في الـ Store
  const navLinks = [
    t.n1 || "الحسابات",
    t.n2 || "البطاقات",
    t.n3 || "التمويل",
    t.n4 || "التأمين",
    t.n5 || "العروض",
    t.n6 || "الفئات",
  ];

  const disclosureText = t.n7 || "قواعد الافصاح عن أسعار المنتجات التمويلية";
  const mediaCenterText = t.center || "المركز الاعلامي";
  const helpText = t.help || "المساعدة والدعم";
  const personalText = t.personalbar || "الأفراد";
  const businessText = t.businessbar || "الأعمال";

  // مراقبة التمرير لإخفاء الشريط العلوي
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ التعديل الأول: ربط بيانات الترجمة من translations.js
  const activeMenuData = t.megaMenu || megaMenuData;

  const currentSections =
    hoveredNav !== null
      ? activeMenuData[activeType]?.[hoveredNav] || activeMenuData[0][1]
      : [];

  return (
    <header
      dir={language === "en" ? "ltr" : "rtl"}
      onMouseLeave={() => setHoveredNav(null)}
      className={`
        sticky top-0 z-50 w-full text-[#001A49]
        border-b border-white/40
        backdrop-blur-sm
        transition-all duration-300 ease-in-out
        ${scrolled ? "" : "bg-white shadow-sm"}
      `}
    >
      {/* ================= 1. TOP BAR (يختفي عند السكرول) ================= */}
      <div
        className={`w-full border-b border-[#001A49]/[0.07] transition-all duration-300 ease-in-out ${
          scrolled
            ? "max-h-0 opacity-0 overflow-hidden border-none"
            : "max-h-[44px] opacity-100"
        }`}
      >
        <div className="mx-auto flex h-[38px] md:h-[42px] max-w-[1360px] items-center justify-between px-4 md:px-8 text-[12px] md:text-[13px] font-medium text-[#001A49]">
          {/* الرابط الأيمن (يظهر في الديسكتوب والجوال كما في الصورة الثانية) */}
          <a
            href="#"
            className="truncate transition-colors hover:text-[#002BFF]"
          >
            {disclosureText}
          </a>

          {/* أدوات الوصول والروابط اليسرى (تظهر في الديسكتوب فقط) */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-[#002BFF]">
              {mediaCenterText}
            </a>
            <a href="#" className="transition-colors hover:text-[#002BFF]">
              {helpText}
            </a>

            {/* أيقونات إمكانية الوصول */}
            <div className="flex items-center gap-4 pr-2">
              <button
                aria-label="حجم الخط"
                className="font-extrabold text-[15px] tracking-tighter transition-colors hover:text-[#002BFF]"
              >
                AA
              </button>
              <button
                aria-label="إمكانية الوصول"
                className="transition-colors hover:text-[#002BFF]"
              >
                <Eye size={18} strokeWidth={2} />
              </button>
              <button
                aria-label="تكبير الشاشة"
                className="transition-colors hover:text-[#002BFF]"
              >
                <ZoomIn size={18} strokeWidth={2} />
              </button>
              <button
                aria-label="تباين الشاشة"
                className="transition-colors hover:text-[#002BFF]"
              >
                <CustomContrastIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 2. MAIN NAVBAR (يتثبت عند السكرول) ================= */}
      <div className="relative ">
        <div className="mx-auto flex h-[72px] md:h-[88px] max-w-[1360px] items-center justify-between px-4 md:px-8">
          
          {/* ---- عرض الجوال (مطابق تماماً للصورة الثانية) ---- */}
          <div className="flex w-full items-center justify-between lg:hidden">
            {/* يمين الجوال: زر القائمة المخصص */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="القائمة"
              className="p-1 text-[#001A49] transition-colors hover:text-[#002BFF]"
            >
              {mobileOpen ? <X size={24} /> : <CustomMobileMenuIcon />}
            </button>

            {/* منتصف الجوال: شعار مصرف الراجحي */}
            <a href="/" className="flex items-center">
              <img
                src="/Al_Rajhi_Bank_Logo.svg.webp"
                alt="مصرف الراجحي"
                className="h-9 sm:h-10 w-auto object-contain"
              />
            </a>

            {/* يسار الجوال: البحث + علم اللغة + أيقونة المستخدم */}
            <div className="flex items-center gap-3.5 sm:gap-4 text-[#5A6B8C]">
              <button
                aria-label="البحث"
                className="transition-colors hover:text-[#002BFF]"
              >
                <Search size={21} strokeWidth={1.8} />
              </button>

              <button
                onClick={toggleLanguage}
                aria-label="تغيير اللغة"
                className="flex items-center justify-center rounded-full transition-transform active:scale-95"
              >
                {/* في حال كانت الواجهة عربية يظهر علم بريطانيا للتحويل للإنجليزية، والعكس */}
                {language === "ar" ? <UKFlagIcon /> : <SAFlagIcon />}
              </button>

              <a
                href="#login"
                aria-label="تسجيل الدخول"
                className="transition-colors hover:text-[#002BFF]"
              >
                <User size={22} strokeWidth={1.8} />
              </a>
            </div>
          </div>

          {/* ---- عرض سطح المكتب (مطابق للصورة الأولى والثالثة) ---- */}
          <div className="hidden lg:flex w-full items-center justify-between">
            {/* القسم الأيمن: الشعار + سويتش (الأفراد / الأعمال) */}
            <div className="flex items-center gap-8">
              <a href="/" className="flex shrink-0 items-center">
                <img
                  src="/Al_Rajhi_Bank_Logo.svg.webp"
                  alt="مصرف الراجحي"
                  className="w-32 object-contain"
                />
              </a>

              {/* كبسولة الأفراد / الأعمال */}
              <div className="flex items-center rounded-full bg-[#ECEFF4] p-[4px]">
                {[personalText, businessText].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveType(index)}
                    className={`rounded-full px-6 py-2 text-[14px] font-bold transition-all duration-200 ${
                      activeType === index
                        ? "bg-white text-[#001A49] shadow-sm"
                        : "text-[#001A49]/80 hover:text-[#001A49]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* القسم الأوسط: روابط التنقل مع تفعيل الـ Hover */}
            <nav className="flex items-center gap-7 xl:gap-8 h-[88px]">
              {navLinks.map((item, idx) => {
                const isActive = hoveredNav === idx;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredNav(idx)}
                    className="relative flex h-full items-center"
                  >
                    <a
                      href="#"
                      className={`text-[15px] font-bold transition-colors duration-200 ${
                        isActive
                          ? "text-[#002BFF]"
                          : "text-[#001A49] hover:text-[#002BFF]"
                      }`}
                    >
                      {item}
                    </a>
                  </div>
                );
              })}
            </nav>

            {/* القسم الأيسر: بحث + نص اللغة + زر تسجيل الدخول */}
            <div className="flex items-center gap-5">
              <button
                aria-label="البحث"
                className="text-[#5A6B8C] transition-colors hover:text-[#002BFF]"
              >
                <Search size={21} strokeWidth={2} />
              </button>

              <button
                onClick={toggleLanguage}
                className="text-[14px] font-bold text-[#001A49] transition-colors hover:text-[#002BFF]"
              >
                {language === "ar" ? "English" : "العربية"}
              </button>

              <a
                href="#services"
                className="rounded-[12px] bg-[#002BFF] px-6 py-2.5 text-[14px] font-bold text-white transition-all hover:bg-[#0022CC] shadow-sm"
              >
                {language === "ar" ? "تسجيل الدخول" : "Login"}
              </a>
            </div>
          </div>

        </div>

        {/* ================= 3. MEGA MENU (القائمة المنسدلة عند مرور الماوس) ================= */}
        {hoveredNav !== null && (
          <div
            onMouseEnter={() => setHoveredNav(hoveredNav)}
            onMouseLeave={() => setHoveredNav(null)}
            className="hidden lg:block absolute left-0 right-0 top-full z-50 px-8 pt-1 pb-6"
          >
            <div className="mx-auto max-w-[1260px] rounded-[26px] bg-white p-10 shadow-[0_25px_60px_rgba(0,26,73,0.08)] border border-gray-100/80 relative">
              
              <div className="relative flex items-stretch">
                {/* شبكة الأقسام (3 أعمدة كما في الصورة الثالثة) */}
                <div className="flex-1 grid grid-cols-3 gap-x-12 gap-y-10 pl-8">
                  {currentSections.map((section, secIndex) => (
                    <div key={secIndex} className="flex flex-col space-y-4">
                      {/* عنوان القسم الفرعي */}
                      <a
                        href="#"
                        className="group flex items-center justify-between text-[16px] font-extrabold text-[#001A49] hover:text-[#002BFF] transition-colors"
                      >
                        <span>{section.title}</span>
                        {language === "en" ? (
                          <ChevronRight
                            size={16}
                            className="text-[#8E9BB0] group-hover:text-[#002BFF] transition-transform group-hover:translate-x-1"
                          />
                        ) : (
                          <ChevronLeft
                            size={16}
                            className="text-[#8E9BB0] group-hover:text-[#002BFF] transition-transform group-hover:-translate-x-1"
                          />
                        )}
                      </a>

                      {/* عناصر القسم */}
                      <ul className="space-y-3.5">
                        {section.items.map((subItem, itemIdx) => (
                          <li key={itemIdx}>
                            <a
                              href="#"
                              className="group flex items-center justify-between text-[14px] font-medium text-[#4A5978] hover:text-[#002BFF] transition-colors"
                            >
                              <span className="truncate max-w-[260px]">
                                {subItem}
                              </span>
                              {language === "en" ? (
                                <ChevronRight
                                  size={15}
                                  className="shrink-0 text-[#9CA8C2] group-hover:text-[#002BFF] transition-transform group-hover:translate-x-1"
                                />
                              ) : (
                                <ChevronLeft
                                  size={15}
                                  className="shrink-0 text-[#9CA8C2] group-hover:text-[#002BFF] transition-transform group-hover:-translate-x-1"
                                />
                              )}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* شريط التمرير الأزرق الديكوري في أقصى اليسار (مطابق للصورة الثالثة) */}
                <div className="flex flex-col items-center justify-between py-1 select-none">
                  <ChevronUp size={12} className="text-[#8E9BB0] mb-1" />
                  <div className="relative h-full w-[3px] bg-gray-100 rounded-full overflow-hidden min-h-[260px]">
                    <div className="w-full h-[65%] bg-[#002BFF] rounded-full" />
                  </div>
                  <ChevronDown size={12} className="text-[#8E9BB0] mt-1" />
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* ================= 4. قوائم الجوال المنسدلة (Mobile Accordion Menu) ================= */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[72px] max-h-[calc(100vh-72px)] overflow-y-auto border-t border-gray-100 bg-white p-5 shadow-2xl z-50">
          {/* سويتش الأفراد / الأعمال في الجوال */}
          <div className="mb-5 flex rounded-full bg-[#ECEFF4] p-1">
            {[personalText, businessText].map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveType(idx)}
                className={`flex-1 rounded-full py-2.5 text-sm font-bold transition-all ${
                  activeType === idx
                    ? "bg-white text-[#001A49] shadow-sm"
                    : "text-[#5A6B8C]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* روابط وأقسام الجوال القابلة للطي */}
          <nav className="flex flex-col divide-y divide-gray-100">
            {navLinks.map((item, idx) => {
              const isExpanded = expandedMobileNav === idx;
              // ✅ التعديل الثاني: استخدام activeMenuData في الجوال أيضاً
              const mobileSections = activeMenuData[activeType]?.[idx] || [];

              return (
                <div key={idx} className="py-2">
                  <button
                    onClick={() =>
                      setExpandedMobileNav(isExpanded ? null : idx)
                    }
                    className="flex w-full items-center justify-between py-3 text-[15px] font-bold text-[#001A49] hover:text-[#002BFF]"
                  >
                    <span>{item}</span>
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-200 ${
                        isExpanded ? "rotate-180 text-[#002BFF]" : "text-gray-400"
                      }`}
                    />
                  </button>

                  {/* عرض الأقسام الفرعية داخل الجوال عند الضغط */}
                  {isExpanded && (
                    <div className="mt-2 mb-3 space-y-4 rounded-2xl bg-[#F6F9FC] p-4">
                      {mobileSections.map((sec, sIdx) => (
                        <div key={sIdx} className="space-y-2">
                          <div className="text-[14px] font-extrabold text-[#001A49]">
                            {sec.title}
                          </div>
                          <ul className="space-y-2 pr-2 border-r-2 border-[#002BFF]/20">
                            {sec.items.map((sub, subIdx) => (
                              <li key={subIdx}>
                                <a
                                  href="#"
                                  onClick={() => setMobileOpen(false)}
                                  className="block text-[13px] font-medium text-[#5A6B8C] hover:text-[#002BFF]"
                                >
                                  {sub}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* زر تسجيل الدخول في أسفل قائمة الجوال */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <a
              href="#services"
              onClick={() => setMobileOpen(false)}
              className="flex w-full items-center justify-center rounded-xl bg-[#002BFF] py-3.5 text-sm font-bold text-white shadow-md"
            >
              {language === "ar" ? "تسجيل الدخول" : "Login"}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}