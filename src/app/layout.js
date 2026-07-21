import "./globals.css";

export const metadata = {
  title: "DA2ARQ — Gestión de Obra",
  description: "Plataforma de gestión de gastos y avance de obra",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon-32.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  themeColor: "#2E6E18",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function () {
                  navigator.serviceWorker.register('/sw.js').catch(function(){});
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
