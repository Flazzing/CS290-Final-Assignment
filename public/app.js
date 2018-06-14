navigator.getUserMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);

var record = document.querySelector('.record');
var stop = document.querySelector('.stop');
var soundClips = document.querySelector('.sound-clips');
var canvas = document.querySelector('.visualizer');

var audioCtx = new (window.AudioContext || webkitAudioContext)();
var canvasCtx = canvas.getContext("2d");

if(navigator.getUserMedia){
  console.log('getUserMedia supported.');
  navigator.getUserMedia(
    {
    audio:true
  },

  function(stream){
    var mediaRecorder = new MediaRecorder(stream);

    visualize(stream);

    record.onclick = function(){
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      console.log('recorder started');
      record.style.background = 'red';
      record.style.color = 'black';
    }

    mediaRecorder.ondataavailable = function(e){
      console.log('data available');

      var clipName = prompt('enter a name for clip');
      var clipContainer = document.createElement('article');
      var clipLabel = document.createElement('p');
      var audio = document.createElement('audio');
      var deleteButton = document.createElement('button');

      clipContainer.classList.add('clip');
      audio.setAttribute('controls', '');
      deleteButton.innerHTML = 'Delete';
      clipLabel.innerHTML = clipName;

      clipContainer.appendChild(audio);
      clipContainer.appendChild(clipLabel);
      clipContainer.appendChild(deleteButton);
      soundClips.appendChild(clipContainer);

      var audioURL = window.URL.createObjectURL(e.data);
      audio.src = audioURL;

      deleteButton.onclick = function(e) {
        var eventTarget = e.target;
        eventTarget.parentNode.parentNode.removeChild(eventTarget.parentNode);
    }
  }

  stop.onclick = function() {
  mediaRecorder.stop();
  console.log(mediaRecorder.state);
  console.log("recorder stopped");
  record.style.background = "";
  record.style.color = "";
}
},


  function(err) {
     console.log('The following gUM error occured: ' + err);
  }

);
} else {
console.log('getUserMedia not supported on your browser!');
}

function visualize(stream) {
var source = audioCtx.createMediaStreamSource(stream);

var analyser = audioCtx.createAnalyser();
analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);

source.connect(analyser);
//analyser.connect(audioCtx.destination);

WIDTH = canvas.width
HEIGHT = canvas.height;

draw()

function draw() {

requestAnimationFrame(draw);

analyser.getByteTimeDomainData(dataArray);

canvasCtx.fillStyle = 'rgb(200, 200, 200)';
canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

canvasCtx.lineWidth = 2;
canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

canvasCtx.beginPath();

var sliceWidth = WIDTH * 1.0 / bufferLength;
var x = 0;


for(var i = 0; i < bufferLength; i++) {

var v = dataArray[i] / 128.0;
var y = v * HEIGHT/2;

if(i === 0) {
  canvasCtx.moveTo(x, y);
} else {
  canvasCtx.lineTo(x, y);
}

x += sliceWidth;
}

canvasCtx.lineTo(canvas.width, canvas.height/2);
canvasCtx.stroke();

}
}
/*
    stop.onclick = function(){
      mediaRecorder.stop();
      console.log(mediaRecorder.state);
      console.log('recorder stopped');
      record.style.background = '';
      record.style.color = '';
    }
    mediaRecorder.onstop=function(e){ //On stop, recording should load into player
      console.log('recorder stopped');


      }

    }
  }

  .catch(function(err){
    console.log('The following getUserMedia error occurred: ' + err);
    }
  );
} else{
  console.log('getUserMedia not supported on your browser!');
}
*/
