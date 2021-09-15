import { bottomNavigationTypes } from "./bottomNavigation.action"

const initialState = {
  drawerMain: false,
  selectedCoin: null,
}

export default function bottomNavigationState(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case bottomNavigationTypes.OPEN_DRAWER_MAIN:
      return { ...state, drawerMain: payload }
    case bottomNavigationTypes.SELECT_COIN:
      return { ...state, selectedCoin: payload }
    default:
      return state
  }
}
