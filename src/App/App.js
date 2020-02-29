import React, { useGlobal, useContext, useState, useRef } from 'reactn'
import find from 'lodash.find'
import IdleTimer from 'react-idle-timer'
import { AppContext } from './AppContext'
import Home from '../Home/Home'
import Loading from '../Loading'
import VideoGallery from '../VideoGallery/VideoGallery'


const galleries = window.__GALLERY_DATA__ || [];
const env = window.__ENVIRONMENT__ || {};
const cultureNames = galleries.map(g => g.cultureName);

const App = () => {
  const [state] = useContext(AppContext)
  const [playVideo, setPlayVideo] = useGlobal('playVideo')
  const [timedOut, setTimedOut] = useGlobal('timedOut')
  const [timeOut, setTimeOut] = useState(90000)
  const [isTimedOut, setIsTimedOut] = useState(false)

  const {
    galleries,
    currentCultureName
  } = state;

  const galleryData = find(galleries, ["cultureName", currentCultureName]);
  const isLoading = !galleryData;

  const timeRef = useRef(null)

  const onAction = (e) => {
   setIsTimedOut(false)
  }
 
  const onActive = (e) => {
    setIsTimedOut(false)
  }
 
  const onIdle = (e) => {
    setIsTimedOut(true)
    setTimedOut(true)
}
      

  return (
    isLoading ?
    <Loading /> 
    : 
    timedOut && !playVideo ? 
    <Home {...galleryData} {...state}/>
    :
    <div>
    <IdleTimer
            ref={timeRef}
            element={document}
            onActive={onActive}
            onIdle={onIdle}
            onAction={onAction}
            timeout={timeOut} />
   <VideoGallery {...galleryData} />
   </div>

  )
}

export default App;
