import {  useRef } from "react";

import Fireworks from "@fireworks-js/react";
import type { FireworksHandlers } from "@fireworks-js/react";
import Spline from '@splinetool/react-spline';
import FireworksExplosion from '../lib/sounds/fireworks.mp3';
import FireworksExplosion2 from '../lib/sounds/fireworks2.mp3';
// import Yay from '../lib/sounds/yay.mp3'; 


export function NewYearCelebration() {
// const [splineLoaded, setSplineLoaded] = useState(false);

  const ref = useRef<FireworksHandlers>(null);
//   const toggle = () => {
//     if (!ref.current) return;
//     if (ref.current.isRunning) {
//       ref.current.stop();
//     } else {
//       ref.current.start();
//     }
//   };
  

  return (
    <div className="relative flex justify-center items-center w-screen">
      <Fireworks
      
        ref={ref}
        options={{
          opacity: 0.5,
          acceleration: 1.02,
          brightness: { max: 55, min: 25 },
          explosion: 7,
          intensity: 30.0,
          sound: {
            enabled: true,
            volume: { max: 9, min: 50 },
            files: [
              FireworksExplosion,
              FireworksExplosion,
              FireworksExplosion,
              FireworksExplosion2,
            ],
          },
        }}
        style={{
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          position: "fixed",
          background: "#000",
        }}
      />
      <div className="w-full inset-0 z-0">
        <Spline scene="https://draft.spline.design/T8cYKlZebsUns5Kb/scene.splinecode" />
      </div>

      {/* <button onClick={() => toggle()}>Toggle</button>
      <button onClick={() => ref.current!.clear()}>Clear</button> */}
    </div>
  );
}
