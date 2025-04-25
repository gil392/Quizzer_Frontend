import { useEffect, useState } from "react";
import { DisplayMode } from "./constants"
import { getInitialDisplayMode, getOppositeDisplayMode } from "./utils";
import { Button } from "@mui/material";
import { Moon, Sun } from 'lucide-react';

const DisplayModeSwtich: React.FC = () => {
  const displayModeProvider = document.documentElement.classList; 
  const initalDisplayMode: DisplayMode = getInitialDisplayMode();
  
  const [displayMode, setDisplayMode] = useState<DisplayMode>(initalDisplayMode)
  
  useEffect(() => {
    if (!displayModeProvider.contains(displayMode)){
      displayModeProvider.add(displayMode);
    }
  }, [displayMode])

  const switchDisplayMode = () => {
    const currentDisplayMode = displayMode;
    const nextDisplayMode = getOppositeDisplayMode(currentDisplayMode);

    displayModeProvider.remove(currentDisplayMode);
    displayModeProvider.add(nextDisplayMode);
    
    setDisplayMode(nextDisplayMode)
  } 

    return (
        <>
        <Button onClick={switchDisplayMode}
          aria-label={`Switch to ${getOppositeDisplayMode(displayMode)} mode`}>
            {displayMode === DisplayMode.Dark ? 
            ( <Moon size={25} /> ) : 
            ( <Sun size={25} />)}
          </Button>
        </>
    )
}

export default DisplayModeSwtich;
