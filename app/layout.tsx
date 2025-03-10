import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

import { headers } from "next/headers";
import ContextProvider from "@/context";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersData = await headers();
  const cookies = headersData.get("cookie");

  return (
    <html lang="en" className="light">
      <body className="antialiased">
        <div className="flex min-h-screen">
          <SidebarProvider className="w-64">
            <AppSidebar />
            <SidebarTrigger />
          </SidebarProvider>

          <main className="flex-1 flex flex-col overflow-auto bg-gray-100">
            <ContextProvider cookies={cookies}>{children}</ContextProvider>
          </main>
          <Toaster />
        </div>

        {/* Toaster 컴포넌트를 추가하여 Toast 메시지를 전역적으로 사용할 수 있도록 설정 */}
        <Toaster />
      </body>
    </html>
  );
}
