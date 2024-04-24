import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deposit, withdraw, requestLoan, payLoan, clearBalance } from "./AccountSlice"

function AccountOperations () {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("INR");

  const dispatch = useDispatch();

  const { loan: currentLoan, loanPurpose: crrLoanPurpose, balance: currentBalance, isLoading } = useSelector((store) => store.account);

  console.log(currentLoan);

  function handleDeposit () {
    if (!depositAmount) return
    dispatch(deposit(depositAmount, currency))
    setDepositAmount("");
    setCurrency("INR");
  }

  function handleWithdrawal () {
    if (!withdrawalAmount) return
    dispatch(withdraw(withdrawalAmount, currency))
    setWithdrawalAmount("");
  }

  function handleRequestLoan () {
    if (currentLoan > 0 || loanAmount < 0 || !loanPurpose) return
    dispatch(requestLoan({ amount: loanAmount, purpose: loanPurpose }))
    setLoanAmount("");
    setLoanPurpose("");
  }

  function handlePayLoan () {
    dispatch(payLoan())
    setLoanAmount("");
  }

  function handleClearBalance () {
    dispatch(clearBalance())
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label htmlFor="deposit">Deposit</label>
          <input
            id="deposit"
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="INR">Indian Rupee</option>
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
          </select>

          <button onClick={handleDeposit} disabled={isLoading}>{isLoading ? "Converting..." : `Deposit ${depositAmount}`}</button>
        </div>

        <div>
          <label htmlFor="withdraw">Withdraw</label>
          <input
            id="withdraw"
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label htmlFor="loanRequest">Request loan</label>
          <input
            id="loanRequest"
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        {currentLoan > 0 ? (<div>
          <span>Pay back ₹ {currentLoan} : ({crrLoanPurpose}) </span>
          <button onClick={handlePayLoan}>Pay loan</button>
        </div>) : ""}
        {currentLoan === 0 && currentBalance > 0 ? (<div>
          <button onClick={handleClearBalance}>Clear Account</button>
        </div>) : ""}
      </div>
    </div>
  );
}

export default AccountOperations;
