import React, { type ReactNode, Suspense } from "react";
import { Inter } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import classNames from "classnames";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Analytics } from "@/components/analytics";
import { Announcement } from "@/components/announcement";
import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "@/components/navbar";
import { NotificationPrompt } from "@/components/notification-prompt";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { ANNOUNCEMENT, SITE_TITLE, SITE_URL } from "@/config";
import "./globals.css";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

const title = SITE_TITLE;
const description: string = `Statistics for car trends in Singapore. Data provided by Land Transport Authority (LTA)`;
const url = new URL(SITE_URL);

export const metadata: Metadata = {
  metadataBase: url,
  title: {
    template: `%s - ${title}`,
    default: title,
  },
  description,
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    images: `${SITE_URL}/opengraph-image.png`,
    url,
    siteName: title,
    locale: "en_SG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: `${SITE_URL}/twitter-image.png`,
    site: "@sgcarstrends",
    creator: "@sgcarstrends",
  },
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <body className={classNames(inter.className)}>
        <NotificationPrompt />
        {ANNOUNCEMENT && <Announcement>{ANNOUNCEMENT}</Announcement>}
        <NuqsAdapter>
          <SidebarProvider>
            {/*TODO: To wrap Suspense directly on the affected parts*/}
            <Suspense fallback={null}>
              <AppSidebar />
            </Suspense>
            <SidebarInset>
              <Navbar>
                <SidebarTrigger />
              </Navbar>
              <main className="bg-sidebar flex flex-1 flex-col gap-4 p-4">
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
        </NuqsAdapter>
        <Toaster theme="light" position="top-right" closeButton richColors />
        {/*<Footer />*/}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
      <Script
        defer
        src="https://analytics.sgcarstrends.com/script.js"
        data-website-id="b98dda44-ccc9-4a73-87d4-dcbe561aedb8"
        data-domains="sgcarstrends.com"
      />
      <GoogleAnalytics gaId={gaMeasurementId} />
    </html>
  );
};

export default RootLayout;
