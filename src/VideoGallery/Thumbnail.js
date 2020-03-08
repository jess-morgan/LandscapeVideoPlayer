import React, { useState, useGlobal } from 'reactn'
import { Spring, config } from 'react-spring/renderprops'
import { makeStyles } from "@material-ui/core/styles"
import playButton from './playButton'

const useStyles = makeStyles(theme => ({
  title: {
    '& *': {
      zIndex: '3', 
      position: 'relative', 
      float: 'left', 
      marginTop: 8, 
      fontSize: 21, 
      fontWeight: 'bold'
    },
  },
  duration: {
    '& *': {
      position: 'relative', 
      zIndex: '4', 
      float: 'right', 
      marginTop: 8, 
      fontSize: 21, 
      color: 'rgba(0,0,0,0.9)'
  }
},
  description: {
    '& *': {
      float: 'left', 
      zIndex: '5',
      position: 'absolute', 
      marginTop: 9, 
      width: '100%', 
      fontSize: 16, 
      lineHeight: 1.31
  }
 },
thumbnail: {
  '& *': {
    height: 290, 
    width: 530
  }
}
}));

const Thumbnail = ({ id, thumb, eoltitle, eoltext, duration, color }) => {
  const [style, setStyle] = useState({ gridRowEnd: 'span 1', opacity: 1, transition: 'opacity 2s linear' })
  const [playVideo, setPlayVideo] = useGlobal('playVideo')
  const [homeClicked, setHomeClicked] = useGlobal('homeClicked')
  const  description = eoltext.substring(0,156)
  const classes = useStyles()

  return (
    <div onClick={() => {setPlayVideo(true); setHomeClicked(false)}}>
      
        <img 
        className='play-button-overlay fade-in'
        src={playButton}
        alt={eoltitle}
        />
        <img
        src='http://digitallabels.aucklandmuseum.com/getmedia/3c6f927d-98c8-4885-950c-fe3b7d792a61/maungakiekie-thumbnail-test'
        alt={eoltitle}
        className={`${classes.thumbnail} fade-in`}
      />
      <Spring
      config={config.slow}
      delay={600}
      from={{ opacity: 0, transform: 'translate3d(0,30px,0)' }}
      to={{ opacity: 1, transform: 'translate3d(0,0,0)'}}
      >
        {({ opacity, transform }) => <div style={{ opacity, transform }}> 
        <p style={{color: `${color}`}}  >
         <p className={classes.title} dangerouslySetInnerHTML={{ __html: eoltitle }}/>
          </p>
          <p className={classes.duration}>
          <p style={{color: `${color}`}} dangerouslySetInnerHTML={{ __html: duration }}/>
           </p>
           <br/>
           {/* // CHANGE THIS */}
    <p style={{ color: `${color}`}} className={classes.description}>
       <p dangerouslySetInnerHTML={{ __html: description }}/>
      </p>
    </div>
    }
    </Spring>
    </div>       
  )
}

export default Thumbnail;
