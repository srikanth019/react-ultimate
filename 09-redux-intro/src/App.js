import CreateCustomer from "./features/customer/CreateCustomer";
import Customer from "./features/customer/Customer";
import AccountOperations from "./features/account/AccountOperations";
import BalanceDisplay from "./features/account/BalanceDisplay";
import { useSelector } from "react-redux";
import CloseAccount from "./features/account/CloseAccount";

function App () {
  const { fullName } = useSelector((store) => store.customer)
  console.log(fullName);

  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {fullName === "" ? <CreateCustomer /> :
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
          <CloseAccount />
        </>}
    </div>
  );
}

export default App;
