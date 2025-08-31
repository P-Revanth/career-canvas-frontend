import { AuthProvider } from "./context/authentication";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
