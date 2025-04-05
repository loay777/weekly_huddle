import { useEffect } from 'react';
import confetti from 'canvas-confetti';
// import cat1 from './images/cat1.gif';
// import cat2 from './images/cat2.gif';
// import cat3 from './images/cat3.gif';
// import cat4 from './images/cat4.gif';
// import cat5 from './images/cat5.gif';
import cat6 from './images/cat6.gif';
// import type { FireworksHandlers } from "@fireworks-js/react";

// import Lottie from 'lottie-react';
// import celebrationAnimation from '../assets/celebration.json';
// const gifs=[
//   // cat1,
//   // cat2,
//   // cat3,
//   // cat4,
//   // cat5,
//   cat6,
// ]

export function Celebration() {
  // const ref = useRef<FireworksHandlers>(null);
  // const toggle = () => {
  //   if (!ref.current) return;
  //   if (ref.current.isRunning) {
  //     ref.current.stop();
  //   } else {
  //     ref.current.start();
  //   }
  // };
  useEffect(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50;
      
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.1, 0.9),
          y: Math.random() - 0.2,
        },
        // colors: ['#0b3eea', '#bf94ff', '#772ce8', '#5c16c5', '#4c1d95'],
        colors: ['	#ff5353', '#ffee53', '#53ffa9', '#5395ff', '#ef53ff'],
        shapes: ['circle', 'square', 'star'],
        gravity: 1.5,
        scalar: 0.75,
        
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="relative flex justify-center items-center w-full aspect-video">
      {/* <Lottie
        animationData={celebrationAnimation}
        loop={true}
        className="absolute top-0 w-full h-full"
      /> */}
      <img
        src={cat6}
        alt="Random Cat"
        className="  object-contain mt-4 top-0 "
      />
      {/* <Fireworks
        ref={ref}
        options={{
          opacity: 0.5,
          acceleration: 1.02,
          brightness: { max: 55, min: 25 },
          explosion: 7,
          intensity: 30.0,
        }}
        style={{
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          position: "fixed",
          background: "#000",
        }}
      /> */}
      {/* <button onClick={() => toggle()}>Toggle</button>
      <button onClick={() => ref.current!.clear()}>Clear</button> */}
    </div>
  );
}



