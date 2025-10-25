import "./globals.css";
import { ReactNode } from "react";
import { Providers } from "./providers";

export const metadata = {
  title: "Inventra ERP — UI Starter",
  description: "Inventra ERP Design System starter (AE2 + DV2 + AI-C)"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg-app text-textc-primary antialiased">
        <div className="min-h-screen">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
