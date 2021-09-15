import axios from "axios"

const baseUrl = process.env.REACT_APP_CRYPTO_URL || "https://api.coingecko.com"

const cryptoService = {
  getAll: (page) => {
    return axios.get(
      `${baseUrl}/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${page}&sparkline=false&price_change_percentage=24h`
    )
  },
  getDetail: (slug) => {
    return axios.get(
      `${baseUrl}/api/v3/coins/${slug}?localization=false&market_data=true`
    )
  },
}

export default cryptoService
