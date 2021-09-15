import cryptoService from "../../../services/crypto.service"

export const detailTypes = {
  REQUEST_DETAIL: "detail/REQUEST_DETAIL",
  REQUEST_DETAIL_SUCCESS: "detail/REQUEST_DETAIL_SUCCESS",
  REQUEST_DETAIL_FAIL: "detail/REQUEST_DETAIL_FAIL",
}

export const requestDetail = (payload) => ({
  type: detailTypes.REQUEST_DETAIL,
  payload,
})

export const requestDetailSuccess = (payload) => ({
  type: detailTypes.REQUEST_DETAIL_SUCCESS,
  payload,
})

export const requestDetailFail = (payload) => ({
  type: detailTypes.REQUEST_DETAIL_FAIL,
  payload,
})

export const getDetail = (slug, loading) => {
  return (dispatch) => {
    if (loading) {
      dispatch(requestDetail())
    }
    cryptoService
      .getDetail(slug)
      .then((res) => {
        dispatch(requestDetailSuccess(res.data))
      })
      .catch((err) => {
        console.error(err)
        dispatch(requestDetailFail("Failed to fetch data"))
      })
  }
}
