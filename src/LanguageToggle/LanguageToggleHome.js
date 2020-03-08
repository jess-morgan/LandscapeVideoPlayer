import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { AppContext } from "../App/AppContext";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { HamburgerButton } from 'react-hamburger-button';
import { Spring, config } from 'react-spring/renderprops';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    visibility: 'hidden'
  },
  button: {
    marginLeft: theme.spacing(1),
    minWidth: '7vw',
    backgroundColor: 'white',
    color: 'black',
    fontWeight: 600,
    fontSize: '1.3vh'
  },
  '@media (hover:none)': {
    '&:hover': {
      backgroundColor: 'white',
      color: 'black'
    }
  }
}));

const menuItemStyle = makeStyles(theme => ({
  root: {
    color: 'black',
    fontFamily: "'Gotham SSm A', 'Gotham SSm B', Helvetica, sans-serif",
    alignItems: 'right',
    minWidth: '5vw',
    paddingLeft: '3vw',
    paddingBottom: '1.7vh'
  }
}))


const LanguageToggle = () => {
  const classes = useStyles();
  const menuStyle = menuItemStyle();
  const [state, setState] = useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const { cultureNames, currentCultureName } = state;
  const [currentCulture, setCurrentCulture] = useState('English')

  const onChange = name => {
    setState(state => ({
      ...state,
      currentCultureName: name
    }))
    setCurrentCulture(name);
  }

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return cultureNames.length > 1 && (
    <div className={classes.root}>       

    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.button}>
      <HamburgerButton
        open={anchorEl}
        width={22}
        height={11}
        strokeWidth={2}
        color='black'
        animationDuration={0.5}
      />
        <div style={{marginLeft: '0.5vw'}} dangerouslySetInnerHTML={{ __html: currentCultureName }}/>
      </Button>

      <Spring
      config={config.slow}
      delay={600}
      from={{ opacity: 0, transform: 'translate3d(0,70px,0)' }}
      to={{ opacity: 1, transform: 'translate3d(0,0,0)'}}
      >
        {({ opacity, transform }) =>
        <div style={{opacity, transform}}>
     <Menu
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {cultureNames.map(name => {
        if (name !== currentCulture) {
        return <MenuItem key={name} className={menuStyle.root} onClick={() => {handleClose(); onChange(name)}} dangerouslySetInnerHTML={{ __html: name }}></MenuItem>
        }
      })}
  </Menu>

  </div>
 }
</Spring>
</div>
  );
};

export default LanguageToggle;
