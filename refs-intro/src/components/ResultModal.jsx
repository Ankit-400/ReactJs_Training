import { forwardRef } from 'react';
import { createPortal } from 'react-dom'

const ResultModal = forwardRef(function ResultNodal({ targetTime, timeRemaining, onReset }, ref) {

    const userLost = timeRemaining <= 0;
    const formattedRemainingTime = (timeRemaining / 1000).toFixed(2);
    const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);

    return createPortal(
        <dialog ref={ref} className="result-modal">
            {userLost && <h2>You Lost!</h2>}
            {!userLost && <h2>Your score: {score}</h2>}
            <p>
                The target time was <strong>{targetTime} second.</strong>
            </p>
            <p>
                You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong>
            </p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
})

export default ResultModal;

// dialog element is inbuilt pop-up modal. Wrapping close button insie form having method as "dialog" will be automatically closed.
// if we provide dialog open attribute as true, dialog will be forcefully opened and the backdrop element behind the modal will not be shown. So we have to programatically manage the opening and closing of modal.


// ref cannotebe passed from one component to another like simple prop. To do so we have to use one function callrd forwardRef().

