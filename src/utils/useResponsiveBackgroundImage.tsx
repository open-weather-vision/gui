import { useWindowSize } from "@uidotdev/usehooks";

export default function useResponsiveBackgroundImage(
    name: string,
    basePath: string = "/weather-state/backgrounds"
) {
    const size = useWindowSize();

    function getSize() {
        if (size.width === null) return "m";

        if (size.width > 1440) {
            return "l";
        } else if (size.width > 960) {
            return "m";
        } else if (size.width >= 480) {
            return "s";
        } else {
            return "xs";
        }
    }

    return {
        style: {
            backgroundImage: `url(${basePath}/${name}-${getSize()}.jpg)`,
        },
    };
}
