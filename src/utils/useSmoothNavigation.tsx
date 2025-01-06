import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const NavigationContext = createContext<{
    navigate: (path: string) => Promise<void>;
    hideMain: boolean;
}>({
    navigate: async (path: string) => {},
    hideMain: false,
});

export function NavigationContextProvider(props: {children: React.ReactNode}){
    const [hideMain, setHideMain] = useState<boolean>(false);
    const navigate = useNavigate();

	async function beforeNavigate() {
        console.log("Hiding main!")
		setHideMain(true);
		await new Promise((resolve) => {
			setTimeout(resolve, 150);
		});
	}

	async function afterNavigate() {
		setTimeout(() => {
            console.log("Showing main!")
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
                    hideMain
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
