import { useEffect, useRef } from 'react'
import EX_useCallback from './Components/Ex_useCallback'

function App() {

  const compRef = useRef();

  useEffect(() => {
    return () => {
      console.log(compRef.current); // undefined
    }
  }, []);


  return (
    <>
      <div>Hiii</div>
      <EX_useCallback ref={compRef} />
    </>
  )
}

export default App
