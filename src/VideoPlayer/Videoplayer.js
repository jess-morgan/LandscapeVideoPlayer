import React, { useEffect, useContext, useState, useGlobal } from 'reactn'
import { AppContext } from "../App/AppContext"
import { trackPageview } from '../utils/analytics'
import { Player, ControlBar, VolumeMenuButton, PlayToggle, Shortcut, playerActions } from 'video-react'
import ReactTouchEvents from "react-touch-events"
import { animated } from 'react-spring'
import BackButton from '../BackButton'

const VideoPlayerComp = ({ videoObj }) => {
 const [state, setState] = useContext(AppContext)
 const [paused, setPause] = useState(false)
 const [overlayVisible, setOverlayVisible] = useState(true)
 const [homeClicked, setHomeClicked] = useGlobal('homeClicked')
 const [playVideo, setPlayVideo] = useGlobal('playVideo')
 const [timedOut, setTimedOut] = useGlobal('timedOut')

    useEffect(() => {
        setState(state => ({
          ...state,
          isFirstLoad: true
        })
       
        );

        trackPageview({
          content: {
            galleryName: videoObj.title,
            screenName: ''
          },
          page: {
            environment: state.env.server,
            name: 'Video player'
          }
        })
        // setTimeout(() => document.getElementById('vid').click(), console.log('clicked'), 5000)
        setTimeout(() => toggleControls(), 4000)
      }, []) 
      
      let vid = document.getElementsByTagName('video')

     

      const toggleOverlay = () => {
        if (overlayVisible) {
          setOverlayVisible(false)
        }
        if (!overlayVisible) {
          setOverlayVisible(true)
          setTimeout(() => setOverlayVisible(false, 5000))
      }
    }

      const pausedTimeOut = () => {
        setTimeout(setTimedOut(true), 90000)
      }

      const toggleControls = () => {
        document.getElementById('overlay').click()
        // document.getElementsByClassName('video-player').tap()
        console.log('clicked')
      }

    return (
      <ReactTouchEvents 
        onTap={ () => toggleOverlay()}>
        <animated.div>
          <div id='overlay' onClick={ () => toggleOverlay()}>

          <BackButton visible={overlayVisible} {...videoObj} />
            
            
            <Player
              id='vid'
              autoPlay
              src={videoObj.original}
              className='video-player fade-in-video'
              ref={(player) => console.log(player)}
              onPlay={() => {setPause(false); setTimedOut(false)}}
              onPause={() => {setPause(true); setOverlayVisible(true); pausedTimeOut()}}
              onEnded={() => {setTimeout(() => { setHomeClicked(true); setPlayVideo(false); setTimedOut(false)}, 3000)}}
              >
              <Shortcut clickable={false} />
             
            <ControlBar autoHide={true} >
            <PlayToggle />
              <VolumeMenuButton vertical/>
            </ControlBar>
           </Player></div>
        </animated.div>
        
       </ReactTouchEvents>
    )
}

export default VideoPlayerComp