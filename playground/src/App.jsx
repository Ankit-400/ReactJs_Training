
// --------------------------------------------------------------------------------------------

// ----- Simple demo application to learn basics of Framer Motion - an animation library. -----

// --------------------------------------------------------------------------------------------

import { useState } from 'react';
import { motion } from 'framer-motion'

function App() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotate, setRotate] = useState(0);

  return (
    <div id="demo">
      <motion.div
        id="box"
        animate={{
          x,
          y,
          rotate
        }}
        transition={{
          duration: 0.3,
          bounce: .5,
          // indicates the intensity of the bouncing in range of 0 to 1
          type: 'spring'
          // type of animation like spring, tween(normal) etc.
        }}
      />

      <div id="inputs">
        <p>
          <label htmlFor="x">X</label>
          <input
            type="number"
            id="x"
            onChange={(event) => setX(+event.target.value)}
          />
        </p>

        <p>
          <label htmlFor="y">Y</label>
          <input
            type="number"
            id="y"
            onChange={(event) => setY(+event.target.value)}
          />
        </p>

        <p>
          <label htmlFor="rotate">Rotate</label>
          <input
            type="number"
            id="rotate"
            onChange={(event) => setRotate(+event.target.value)}
          />
        </p>
      </div>
    </div>
  );
}

export default App;
