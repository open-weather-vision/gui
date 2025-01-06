import { PropsWithChildren, useEffect, useState } from "react";
import styles from "./UserMain.module.css";
import Button from "../button/Button";

export default function UserMain({
    children,
    hidden,
}: PropsWithChildren<{ hidden?: boolean }>) {
    return (
        <main className={`${styles.main} ${hidden && styles.hidden}`}>
            {children}
        </main>
    );
}
