import { Outlet } from "react-router-dom";
import Navigation from "../../components/navigation/Navigation";
import UserMain from "../../components/userMain/UserMain";

export default function Layout() {
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <UserMain>
                <Outlet />
            </UserMain>
            <Navigation />
        </div>
    );
}
