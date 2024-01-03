import { createContext, useContext } from "react";

export const NavigationContext = createContext<{
    navigate: (path: string) => Promise<void>;
}>({
    navigate: async (path: string) => {},
});

export default function useSmoothNavigation() {
    const context = useContext(NavigationContext);

    return context.navigate;
}
