import { DisplayMode } from "./constants";

export const getOppositeDisplayMode = (displayMode: DisplayMode) : DisplayMode => {
    switch(displayMode) {
        case DisplayMode.Light:
            return DisplayMode.Dark;
        case DisplayMode.Dark:
            return DisplayMode.Light;
    } 
}    

export const getInitialDisplayMode = () : DisplayMode => {
    const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
    return isLightMode ? DisplayMode.Light : DisplayMode.Dark;
}