import { Link } from "react-router-dom";
import styles from "./page.module.css";

export default function Page() {
    return (
        <div className={styles.test}>
            yoo<Link to="/">Back</Link>
        </div>
    );
}
