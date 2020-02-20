import React, { useEffect, useContext, useState, useGlobal } from "reactn"
import { AppContext } from "../App/AppContext"
import { animated } from 'react-spring'
import { Spring, config } from 'react-spring/renderprops'
import { makeStyles } from "@material-ui/core/styles"
import LanguageToggleHome from '../LanguageToggle/LanguageToggleHome'
import { trackPageview } from '../utils/analytics'
import Loading from '../Loading'
import Videogallery from '../VideoGallery/VideoGallery'
import HeadingHome from "./HeadingHome"
import ExploreButton from "./ExploreButton"

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    minHeight: "100vh",
    paddingTop: 50,
    paddingBottom: 10,
    paddingLeft: 40,
    paddingRight: 40,
  },
  buttons: {
    position: 'absolute',
    bottom: 36,
    right: 40,
    zIndex: 300,
    fontFamily: "'Gotham SSm A', 'Gotham SSm B', Helvetica, sans-serif"
  }
}));


const Home = (props) => {
  const classes = useStyles()
  const [state, setState] = useContext(AppContext)
  const [homeVisible, setHomeVisible] = useState(true)

  useEffect(() => {
    setState(state => ({
      ...state,
      isFirstLoad: true
    }));

    trackPageview({
      content: {
        galleryName: props.title,
        screenName: ''
      },
      page: {
        environment: state.env.server,
        name: 'Home Screen'
      }
    })
  }, [])

  if (state && homeVisible) {
  return (
    <div className='fade-in'>
    
       <img src={props.backgroundImage} alt={props.title} className='landing-image'/>
        <animated.div className={classes.root}>

        <Spring
            config={config.slow}
             delay={600}
              from={{ opacity: 0, transform: 'translate3d(0,70px,0)' }}
               to={{ opacity: 1, transform: 'translate3d(0,0,0)' }}>
              {({ opacity, transform }) =>
         <HeadingHome color='#353535' {...props} style={{ opacity, transform}} />}
         </Spring>

          <ExploreButton text={props.startButtonText} />

           <Spring
            config={config.slow}
             delay={600}
              from={{ opacity: 0, transform: 'translate3d(0,70px,0)' }}
               to={{ opacity: 1, transform: 'translate3d(0,0,0)' }}>
              {({ opacity, transform }) =>
            <div style={{ opacity, transform }} className={classes.buttons}>
           <LanguageToggleHome /> 
       
          </div>
         } 
     
        </Spring>
       </animated.div> 
    </div>
  )}
  else if (state && !homeVisible) {
      return (
          <Videogallery {...props} />
      )}
      else {
        return <Loading />
    }
 
};

export default Home
