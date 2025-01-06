import styles from "./Button.module.css";

export type ButtonProps = {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    icon?: React.ReactNode;
    text?: string;
    textSize?: "small" | "medium" | "large"
    iconSize?: "small" | "medium" | "large";
    color?: "color-1" | "color-2" | "color-3" | "red"  | "green" | "yellow";
    hideIcon?: boolean;
    notClickable?: boolean;
    className?: string;
    wiggleOnce?: boolean;
    scaleUpOnce?: boolean;
    fadeInOutInfinitely?: boolean;
    disabled?: boolean;
};

export default function Button(props: ButtonProps) {
    return (
        <button disabled={props.disabled} className={`${props.className} ${styles.button} ${styles[`text-${props.textSize ?? "medium"}`]} ${props.notClickable ? styles.notClickable : ""} ${props.hideIcon ? styles.hideIcon : ""} ${styles[props.color ?? "color-1"]} ${styles[`icon-${props.iconSize ?? "small"}`]} ${props.wiggleOnce ? styles.wiggleOnce : ""} ${props.fadeInOutInfinitely ? styles.fadeInOutInfinitely : ""} ${props.scaleUpOnce ? styles.scaleUpOnce : ""}`} onClick={props.onClick}>
            {props.icon}
            <div className={styles.text}>{props.text}</div>
        </button>
    );
}
