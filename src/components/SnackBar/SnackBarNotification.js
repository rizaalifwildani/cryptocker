import React from "react"
import Snackbar from "@material-ui/core/Snackbar"
import PropTypes from "prop-types"
import MuiAlert from "@material-ui/lab/Alert"

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export default function SnackbarNotification({ open, type, message, onClose }) {
  return (
    <Snackbar open={open} autoHideDuration={1000} onClose={onClose}>
      <Alert onClose={onClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  )
}

SnackbarNotification.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  type: PropTypes.string,
  message: PropTypes.string,
}
