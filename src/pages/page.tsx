import { Link } from "react-router-dom";

export default function Page() {
    return (
        <div>
            Hello too! <Link to="/user/live">Link to '/user/live'</Link>
        </div>
    );
}
