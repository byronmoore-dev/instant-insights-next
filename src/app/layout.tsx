import { QueryProvider } from "@/components/providers";
import "./globals.css";
import Sidebar from "@/components/sidebar";

export const metadata = {
  title: "InstaViz",
  description: "Instant visualizations, wow.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <main className="min-h-screen bg-background flex flex-row items-center">
            <Sidebar />
            <div className="w-full">{children}</div>
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}
