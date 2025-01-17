import React, { setGlobal } from 'reactn'
import addReactNDevTools from 'reactn-devtools'
import ReactDOM from "react-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { AppProvider } from "./App/AppContext";
import App from "./App/App";

import "../node_modules/video-react/dist/video-react.css"
import './reset.css'

const theme = createMuiTheme({
  typography: {
    fontFamily: "GothamNarrow"
  },
  palette: {
    primary: {
      main: "#222",
    }
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  },
  overrides: {
    MuiButton: {
      root: {
        fontSize: '1.5vh',
        fontWeight: 500,
        borderRadius: 20,
        textTransform: 'none',
        backgroundColor: '#353535',
        minWidth: '10vw',
        fontFamily: "'Gotham SSm A', 'Gotham SSm B', Helvetica, sans-serif",
        color: 'white',
        '&.active': {
          color: '#fff',
          backgroundColor: '#313131',
        },
        '&:hover': {
          backgroundColor: '#cacaca'
        },
        '@media (hover:none)': {
          '&:hover': {
            backgroundColor: '#cacaca'
          }
        }
      },
    },
    MuiIconButton: {
      root: {
        padding: 0,
        '&:hover': {
          backgroundColor: '#cacaca',
        }
      }
    }
  }
});

setGlobal({
  timedOut: true,
  homeClicked: true,
  playVideo: false
})

addReactNDevTools()

ReactDOM.render(
  <AppProvider>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </AppProvider>,
  document.getElementById("root")
);
