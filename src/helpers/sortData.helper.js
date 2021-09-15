const sortHelper = {
  sortCoin: (arr) => {
    return arr.sort(function (a, b) {
      let rankA = a.market_cap_rank,
        rankB = new Date(b.market_cap_rank)
      // Compare the 2 dates
      if (rankA < rankB) return -1
      if (rankA > rankB) return 1
      return 0
    })
  },
}

export default sortHelper
