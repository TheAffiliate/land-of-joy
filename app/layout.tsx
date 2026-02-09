import "./globals.css";
import Providers from "@/components/Providers";
import { pagesConfig } from "@/config/pages.config";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { Layout } = pagesConfig;
  
  // If Base44 provided a Layout, wrap children in it
  const content = Layout ? <Layout>{children}</Layout> : children;

  return (
    <html lang="en">
      <body>
        <Providers>
          {content}
        </Providers>
      </body>
    </html>
  );
}