import { useState } from "react";

function SlowComponent () {
  // If this is too slow on your machine, reduce the `length`
  const words = Array.from({ length: 100_00 }, () => "WORD");
  return (
    <ul>
      {words.map((word, i) => (
        <li key={i + 1}>
          {i}: {word}
        </li>
      ))}
    </ul>
  );
}


function Count ({ children }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Slow counter?!?</h1>
      <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
      {children}
    </div>
  );
}

//Example for increase performance by passing SlowComponent as child component
// export default function Test () {
//   const [count, setCount] = useState(0);
//   return (
//     <div>
//       <h1>Slow counter?!?</h1>
//       <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
//       <SlowComponent />
//     </div>
//   );
// }

export default function Test () {
  return (
    <Count >
      <SlowComponent />
    </Count>
  );

}
