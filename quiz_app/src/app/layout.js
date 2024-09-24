import { Analytics } from "@vercel/analytics/react"
import "./globals.css";
import { AuthProvider } from "./AuthProvider";

export const metadata = {
  title: "Quiz App",
  description: "Quiz App est une application qui te permet de te développer dans ton domaine avec des quiz",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="relative z-10">
            {children}
            <Analytics />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}