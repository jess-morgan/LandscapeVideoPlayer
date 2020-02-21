import React, { useEffect, useGlobal, useContext, useState, useRef } from 'reactn'
import { animated } from 'react-spring'
import { Spring, config } from 'react-spring/renderprops'
import { makeStyles } from "@material-ui/core/styles"
import useWindowScrollPosition from '@rehooks/window-scroll-position'
import { AppContext } from "../App/AppContext"
import { trackPageview } from '../utils/analytics'
import IdleTimer from 'react-idle-timer'
import LanguageToggle from '../LanguageToggle/LanguageToggleGallery'
import HeadingLarge from '../VideoGallery/HeadingLarge'
import HeadingSmall from '../VideoGallery/HeadingSmall'
import Thumbnail from './Thumbnail'
import VideoPlayer from "../VideoPlayer/Videoplayer"

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    minHeight: "100vh",
    paddingTop: 27,
    paddingBottom: 10,
    paddingLeft: 100,
    paddingRight: 100,
  },
  gridSm: {
    [theme.breakpoints.up("sm")]: {
      display: "grid",
      gridTemplateColumns: "repeat(4, auto)",
      gridGap: '100px 41px',
      touchAction: 'pan-y',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '21vh',
      marginBottom: '2vh'
    }
  },
  gridMed: {
    [theme.breakpoints.up("sm")]: {
      display: "grid",
      gridTemplateColumns: "repeat(2, auto)",
      gridGap: '69px 117px',
      touchAction: 'pan-y',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 12,
      width: '60%',
      marginLeft: '22%'
    }
  },
  gridLg: {
    [theme.breakpoints.up("sm")]: {
      display: "grid",
      gridTemplateColumns: "repeat(3, auto)",
      gridGap: '100px 41px',
      touchAction: 'pan-y',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '21vh',
      marginBottom: '2vh'
    }
  },
  gridXL: {
    [theme.breakpoints.up("sm")]: {
      display: "grid",
      gridTemplateColumns: "repeat(2, auto)",
      gridGap: '100px 41px',
      touchAction: 'pan-y',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '21vh',
      marginBottom: '2vh'
    }
  },
  buttons: {
    position: 'absolute',
    bottom: '3vh',
    right: '5.8vw',
    zIndex: 300,
    fontFamily: "'Gotham SSm A', 'Gotham SSm B', Helvetica, sans-serif"
  }
}));

const VideoGallery = (props) => {
  const classes = useStyles()
  const [state, setState] = useContext(AppContext)
  const [playVideo, setPlayVideo] = useGlobal('playVideo')
  const [videoId, setVideoId] = useState(null)
  const scrollPosition = useWindowScrollPosition()
  const [timedOut, setTimedOut] = useGlobal('timedOut')
  const [timeOut, setTimeOut] = useState(90000)
  const [isTimedOut, setIsTimedOut] = useState(false)
  const [homeClicked, setHomeClicked] = useGlobal('homeClicked')
  const vid = document.getElementsByTagName('video')[0]

  useEffect(() => {
    setState(state => ({
      ...state,
      isFirstLoad: true
    })
   
    );

    trackPageview({
      content: {
        galleryName: props.title,
        screenName: ''
      },
      page: {
        environment: state.env.server,
        name: 'Video Gallery'
      }
    })  
   
  }, [])

  const timeRef = useRef(null)

  const onAction = (e) => {
   setIsTimedOut(false)
  }
 
  const onActive = (e) => {
    setIsTimedOut(false)
  }
 
  const onIdle = (e) => {
    if (vid.paused)
    setPlayVideo(false)
    setIsTimedOut(true)
    setTimedOut(true) 
}

if (playVideo && !homeClicked) {
  return (
    <>
    <IdleTimer
          ref={timeRef}
          element={document}
          onActive={onActive}
          onIdle={onIdle}
          onAction={onAction}
          timeout={timeOut} />
    {props.items.map(obj => {
      if(obj.id === videoId) {  
        return <VideoPlayer key={obj.id} videoObj={obj} />
      }
    })}
    </>
   )
  }
  else {
    return (
   
       <div className='fade-in'>
   
         <animated.div className={classes.root}>
         {/* check scroll position to animate headings */}
         { scrollPosition.y <= 70 ?  
         <HeadingLarge color='#353535' {...props}/>
         :  
         <HeadingSmall color='#353535' {...props}/>} 
         
        {/* thumbnail grid */}
        {props.items.length <= 3 ? 
         props.items.length === 3 ?
          <animated.div
           className={classes.gridLg}>
            {props.items.map((item, index) => {
             return <div id='grid' onClick={() => {setVideoId(item.id)}}>
              <Thumbnail key={item.id} {...item} /> 
               </div> 
              }
          )}
           </animated.div> 
           :
           <animated.div
           className={classes.gridXL}>
            {props.items.map((item, index) => {
             return <div id='grid' onClick={() => {setVideoId(item.id)}}>
              <Thumbnail key={item.id} color='#353535' {...item} /> 
               </div> 
              }
          )}
           </animated.div> 
            :
             props.items.length === 4 ?
             <animated.div
             className={classes.gridMed}>
              {props.items.map((item, index) => {
               return <div id='grid' onClick={() => {setVideoId(item.id)}}>
                <Thumbnail key={item.id} color='#353535' {...item} /> 
                 </div> 
                }
            )}
             </animated.div> 
             :
             <animated.div
             className={classes.gridSm}>
              {props.items.map((item, index) => {
               return <div id='grid' onClick={() => {setVideoId(item.id)}}>
                <Thumbnail key={item.id} color='#353535' {...item} /> 
                 </div> 
                }
            )}
             </animated.div> 
           }
   
         {/* language options  */}
         {/* <Spring
         config={config.slow}
         delay={600}
         from={{ opacity: 0, transform: 'translate3d(0,70px,0)' }}
         to={{ opacity: 1, transform: 'translate3d(0,0,0)'}}
         >
           {({ opacity, transform }) =>
           <div> 
           <div style={{ opacity, transform }} className={classes.buttons}>
           <LanguageToggle /> 
          </div>
         </div>
         }
         </Spring> */}
       </animated.div>
       </div>
     )
     }
};

export default VideoGallery
