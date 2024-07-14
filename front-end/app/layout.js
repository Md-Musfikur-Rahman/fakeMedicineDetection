import "./globals.css";

export const metadata = {
  title: "Fake Medicine Detection",
  description: "Design and Developed by Md Musfikur Rahman",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-bg">{children}</body>
    </html>
  );
}
