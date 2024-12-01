// Collection of sound effects
const sounds = {
  click: new Audio('./weekly_huddle/sounds/click.mp3'),
  complete: new Audio('./weekly_huddle/sounds/complete1.mp3')
};

// Initialize all sounds with proper settings
Object.values(sounds).forEach(sound => {
  sound.volume = 0.1;
});

// Define click sounds
const clickSounds = [
    new Audio('./weekly_huddle/sounds/click8.mp3'),
    new Audio('./weekly_huddle/sounds/click8.mp3'),
    new Audio('./weekly_huddle/sounds/click8.mp3'),
    new Audio('./weekly_huddle/sounds/click8.mp3'),
    new Audio('./weekly_huddle/sounds/click8.mp3'),
    new Audio('../weekly_huddle/sounds/click8.mp3'),
    new Audio('../weekly_huddle/sounds/click8.mp3'),
    new Audio('../weekly_huddle/sounds/click8.mp3'),
    new Audio('../weekly_huddle/sounds/click8.mp3'),
    new Audio('../weekly_huddle/sounds/click8.mp3'),
    new Audio('../weekly_huddle/sounds/click9.mp3'),
    new Audio('../weekly_huddle/sounds/click6.mp3'),
    new Audio('../weekly_huddle/sounds/click8.mp3'),
    new Audio('../weekly_huddle/sounds/click4.mp3'),
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

