import { Link } from "react-router-dom";

export default function Page() {
    return (
        <div>
            Hello too! <Link to="/weather-station/live">Link to '/weather-station/live'</Link>
        </div>
    );
}
