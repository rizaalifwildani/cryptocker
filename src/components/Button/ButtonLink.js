import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/styles"
import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

const useStyles = makeStyles((theme) => ({
  buttonText: {
    marginRight: "5px",
    marginLeft: "5px",
    "&:hover": {
      color: theme.palette.text.primary,
    },
  },
}))

export default function ButtonLink({ to, text }) {
  const classes = useStyles()
  return (
    <Button
      color="inherit"
      className={classes.buttonText}
      component={Link}
      to={to || ""}
    >
      <Typography variant="button">{text}</Typography>
    </Button>
  )
}

ButtonLink.propTypes = {
  to: PropTypes.string,
  text: PropTypes.string,
}
