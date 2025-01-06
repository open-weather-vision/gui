import { useMemo, useState } from "react";
import styles from "./Select.module.css";
import { ReactComponent as DownArrow } from "../../img/icons/down-arrow.svg"

export type SelectProps = {
    options: {[property in string]: React.ReactNode | string},
    value?: any,
    onSelect?: (value: any) => void
}

export function fromOptionsArray(optionsArray: {label: React.ReactNode | string, value: any}[]){
    const options: {[property in string]: React.ReactNode | string} = {};
    for(const option of optionsArray){
        options[option.value] = option.label;
    }
    return options;
}

export default function Select(props: SelectProps) {
    const [selectedValue, setSelectedValue] = useState(props.value ?? Object.keys(props.options)[0]);
    const [showOptions, setShowOptions] = useState(false);



    function toggleChoices(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        const div = event.target as HTMLDivElement
        setShowOptions(!showOptions)
        clearTimeout(focusLooseTimer);
    }

    function selectOption(option: string){
        setSelectedValue(option);
        if(props.onSelect) props.onSelect(option);
        setShowOptions(false)
    }

    const [focusLooseTimer, setFocusLooseTimer] = useState<any>();
    function onFocusLoose(){
        setFocusLooseTimer(setTimeout(() => {
            setShowOptions(false);
        }, 500));
    }

    return (
        <div className={styles.select}>
            <button className={styles.selection} onBlur={onFocusLoose} onClick={toggleChoices} tabIndex={1}>
                <div className={styles.label}>{props.options[selectedValue]}</div>
                <DownArrow className={styles.arrow} />
            </button>
            <div className={`${styles.options} ${showOptions && styles.visible}`}>
                {Object.keys(props.options).map((optionValue, index) => <div key={index} className={`${styles.option} ${selectedValue === optionValue && styles.selected}`} onClick={() => selectOption(optionValue)}>
                    {props.options[optionValue]}
                </div>)}
            </div>
        </div>
    );
}
