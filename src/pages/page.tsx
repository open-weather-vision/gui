import { Link, useNavigate } from "react-router-dom";
import useGlobalContext from "../utils/useGlobalContext";
import { useEffect } from "react";

export default function Page() {
    const globals = useGlobalContext();
    const navigate = useNavigate();

    useEffect(() =>{
        if(globals.applicationState === "configured"){
            if(globals.selectedWeatherStation){
                navigate("/user/weather-station/live");
            }else{
                navigate("/user/weather-station/live");
            }
        }else{
            navigate("/admin");
        }
    })

    return (
        <div>
            sdf
        </div>
    );
}
