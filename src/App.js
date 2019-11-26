import React from 'react';
import logo from './logo.svg';
import './App.css';
import customlogo from './assets/logo.jpg';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <div style={{display: 'flex'}}>
          <section style={{display: 'flex', flexDirection: 'column', padding: '10px'}}>
            <img src={logo} id="logo-local" className="App-logo" alt="logo" />
            <button onClick={async () => {
              const importUrl = await getBase64LocaImport();
              document.getElementById("logo-local").src = importUrl;

            }}>local import </button>
          </section>

          <section style={{display: 'flex', flexDirection: 'column', padding: '10px'}}>
            <img src={logo} id="logo-url" className="App-logo" alt="logo" />
            <button onClick={async () => {
              const url = await getBase64UrlImport();
              document.getElementById("logo-url").src = url;            
            }}>url fetch </button>
          </section>

          <section style={{display: 'flex', flexDirection: 'column', padding: '10px'}}>
            <img src={logo} id="logo-swatch" className="App-logo" alt="logo" />
            <button onClick={async  () => {
              const url =  getColorSwatchBase64String();
              console.log(url);
              document.getElementById("logo-swatch").src = url;
            }}>canvas color swatch </button>
          </section>
        </div>
    </header>
    </div>
  );
}



function getBase64LocaImport() {
  return new Promise(resolve => {
    const image = new Image();
    image.src = customlogo;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = image.width;
    canvas.height = image.height;
    image.onload = () => {
      context.drawImage(image, 0, 0);
      const url = canvas.toDataURL('image/png');
      resolve(url);
    };

  });
}

function getBase64UrlImport() {
  return new Promise(resolve => {
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = 'https://avatars3.githubusercontent.com/u/933192?v=4';

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = image.width;
    canvas.height = image.height;
    image.onload = () => {
      context.drawImage(image, 0, 0);
      const url = canvas.toDataURL('image/png');
      resolve(url);
    };
  });
}

function getColorSwatchBase64String() {
  function borderPixels(pixelIndex, width, height) {
    for (let i = 1; i <= 9; i += 1) {
      if (pixelIndex === (width * 4 * i)) {
        return true;
      } else if (pixelIndex === ((width * 4 * i) - 4)) {
        return true;
      }
    }
    if ((pixelIndex < width * 4) || (pixelIndex >= ((width * height * 4) - (width * 4)))) {
      return true;
    }
    return false;
  }
  
  const colorArray = [255, 0, 0, 1];
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = 100;
  canvas.height = 100;
  const imgData = context.getImageData(0, 0, 50, 50);
  context.fillStyle = "red";
  context.fillRect(10, 10, 50, 50);
  context.putImageData(imgData, 0, 0);
  return canvas.toDataURL();
}
export default App;
