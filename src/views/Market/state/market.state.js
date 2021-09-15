import { marketTypes } from "./market.action"

const initialState = {
  loadingMarket: false,
  markets: [],
  errorMarket: null,
}

export default function marketState(state = initialState, { type, payload }) {
  switch (type) {
    case marketTypes.REQUEST_MARKET:
      return { ...state, loadingMarket: true }
    case marketTypes.REQUEST_MARKET_SUCCESS:
      return { ...state, markets: payload, loadingMarket: false }
    case marketTypes.REQUEST_MARKET_FAIL:
      return { ...state, errorMarket: payload, loadingMarket: false }
    default:
      return state
  }
}
