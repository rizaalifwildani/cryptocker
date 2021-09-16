import React from "react"
import BottomNavigation from "@material-ui/core/BottomNavigation"
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction"
import ListIcon from "@material-ui/icons/List"
import TrendingUpIcon from "@material-ui/icons/TrendingUp"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import ButtonIcon from "../Button/ButtonIcon"
import { useLocation, useHistory } from "react-router-dom"
import routerHelper from "../../helpers/router.helper"
import { useTheme } from "@material-ui/core"
import { useDispatch } from "react-redux"
import { openDrawerMain } from "./state/bottomNavigation.action"

export default function BottomNavigationMain() {
  const location = useLocation()
  const theme = useTheme()
  const history = useHistory()

  const dispatch = useDispatch()

  const menus = [
    {
      label: "Watchlists",
      icon: <ListIcon />,
      route: routerHelper.HOME,
      class: "mr-5",
    },
    {
      label: "Market",
      icon: <TrendingUpIcon />,
      route: routerHelper.MARKET,
      class: "ml-5",
    },
  ]

  return (
    <section className="bottom-navigation">
      <BottomNavigation
        onChange={(event, newValue) => {
          history.push(menus[newValue].route)
        }}
        showLabels
        style={{ backgroundColor: theme.palette.secondary.dark }}
        className="navigation-main d-md-none d-lg-none d-xl-none"
      >
        {menus.map((menu) => (
          <BottomNavigationAction
            key={menu.route}
            className={
              location.pathname !== routerHelper.HOME ? "" : menu.class
            }
            label={menu.label}
            icon={menu.icon}
          />
        ))}
      </BottomNavigation>

      {/* BUTTON ADD WATCHLIST */}
      <div
        className={`btn-add-watchlist d-md-none d-lg-none d-xl-none ${
          location.pathname !== routerHelper.HOME ? "d-none" : ""
        }`}
      >
        <ButtonIcon
          icon={<AddCircleIcon className="icon" />}
          onClick={() => {
            dispatch(openDrawerMain(true))
          }}
        />
      </div>

      <style jsx="true">{`
        .navigation-main {
          width: 100%;
          position: fixed;
          bottom: 0;
          z-index: 1;
        }
        .btn-add-watchlist {
          position: absolute;
          bottom: 0;
          right: 0;
          left: 0;
          text-align: center;
          padding-bottom: 10px;
        }
        .btn-add-watchlist .icon {
          font-size: 70px;
          background-color: #000;
          border-radius: 100%;
          padding: 2px;
          z-index: 2;
        }
      `}</style>
    </section>
  )
}
