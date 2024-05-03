// // import "./app.css";
// import React, { useState } from "react";

// const capacity = 2;
// const totalCups = 8;

// const capacityOfCup = (capacity / totalCups).toFixed(2)

// //Water per cup in ML
// const waterPerCup = ((capacity * 1000) / totalCups).toFixed(2);

// // width and height are in px format
// const width = 165;
// const height = 350;

// function App () {
//   const [selectedJar, setSelectedJar] = useState(null);
//   const [remaining, setRemaining] = useState(capacity);
//   const [percentage, setPercentage] = useState(0);
//   const [waterPercentage, setWaterPercentage] = useState(0);

//   const handleJarClick = (index) => {
//     // without rounding values
//     /*if (index === selectedJar) {
//       setSelectedJar(index - 1);
//       const waterLevel = ((index - 1) / totalCups) * height;
//       setWaterPercentage(waterLevel);
//       setPercentage(((index - 1) / totalCups) * 100);
//       setRemaining(capacity - (index - 1) * capacityOfCup);
//     } else {
//       setSelectedJar(index);
//       const waterLevel = (index / totalCups) * height;
//       setWaterPercentage(waterLevel);
//       setPercentage((index / totalCups) * 100);
//       setRemaining(capacity - index * capacityOfCup);
//     }*/
//     if (index === selectedJar) {
//       setSelectedJar(index - 1);
//       const waterLevel = Math.round(((index - 1) / totalCups) * height * 100) / 100;
//       setWaterPercentage(waterLevel.toFixed(2));
//       setPercentage(Math.round(((index - 1) / totalCups) * 100 * 100) / 100);
//       setRemaining((capacity - (index - 1) * capacityOfCup).toFixed(2));
//     } else {
//       setSelectedJar(index);
//       const waterLevel = Math.round((index / totalCups) * height * 100) / 100;
//       setWaterPercentage(waterLevel.toFixed(2));
//       setPercentage(Math.round((index / totalCups) * 100 * 100) / 100);
//       setRemaining((capacity - index * capacityOfCup).toFixed(2));
//     }
//   };



//   return (
//     <div className="text-white font-sans-serif flex flex-col items-center h-screen p-10">
//       <div className="text-center">
//         <div className="text-2xl mb-2 p-2 font-semibold">Drink Water</div>
//         <div className="text-xl">Capacity: {capacity} Liters</div>
//         <div
//           className="bg-slate-50 border-[4px] text-blue-500 border-[#3456ce] m-3 rounded-t-md rounded-b-3xl flex flex-col   items-center justify-center"
//           style={{ width: `${width}px`, height: `${height}px` }}
//         >
//           {
//             remaining > 0 ?
//               <div
//                 className="flex flex-col items-center justify-center text-center flex-1"
//                 id="remained"
//                 style={{ height: "0px" }}
//               >
//                 <span id="liters" className="font-semibold">{remaining} L</span>
//                 <small> Remained</small>
//               </div>
//               : ""
//           }
//           {percentage > 0 ? <div
//             className={`bg-blue-300 flex items-center justify-center font-bold text-3xl rounded-t-md rounded-b-3xl`}
//             id="percentage"
//             style={{ height: `${waterPercentage}px`, width: `${width - 7}px` }} //need to decrease width approx 7px
//           >
//             {percentage} %
//           </div> : ""
//           }
//         </div>
//       </div>
//       <div className="mt-6">
//         <div className="text-xl">Select how many glasses of water you have drank:</div>
//         <div className="grid grid-cols-4 gap-4 m-4 ml-7">
//           {Array.from({ length: totalCups }, (_, i) => (
//             <Jar
//               key={i + 1}
//               index={i + 1}
//               isSelected={i + 1 <= selectedJar}
//               handleClick={() => handleJarClick(i + 1)}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// function Jar ({ isSelected, handleClick }) {
//   return (
//     <div className={`w-[75px] h-[100px] ${isSelected ? 'bg-blue-300 text-white' : 'bg-white text-blue-500'} text-center p-2 pt-6 rounded-b-2xl rounded-t-md border-4 border-[#3456ce]`} onClick={handleClick}>
//       {waterPerCup} ml
//     </div>
//   );
// }

import DrinkWater from "./components/DrinkWater"
import UserInput from "./components/UserInput"


function App () {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-8 mb-4">Hello from drink Water</h1>
      <div className="flex w-full">
        <div className="w-1/3">
          <UserInput />
        </div>
        <main className="w-2/3">
          <DrinkWater />
        </main>
      </div>
    </div>
  );
}


export default App


