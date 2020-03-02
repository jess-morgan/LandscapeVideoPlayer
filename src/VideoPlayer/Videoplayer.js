import React, { useEffect, useContext, useState, useGlobal, useRef } from 'reactn'
import { AppContext } from "../App/AppContext"
import { trackPageview } from '../utils/analytics'
import { Player, ControlBar, VolumeMenuButton, PlayToggle, Shortcut } from 'video-react'
import ReactTouchEvents from "react-touch-events"
import IdleTimer from 'react-idle-timer'
import { animated } from 'react-spring'
import BackButton from '../BackButton'


const VideoPlayerComp = ({ videoObj }) => {
 const [state, setState] = useContext(AppContext)
 const [paused, setPause] = useState(false)
 let [overlayVisible, setOverlayVisible] = useState(true)
 const [homeClicked, setHomeClicked] = useGlobal('homeClicked')
 const [playVideo, setPlayVideo] = useGlobal('playVideo')
 const [timedOut, setTimedOut] = useGlobal('timedOut')
 const [timeOut, setTimeOut] = useState(3000)
 const [playing, setPlaying] = useState()
 const [ended, setEnded] = useState()
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
        videoPlayerRef.current.startControlsTimer()

      }, []) 

      const timeRef = useRef(null)

      const onAction = (e) => {
       setOverlayVisible(true)
      }
     
      const onActive = (e) => {
        setOverlayVisible(true)
      }
     
      const onIdle = (e) => {
        if (paused) {
        setOverlayVisible(true)
        }
        else {
          setOverlayVisible(false)
          overlayVisible = false
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


    return (
      <ReactTouchEvents >
        <animated.div>

          <div id='overlay' >

          {overlayVisible ?  
          <>
          <IdleTimer
          ref={timeRef}
          element={document}
          onActive={onActive}
          onIdle={onIdle}
          onAction={onAction}
          timeout={timeOut} />
          <BackButton visible={overlayVisible} fade={false} {...videoObj} />
          </>
          :
          <>
          <IdleTimer
          ref={timeRef}
          element={document}
          onActive={onActive}
          onIdle={onIdle}
          onAction={onAction}
          timeout={timeOut} />
          <BackButton visible={overlayVisible} fade={true} {...videoObj} />
          </>
          }
            
            
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
              onVolumeChange={() => {volumeChange()}}
              onSeeking={() => {setSeeking(true)}}
              onPlay={() => { setPlaying(true); setPause(false); setTimedOut(false)}}
              onPause={() => {setPause(true); pausedTimeOut()}}
              onEnded={() => {setEnded(true); setTimeout(() => { setHomeClicked(true); setPlayVideo(false); setTimedOut(false)}, 3000)}}
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