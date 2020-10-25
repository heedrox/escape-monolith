import html2canvas from 'html2canvas';
import glitch from 'glitch-canvas';

const GLITCH_PARAMS = numberOfIteration => ({
  seed:       numberOfIteration, // integer between 0 and 99
  quality:    Math.ceil(Math.random()*98), // integer between 0 and 99
  amount:     Math.ceil(Math.random()*98), // integer between 0 and 99
  iterations: Math.ceil(Math.random()*5)  // integer
});

const oneGlitch = (numberOfIteration, ctx, canvasOriginalData) => {
  return glitch(GLITCH_PARAMS(numberOfIteration))
    .fromImageData( canvasOriginalData )
    .toImageData()
    .then( function ( imageData ) {
      ctx.putImageData( imageData, 0, 0 );
    } );
};

const timeout = (msecs) => new Promise((resolve, _) => {
  setTimeout(resolve, msecs);
});

const glitchAction = () => {
  html2canvas(document.body).then(async (canvas) => {
    console.log(canvas);
    canvas.style.position = 'fixed';
    canvas.style.zIndex = '999';
    canvas.style.top = '0';
    canvas.style.left = '0';
    document.body.appendChild(canvas);
    const publicPath = process.env.BASE_URL;
    const audio = new Audio(`${publicPath}game/common/glitch.mp3`);
    audio.loop = true;
    audio.play();
    const ctx = canvas.getContext('2d');
    const canvasOriginalData = ctx.getImageData( 0, 0, canvas.width, canvas.height );
    for (const numberOfIteration of Array.from(Array(15).keys())) {
      await oneGlitch(numberOfIteration+1, ctx, canvasOriginalData);
      await timeout(5);
    }
    audio.pause();
    audio.currentTime = 0;
    document.body.removeChild(canvas);
  })
};

export {
  glitchAction,
};
