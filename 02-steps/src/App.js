import React, { useState } from 'react'

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App () {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const handleNext = () => {
    if (step < 3) setStep((currentStep) => currentStep + 1);
  };
  const handlePrevious = () => {
    if (step > 1) setStep((currentStep) => currentStep - 1);
  }

  console.log(step);
  return (
    <>
      <button className='close' onClick={() => setIsOpen((is) => !is)}>&times;</button>
      {isOpen && (<div className='steps'>
        <div className='numbers'>
          <div className={step >= 1 ? "active" : ""}>1</div>
          <div className={step >= 2 ? "active" : ""}>2</div>
          <div className={step === 3 ? "active" : ""}>3</div>
        </div>
        <p className='message'>Step {step}: {messages[step - 1]} </p>
        <div className='buttons'>
          <Button
            onClickHandler={handlePrevious}
            bgColor={"blue"}
            color={"white"}
          ><span>👈 Previous</span>
          </Button>
          {/* <button onClick={handlePrevious}>Previous</button> */}
          <Button
            onClickHandler={handleNext}
            bgColor={"blue"}
            color={"white"}
          ><span>Next 👉</span>
          </Button>
          {/* <button onClick={handleNext}>Next</button> */}
        </div>
      </div>
      )}
    </>
  )
}


function Button ({ bgColor, color, onClickHandler, children }) {
  return (
    <button onClick={onClickHandler} style={{ backgroundColor: bgColor, color: color }}>{children}</button>
  );
}

export default App