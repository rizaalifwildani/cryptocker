import { detailTypes } from "./detail.action"

const initialState = {
  loadingDetail: false,
  detail: null,
  errorDetail: null,
}

export default function detailState(state = initialState, { type, payload }) {
  switch (type) {
    case detailTypes.REQUEST_DETAIL:
      return { ...state, loadingDetail: true }
    case detailTypes.REQUEST_DETAIL_SUCCESS:
      return { ...state, detail: payload, loadingDetail: false }
    case detailTypes.REQUEST_DETAIL_FAIL:
      return { ...state, errorDetail: payload, loadingDetail: false }
    default:
      return state
  }
}
