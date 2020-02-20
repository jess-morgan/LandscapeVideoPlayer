import React, { useGlobal } from 'reactn'
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import { createMuiTheme, MuiThemeProvider  } from "@material-ui/core/styles"
import ReactTouchEvents from "react-touch-events"
import { animated } from 'react-spring'
import { Spring, config } from 'react-spring/renderprops'

const homeButtonStyles = createMuiTheme({
  props: {
      MuiButtonBase: {
        disableRipple: true
      }
    },
    overrides: {
      MuiButton: {
        root: {
          fontSize: '1.5vh',
          fontWeight: 600,
          borderRadius: '5vw',
          textTransform: 'none',
          backdropFilter: 'blur(0.2vw)',
          border: '2px solid white',
          fontFamily: "'Gotham SSm A', 'Gotham SSm B', Helvetica, sans-serif",
          color: 'white',
          minWidth: '8vw',
          minHeight: '4vh',
          float: 'right',
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


const useStyles = makeStyles(theme => ({
  homeIcon: {
    position: 'top',
    marginTop: -4,
    height: '1.5vh',
    marginRight: 8,
  }
}));


  const HomeButton = ({ visible }) => { 
    const classes = useStyles()
    const [homeClicked, setHomeClicked] = useGlobal('homeClicked')
    const [playVideo, setPlayVideo] = useGlobal('playVideo')
   
    return (
      <div>
      {visible ?  
        <animated.div className='home-button-overlay hide' >
         <Spring
        config={config.slow}
         delay={400}
          from={{ opacity: 1, transform: 'translate3d(0,-50px,0)'}}
           to={{ opacity: 1, transform: 'translate3d(0,0,0)' }}>
          {({ opacity , transform }) =>
        <div id='overlay' style={{ opacity, transform }} >
        <MuiThemeProvider theme={homeButtonStyles}>
        <ReactTouchEvents 
        onTap={() => {setHomeClicked(true); setPlayVideo(false)}}>
  <Button onClick={() => {setHomeClicked(true); setPlayVideo(false)}} id='home-button' className='home-button' >
    <img src='/src/VideoPlayer/home-icon.svg' className={classes.homeIcon} alt="" />
    <span >Home</span>
  </Button>
  </ReactTouchEvents>
  </MuiThemeProvider>
    </div> }
     </Spring>
     </animated.div>
     :
     <animated.div className='home-button-overlay' >
           <Spring
        config={config.slow}
         delay={400}
          from={{ opacity: 1 , transform: 'translate3d(0,0px,0)' }}
           to={{ opacity: 1, transform: 'translate3d(0,-50px,0)'  }}>
          {({ opacity, transform  }) =>
        <div id='overlay' style={{ opacity
        // , transform 
        }} >
     <MuiThemeProvider theme={homeButtonStyles}>
          <ReactTouchEvents 
          onTap={() => {setHomeClicked(true); setPlayVideo(false)}}>
    <Button onClick={() => {setHomeClicked(true); setPlayVideo(false)}} id='home-button' className='home-button' >
      <img src='/src/VideoPlayer/home-icon.svg' className={classes.homeIcon} alt="" />
      <span >Home</span>
    </Button>
    </ReactTouchEvents>
    </MuiThemeProvider>
    </div> }
     </Spring>
     </animated.div>
     }
  </div>
  )
}


export default HomeButton
