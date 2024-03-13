import { useEffect, useState } from "react";
import styles from "./AnimatedTextChange.module.css";

export default function AnimatedTextChange({
    text,
    sensorData,
}: {
    text: string;
    sensorData?: boolean;
}) {
    const [displayedText, setDisplayedText] = useState<string[]>([]);
    const [hideText, setHideText] = useState<boolean[]>([]);

    useEffect(() => {
        const splitText = text.split("");
        if (displayedText.length === 0) {
            setDisplayedText(splitText);
            return;
        }

        const newHideText = new Array(splitText.length).fill(false);
        for (let i = 0; i < displayedText.length; i++) {
            if (displayedText[i] !== splitText[i] || newHideText[i - 1]) {
                newHideText[i] = true;
            }
        }
        setHideText(newHideText);

        setTimeout(() => {
            setDisplayedText(splitText);
            setHideText(new Array(splitText.length).fill(false));
        }, 400);
    }, [text]);

    return (
        <span>
            {displayedText.map((char, i) => {
                return (
                    <span
                        className={`${styles.animatedText} ${
                            hideText[i] && styles.hidden
                        } ${char !== "." && sensorData && styles.sensorData}`}
                        key={i}
                    >
                        {char}
                    </span>
                );
            })}
        </span>
    );
}
