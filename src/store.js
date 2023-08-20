import { createStore } from 'redux';

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'account/deposit':
      return { ...state, balance: state.balance + payload };

    case 'account/withdraw':
      return { ...state, balance: state.balance - payload };

    case 'account/requestLoan':
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: payload.amount,
        loanPurpose: payload.purpose,
        balance: state.balance + payload.amount,
      };

    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

store.dispatch({ type: 'account/deposit', payload: 500 });
console.log(store.getState());

function deposit(amount) {
  return { type: 'account/deposit', payload: 500 };
}

function withdraw(amount) {
  return { type: 'account/withdraw', payload: 500 };
}

function requestLoan(amount, purpose) {
  return {
    type: 'account/requestLoan',
    payload: {
      amount,
      purpose,
    },
  };
}

function payLoan() {
  return { type: 'account/payLoan' };
}
