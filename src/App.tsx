import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRightCircleIcon,
  ListRestart,
  Shuffle,
  UndoIcon,
  Volume2,
  VolumeX,
  Gift,
  Edit,
} from "lucide-react";
import { TimeBadge } from "./components/TimeBadge";
import { ProgressCounter } from "./components/ProgressCounter";
// import { Celebration } from "./components/Celebration";
import {
  PARTICIPANT_NAMES,
  MYSTERY_PRIZES,
  MINI_CHALLENGES,
  // EMPLOYEES_OF_THE_WEEK,
} from "./lib/constants";
import { nameVariants, celebrationVariants } from "./lib/animations";
import { playRandomClickSound, playSound } from "./lib/sounds";
// import EmployeesOfTheWeekMarquee from "./components/EmployeesOfTheWeekMarquee";
import logo from "/logo-1pass.svg";
// import { NewYearCelebration } from "./components/NewYearCelebration";
import { Celebration } from "./components/Celebration";
import { ParticipantsDrawer } from "./components/ParticipantsDrawer";
import Coin from "./components/ui/Coin";
import CoinsDrop from "./components/ui/Coins-Drop";
import MouseCoinChaser from "./components/ui/MouseCoinChasre";
// import EmployeesOfTheWeekMarquee from "./components/EmployeesOfTheWeekMarquee";

