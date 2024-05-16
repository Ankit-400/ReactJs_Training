import { useContext, useRef, useState } from 'react';
import { motion, useAnimate, stagger } from 'framer-motion'

import { ChallengesContext } from '../store/challenges-context.jsx';
import Modal from './Modal.jsx';
import images from '../assets/images.js';

export default function NewChallenge({ onDone }) {
  const title = useRef();
  const description = useRef();
  const deadline = useRef();

  const [scope, animate] = useAnimate();
  // framer action provides us imperative way to perform or trigger animation.
  // scope - pass this scope as ref to the element, whose child elements you want to animate.

  const [selectedImage, setSelectedImage] = useState(null);
  const { addChallenge } = useContext(ChallengesContext);

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const challenge = {
      title: title.current.value,
      description: description.current.value,
      deadline: deadline.current.value,
      image: selectedImage,
    };

    if (
      !challenge.title.trim() ||
      !challenge.description.trim() ||
      !challenge.deadline.trim() ||
      !challenge.image
    ) {
      animate(
        'input, textarea',
        { x: [5, 0], border: '1px solid red' },
        { type: 'spring', duration: 0.5, delay: stagger(0.05) }
      )
      // animate(
      // list of elements that we want to animate, as string - elements name separated by ',',
      // object specifying what to perform as part of animation - using css properties,
      // configuration object
      // )
      return;
    }

    onDone();
    addChallenge(challenge);
  }

  return (
    <Modal title="New Challenge" onClose={onDone}>
      <form id="new-challenge" onSubmit={handleSubmit} ref={scope}>
        <p>
          <label htmlFor="title">Title</label>
          <input ref={title} type="text" name="title" id="title" />
        </p>

        <p>
          <label htmlFor="description">Description</label>
          <textarea ref={description} name="description" id="description" />
        </p>

        <p>
          <label htmlFor="deadline">Deadline</label>
          <input ref={deadline} type="date" name="deadline" id="deadline" />
        </p>

        <motion.ul
          id="new-challenge-images"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15
                // This is the gap between loading time of each child component. 
              }
              //transition can be set to any specific prop. 
            }
          }}
        >
          {images.map((image) => (
            <motion.li
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                // visible: { opacity: 1, scale: 1 },
                visible: { opacity: 1, scale: [0.8, 1.2, 1] },
                // We can simply reassign the animation state to the props we have created in parent, here named hidden and visible.
                // By default, these props will be activated, as they are activated on parent. So we no need to mention these variants for the initial or animate prop.
                // We can also set array of value for scale which represents key-frames and our animation will pass through all the keyframes. 

                // Now we can see that images are being removed just before closing the modal. So to fix this we have to mention the exit prop again(although it is written in parent). 

                // When we are redefining ny of the prop like initial, animate or exit, then we should not use variants as value, instead we just have to use actual animation state explicitly.  
              }}
              key={image.alt}
              onClick={() => handleSelectImage(image)}
              className={selectedImage === image ? 'selected' : undefined}
              exit={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring' }}
            >
              <img {...image} />
            </motion.li>
          ))}
        </motion.ul>

        <p className="new-challenge-actions">
          <button type="button" onClick={onDone}>
            Cancel
          </button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal >
  );
}
