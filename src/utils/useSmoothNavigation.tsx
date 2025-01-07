import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const NavigationContext = createContext<{
    navigate: (path: string) => Promise<void>;
    hideMain: boolean;
    showSwitchStationPopup: boolean;
    setShowSwitchStationPopup: (value: boolean) => void;
}>({
    navigate: async (path: string) => {},
    hideMain: false,
    showSwitchStationPopup: false,
    setShowSwitchStationPopup(value) {
        
    },
});

export function NavigationContextProvider(props: {children: React.ReactNode}){
    const [hideMain, setHideMain] = useState<boolean>(false);
    const [showSwitchStationPopup, setShowSwitchStationPopup] = useState<boolean>(false);
    const navigate = useNavigate();

	async function beforeNavigate() {
		setHideMain(true);
		await new Promise((resolve) => {
			setTimeout(resolve, 150);
		});
	}

	async function afterNavigate() {
		setTimeout(() => {
			setHideMain(false);
		}, 150);
	}

    return (
            <NavigationContext.Provider
                value={{
                    navigate: async (path: string) => {
                        await beforeNavigate();
                        navigate(path);
                        await afterNavigate();
                    },
                    hideMain,
                    showSwitchStationPopup,
                    setShowSwitchStationPopup
                }}
            >
                {props.children}
            </NavigationContext.Provider>
    );
}

export default function useSmoothNavigation() {
    const context = useContext(NavigationContext);

    return context;
}
