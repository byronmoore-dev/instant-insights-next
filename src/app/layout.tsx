import { QueryProvider } from "@/components/providers/queryProvider";
import "@/css/globals.css";
import Sidebar from "@/components/sidebar";
import { Noto_Sans, Open_Sans } from "next/font/google";

const header = Noto_Sans({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-header",
});

const body = Open_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "InstaViz",
  description: "Instant visualizations, wow.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${header.variable} scroll-smooth`}>
      <body>
        <QueryProvider>
          <main className="min-h-screen bg-background w-full flex flex-row items-center">
            <Sidebar />
            <div className="w-full h-full">{children}</div>
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}
