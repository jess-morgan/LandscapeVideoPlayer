import React, { useEffect, useContext, useState, useGlobal, useRef } from 'reactn'
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
 const [currentVolume, setCurrentVolume] = useState()
 const [currentTime, setCurrentTime] = useState()
 const [seeking, setSeeking] = useState(false)
 let videoPlayerRef = React.createRef()

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
        videoPlayerRef.current.volume = 0.5
        // videoPlayerRef.current.startControlsTimer()
        // document.getElementsByTagName('video')[0].click()
        setTimeout(() => controlsTimer(), 4000)
      }, []) 

      const toggleOverlay = () => {
        // if (seeking) {
        //   setOverlayVisible(true)
        // }
        // if (paused) {
        //   setOverlayVisible(true)
        // } 
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

      const volumeChange = () => {
        if (videoPlayerRef.current.muted) {
          videoPlayerRef.current.muted = false
        }
      }

      const controlsTimer = () => {
          videoPlayerRef.current.startControlsTimer()
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
              ref={videoPlayerRef}
              // onLoadStart={setTimeout(() =>  {
              //   if (videoPlayerRef.current) {
              //     videoPlayerRef.current.startControlsTimer()
              //     console.log(videoPlayerRef)
              //   }}, 4000)}
              onVolumeChange={() => volumeChange()}
              onSeeking={() => setSeeking(true)}
              onPlay={() => { console.log(document.getElementsByTagName('video')); setPause(false); setTimedOut(false); setTimeout(() => setOverlayVisible(false), 5500)}}
              onPause={() => {setPause(true); pausedTimeOut()}}
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