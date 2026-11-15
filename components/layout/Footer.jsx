
"use client";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  ZoomIn,
  ZoomOut,
  Minus,
  Plus,
  ChevronDown,
} from "lucide-react";
import {
  BsTiktok,
  BsSnapchat,
  BsLinkedin,
  BsInstagram,
  BsFacebook,
  BsTwitterX,
} from "react-icons/bs";

import { useLanguageStore } from "@/store/languageStore";
import { translations } from "@/utils/translations";

export default function Footer() {
  const { language, toggleLanguage } = useLanguageStore();
  const t = translations[language];
  const f = t.footer;

  const isArabic = language === "ar";

  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (index) => {
    setOpenMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const socialLinks = [
    { Icon: BsTwitterX, name: "Twitter", href: "https://x.com/alrajhibank" },
    { Icon: BsFacebook, name: "Facebook", href: "https://www.facebook.com/alrajhibank" },
    { Icon: BsInstagram, name: "Instagram", href: "https://www.instagram.com/alrajhibank/#" },
    { Icon: BsLinkedin, name: "LinkedIn", href: "https://www.linkedin.com/company/alrajhibank/" },
    { Icon: BsSnapchat, name: "Snapchat", href: "https://t.snapchat.com/pm9epXMZ" },
    { Icon: BsTiktok, name: "TikTok", href: "https://www.tiktok.com/@alrajhibank?lang" },
  ];

  const accessibilityTools = [
    { Icon: EyeOff, label: "Hide images" },
    { Icon: Eye, label: "Visibility" },
    { Icon: ZoomIn, label: "Zoom in" },
    { Icon: ZoomOut, label: "Zoom out" },
    { Icon: Minus, label: "Decrease font" },
    { Icon: Plus, label: "Increase font" },
  ];

  return (
    <footer
      dir={isArabic ? "rtl" : "ltr"}
      className="w-full bg-[#F5F8FF] text-[#080B50]"
    >
      <div className="mx-auto max-w-[1340px] px-5 sm:px-8">

        {/* DESKTOP NAVIGATION */}
        <div className="hidden pt-10 md:block">
          <div className="flex items-start justify-between gap-8">

            <div className="grid flex-1 grid-cols-4 gap-8">
              {f.groups.map((group, index) => (
                <div key={index}>
                  <h3 className="mb-6 text-[17px] font-semibold">
                    {group.title}
                  </h3>

                  <ul className="space-y-4">
                    {group.links.map((link, i) => (
                      <li key={i}>
                        <a
                          href="#"
                          className="text-[14px] text-[#777D98] transition-colors hover:text-[#153BFF]"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <button
              onClick={toggleLanguage}
              className="flex shrink-0 items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm"
            >
              <span>{isArabic ? "🇸🇦" : "🇬🇧"}</span>
              <span>{isArabic ? "العربية" : "English"}</span>
              <ChevronDown size={15} />
            </button>

          </div>
        </div>

        {/* MOBILE HEADER */}
        <div className="flex items-center justify-between py-12 md:hidden">
          <img
            src="/Al_Rajhi_Bank_Logo.svg.webp"
            alt="Al Rajhi Bank"
            className="w-[145px] object-contain"
          />

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm"
          >
            <span>{isArabic ? "🇸🇦" : "🇬🇧"}</span>
            <span>{isArabic ? "العربية" : "English"}</span>
            <ChevronDown size={15} />
          </button>
        </div>

        {/* MOBILE ACCORDION */}
        <div className="md:hidden">
          {f.groups.map((group, index) => (
            <div key={index}>
              <button
                onClick={() => toggleMenu(index)}
                aria-expanded={!!openMenus[index]}
                className="flex w-full items-center justify-between py-6 text-[15px] font-semibold"
              >
                <span>{group.title}</span>

                <ChevronDown
                  size={17}
                  className={`transition-transform duration-300 ${
                    openMenus[index] ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  openMenus[index]
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <ul className="space-y-5 pb-6">
                    {group.links.map((link, i) => (
                      <li key={i}>
                        <a
                          href="#"
                          className="block text-sm text-[#777D98] hover:text-[#153BFF]"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SOCIAL MEDIA */}
        <div className="flex items-center justify-center gap-7 py-10 md:justify-between md:pt-14">
          <img
            src="/Al_Rajhi_Bank_Logo.svg.webp"
            alt="Al Rajhi Bank"
            className="hidden w-[155px] object-contain md:block"
          />

          <div className="flex items-center gap-7">
            {socialLinks.map(({ Icon, name ,href}) => (
              <a
                key={name}
                href={href}
                aria-label={name}
                className="text-[#858BA4] transition-colors hover:text-[#153BFF]"
              >
                <Icon size={18}  />
              </a>
            ))}
          </div>

          
        </div>

        {/* ACCESSIBILITY TOOLS */}
        <div className="flex flex-wrap items-center justify-center gap-5 py-3">
          {accessibilityTools.map(({ Icon, label }) => (
            <button
              key={label}
              aria-label={label}
              title={label}
              className="text-[#080B50] hover:text-[#153BFF]"
            >
              <Icon size={18} strokeWidth={2.3} />
            </button>
          ))}

          <button aria-label="Accessibility settings" className="font-bold text-lg">
            A
          </button>
        </div>

        {/* QUICK LINKS */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 py-8 text-center text-[12px] leading-6 text-[#777D98] md:py-9 md:text-[13px]">
          {f.quickLinks.map((link, index) => (
            <span key={index} className="flex items-center gap-3">
              <a href="#" className="hover:text-[#153BFF]">
                {link}
              </a>

              {index !== f.quickLinks.length - 1 && (
                <span className="text-[#080B50]">|</span>
              )}
            </span>
          ))}
        </div>

        {/* CONTACT CARD */}
        <div className="mb-8 rounded-[30px] bg-white px-6 py-10 shadow-[0_0_18px_rgba(24,45,95,0.07)] md:px-5 md:py-10">

          <div className="grid grid-cols-1 gap-8 text-center justify-between md:grid-cols-[repeat(4,max-content)] lg:grid-cols-[repeat(5,max-content)] md:gap-5">
            {f.contacts.map((contact, index) => (
              <div key={index} className="space-y-2">
                <p className="text-sm leading-6 text-[#9295A9]">
                  {contact.label}
                </p>

                <a
                  href={`tel:${contact.value.replace(/-/g, "")}`}
                  dir="ltr"
                  className="inline-block text-[19px] font-bold tracking-tight text-[#080B50] hover:text-[#153BFF]"
                >
                  {contact.value}
                </a>
              </div>
            ))}

            <div className="space-y-2">
            <p className="text-base leading-6 text-[#9295A9]">
              {f.emailLabel}
            </p>

            <a
              href={`mailto:${f.email}`}
              dir="ltr"
              className="inline-block text-[18px] font-extrabold text-[#080B50] hover:text-[#153BFF]"
            >
              {f.email}
            </a>
          </div>
          </div>

          

        </div>

        {/* LEGAL INFORMATION */}
        <div className="pb-5 text-center">
          <p className="mx-auto max-w-[1250px] text-[11px] leading-[1.9] text-[#858BA4] md:text-[12px]">
            {f.legal}
          </p>
        </div>

        {/* POLICIES */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 py-5 text-[11px] text-[#777D98] md:text-[12px]">
          {f.policies.map((policy, index) => (
            <a
              href="#"
              key={index}
              className="hover:text-[#153BFF]"
            >
              {policy}
            </a>
          ))}
        </div>

        {/* COPYRIGHT */}
        <div className="pb-8 pt-3 text-center text-[12px] text-[#A0A3B3]">
          {f.copyright}
        </div>

      </div>
    </footer>
  );
}
