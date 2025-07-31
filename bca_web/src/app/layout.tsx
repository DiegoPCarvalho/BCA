import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Busca Preço",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br"
      suppressHydrationWarning={true}
      data-lt-installed={true}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
