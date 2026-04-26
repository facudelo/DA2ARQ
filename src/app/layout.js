import "./globals.css";

export const metadata = {
  title: "DA2ARQ — Gestión de Obra",
  description: "Plataforma de gestión de gastos y avance de obra",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
