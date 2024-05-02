import "./app.css";
import React, { useState } from "react";

const goal = 2;
const totalCups = 8;

// width and height are in px format
const width = 165;
const height = 350;

function App () {
  const [selectedJar, setSelectedJar] = useState(null);
  const [remaining, setRemaining] = useState(goal);
  const [percentage, setPercentage] = useState(0);
  const [waterPercentage, setWaterPercentage] = useState(0);

  const isPercentageVisible = waterPercentage !== 0;

  const handleJarClick = (index) => {
    if (index === selectedJar) {
      setSelectedJar(index - 1);
      const jarHeight = ((index - 1) / totalCups) * height;
      setWaterPercentage(jarHeight);
      setPercentage(((index - 1) / totalCups) * 100);
      setRemaining(goal - (index - 1) * 0.25);
    } else {
      setSelectedJar(index);
      const jarHeight = (index / totalCups) * height;
      setWaterPercentage(jarHeight);
      setPercentage((index / totalCups) * 100);
      setRemaining(goal - index * 0.25);
    }
  };



  return (
    <div className="text-white font-sans-serif flex flex-col items-center h-screen p-10">
      <div className="text-center">
        <div className="text-2xl mb-2 p-2 font-semibold">Drink Water</div>
        <div className="text-xl">Goal: {goal} Liters</div>
        <div
          className="bg-slate-50 border-[4px] text-blue-500 border-[#3456ce] m-3 rounded-t-md rounded-b-xl flex flex-col   items-center justify-center"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          {
            remaining > 0 ?
              <div className="remained" id="remained" style={{ height: "0px" }}>
                <span id="liters" className="font-semibold">{remaining} L</span>
                <small> Remained</small>
              </div>
              : ""
          }
          <div
            className={`bg-blue-300 flex items-center justify-center font-bold text-3xl rounded-t-md rounded-b-xl`}
            id="percentage"
            style={{ visibility: isPercentageVisible ? "visible" : "hidden", height: `${waterPercentage}px`, width: `${width - 7}px` }} //need to decrease width approx 7px
          >
            {percentage} %
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="text-xl">Select how many glasses of water you have drank:</div>
        <div className="grid grid-cols-4 gap-4 m-4 ml-7">
          {Array.from({ length: totalCups }, (_, i) => (
            <Jar
              key={i + 1}
              index={i + 1}
              isSelected={i + 1 <= selectedJar}
              handleClick={() => handleJarClick(i + 1)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

function Jar ({ isSelected, handleClick }) {
  return (
    <div className={`w-[60px] h-[100px] ${isSelected ? 'bg-blue-400 text-white' : 'bg-white text-blue-400'} text-center p-3 pt-6 rounded-b-xl border-4 border-[#3456ce]`} onClick={handleClick}>
      250 ml
    </div>
  );
}

