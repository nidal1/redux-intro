const initialStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: '',
};

export default function customerReducer(
  state = initialStateCustomer,
  { type, payload }
) {
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

export function CreateCustomer(fullName, nationalID) {
  return {
    type: 'account/createCustomer',
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

export function updateName(fullName) {
  return {
    type: 'account/updateName',
    payload: { fullName },
  };
}
