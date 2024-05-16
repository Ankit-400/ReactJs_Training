import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

// let timer;

export default function TimerChallenge({ title, targetTime }) {

    // let timer;
    // Using this block scoped variable to store the id of timer returned by the setTimeout func will cause the following problem,
    // - Each re-rendering of the component will lead to creation of new copy of timer variable and so that we want be able to hold timer id in timer variable => value will not be persisted.

    // Another way can be declare the timer at top level and not inside the functional component, the copy of timer will be shared between all the instances of the component. But this will also lead to unexpected behaviour as the new timer id of another component will be overwritten by current component' timer id.

    // Efficient way could be using useRef, as 
    // - we do not want to update UI or re-render the component on changing data
    // - we want to persist the value behind the scenes.
    // - Each instance will have it's own timer ref which will work independently.
    // - On the re-render we do not want to reset the timer.

    const timer = useRef();
    const dialog = useRef();

    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if (timeRemaining <= 0) {
        clearInterval(timer.current);
        dialog.current.showModal();
    }

    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining(prevRemaining => prevRemaining - 10)
        }, 10);
    }

    function handleStop() {
        dialog.current.showModal();
        clearInterval(timer.current);
    }

    function handleReset() {
        setTimeRemaining(targetTime * 1000);
    }

    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime} timeRemaining={timeRemaining} onReset={handleReset} />
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                    {timerIsActive ? 'Time is running...' : 'Timer inactive'}
                </p>
            </section>
        </>
    );
}