
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
