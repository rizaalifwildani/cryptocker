import React from "react"
import ReactDOM from "react-dom"

/* PWA */
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"
import reportWebVitals from "./reportWebVitals"

/* STYLE */
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "@material-ui/styles"
import { createTheme } from "@material-ui/core/"
import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/css/global.css"

/* REDUX */
import { Provider } from "react-redux"
import store from "./redux/store"

/* HELPER */
import routerHelper from "./helpers/router.helper"

/* VIEWS */
import Home from "./views/Home/Home"
import Detail from "./views/Detail/Detail"
import Market from "./views/Market/Market"

/* ROUTES */
import { createBrowserHistory } from "history"
const history = createBrowserHistory()
import { Route, Router, Switch } from "react-router-dom"

const theme = createTheme({
  typography: {
    fontFamily: [
      "Avenir",
      "-apple-system",
      "system-ui",
      "'Segoe UI'",
      "Roboto",
      "'Helvetica Neue'",
      "Arial",
      "sans-serif",
      "'Apple Color Emoji'",
      "'Segoe UI Emoji'",
      "'Segoe UI Symbol'",
    ].join(","),
  },
  palette: {
    type: "dark",
    background: {
      default: "#080A0B",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#1a2129",
      contrastText: "#000",
    },
  },
})

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route exact path={routerHelper.HOME} component={Home} />
          </Switch>
          <Switch>
            <Route exact path={routerHelper.MARKET} component={Market} />
          </Switch>
          <Switch>
            <Route exact path="/:slug" component={Detail} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
