import React, { useEffect, useContext, useState, useGlobal } from 'reactn'
import { AppContext } from "../App/AppContext"
import { trackPageview } from '../utils/analytics'
import { Player, ControlBar, VolumeMenuButton, PlayToggle, Shortcut } from 'video-react'
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
      }, []) 

      const toggleOverlay = () => {
        if (overlayVisible) {
          setOverlayVisible(false)
        }
        if (!overlayVisible) {
          setOverlayVisible(true)
        } 
        if (!overlayVisible && !paused) {
          setOverlayVisible(false)
        }
      }

      const pausedTimeOut = () => {
        setTimeout(setTimedOut(true), 90000)
      }

    return (
      <ReactTouchEvents 
        onTap={ () => toggleOverlay()}>
        <animated.div>
         
          <div id='overlay' >

            {/*
             make sure back button and control bar are in sync - base on whether control bar is visible*/}

          <BackButton visible={overlayVisible} {...videoObj} />
            </div>
            <Player
              id='vid'
              autoPlay
              src={videoObj.original}
              className='video-player fade-in-video'
              onPlay={() => {setPause(false)}}
              onPause={() => {setPause(true); setOverlayVisible(true);
                 pausedTimeOut()
                }}
              onEnded={() => {setTimeout(() => { setHomeClicked(true); setPlayVideo(false); setTimedOut(false)}, 3000);}}
              >
              <Shortcut clickable={false} />
            <ControlBar autoHide={true} >
             <PlayToggle />
              <VolumeMenuButton vertical />
            </ControlBar>
       </Player>
             
        </animated.div>
       </ReactTouchEvents>
    )
}

export default VideoPlayerComp