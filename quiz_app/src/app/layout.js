import "./globals.css";
import { AuthProvider } from "./AuthProvider";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="relative z-10">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}