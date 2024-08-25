"use client";

import { useEffect, useState } from "react";
import { AuthProvider } from "./AuthProvider";

function ClientAuthProvider({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <AuthProvider>{children}</AuthProvider>;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientAuthProvider>
          <div className="relative z-10">
            {children}
          </div>
        </ClientAuthProvider>
      </body>
    </html>
  );
}