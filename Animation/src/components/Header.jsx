import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion'

import NewChallenge from './NewChallenge.jsx';

export default function Header() {
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState();

  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleDone() {
    setIsCreatingNewChallenge(false);
  }

  return (
    <>
      <AnimatePresence>
        {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
      </AnimatePresence>
      {/* When any element is not returned by component then that element will instantly be removed from DOM by react. But we wanted to perform some animation over it while it is being removed? So just wrap that component around AnimatePresence component. */}

      <header id="main-header">
        <h1>Your Challenges</h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 500 }}
          onClick={handleStartAddNewChallenge} className="button">
          Add Challenge
        </motion.button>
      </header>
    </>
  );
}
