"use client";

import React, { useMemo, useState } from "react";
import clsx from "clsx";
import styles from "./contact.module.scss";

/**
 * The contact form
 */
export const Contact: React.FC = () => {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const isDisabled = useMemo(() => !subject.trim() || !message.trim(), [subject, message]);

    /**
     * Trigger the mailto link
     */
    const sendEmail = () => {
        if (isDisabled) return;
        window.location.href = `mailto:contact@groovegenerations.de?subject=${subject}&body=${message}`;
    };

    return (
        <div className={clsx("glass", styles.contactForm)}>
            <h4>Betreff</h4>
            <input placeholder={"Hallo Groove Generations"} onChange={(e) => setSubject(e.target.value)} />
            <h4>Nachricht</h4>
            <textarea
                placeholder={"Ich wollte dir schon immer sagen..."}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => (e.key === "Enter" ? sendEmail() : undefined)}
            />
            <button disabled={isDisabled} onClick={sendEmail}>
                E-Mail vorbereiten
            </button>
        </div>
    );
};
