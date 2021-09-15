import { combineReducers } from "redux"
import bottomNavigationState from "../components/BottomNavigation/state/bottomNavigation.state"
import homeState from "../views/Home/state/home.state"
import marketState from "../views/Market/state/market.state"
import detailState from "../views/Detail/state/detail.state"

const reducers = combineReducers({
  bottomNavigationState,
  homeState,
  marketState,
  detailState,
})

export default reducers
