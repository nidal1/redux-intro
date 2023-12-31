import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    deposit(state, { payload }) {
      state.balance += payload;
      state.isLoading = false;
    },
    withdraw(state, { payload }) {
      state.balance -= payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: {
            amount,
            purpose,
          },
        };
      },
      reducer(state, { payload }) {
        if (state.loan > 0) return;

        state.loan = payload.loan;
        state.loanPurpose = payload.purpose;
        state.balance += payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = '';
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount, currency) {
  if (currency === 'USD') return { type: 'account/deposit', payload: 500 };
  return async (dispatch, state) => {
    dispatch({ type: 'account/convertingCurrency' });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;

    dispatch({ type: 'account/deposit', payload: converted });
  };
}

export default accountSlice.reducer;

// export default function accountReducer(
//   state = initialStateAccount,
//   { type, payload }
// ) {
//   switch (type) {
//     case 'account/deposit':
//       return { ...state, balance: state.balance + payload, isLoading: false };

//     case 'account/withdraw':
//       return { ...state, balance: state.balance - payload };

//     case 'account/requestLoan':
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: payload.amount,
//         loanPurpose: payload.purpose,
//         balance: state.balance + payload.amount,
//       };

//     case 'account/payLoan':
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: '',
//         balance: state.balance - state.loan,
//       };

//     case 'account/convertingCurrency':
//     default:
//       return { ...state, isLoading: true };
//   }
// }

// export function withdraw(amount) {
//   return { type: 'account/withdraw', payload: 500 };
// }

// export function requestLoan(amount, purpose) {
//   return {
//     type: 'account/requestLoan',
//     payload: {
//       amount,
//       purpose,
//     },
//   };
// }

// export function payLoan() {
//   return { type: 'account/payLoan' };
// }
