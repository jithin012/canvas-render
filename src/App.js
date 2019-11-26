import React from 'react';
import logo from './logo.svg';
import './App.css';
import customlogo from './assets/logo.jpg';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} id="logo" className="App-logo" alt="logo" />
        <p>
          Hello by CRA.
        </p>
        <button onClick={doCanvasOperation}>process canvas </button>
      </header>
    </div>
  );
}
 const doCanvasOperation = async ()=> {
  const url = await getBase64()//.then(url => console.log(url))
  console.log(url);
  document.getElementById("logo").src = url;
}
function getBase64() {
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
      setTimeout(() => {resolve(url)},100)
    };
  });
}
export default App;
