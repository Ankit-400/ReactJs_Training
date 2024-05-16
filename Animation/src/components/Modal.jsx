import { createPortal } from 'react-dom';
import { motion } from 'framer-motion'

export default function Modal({ title, children, onClose }) {
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      <motion.dialog

        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        }}
        // This props is useful for defining and reusing certain animation states. Keys can have any name. and to reuse the state, use its key as string.
        // This is also useful to trigger animation deep inside the component tree by just setting an animation to a certain variant on an ancestor component.

        initial='hidden'
        // Start animation from this condition

        // animate={{ opacity: 1, y: 0 }}
        animate='visible'

        exit='hidden'
        // Executed when component is removed from DOM.

        // Flaw : Initial => Animate => Exit
        open
        className="modal"
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById('modal')
  );
}