function App() {
  const [names, setNames] = useState<string[]>([...PARTICIPANT_NAMES]);
  const [currentName, setCurrentName] = useState<string | null>(null);
  const [usedNames, setUsedNames] = useState<string[]>([]);
  const [previousNames, setPreviousNames] = useState<string[]>([]);
  const [isMuted, setIsMuted] = useState(true);
  const [showCelebration, setShowcelebration] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // New states for Mystery Prize and Mini-Challenge
  const [mysteryPrize, setMysteryPrize] = useState<string | null>(null);
  const [miniChallenge, setMiniChallenge] = useState<{
    question: string;
    answer: string;
  } | null>(null);
  console.log(miniChallenge);
  const [showMiniChallenge, setShowMiniChallenge] = useState(false);
  const [revealAnswer, setRevealAnswer] = useState(false);
console.log(showMiniChallenge);
console.log(revealAnswer);
  const selectRandomName = () => {
    const availableNames = names.filter((name) => !usedNames.includes(name));
    if (availableNames.length > 0) {
      if (!isMuted) playRandomClickSound();

      const randomIndex = Math.floor(Math.random() * availableNames.length);
      const selectedName = availableNames[randomIndex];

      // Generate Mystery Prize
      const prize =
        MYSTERY_PRIZES[Math.floor(Math.random() * MYSTERY_PRIZES.length)];
      setMysteryPrize(prize);

      // Randomly decide to show Mini-Challenge (1 in 3 chance)
      if (Math.random() < 0.33) {
        const challenge =
          MINI_CHALLENGES[Math.floor(Math.random() * MINI_CHALLENGES.length)];
        setMiniChallenge(challenge);
        setShowMiniChallenge(true);
        setRevealAnswer(false);
        if (currentName) {
          setPreviousNames((prev) => [...prev, currentName]);
        }
        setCurrentName(selectedName);
        setUsedNames((prev) => [...prev, selectedName]);
      } else {
        setMiniChallenge(null);
        setShowMiniChallenge(false);
        if (currentName) {
          setPreviousNames((prev) => [...prev, currentName]);
        }
        setCurrentName(selectedName);
        setUsedNames((prev) => [...prev, selectedName]);
      }
    }
  };
  const goBackToPreviousName = () => {
    const lastName = previousNames.pop();
    if (lastName) {
      setUsedNames((prev) => prev.filter((name) => name !== currentName));
      setCurrentName(lastName);
      setPreviousNames(previousNames);
      setMysteryPrize(null);
      setMiniChallenge(null);
      setShowMiniChallenge(false);
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const endHuddle = () => {
    if (!isMuted) playSound("complete");
    setShowcelebration(true);
  };

  const resetNames = () => {
    setUsedNames([]);
    setCurrentName(null);
    setShowcelebration(false);
    setMysteryPrize(null);
    setMiniChallenge(null);
    setShowMiniChallenge(false);
  };

  const handleSaveParticipants = (newNames: string[]) => {
    setNames(newNames);
    
    // Reset used names that are no longer in the list
    setUsedNames(prev => prev.filter(name => newNames.includes(name)));
    
    // If current name is no longer in the list, reset it
    if (currentName && !newNames.includes(currentName)) {
      setCurrentName(null);
    }
  };

  const isComplete = usedNames.length === names.length;

  return (
    <div className="w-screen h-screen bg-[#0e0e10] text-white p-6 overflow-hidden">
       <div className="absolute w-full -z-100 ">
        <MouseCoinChaser />
      </div>
      <div className="p-6 h-full">
        <div className="flex justify-between items-center">
          <img src={logo} alt="1Password Logo" className="z-50" />
          <div className="flex items-center gap-4">
            <Button
              size="sm"
              onClick={() => setIsDrawerOpen(true)}
              title="Edit participants"
              className="bg-transparent rounded-full hover:bg-gray-700 text-white p-2 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <Edit className="w-5 h-5" />
            </Button>
            <TimeBadge />
          </div>
        </div>

        <div className="text-center h-full flex flex-col justify-center items-center gap-9">
          <AnimatePresence mode="wait">
            {!showCelebration ? (
              <motion.div
                key="main-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4"
              >
                <motion.h1
                  key={currentName}
                  variants={nameVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="text-[7rem] font-bold text-white"
                >
                  {currentName || "Click to Start"}
                </motion.h1>

                {/* Mystery Prize Section */}
                {mysteryPrize && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="  bg-white/5  rounded-lg p-4 flex items-center gap-2"
                  >
                    <motion.div
                      animate={{
                        rotate: [-10, 10, -10],
                        // scale:[1.2,1,1.1,1.2]
                      }}
                      transition={{ repeat: Infinity, duration: 0.75 }}
                    >
                      <Gift className="w-6 h-6" />
                      {/* 🎁 */}
                    </motion.div>
                    <span className="text-xl">
                      Mystery Prize: {mysteryPrize}
                    </span>
                    <motion.div
                      animate={{ rotate: [-10, 10, -10] }}
                      transition={{ repeat: Infinity, duration: 0.75 }}
                    >
                      <Gift className="w-6 h-6" />
                      {/* 🎁 */}
                    </motion.div>
                  </motion.div>
                )}

                {/* Mini-Challenge Section */}
                {/* {showMiniChallenge && miniChallenge && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white/5 rounded-lg p-4 flex flex-col items-center gap-3"
                  >
                    <StickerIcon className="w-6 h-6" />
                    <h3 className="text-2xl font-semibold">Mini-Challenge</h3>
                    <p className="text-xl">{miniChallenge.question}</p>
                    {revealAnswer ? (
                      <p className="text-lg text-yellow-200">
                        Answer: {miniChallenge.answer}
                      </p>
                    ) : (
                      <Button
                        onClick={() => setRevealAnswer(true)}
                        className="bg-[#5477f0] hover:bg-[#0b3eea] text-white"
                      >
                        Reveal Answer
                      </Button>
                    )}
                  </motion.div>
                )} */}
              </motion.div>
            ) : (
              <motion.div
                key="celebration"
                variants={celebrationVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Celebration />
                {/* <NewYearCelebration /> */}
                <motion.h1
                  key={currentName}
                  variants={nameVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="text-4xl font-bold text-white"
                >
                  Well done team, see you next week !!
                </motion.h1>
              </motion.div>
            )}
          </AnimatePresence>

          {!isComplete && (
            <Button
              size="lg"
              disabled={isComplete}
              onClick={selectRandomName}
              className="bg-[#0b3eea] hover:bg-[#2351ec] text-white gap-2 transition-all duration-300 ease-in-out transform hover:scale-105 w-64"
            >
              <Shuffle className="w-4 h-4" />
              Select Random Name
            </Button>
          )}

          {isComplete && !showCelebration && (
            <Button
              size="lg"
              disabled={showCelebration}
              onClick={endHuddle}
              className="bg-[#0b3eea]  hover:bg-[#2351ec] text-white gap-2 transition-all duration-300 ease-in-out transform hover:scale-105 w-64"
            >
              <ArrowRightCircleIcon className="w-4 h-4" />
              End huddle
            </Button>
          )}

          <div className="flex justify-center items-center gap-4">
            <Button
              onClick={toggleMute}
              title={isMuted ? "Unmute SFX" : "Mute SFX"}
              className="bg-transparent w-10 h-10 rounded-full hover:bg-gray-700 text-white p-2 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6" />
              ) : (
                <Volume2 className="w-6 h-6" />
              )}
            </Button>
            <Button
              size="sm"
              onClick={goBackToPreviousName}
              className="bg-transparent w-10 h-10 rounded-full hover:bg-gray-700 text-white p-2 transition-all duration-300 ease-in-out transform hover:scale-105"
              title="Go back to previous name"
            >
              <UndoIcon className="w-6 h-6" />
            </Button>
          </div>

          {!showCelebration && (
            <div className="flex justify-center items-center">
              <ProgressCounter
                current={usedNames.length}
                total={names.length}
              />
            </div>
          )}

          <Button
            size="sm"
            onClick={resetNames}
            className="bg-transparent w-10 h-10 rounded-full hover:bg-gray-700 text-white p-2 transition-all duration-300 ease-in-out transform hover:scale-105"
            title="Reset list"
          >
            <ListRestart className="w-6 h-6" />
          </Button>

          {!showCelebration && (
            <div className="absolute -translate-x-[43rem] translate-y-[220px] overflow-clip h-80">
              <Coin />
            </div>
          )}
          {showCelebration && (
            <div className="absolute w-full ">
              <CoinsDrop />
            </div>
          )}
        </div>
      </div>
     
      {/* <EmployeesOfTheWeekMarquee employees={EMPLOYEES_OF_THE_WEEK} /> */}

      <ParticipantsDrawer
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        participantNames={names}
        onSave={handleSaveParticipants}
      />
    </div>
  );
}

export default App;




