import React, { useRef, useEffect } from 'react';
import $ from 'jquery';
import 'bigvideo.js';

const VideoComponent = () => {
  const videoContainerRef = useRef();

  useEffect(() => {
    // Initialize BigVideo.js when the component mounts
    const BV = new $.BigVideo();
    BV.init();
    BV.show('your-video.mp4', { ambient: true });

    // Clean up when the component unmounts
    return () => {
      BV.getPlayer().pause(); // Pause the video
    };
  }, []);

  return <div ref={videoContainerRef} id="big-video-container" />;
};

export default VideoComponent;
