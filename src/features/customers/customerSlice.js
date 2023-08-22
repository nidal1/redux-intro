import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fullName: '',
  nationalID: '',
  createdAt: '',
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalID, createdAt) {
        return {
          payload: {
            fullName,
            nationalID,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(state, { payload }) {
        state.fullName = payload.fullName;
        state.nationalID = payload.nationalID;
        state.createdAt = payload.createdAt;
      },
    },
  },
  updateName(state, { payload }) {
    state.fullName = payload;
  },
});

export const { createCustomer, updateName } = customerSlice.actions;

export default customerSlice.reducer;

// export default function customerReducer(
//   state = initialStateCustomer,
//   { type, payload }
// ) {
//   switch (type) {
//     case 'customer/createCustomer':
//       return {
//         ...state,
//         fullName: payload.fullName,
//         nationalID: payload.nationalID,
//         createdAt: payload.createdAt,
//       };

//     case 'customer/updateName':
//       return {
//         ...state,
//         ...payload,
//       };

//     default:
//       return state;
//   }
// }

// export function createCustomer(fullName, nationalID) {
//   return {
//     type: 'customer/createCustomer',
//     payload: { fullName, nationalID, createdAt: new Date().toISOString() },
//   };
// }

// export function updateName(fullName) {
//   return {
//     type: 'customer/updateName',
//     payload: { fullName },
//   };
// }
