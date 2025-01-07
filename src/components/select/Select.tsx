import { useMemo, useRef, useState } from "react";
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
    const ref = useRef(null);

    function selectOption(option: string){
        setSelectedValue(option);
        if(props.onSelect) props.onSelect(option);
        
        blur();
    }

    function focus(){
        if(!ref.current) return;
        const div = ref.current as HTMLDivElement
        div.focus()
    }

    function blur(){
        if(!ref.current) return;
        const div = ref.current as HTMLDivElement
        div.blur()
    }

    function onBlur(event: any){
        event.stopPropagation()
        event.preventDefault()
        setShowOptions(false)
    }

    function onFocus(event: any){
        event.stopPropagation()
        event.preventDefault()
        setShowOptions(true);
    }

    return (
        <div className={styles.select} ref={ref} onFocus={onFocus} onBlur={onBlur} tabIndex={1}>
            <div className={styles.selection}>
                <div className={styles.label}>{props.options[selectedValue]}</div>
                <DownArrow className={styles.arrow} />
            </div>
            <div className={`${styles.options} ${showOptions && styles.visible}`}>
                {Object.keys(props.options).map((optionValue, index) => <div key={index} className={`${styles.option} ${selectedValue === optionValue && styles.selected}`} onClick={() => selectOption(optionValue)}>
                    {props.options[optionValue]}
                </div>)}
            </div>
        </div>
    );
}
