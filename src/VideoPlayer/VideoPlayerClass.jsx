// import React from 'react'
// import { Player, ControlBar, VolumeMenuButton, PlayToggle, Shortcut, playerActions } from 'video-react'
// import ReactTouchEvents from "react-touch-events"

// class VideoPlayerClass extends React.component {
//     constructor(props) {
//     super(props)

// }
//  render() {
//  return (
//      <div>
//     <Player
//     id='vid'
//     autoPlay
//     src={videoObj.original}
//     className='video-player fade-in-video'
//     // ref={}
//     onPlay={() => {setPause(false)}}
//     onPause={() => {setPause(true); setOverlayVisible(true); pausedTimeOut()}}
//     onEnded={() => {setTimeout(() => { setHomeClicked(true); setPlayVideo(false); setTimedOut(false)}, 3000)}}
//     >
//     <Shortcut clickable={false} />
//   <ControlBar autoHide={true} >
//    <PlayToggle />
//     <VolumeMenuButton vertical/>
//   </ControlBar>
// </Player>
//    </div>

//   )
//  }
// }

// export default VideoPlayerClass