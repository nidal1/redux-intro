import { combineReducers, createStore } from 'redux';

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

const initialStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: '',
};

function accountReducer(state = initialStateAccount, { type, payload }) {
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

function customerReducer(state = initialStateCustomer, { type, payload }) {
  switch (type) {
    case 'customer/createCustomer':
      return {
        ...state,
        ...payload,
      };

    case 'customer/updateName':
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

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

function CreateCustomer(fullName, nationalID) {
  return {
    type: 'account/createCustomer',
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return {
    type: 'account/updateName',
    payload: { fullName },
  };
}

console.log(store.getState());
