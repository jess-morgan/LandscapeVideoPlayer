import React from 'react'
import { makeStyles } from "@material-ui/core/styles"
import { animated } from 'react-spring'
import { Spring, config } from 'react-spring/renderprops'

const useStyles = makeStyles(theme => ({
    title: {
      fontSize: '1.8vw',
      fontWeight: 700,
      marginLeft: '2vw',
      marginTop: '3.5vh',
      color: 'white',
      float: 'left',
      fontFamily: "'Gotham SSm A', 'Gotham SSm B', Helvetica, sans-serif",
    }
  }));

const VideoTitle = ({ visible, title, color }) => {
 const classes = useStyles() 

    return (
      <div>
      {visible ?  
      <animated.div className='video-title-overlay hide' >
       <Spring
      config={config.slow}
       delay={400}
        from={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
         to={{ opacity: 1, transform: 'translate3d(0,0,0)' }}>
        {({ opacity, transform }) =>
      <div id='overlay' style={{ opacity, transform }} >
      <p id='video-title' className={classes.title} style={{ color: `${color}`}} dangerouslySetInnerHTML={{ __html: title }}/>
  </div> }
   </Spring>
   </animated.div>
   :
   <animated.div className='video-title-overlay' >
         <Spring
      config={config.molasses}
       delay={400}
        from={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
         to={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}>
        {({ opacity, transform }) =>
      <div id='overlay' style={{ opacity, transform }} >
      <p id='video-title' className={classes.title} style={{ color: `${color}`}} dangerouslySetInnerHTML={{ __html: title }}/>
  </div> }
   </Spring>
   </animated.div>
   }
 
</div>
          
    )
}

export default VideoTitle