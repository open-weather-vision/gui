import Button from "../../../../components/button/Button";
import {ReactComponent as Icon} from "../../../../img/icons/cloudiness.svg";

export default function Page(){
    return <>
        <Button text="Click me" />
        <Button icon={<Icon />} text="Click me" />
        <Button icon={<Icon />} text="Click me" color="color-1" />
        <Button icon={<Icon />} text="Click me" color="color-2" />
        <Button icon={<Icon />} text="Click me" color="color-3" />
        <Button icon={<Icon />} text="Click me" color="green" />
        <Button icon={<Icon />} text="Click me" color="red" />
        <Button icon={<Icon />} text="Click me" color="yellow"  hideIcon />
    </>
}