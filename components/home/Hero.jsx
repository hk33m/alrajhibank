
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Wallet,
  HandCoins,
  ArrowLeft,
} from "lucide-react";

const services = [
  {
    id: 1,
    title: "حلول الحسابات",
    subtitle: "اكتشف الخدمات المصرفية اليومية",
    image: "/images/hero-accounts.webp",
    icon: Wallet,
    color: "#F43F5E",
    action: "استكشف الحسابات",
  },
  {
    id: 2,
    title: "الخدمات والبطاقات",
    subtitle: "خيارات تناسب أسلوب حياتك",
    image: "/images/hero-cards.webp",
    icon: CreditCard,
    color: "#10B981",
    action: "استكشف البطاقات",
  },
  {
    id: 3,
    title: "حلول التمويل",
    subtitle: "خطط لتحقيق طموحاتك",
    image: "/images/hero-finance.webp",
    icon: HandCoins,
    color: "#0EA5E9",
    action: "اكتشف حلول التمويل",
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(1);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prev) => (prev - 1 + services.length) % services.length
    );
  };

  const visibleCards = [
    services[(activeIndex + 2) % 3],
    services[activeIndex],
    services[(activeIndex + 1) % 3],
  ];

  return (
    <section
      dir="rtl"
      className="relative isolate min-h-[700px] overflow-hidden bg-white pt-12 pb-10 md:pt-14"
    >
      {/* Background Shape */}
      <div
        className="pointer-events-none absolute left-0 top-0 -z-10 h-full w-[65%] bg-[#F5F9FF]"
        style={{
          clipPath: "ellipse(75% 70% at 0% 0%)",
        }}
      />

      {/* Hero Heading */}
      <div className="relative z-10 mx-auto max-w-[1340px] px-5 text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-[30px] font-bold leading-[1.5] text-[#080B50] sm:text-[36px] lg:text-[42px]">
            تجربة مصرفية صُممت لتناسبك
          </h1>

          <p className="mt-3 text-[15px] font-medium text-[#535C8B] sm:text-[17px]">
            حلول وخدمات تساعدك على تحقيق أهدافك وتطلعاتك
          </p>
        </motion.div>

      </div>

      {/* Cards Area */}
      <div className="relative mx-auto mt-16 max-w-[1340px] px-5 md:mt-28">

        {/* Desktop Arrows */}
        <button
          onClick={nextSlide}
          aria-label="البطاقة التالية"
          className="absolute left-5 top-1/2 z-30 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-[#08A9F0] text-white shadow-md transition hover:scale-110 hover:bg-blue-500 lg:flex"
        >
          <ChevronLeft size={28} />
        </button>

        <button
          onClick={prevSlide}
          aria-label="البطاقة السابقة"
          className="absolute right-5 top-1/2 z-30 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-[#08A9F0] text-white shadow-md transition hover:scale-110 hover:bg-blue-500 lg:flex"
        >
          <ChevronRight size={28} />
        </button>

        {/* Cards */}
        <div className="flex min-h-[420px] items-center justify-center gap-4 md:gap-6">

          <AnimatePresence mode="popLayout">
            {visibleCards.map((card, index) => {
              const isCenter = index === 1;
              const Icon = card.icon;

              return (
                <motion.article
                  key={card.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: 1,
                    scale: isCenter ? 1 : 0.94,
                    y: isCenter ? -14 : 7,
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.45,
                    ease: "easeInOut",
                  }}
                  className={`relative h-[390px] w-full max-w-[320px] shrink-0 overflow-hidden rounded-[17px] bg-[#E8EDF9] shadow-sm ${
                    isCenter
                      ? "z-20 md:h-[420px]"
                      : "z-10 hidden md:block"
                  }`}
                >

                  {/* Image */}
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    priority={isCenter}
                    sizes="(max-width: 768px) 90vw, 320px"
                    className="object-cover object-center"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#E8EDF9]/95 via-[#E8EDF9]/25 to-transparent" />

                  {/* Card Text */}
                  <div className="relative z-10 px-4 pt-7 text-center">
                    <h2 className="text-[21px] font-bold text-[#080B50]">
                      {card.title}
                    </h2>

                    <p className="mt-1 text-[14px] text-[#535C8B]">
                      {card.subtitle}
                    </p>
                  </div>

                  {/* Bottom Action */}
                  <div className="absolute bottom-3 left-3 right-3 z-20 flex h-[75px] items-center justify-between rounded-[22px] bg-white px-4 shadow-sm">

                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white"
                        style={{ backgroundColor: card.color }}
                      >
                        <Icon size={23} />
                      </div>

                      <div>
                        <h3 className="text-[16px] font-bold text-[#080B50]">
                          {card.action}
                        </h3>

                        <p className="mt-0.5 text-[11px] text-[#68708E]">
                          تعرف على التفاصيل
                        </p>
                      </div>
                    </div>

                    <button
                      aria-label={`استكشف ${card.title}`}
                      className="text-[#68708E] transition hover:-translate-x-1 hover:text-blue-600"
                    >
                      <ArrowLeft size={21} />
                    </button>
                  </div>

                </motion.article>
              );
            })}
          </AnimatePresence>

        </div>

        {/* Mobile Controls */}
        <div className="mt-5 flex items-center justify-center gap-5 lg:hidden">
          <button
            onClick={prevSlide}
            aria-label="السابق"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#08A9F0] text-white"
          >
            <ChevronRight size={23} />
          </button>

          <div className="flex gap-2">
            {services.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(index)}
                aria-label={`عرض البطاقة ${index + 1}`}
                className={`h-2 rounded-full transition-all ${
                  index === activeIndex
                    ? "w-7 bg-[#153BFF]"
                    : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            aria-label="التالي"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#08A9F0] text-white"
          >
            <ChevronLeft size={23} />
          </button>
        </div>

      </div>
    </section>
  );
}
