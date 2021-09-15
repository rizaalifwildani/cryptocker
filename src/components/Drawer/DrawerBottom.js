import React from "react"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
import Divider from "@material-ui/core/Divider"
import PropTypes from "prop-types"
import { useTheme } from "@material-ui/core"

export default function DrawerBottom({ open, children, onClose, onOpen }) {
  const theme = useTheme()

  return (
    <>
      <React.Fragment>
        <SwipeableDrawer
          anchor="bottom"
          open={open}
          onClose={onClose}
          onOpen={onOpen}
          className="drawer-bottom"
        >
          <Divider className="drawer-line d-lg-none d-xl-none" />
          <div className="container drawer-content mt-5">{children}</div>
        </SwipeableDrawer>
      </React.Fragment>
      <style jsx="true">{`
        .drawer-bottom .MuiDrawer-paperAnchorBottom {
          height: 500px;
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
          background-color: ${theme.palette.secondary.dark};
        }
        .drawer-bottom .MuiDrawer-paperAnchorBottom .drawer-line {
          width: 100px;
          height: 3px;
          margin-top: 15px;
          margin-left: auto;
          margin-right: auto;
          border-radius: 50px;
          background: ${theme.palette.text.primary};
        }
      `}</style>
    </>
  )
}

DrawerBottom.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.object,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
}
