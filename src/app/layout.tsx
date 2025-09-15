import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "잇쇼 | 일본 현지 맛집 발견",
  description: "한국인 여행자를 위한 일본 숨겨진 로컬 맛집 큐레이션 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
