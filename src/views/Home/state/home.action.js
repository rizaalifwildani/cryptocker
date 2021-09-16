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
    let watchLists = cookies.get("watchLists") || []
    let coinTemp = []
    cryptoService
      .getAll(1)
      .then((res) => {
        let watchListsTemp = []
        for (let index = 0; index < watchLists.length; index++) {
          // Find coin in the market

          const findCoin = res.data.find(
            (curcoint) => curcoint.id === watchLists[index].id
          )
          // if coin exist
          if (findCoin) {
            // push new data watchlist from findCoin to the watchListsTemp
            watchListsTemp.push({
              id: findCoin.id,
            })
            // push coin object
            coinTemp.push(findCoin)
            // save watchLists to the cookie
            cookies.set("watchLists", watchListsTemp, {
              path: "/",
              sameSite: "strict",
            })
          }
        }
        dispatch(requestWatchListSuccess(sortHelper.sortCoin(coinTemp)))
      })
      .catch((err) => {
        console.error(err)
        dispatch(requestWatchListSuccess([]))
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
      watchLists.push({
        id: payload.id,
      })
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
        cookies.remove("watchLists", {
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
