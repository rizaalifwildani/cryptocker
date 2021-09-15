import { makeStyles } from "@material-ui/styles"
import React from "react"
import PropTypes from "prop-types"
import { IconButton } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  buttonText: {
    padding: "10px",
    "&:hover": {
      color: theme.palette.text.primary,
    },
  },
}))

export default function ButtonIcon({ onClick, icon }) {
  const classes = useStyles()
  return (
    <IconButton
      color="inherit"
      size="small"
      className={classes.buttonText}
      onClick={onClick}
    >
      {icon}
    </IconButton>
  )
}

ButtonIcon.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.object,
}
