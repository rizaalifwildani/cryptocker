import React, { useEffect } from "react"
import AppBarMain from "../../components/AppBar/AppBarMain/AppBarMain"
import { useTheme } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import DropUpIcon from "@material-ui/icons/ArrowDropUp"
import DropDownIcon from "@material-ui/icons/ArrowDropDown"
import { useDispatch, useSelector } from "react-redux"
import { getDetail } from "./state/detail.action"
import { useParams } from "react-router"
import parse from "html-react-parser"
import SkeletonDetail from "../../components/Skeleton/SkeletonDetail"
import currencyHelper from "../../helpers/currency.helper"
import watcher from "../../helpers/watcher.helper"

export default function Detail() {
  const theme = useTheme()
  const dispatch = useDispatch()
  const { slug } = useParams()

  const state = useSelector((state) => state.detailState)

  /* First Mount */
  useEffect(() => {
    dispatch(getDetail(slug, true)) // true = loading
  }, [])

  /* Update data every 70 seconds because on api updated cache every 70 seconds */
  watcher(() => {
    dispatch(getDetail(slug))
  }, 70000)

  return (
    <section className="detail">
      <AppBarMain />

      {/* CONTENT */}
      <div className="container content">
        {state.loadingDetail && <SkeletonDetail />}
        {state.detail && !state.loadingDetail && (
          <div className="coin-description">
            {/* TITLE */}
            <div className="coin-title d-flex align-items-center">
              <img
                src={state.detail.image.large}
                alt={state.detail.symbol}
                width="30"
                className="mr-2"
              />
              <div className="coin-name d-flex align-items-end mt-1">
                <Typography variant="h4" className="font-weight-bold mr-2">
                  {state.detail.name}
                </Typography>
                <Typography
                  variant="h6"
                  style={{ color: theme.palette.text.disabled }}
                  className="font-weight-bold"
                >
                  {state.detail.symbol.toUpperCase()}
                </Typography>
              </div>
            </div>

            {/* PRICE */}
            <div className="coin-price d-flex justify-content-between align-items-end mt-4">
              <Typography variant="h5" className="font-weight-bold">
                {currencyHelper.formatUSD(
                  state.detail.market_data.current_price.usd
                )}
              </Typography>
              <Typography variant="body1" className="font-weight-bold">
                <span
                  className="d-flex text-right align-items-center"
                  style={{
                    color:
                      state.detail.market_data.price_change_percentage_24h < 0
                        ? theme.palette.error.main
                        : theme.palette.success.main,
                  }}
                >
                  {`${
                    state.detail.market_data.price_change_percentage_24h < 0
                      ? ""
                      : "+"
                  }${
                    state.detail.market_data.price_change_percentage_24h
                  }%`}{" "}
                  {state.detail.market_data.price_change_percentage_24h < 0 && (
                    <DropDownIcon className="mr-n1" />
                  )}{" "}
                  {state.detail.market_data.price_change_percentage_24h >=
                    0 && <DropUpIcon className="mr-n1" />}
                </span>
              </Typography>
            </div>

            {/* RANK */}
            <div className="coin-rank mt-4">
              <div className="row">
                <div className="col col-6 py-2 border-top border-bottom border-right">
                  <Typography variant="caption">RANK</Typography>
                  <Typography variant="h6" className="font-weight-bold">
                    {state.detail.market_cap_rank}
                  </Typography>
                </div>
                <div className="col col-6 py-2 border-top border-bottom">
                  <Typography variant="caption">MARKET CAP</Typography>
                  <Typography variant="h6" className="font-weight-bold" noWrap>
                    {currencyHelper.formatUSD(
                      state.detail.market_data.market_cap.usd
                    )}
                  </Typography>
                </div>
                <div className="col col-6 py-2 border-bottom border-right">
                  <Typography variant="caption">CIRCULATING SUPPLY</Typography>
                  <Typography variant="h6" className="font-weight-bold" noWrap>
                    {state.detail.market_data.circulating_supply} BTC
                  </Typography>
                </div>
                <div className="col col-6 py-2 border-bottom">
                  <Typography variant="caption">VOLUME (1D)</Typography>
                  <Typography variant="h6" className="font-weight-bold" noWrap>
                    {currencyHelper.formatUSD(
                      state.detail.market_data.total_volume.usd
                    )}
                  </Typography>
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <Typography variant="h6" className="mt-3">
              Description :
            </Typography>
            <Typography variant="body1" className="py-3">
              {parse(state.detail.description.en)}
            </Typography>
          </div>
        )}
      </div>
      {/* END OF CONTENT */}
    </section>
  )
}
