import { watchListTypes } from "./home.action"

const initialState = {
  loadingWatchList: false,
  watchLists: [],
  errorWatchList: null,
  snackbar: false,
  snackbarMessage: "Data added to watchlists",
  snackbarType: "success",
}

export default function watchListState(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case watchListTypes.REQUEST_WATCHLIST:
      return { ...state, loadingWatchList: true }
    case watchListTypes.REQUEST_WATCHLIST_SUCCESS:
      return {
        ...state,
        watchLists: payload,
        loadingWatchList: false,
      }
    case watchListTypes.REQUEST_WATCHLIST_FAIL:
      return { ...state, errorWatchList: payload, loadingWatchList: false }
    case watchListTypes.OPEN_SNACKBAR:
      return {
        ...state,
        snackbar: payload,
      }
    default:
      return state
  }
}
