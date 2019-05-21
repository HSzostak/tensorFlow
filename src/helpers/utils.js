export const b64toBlob = (b64Data, contentType, sliceSize) => {
  const contentTypeParam = contentType || '';
  const sliceSizeParam = sliceSize || 512;

  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (
    let offset = 0;
    offset < byteCharacters.length;
    offset += sliceSizeParam
  ) {
    const slice = byteCharacters.slice(offset, offset + sliceSizeParam);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i += 1) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentTypeParam });
  return blob;
};


export const renderPredictions = predictions => {
  const canvas = canvasRef.current;

  const ctx = canvas.getContext("2d");
  canvas.width  = 786;
  canvas.height = 570;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  // Fonts
  const font = "16px sans-serif";
  ctx.font = font;
  ctx.textBaseline = "top";
  ctx.drawImage(imageRef.current,0, 0,786,570);

  predictions.forEach(prediction => {
    const x = prediction.bbox[0];
    const y = prediction.bbox[1];
    const width = prediction.bbox[2];
    const height = prediction.bbox[3];
    // Bounding box
    ctx.strokeStyle = "#00FFFF";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
    // Label background
    ctx.fillStyle = "#00FFFF";
    const textWidth = ctx.measureText(prediction.class).width;
    const textHeight = parseInt(font, 10); // base 10
    ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
  });

  predictions.forEach(prediction => {

    const x = prediction.bbox[0];
    const y = prediction.bbox[1];
    ctx.fillStyle = "#000000";
    ctx.fillText(prediction.class, x, y);
  });
};