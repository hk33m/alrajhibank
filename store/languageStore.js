
import { create } from "zustand";
import { persist } from "zustand/middleware";

const getDeviceLanguage = () => {
  if (typeof navigator === "undefined") return "ar";

  return navigator.language.toLowerCase().startsWith("ar")
    ? "ar"
    : "en";
};

export const useLanguageStore = create(
  persist(
    (set) => ({
      language: "ar",

      setLanguage: (lang) => set({ language: lang }),

      toggleLanguage: () =>
        set((state) => ({
          language: state.language === "ar" ? "en" : "ar",
        })),
    }),
    {
      name: "language-storage",
    }
  )
);
