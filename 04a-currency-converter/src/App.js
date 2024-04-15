// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import { useState, useEffect } from "react";
export default function App () {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("INR")
  const [to, setTo] = useState("USD")
  const [result, setResult] = useState("")
  const [loader, setLoader] = useState(false)

  function onFrom (value) {
    setFrom(value)
  }

  function onTo (value) {
    setTo(value)
  }

  function onInput (amount) {
    setAmount(amount)
  }

  useEffect(() => {
    const currencyData = async () => {
      if (from === to) {
        setResult(amount)
      } else {
        setLoader(true)
        const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`)
        const data = await response.json();
        console.log(data);

        setResult(data?.rates[to]);
        setLoader(false)
      }
    }
    if (amount > 0) {
      currencyData()
    }
  }, [amount, from, to]
  )

  let content;
  if (loader) {
    content = "Loading...";
  } else if (amount > 0) {
    content = result;
  } else {
    content = "";
  }


  return (
    <div>
      <input type="text"
        value={amount}
        onChange={(e) => onInput(Number(e.target.value))}
        disabled={loader}
      />
      <select
        value={from}
        onChange={(e) => onFrom(e.target.value)}
        disabled={loader}
      >
        <option value="INR">INR</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
      </select>
      <select
        value={to}
        onChange={(e) => onTo(e.target.value)}
        disabled={loader}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      {/* <p>{loader ? "Loading..." : amount > 0 ? result : ""} </p> */}
      <p>{content}</p>
    </div>
  );
}

