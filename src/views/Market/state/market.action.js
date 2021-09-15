import cryptoService from "../../../services/crypto.service"

export const marketTypes = {
  REQUEST_MARKET: "market/REQUEST_MARKET",
  REQUEST_MARKET_SUCCESS: "market/REQUEST_MARKET_SUCCESS",
  REQUEST_MARKET_FAIL: "market/REQUEST_MARKET_FAIL",
}

export const requestMarket = (payload) => ({
  type: marketTypes.REQUEST_MARKET,
  payload,
})

export const requestMarketSuccess = (payload) => ({
  type: marketTypes.REQUEST_MARKET_SUCCESS,
  payload,
})

export const requestMarketFail = (payload) => ({
  type: marketTypes.REQUEST_MARKET_FAIL,
  payload,
})

export const fetchAllMarket = (page, loading) => {
  return (dispatch) => {
    if (loading) {
      dispatch(requestMarket())
    }
    cryptoService
      .getAll(page)
      .then((res) => {
        dispatch(requestMarketSuccess(res.data))
      })
      .catch((err) => {
        console.error(err)
        dispatch(requestMarketFail("Failed to fetch data"))
      })
  }
}
