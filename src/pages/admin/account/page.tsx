import { useTranslation } from "react-multi-lang"
import useGlobalContext from "../../../utils/useGlobalContext";

export default function Page(){
    const t = useTranslation();
    const globals = useGlobalContext();

    return <>
        <h1>Account</h1>
    </>
}