import Bill from "./components/Bill";
import BillInput from "./components/BillInput";
import Button from "./components/Button";
import { useState } from "react"
import Tip from "./components/Tip";

// const tips = [{ p: "How did you like the service.?" }, { p: "How did your friend like the service.?" }]

function App () {
  const [bill, setBill] = useState(0);
  const [tip1, setTip1] = useState(0);
  const [tip2, setTip2] = useState(0);



  function clearBill () {
    setBill(0);
  }
  function clearTip () {
    setTip1(0);
    setTip2(0);
  }

  return (
    <div className="App">
      <BillInput bill={bill} onBill={setBill} />
      <Tip tip={tip1} onTip={setTip1} >How did you like the service.?</Tip>
      <Tip tip={tip2} onTip={setTip2}  >How did your friend like the service.?</Tip>
      {bill !== 0 ? (
        <>
          <Bill bill={bill} tip1={tip1} tip2={tip2} />
          <Button clearBill={clearBill} clearTip={clearTip} />
        </>
      ) : ""}

    </div>
  );
}

export default App;
