import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router"
import AppBarMain from "../../components/AppBar/AppBarMain/AppBarMain"
import BottomNavigationMain from "../../components/BottomNavigation/BottomNavigationMain"
import SnackbarNotification from "../../components/SnackBar/SnackBarNotification"
import CryptoTable from "../../components/Table/CryptoTable"
import routerHelper from "../../helpers/router.helper"
import watcher from "../../helpers/watcher.helper"
import { openSnackBar } from "../Home/state/home.action"
import { fetchAllMarket } from "./state/market.action"

export default function Market() {
  const location = useLocation()

  const dispatch = useDispatch()

  const state = useSelector((state) => state.marketState)
  const homeState = useSelector((state) => state.homeState)

  /* First Mount */
  useEffect(() => {
    dispatch(openSnackBar(false))
    dispatch(fetchAllMarket(1, true)) // true => loading
  }, [])

  /* Update data every 70 seconds because on api updated cache every 70 seconds */
  watcher(() => {
    dispatch(fetchAllMarket(1))
  }, 70000)

  return (
    <section className="home">
      <AppBarMain />

      {/* CONTENT */}
      <div className="container content mb-5">
        <CryptoTable
          data={state.markets}
          loading={state.loadingMarket}
          actionType="add"
        />
      </div>
      {/* END OF CONTENT */}

      <SnackbarNotification
        open={homeState.snackbar}
        message={homeState.snackbarMessage}
        type={homeState.snackbarType}
        onClose={() => {
          dispatch(openSnackBar(false))
        }}
      />

      {location.pathname === routerHelper.MARKET && <BottomNavigationMain />}
    </section>
  )
}
