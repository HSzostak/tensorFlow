import React, { useRef, useEffect } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

const customStyle = {
  display: 'block',
  border: '1px solid red',
  position: 'absolute',
}

function ImageTf() {
  let model = null;
  const videoRef = useRef(null);
  const teste = useRef(null);

  useEffect(() => {
    loadModel();
    loadCamera();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadModel = async () => {
    console.time('loading Model');
    model = await cocoSsd.load('lite_mobilenet_v2');
    console.timeEnd('loading Model');

    setTimeout(() => {
      getPredictions();
    }, 2000)
  }

  const loadCamera = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: "enviroment"
        }
      })
      .then(mediaStream => {
        const video = videoRef.current;

        try {
          video.srcObject = mediaStream;
          video.play();

          video.width = 720;
          video.height = 540;
        } catch (error) {
          video.src = window.URL.createObjectURL(mediaStream);
        }
      }).catch(e => {
        console.log(e);
      });
  }

  const getPredictions = async () => {
    // Classify the image.
    console.time('Classify img');
    const predictions = await model.detect(videoRef.current);
    console.timeEnd('Classify img');

    console.log('Predictions: ');
    console.log(predictions);

    // teste.current.style.width = `${ Math.trunc(predictions[0].bbox[2]) }px`;
    // teste.current.style.height = `${ Math.trunc(predictions[0].bbox[3]) }px`;

    // teste.current.style.top = `${ Math.trunc(predictions[0].bbox[0]) }px`;
    // teste.current.style.left = `${ Math.trunc(predictions[0].bbox[1]) }px`;

    requestAnimationFrame(() => getPredictions());
  }

  return (
    <>
      <div style={ { position: 'relative', width: '720px', height: '540px', } }>
        <span ref={teste} style={customStyle}/>
        <video ref={videoRef}></video>
      </div>
    </>
  );
}

export { ImageTf }
