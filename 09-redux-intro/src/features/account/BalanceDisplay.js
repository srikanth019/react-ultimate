import { useSelector } from "react-redux";

//Currency formatter
// function formatCurrency (value) {
//   return new Intl.NumberFormat("en", {
//     style: "currency",
//     currency: "INR",
//   }).format(value);
// }

function BalanceDisplay () {
  const { balance } = useSelector((store) => store.account);
  console.log(balance);
  return <div className="balance"><span>₹</span> {balance}</div>;
}

export default BalanceDisplay;
