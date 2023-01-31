import { SUBMIT_KYC } from "../actions/types";

const initialState = {
  kycData: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SUBMIT_KYC:
      return {
        ...state,
        kycData: payload,
      };

    default:
      return state;
  }
};
