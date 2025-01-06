import styles from "./Button.module.css";

export type ButtonProps = {
    onClick?: () => void;
    icon?: React.ReactNode;
    text?: string;
    iconSize?: "small" | "medium" | "large";
    color?: "color-1" | "color-2" | "color-3" | "red"  | "green" | "yellow";
    hideIcon?: boolean;
    notClickable?: boolean;
    className?: string;
};

export default function Button(props: ButtonProps) {
    return (
        <button className={`${props.className} ${styles.button} ${props.notClickable ? styles.notClickable : ""} ${props.hideIcon ? styles.hideIcon : ""} ${styles[props.color ?? "color-1"]} ${styles[`icon-${props.iconSize ?? "small"}`]}`} onClick={props.onClick}>
            {props.icon}
            <div className={styles.text}>{props.text}</div>
        </button>
    );
}
