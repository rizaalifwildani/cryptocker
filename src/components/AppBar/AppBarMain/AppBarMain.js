import React from "react"
import Toolbar from "@material-ui/core/Toolbar"
import AppBar from "@material-ui/core/AppBar"
import Typography from "@material-ui/core/Typography"
import logo from "../../../assets/images/logo.svg"
import ButtonLink from "../../Button/ButtonLink"
import routerHelper from "../../../helpers/router.helper"
import ButtonIcon from "../../Button/ButtonIcon"
import ArrowBackIcon from "@material-ui/icons/ArrowBackIosRounded"
import { useLocation, useHistory } from "react-router-dom"

export default function AppBarMain() {
  const location = useLocation()
  const history = useHistory()

  return (
    <section className="app-bar">
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        className="appbar border-bottom mb-4"
      >
        <Toolbar className="justify-content-center justify-content-lg-start justify-content-xl-start justify-content-md-start">
          {location.pathname !== routerHelper.HOME &&
            location.pathname !== routerHelper.MARKET && (
              <div className="btn-back d-lg-none flex-grow-1">
                <ButtonIcon
                  icon={<ArrowBackIcon />}
                  onClick={() => {
                    history.goBack()
                  }}
                />
              </div>
            )}
          <img width="25" src={logo} className="logo mr-2" alt="logo" />
          <Typography
            variant="h6"
            className="flex-md-grow-1 flex-lg-grow-1 flex-xl-grow-1 mt-1 font-weight-bold"
          >
            CRYPTOCKER
          </Typography>
          <div className="navigation-menu d-none d-md-block d-lg-block d-xl-block">
            <ButtonLink
              className="h5"
              to={routerHelper.HOME}
              text="Watchlists"
            />
            <ButtonLink className="h5" to={routerHelper.MARKET} text="Market" />
          </div>
        </Toolbar>
      </AppBar>
      <style jsx="true">{`
        .appbar .btn-back {
          position: absolute;
          left: 0;
          top: 0;
          margin-top: 7px;
        }
        .navigation-menu .button {
          "&.active": {
            background-color: blue;
          }
        }
      `}</style>
    </section>
  )
}
