import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false,
}

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        deposit (state, action) {
            state.balance += action.payload;
            state.isLoading = false
        },
        withdraw (state, action) {
            state.balance -= action.payload
        },
        requestLoan (state, action) {
            state.balance += action.payload.amount
            state.loan = action.payload.amount;
            state.loanPurpose = action.payload.purpose;
        },
        payLoan (state) {
            state.balance -= state.loan;
            state.loan = 0;
            state.loanPurpose = "";
        },
        clearBalance (state) {
            state.balance = 0;
        },
        convertingCurrency (state, action) {
            state.isLoading = true;
        }
    }
})

export const { withdraw, requestLoan, payLoan, clearBalance } = accountSlice.actions;

export default accountSlice.reducer;

export function deposit (amount, currency) {
    return async function (dispatch) {
        dispatch({ type: "account/convertingCurrency" });

        let payload;
        if (currency === "INR") {
            payload = amount;
        } else {
            const res = await fetch(
                `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=INR`
            );
            const data = await res.json();
            payload = data.rates.INR;
        }

        dispatch({ type: "account/deposit", payload });
    };
}