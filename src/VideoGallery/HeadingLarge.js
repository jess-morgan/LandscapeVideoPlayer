import React from "react"
import { Spring, config } from 'react-spring/renderprops'
import { makeStyles } from "@material-ui/core/styles"

    const useStyles = makeStyles(theme => ({
        header: {
          display: 'grid',
          fontWeight: 'normal',
          lineHeight: 'normal',
          letterSpacing: 'normal',
          marginLeft: '18%'
        },
        text: {
          marginBottom: 20,      
          marginTop: 0,
          '& *': {
            float: 'left',
            fontSize: 24,          
            fontWeight: 'normal',
           lineHeight: 'normal',
           letterSpacing: 'normal'
          },
        }
      }));


const HeadingLarge = ({ title, text, color }) => {
 const classes = useStyles()

    return (
        <>
    <Spring
    config={config.default}
    delay={100}
    from={{ }}
    to={{ fontSize: 71, fontWeight: 'bold', marginTop: 0, marginBottom: 0, color: `${color}`, float: 'left', transform: 'translate3d(0,0,0)' }}
    >
     {({ transform, fontSize, fontWeight, marginTop, marginBottom, color, float }) =>
    <div className={classes.header} >
     <h1 style={{ transform, fontSize, fontWeight, marginTop, marginBottom, color, float }} dangerouslySetInnerHTML={{ __html: title }}/>
     <div className={classes.text} style={{ transform, color }} dangerouslySetInnerHTML={{ __html: text }}/>
    </div>}
  </Spring>
  </>
  )

  }

export default HeadingLarge