import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";



export const metadata = {
  title: " الأفراد | مصرف الراجحي",
  description: "نموذج واجهة مصرفية تجريبية",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>
        
          {children}
       
      </body>
    </html>
  );
}
