import React, { useState, useGlobal } from 'reactn'
import { Spring, config } from 'react-spring/renderprops'

const Thumbnail = ({ id, thumb, eoltitle, eoltext, duration, color }) => {
  const [style, setStyle] = useState({ gridRowEnd: 'span 1', opacity: 1, transition: 'opacity 2s linear' })
  const [playVideo, setPlayVideo] = useGlobal('playVideo')
  const [homeClicked, setHomeClicked] = useGlobal('homeClicked')
  const  description = eoltext.substring(0,156)

  return (
    <div onClick={() => {setPlayVideo(true); setHomeClicked(false)}}>
        <img 
        src="/src/VideoGallery/play-button.svg"
        className='fade-in'
        alt={eoltitle}
        style={{width: 58, height: 57, zIndex: 100, position: 'absolute', marginTop: '6%', marginLeft: '13%'}}
        />
        <img
        src={thumb}
        alt={eoltitle}
        className='fade-in'
        style={{ height: 290, width: 530}}
      />
      <Spring
      config={config.slow}
      delay={600}
      from={{ opacity: 0, transform: 'translate3d(0,30px,0)' }}
      to={{ opacity: 1, transform: 'translate3d(0,0,0)'}}
      >
        {({ opacity, transform }) => <div style={{ opacity, transform }}> 
        <p style={{zIndex: '3', position: 'relative', float: 'left', marginTop: 8, fontSize: 21, fontWeight: 'bold', color: `${color}`}}>
          {eoltitle}
          </p> 
          <p style={{position: 'relative', zIndex: '4', float: 'right', marginTop: 8, fontSize: 21, color: 'rgba(0,0,0,0.9)'}}>
            {duration}</p> 
           <br/>
    <p style={{ float: 'left', zIndex: '5', position: 'absolute', marginTop: 6, width: '100%', fontSize: '16px', color: `${color}`, lineHeight: 1.31}}>
       <p style={{ float: 'left', zIndex: '5' }}>
         {description}</p>
      </p>
    </div>
    }
    </Spring>
    </div>       
  )
}

export default Thumbnail;
