import { DisplayMode } from "./constants";

export const getOppositeDisplayMode = (displayMode: DisplayMode) => {
    switch(displayMode) {
        case DisplayMode.Light:
            return DisplayMode.Dark;
        case DisplayMode.Dark:
            return DisplayMode.Light;
    } 
}    