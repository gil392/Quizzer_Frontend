import { useEffect } from "react";
import { DisplayMode } from "./constants"
import { getOppositeDisplayMode } from "./utils";

const DisplayModeSwtich: React.FC = () => {
    useEffect(() => { 
    const displayModeProvider = document.documentElement.classList; 
    const prefersLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
    const displayMode = prefersLightMode ? DisplayMode.Light : DisplayMode.Dark;
    displayModeProvider.add(displayMode);
   }, []);

  const switchDisplayMode = () => {
    const displayModeProvider = document.documentElement.classList; 
    const currentDisplayMode = displayModeProvider.contains(DisplayMode.Light) ? DisplayMode.Light : DisplayMode.Dark;
    const nextDisplayMode = getOppositeDisplayMode(currentDisplayMode);
    displayModeProvider.remove(currentDisplayMode);
    displayModeProvider.add(nextDisplayMode);
  } 

    return (
        <>
        <button onClick={switchDisplayMode}>Toggle Theme</button>
        </>
    )
}

export default DisplayModeSwtich;
