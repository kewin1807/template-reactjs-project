export const downloadFromUrl = (urlSource: A, fileName?: string): void => {
  const realFileName = fileName || `FLY_Report_${new Date().toUTCString()}`;
  if (window.navigator && !!(window.navigator as A).msSaveOrOpenBlob) {
    (navigator as A).msSaveBlob(urlSource, `${realFileName}.zip`);
  } else {
    const url: A = window.URL.createObjectURL(urlSource);
    const aElement = document.createElement('a');
    document.body.appendChild(aElement);
    aElement.style.display = 'none';
    aElement.href = url;
    aElement.download = realFileName;
    aElement.click();
    document.body.removeChild(aElement);
    window.URL.revokeObjectURL(url);
  }
};

export default downloadFromUrl;
