import { Link } from "react-router-dom";

export default function Page() {
    return (
        <div>
            Hello too! <Link to="/user">Link to '/user'</Link>
        </div>
    );
}
