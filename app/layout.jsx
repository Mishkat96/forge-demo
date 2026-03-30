import "./globals.css";

export const metadata = {
  title: "Forge Demo",
  description: "Forge landing page demo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
