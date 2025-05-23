import click8 from "./sounds/click8.mp3";
import click9 from "./sounds/click9.mp3";
import click6 from "./sounds/click6.mp3";
import click4 from "./sounds/click4.mp3";
import complete1 from './sounds/yay.mp3';
// import yay from './sounds/yay.mp3';

// Collection of sound effects
const sounds = {
  click: new Audio('./sounds/click.mp3'),
  complete: new Audio(complete1)
};

// Initialize all sounds with proper settings
Object.values(sounds).forEach(sound => {
  sound.volume = 0.3;
});

// Define click sounds
const clickSounds = [
    new Audio(click8),
    new Audio(click8),
    new Audio(click8),
    new Audio(click8),
    new Audio(click8),
    new Audio(click8),
    new Audio(click8),
    new Audio(click8),
    new Audio(click8),
    new Audio(click8),
    new Audio(click9),
    new Audio(click6),
    new Audio(click8),
    new Audio(click4),
];

Object.values(clickSounds).forEach(sound => {
  sound.volume = 0.1;
});
// Function to play a random sound
export const playRandomClickSound = () => {
    const randomIndex = Math.floor(Math.random() * clickSounds.length);
    const sound = clickSounds[randomIndex];
    sound.play();
};

export const playSound = (type: keyof typeof sounds) => {
  const sound = sounds[type];
  sound.currentTime = 0; // Reset sound to start
  sound.play().catch(() => {
    // Ignore errors - browsers may block autoplay
  });
};

