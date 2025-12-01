import type { Metadata } from "next";
import "../globals.css";

import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "byeAI - real or fake?",
  description:
    "A platform that treats authenticity as a feature of creation, not an afterthought of moderation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`bg-[#010108] ${geist.className}`}>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
