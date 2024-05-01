import { useState } from "react"
function App () {

  const [selectedJar, setSelectedJar] = useState(null);

  // Function to handle clicking on a jar
  const handleJarClick = (index) => {

    if (selectedJar === index) {
      setSelectedJar(index - 1)
    } else {
      setSelectedJar(index);
    }
  };

  return (
    <div className="bg-blue-400 text-white font-sans-serif flex flex-col items-center h-screen p-10">
      <div className="text-center">
        <div className="text-2xl mb-2 p-2 font-semibold">Drink Water</div>
        <div className="text-xl ">Goal: 2 Liters</div>
        <div className="w-[165Px] h-[350px] bg-slate-50 border-[4px] text-blue-500 border-[#3456ce] m-3 rounded-t-none rounded-b-xl flex items-center justify-center">
          <div class="remained" id="remained">
            <span id="liters">2 L</span>
            <small> Remained</small>
          </div>

          <div class="percentage" id="percentage"></div>
        </div>
      </div>
      <div className="mt-6">
        <div className="text-xl">Select how many glasses of water you have drank:</div>
        <div className="grid grid-cols-4 gap-4 m-4 ml-7">
          {Array.from({ length: 8 }, (_, i) => (
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

export default App

function Jar ({ isSelected, handleClick }) {
  return (
    <div className={`w-[60px] h-[100px] ${isSelected ? 'bg-blue-400 text-white' : 'bg-white text-blue-400'
      } text-center p-3 pt-6 rounded-b-xl border-4 border-[#3456ce]`} onClick={handleClick}>
      250 ml
    </div>
  )
}
