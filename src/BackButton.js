import React, { useState, useEffect, useGlobal } from 'reactn'
import { makeStyles } from "@material-ui/core/styles"
import ReactTouchEvents from "react-touch-events"
import { Spring, config } from 'react-spring/renderprops'
import { animated } from 'react-spring'
import IconButton from "@material-ui/core/IconButton"
import { trackEvent } from './utils/analytics'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    left: 20,
    zIndex: 410,
    top: '69vh',
    right: '-5vw',
    float: 'left'
  },
  button: {
    float: 'left',
    padding: '21px 40px 42px 29px',
    background: "none !important"
  }
}))

const BackButton = ({ eoltitle, title: folTitle, fade }) => {
  const classes = useStyles()
  const [homeClicked, setHomeClicked] = useGlobal('homeClicked')
  const [playVideo, setPlayVideo] = useGlobal('playVideo')
  const [timedOut, setTimedOut] = useGlobal('timedOut')

  const onClick = () => {

    trackEvent({
      name: 'cta',
      category: 'navigation',
      action: 'back arrow',
      label: eoltitle ? [eoltitle, folTitle].join('/') : folTitle
    })
  }


  return (
    <div className={classes.root}>
        {fade ? 
          <Spring
          config={config.slow}
          delay={0}
            from={{ opacity: 1 }}
            to={{ opacity: 0 }}>
            {({ opacity }) => 
            <animated.div className='back-button-overlay'style={{ opacity }} >
          <div id='overlay' >
          <ReactTouchEvents 
          onTap={() => {setHomeClicked(true); setPlayVideo(false); setTimedOut(false)}}>
        <IconButton
          onClick={() => {onClick(); setHomeClicked(true); setPlayVideo(false);  setTimedOut(false)}}
          className={classes.button}
        >        <svg width="8.5em" height="7.5em" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.799 8.93H39.38v2H3.797l7.517 7.515-1.415 1.415L0 9.96l.03-.03L0 9.9 9.9 0l1.414 1.414L3.799 8.93z" fill="white" fillRule="nonzero" />
          </svg>
        </IconButton>
        </ReactTouchEvents>
        </div>
        </animated.div>  
        }
        </Spring>

         : 
                
         <Spring
        config={config.default}
         delay={0}
          from={{ opacity: 0 }}
           to={{ opacity: 1 }}>
          {({ opacity }) => 
          <animated.div className='back-button-overlay'style={{ opacity }} >
        <div id='overlay' >
        <ReactTouchEvents 
        onTap={() => {setHomeClicked(true); setPlayVideo(false); setTimedOut(false)}}>
      <IconButton
        onClick={() => {onClick(); setHomeClicked(true); setPlayVideo(false); setTimedOut(false)}}
        className={classes.button}
      >        <svg width="8.5em" height="7.5em" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.799 8.93H39.38v2H3.797l7.517 7.515-1.415 1.415L0 9.96l.03-.03L0 9.9 9.9 0l1.414 1.414L3.799 8.93z" fill="white" fillRule="nonzero" />
        </svg>
      </IconButton>
      </ReactTouchEvents>
     </div>
     </animated.div>  
    }
    </Spring>}
    
  </div>
  )
}

export default BackButton