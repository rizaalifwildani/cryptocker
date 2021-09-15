import React from "react"
import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Divider from "@material-ui/core/Divider"
import DropDownIcon from "@material-ui/icons/ArrowDropDown"
import PropTypes from "prop-types"
import EmptyData from "../Static/EmptyData"
import Coin from "../Coin/Coin"
import SkeletonTable from "../Skeleton/SkeletonTable"
import AddIcon from "@material-ui/icons/Add"
import DeleteIcon from "@material-ui/icons/Delete"
import { useDispatch } from "react-redux"
import {
  setWatchList,
  unsetWatchList,
} from "../../views/Home/state/home.action"

export default function CryptoTable({
  data = [],
  loading = false,
  actionType = null,
}) {
  const dispatch = useDispatch()

  return (
    <>
      <section className="crypto-table">
        {/* HEADER */}
        <div className="table-header container d-flex justify-content-between">
          <Typography variant="caption">
            RANK
            <DropDownIcon />
          </Typography>
          <Typography variant="caption">PRICE</Typography>
        </div>
        {/* CONTENT */}
        {!loading && (
          <div className="table-content">
            {data.length <= 0 && <EmptyData />}
            {data.map((d, i) => (
              <List key={`market-${d.id}`} dense>
                {i == 0 && <Divider />}
                <ListItem button>
                  <ListItemText>
                    <div className="d-flex justify-content-between align-items-center">
                      <Coin
                        id={d.id}
                        rank={d.market_cap_rank}
                        image={d.image}
                        symbol={d.symbol}
                        name={d.name}
                        price={d.current_price}
                        priceChange={d.price_change_percentage_24h}
                      />
                      {actionType === "add" ? (
                        <AddIcon
                          onClick={() => {
                            dispatch(setWatchList(d))
                          }}
                          className="mr-n1 ml-3"
                        />
                      ) : (
                        <DeleteIcon
                          onClick={() => {
                            dispatch(unsetWatchList(d))
                          }}
                          className="mr-n1 ml-3"
                        />
                      )}
                    </div>
                  </ListItemText>
                </ListItem>
                <Divider />
              </List>
            ))}
          </div>
        )}
        {loading && <SkeletonTable />}
      </section>
    </>
  )
}

CryptoTable.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  actionType: PropTypes.string,
}
