import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Yanone_Kaffeesatz } from "next/font/google";
import "./styles/globals.scss";

/** The Yanone font */
const yanone = Yanone_Kaffeesatz({
    weight: ["200", "300", "400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-yanone",
});

/**
 * The webpage metadata
 */
export const metadata: Metadata = {
    title: "Groove Generations",
    description: "Genießen Sie ihre musikalische Wunderreise mit den Groove Generations!",
    openGraph: {
        title: "Groove Generations",
        description: "Genießen Sie ihre musikalische Wunderreise mit den Groove Generations!",
        type: "website",
        images: ["https://groovegenerations.de/img/logo.png"],
        countryName: "Deutschland",
        url: "https://groovegenerations.de",
    },
};

/** Completely prevent SSR for the three js stuff */
const Disco = dynamic(() => import("@/app/disco/disco"), {
    ssr: false,
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={yanone.variable}>
                <Disco />
                {children}
                <footer>
                    © GrooveGenerations {new Date().getFullYear()}
                    <span>•</span>
                    <Link href={"/legal/imprint"}>Impressum</Link>
                    <span>•</span>
                    <Link href={"/legal/privacy"}>Datenschutzerklärung</Link>
                </footer>
            </body>
        </html>
    );
}
