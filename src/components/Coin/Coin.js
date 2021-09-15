import React from "react"
import PropTypes from "prop-types"
import ListItemText from "@material-ui/core/ListItemText"
import DropUpIcon from "@material-ui/icons/ArrowDropUp"
import DropDownIcon from "@material-ui/icons/ArrowDropDown"
import { useTheme } from "@material-ui/core"
import { useHistory } from "react-router"
import currencyHelper from "../../helpers/currency.helper"

export default function Coin({
  id,
  rank,
  image,
  symbol,
  name,
  price,
  priceChange,
}) {
  const theme = useTheme()
  let history = useHistory()

  return (
    <>
      <div
        onClick={() => {
          history.push(`/${id}`)
        }}
        className="rank d-flex flex-grow-1 align-items-center"
      >
        <span className="mr-4">{rank}</span>
        <div className="icon">
          <img src={image} alt={symbol} width={25} className="mr-2" />
        </div>
        <ListItemText primary={symbol.toUpperCase()} secondary={name} />
      </div>
      <div className="price d-flex align-items-center">
        <ListItemText
          primary={currencyHelper.formatUSD(price)}
          className="text-right"
          secondary={
            <span
              className="d-flex text-right align-items-center"
              style={{
                color:
                  priceChange < 0
                    ? theme.palette.error.main
                    : theme.palette.success.main,
              }}
            >
              {`${priceChange < 0 ? "" : "+"}${priceChange}`}{" "}
              {priceChange < 0 && <DropDownIcon className="mr-n1" />}{" "}
              {priceChange >= 0 && <DropUpIcon className="mr-n1" />}
            </span>
          }
        />
      </div>
    </>
  )
}

Coin.propTypes = {
  id: PropTypes.string,
  rank: PropTypes.number,
  image: PropTypes.string,
  symbol: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  priceChange: PropTypes.number,
}
