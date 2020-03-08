import React from "react"
import { Spring } from 'react-spring/renderprops'

const HeadingSmall = ({ title, color }) => {

    return (
        <>
       <Spring
       config={{ tension: 150, friction: 25, duration: 300}}
       from={{ 
        fontSize: '3.5em', fontWeight: 'bold', marginTop: 0, marginBottom: 0, float: 'left', transform: 'translate3d(0,0,0)', color: `${color}` 
        }}
       to={{ 
        fontSize: '3.5em', fontWeight: 'bold', paddingTop: 0, paddingLeft: '2vw', marginBottom: 0, float: 'left', transform: 'translate3d(1vw,1vh,0)', color: `${color}` 
      }}
       >
         {({ transform, fontSize, fontWeight, paddingTop, paddingLeft, marginBottom, color, float }) =>
        <div className='fade-in' style={{ marginTop: 0, top: 0, left: 0, height: '8em', width: '100vw', background: 'white', display: 'flex',
        flexDirection: 'column', position: 'fixed', color: `${color}`, zIndex: '200'  }} >
        <h1 style={{ transform, fontSize, fontWeight, paddingTop, paddingLeft, marginBottom, float, color }} dangerouslySetInnerHTML={{ __html: title }}/>
        </div>}
        </Spring>
  </>
  )

 }

export default HeadingSmall