import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div>
            Layout /user
            <div>
                <Outlet />
            </div>
        </div>
    );
}
