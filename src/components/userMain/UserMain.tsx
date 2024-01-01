import { PropsWithChildren } from "react";
import styles from "./UserMain.module.css";

export default function UserMain({ children }: PropsWithChildren<{}>) {
    return <main className={styles.main}>{children}</main>;
}
