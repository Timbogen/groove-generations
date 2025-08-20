import Link from "next/link";

/**
 * The imprint
 */
export default function Imprint() {
    return (
        <main className={"page"}>
            <section className={"text"}>
                <h1>Impressum</h1>
                <Link className={"homeLink"} href={"/"}>
                    {"<"} Home
                </Link>
                <div className={"glass"}>
                    <h3>Matthias Schmid</h3>
                    <p>
                        Karlstra&szlig;e 101
                        <br />
                        89073 Ulm
                        <br />
                        Deutschland
                    </p>
                    <br />
                    <h3>Kontakt</h3>
                    <p>
                        Telefon: +49 157 86502950
                        <br />
                        E-Mail: contact@groovegenerations.de
                    </p>
                    <p>
                        Quelle:{" "}
                        <a href="https://www.e-recht24.de/impressum-generator.html">
                            https://www.e-recht24.de/impressum-generator.html
                        </a>
                    </p>
                </div>
            </section>
        </main>
    );
}
