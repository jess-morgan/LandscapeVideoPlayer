import React, { useGlobal } from 'reactn'
import Button from "@material-ui/core/Button"
import { createMuiTheme, MuiThemeProvider  } from "@material-ui/core/styles"

const landingButton = createMuiTheme({
    props: {
        MuiButtonBase: {
          disableRipple: true
        }
      },
      overrides: {
        MuiButton: {
          root: {
            fontSize: '2vh',
            fontWeight: 500,
            borderRadius: '5vw',
            textTransform: 'none',
            backdropFilter: 'blur(0.2vw)',
            border: '2px solid white',
            fontFamily: "'Gotham SSm A', 'Gotham SSm B', Helvetica, sans-serif",
            color: 'white',
            minWidth: '10vw',
            minHeight: '6vh',
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
    }
  });

const ExploreButton = (props) => {
  const [timedOut, setTimedOut] = useGlobal('timedOut')

    return ( 
        <MuiThemeProvider theme={landingButton}>
      <Button onClick={() => setTimedOut(false)} style={{ marginLeft: '44%', marginTop: '60vh', fontWeight: 600}} >
       {props.text}
      </Button>
      </MuiThemeProvider>
    )
}

export default ExploreButton
