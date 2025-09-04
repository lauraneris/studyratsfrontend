import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
const nunito = Nunito({
    subsets: ["latin"],
    weight: ["200", "400", "900"],
    variable: '--font-nunito',
});

export const metadata: Metadata = {
    title: "Study Rats - Menos ratoeira, mais notão.",
    description: "Sua plataforma IA para correção e geração de redações",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-br">
            <body className={nunito.className}>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}