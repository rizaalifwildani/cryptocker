import cryptoService from "../../../services/crypto.service"
import Cookies from "universal-cookie"
import sortHelper from "../../../helpers/sortData.helper"

const cookies = new Cookies()

export const watchListTypes = {
  REQUEST_WATCHLIST: "home/REQUEST_WATCHLIST",
  REQUEST_WATCHLIST_SUCCESS: "home/REQUEST_WATCHLIST_SUCCESS",
  REQUEST_WATCHLIST_FAIL: "home/REQUEST_WATCHLIST_FAIL",
  OPEN_SNACKBAR: "home/OPEN_SNACKBAR",
}

export const requestWatchList = (payload) => ({
  type: watchListTypes.REQUEST_WATCHLIST,
  payload,
})

export const requestWatchListSuccess = (payload) => ({
  type: watchListTypes.REQUEST_WATCHLIST_SUCCESS,
  payload,
})

export const requestWatchListFail = (payload) => ({
  type: watchListTypes.REQUEST_WATCHLIST_FAIL,
  payload,
})

export const fetchAllWatchList = (loading) => {
  return (dispatch) => {
    if (loading) {
      dispatch(requestWatchList())
    }
    const watchLists = cookies.get("watchLists") || []
    cryptoService
      .getAll(1)
      .then((res) => {
        let watchListsTemp = watchLists
        watchLists.map((w, i) => {
          // Find coin in the market
          const findCoin = res.data.find((c) => c.id === w.id)
          // if coin exist
          if (findCoin) {
            // remove current watchlist
            watchListsTemp.splice(i, 1)
            // push new data watchlist from findCoin to the watchListsTemp
            watchListsTemp.push(findCoin)
            // save watchListsTemp to the cookie
            cookies.set("watchLists", watchListsTemp, {
              path: "/",
              sameSite: "strict",
            })
          }
        })
        dispatch(requestWatchListSuccess(sortHelper.sortCoin(watchListsTemp)))
      })
      .catch((err) => {
        console.error(err)
        dispatch(requestWatchListSuccess(watchLists))
      })
  }
}

export const openSnackBar = (payload) => ({
  type: watchListTypes.OPEN_SNACKBAR,
  payload,
})

export const setWatchList = (payload) => {
  return (dispatch) => {
    let watchLists = cookies.get("watchLists") || []
    const find = watchLists.find((w) => w.id === payload.id)
    if (!find) {
      watchLists.push(payload)
      cookies.set("watchLists", watchLists, {
        path: "/",
        sameSite: "strict",
      })
      dispatch(fetchAllWatchList())
      dispatch(openSnackBar(true))
    }
  }
}

export const unsetWatchList = (payload) => {
  return (dispatch) => {
    let watchLists = cookies.get("watchLists") || []
    const find = watchLists.find((w) => w.id === payload.id)
    if (find) {
      const watchListIndex = watchLists.indexOf(find)
      if (watchListIndex > -1) {
        watchLists.splice(watchListIndex, 1)
        cookies.remove("watchLists", watchLists, {
          path: "/",
          sameSite: "strict",
        })
        cookies.set("watchLists", watchLists, {
          path: "/",
          sameSite: "strict",
        })
        dispatch(fetchAllWatchList())
      }
    }
  }
}
