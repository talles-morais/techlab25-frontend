import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EconoView",
  description: "Gerencie suas finanças através do nosso app!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <html lang="en">
        <body className={`${workSans.variable} antialiased`}>{children}</body>
      </html>
    </GoogleOAuthProvider>
  );
}
