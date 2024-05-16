import { useState } from "react"
import Header from "./components/Header"
import UserInput from "./components/Userinput"
import Results from "./components/Results"

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10
  })

  const inputIsValid = userInput.duration >= 1;

  function handleInputChange(inputField, newValue) {
    setUserInput(prevInput => {
      return {
        ...prevInput,
        [inputField]: +newValue,
      }
    })
  }
  return (
    <>
      <Header />
      <UserInput userInput={userInput} onChange={handleInputChange} />
      {inputIsValid ? <Results input={userInput} /> : <p className="center">Please enter duration greater than zero.</p>}
    </>
  )
}

export default App
