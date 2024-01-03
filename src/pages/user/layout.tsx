import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "../../components/navigation/Navigation";
import UserMain from "../../components/userMain/UserMain";
import { useState } from "react";
import styles from "./layout.module.css";
import { NavigationContext } from "../../utils/useSmoothNavigation";

export default function Layout() {
    const [hideMain, setHideMain] = useState<boolean>(false);
    const navigate = useNavigate();

    async function beforeNavigate() {
        setHideMain(true);
        await new Promise((resolve) => {
            setTimeout(resolve, 150);
        });
    }

    async function afterNavigate() {
        setHideMain(false);
    }

    return (
        <NavigationContext.Provider
            value={{
                navigate: async (path: string) => {
                    await beforeNavigate();
                    navigate(path);
                    await afterNavigate();
                },
            }}
        >
            <div className={styles.container}>
                <UserMain hidden={hideMain}>
                    <Outlet />
                </UserMain>
                <Navigation />
            </div>
        </NavigationContext.Provider>
    );
}
