import React, { useEffect } from "react"
import { useLocation } from "react-router"
import AppBarMain from "../../components/AppBar/AppBarMain/AppBarMain"
import BottomNavigationMain from "../../components/BottomNavigation/BottomNavigationMain"
import CryptoTable from "../../components/Table/CryptoTable"
import routerHelper from "../../helpers/router.helper"
import Button from "@material-ui/core/Button"
import AddIcon from "@material-ui/icons/Add"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllWatchList, setWatchList } from "./state/home.action"
import watcher from "../../helpers/watcher.helper"
import DrawerBottom from "../../components/Drawer/DrawerBottom"
import { Autocomplete } from "@material-ui/lab"
import { TextField, Typography } from "@material-ui/core"
import {
  openDrawerMain,
  selectCoin,
} from "../../components/BottomNavigation/state/bottomNavigation.action"
import { fetchAllMarket } from "../Market/state/market.action"

export default function Home() {
  const location = useLocation()

  const dispatch = useDispatch()

  const state = useSelector((state) => state.homeState)
  const { drawerMain, selectedCoin } = useSelector(
    (state) => state.bottomNavigationState
  )
  const { markets } = useSelector((state) => state.marketState)

  /* First Mount */
  useEffect(() => {
    dispatch(fetchAllWatchList(true)) // true => loading
    dispatch(fetchAllMarket())
  }, [])

  /* Update data every 70 seconds because on api updated cache every 70 seconds */
  watcher(() => {
    dispatch(fetchAllWatchList())
  }, 70000)

  return (
    <section className="home">
      <AppBarMain />

      {/* CONTENT */}
      <div className="container content">
        <Button
          size="small"
          variant="outlined"
          className="mb-3 d-none d-md-block d-lg-block d-xl-block"
          onClick={() => {
            dispatch(openDrawerMain(true))
          }}
        >
          <AddIcon />
        </Button>
        <CryptoTable
          data={state.watchLists}
          loading={state.loadingWatchList}
          actionType="remove"
        />
      </div>
      {/* END OF CONTENT */}

      {/* FORM ADD WATCHLIST */}
      <DrawerBottom
        open={drawerMain}
        onClose={() => {
          dispatch(openDrawerMain(false))
        }}
        onOpen={() => dispatch(openDrawerMain(true))}
      >
        <div className="form-add">
          <Autocomplete
            options={markets}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Type Coin Name"
                variant="outlined"
              />
            )}
            onChange={(e, v) => {
              dispatch(selectCoin(v))
            }}
          />
          <div className="d-flex justify-content-end">
            <Button
              onClick={() => {
                dispatch(setWatchList(selectedCoin))
                dispatch(openDrawerMain(false))
              }}
              disabled={selectedCoin ? false : true}
              size="large"
              color="inherit"
              variant="outlined"
              className="my-3"
            >
              <Typography variant="caption">Add</Typography>
            </Button>
            <Button
              onClick={() => {
                dispatch(openDrawerMain(false))
              }}
              size="large"
              variant="outlined"
              className="my-3 ml-3 d-none d-lg-block d-xl-block"
            >
              <Typography variant="caption">Cancel</Typography>
            </Button>
          </div>
        </div>
      </DrawerBottom>

      {location.pathname === routerHelper.HOME && <BottomNavigationMain />}
      <style jsx="true">{`
        .form-add {
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>
    </section>
  )
}
