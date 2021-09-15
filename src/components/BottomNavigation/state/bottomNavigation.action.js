export const bottomNavigationTypes = {
  OPEN_DRAWER_MAIN: "bottomNavigation/OPEN_DRAWER_MAIN",
  SELECT_COIN: "bottomNavigation/SELECT_MARKET",
}

export const openDrawerMain = (payload) => ({
  type: bottomNavigationTypes.OPEN_DRAWER_MAIN,
  payload,
})

export const selectCoin = (payload) => ({
  type: bottomNavigationTypes.SELECT_COIN,
  payload,
})
