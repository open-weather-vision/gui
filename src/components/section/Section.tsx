import { PropsWithChildren } from "react";
import styles from "./Section.module.css";

export function SectionContainer(props: PropsWithChildren<{}>) {
    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>{props.children}</div>
        </div>
    );
}

export default function Section(
    props: PropsWithChildren<{
        title?: string;
        icon?: React.ReactNode;
        fillHeight?: boolean;
    }>
) {
    return (
        <div className={`${styles.section} ${props.fillHeight && styles.fill}`}>
            <div className={styles.heading}>
                {props.icon}
                {props.title && <h1>{props.title}</h1>}
            </div>
            <div className={styles.content}>{props.children}</div>
        </div>
    );
}
