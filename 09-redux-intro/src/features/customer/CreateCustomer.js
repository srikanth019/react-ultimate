import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "./CustomerSlice.js";
function Customer () {
  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");

  const dispatch = useDispatch();

  function handleClick () {
    dispatch(createCustomer({ fullName, nationalId }));
    setFullName("");
    setNationalId("");
  }

  return (
    <div>
      <h2>Create new customer</h2>
      <div className="inputs">
        <div>
          <label htmlFor="fullName">Customer full name</label>
          <input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="nationalId">National ID</label>
          <input
            id="nationalId"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
          />
        </div>
        <button onClick={handleClick}>Create new customer</button>
      </div>
    </div>
  );
}

export default Customer;
