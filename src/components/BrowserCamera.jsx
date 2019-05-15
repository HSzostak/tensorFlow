import React, { useState, useEffect, useRef } from 'react';

// import { b64toBlob } from 'helpers/utils';

function BrowserCamera(props) {
  const videoRef = useRef(null);
  const [ videoTrackRef, setVideoTrackRef ] = useState(null);

  useEffect(() => {
    initializeCamera();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeCamera = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: 1280,
          height: 720,
          facingMode: "enviroment"
        }
      })
      .then(mediaStream => {
        setVideoSource(mediaStream);
        const track = mediaStream.getVideoTracks()[0];
        setVideoTrackRef(track)
      }).catch(e => {
        console.log(e);
      });
  }

  const setVideoSource = stream => {
    const video = videoRef.current;

    try {
      video.srcObject = stream;
    } catch (error) {
      video.src = window.URL.createObjectURL(stream);
    }
  }

  const onClickPhotoCapture = async () => {
    let captureDevice = new ImageCapture(videoTrackRef);
    if (captureDevice) {
      const photoBlob = await captureDevice.takePhoto();

      window.open(window.URL.createObjectURL(photoBlob), "_blank");
      // props.onCapture(window.URL.createObjectURL(photoBlob), photoBlob);
    }
  }

  // const handleUserMediaError = error => {
  //   props.handleUserMediaError(error);
  // }

  return (
    <div>
      <video ref={videoRef} autoPlay style={{ width: 720, height: 640 }} ></video>
      <button onClick={onClickPhotoCapture}>Capturar foto</button>
    </div>
  );
}

export { BrowserCamera };
