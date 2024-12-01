interface Position {
    x: number;
    y: number;
  }
  
  export function getRandomPosition(buttonWidth: number, buttonHeight: number): Position {
    const padding = 20; // Minimum distance from screen edges
    const maxX = window.innerWidth - buttonWidth - padding;
    const maxY = window.innerHeight - buttonHeight - padding;
    
    return {
      x: Math.max(padding, Math.floor(Math.random() * maxX)),
      y: Math.max(padding, Math.floor(Math.random() * maxY))
    };
  }