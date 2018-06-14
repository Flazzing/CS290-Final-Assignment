navigator.getUserMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);

if(navigator.getUserMedia){
  console.log('getUserMedia supported.');
  navigator.mediaDevices.getUserMedia(
    {
    audio:true
  })

  .then(function(stream){
    var mediaRecorder = new MediaRecorder(stream);

    record.onclick = function(){
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      console.log('recorder started');
      record.style.background = 'red';
      record.style.color = 'black';
    }

    var clipStream = [];

    mediaRecorder.ondataavailable = function(e){
      clipStream.push(e.data);
    }

    stop.onclick = function(){
      mediaRecorder.stop();
      console.log(mediaRecorder.state);
      console.log('recorder stopped');
      record.style.background = '';
      record.style.color = '';
    }
    mediaRecorder.onstop=function(e){ //On stop, recording should load into player
      console.log('recorder stopped');
      var clipsFullContainer = document.querySelector('clips-content');
      var clipName = document.querySelector('input_text');
      var clipContainer = document.createElement('article');
      var clipLabel = document.createElement('p');
      var audio = document.createElement('audio');
      var deleteButton = document.createElement('button');

      clipContainer.classList.add('clip');
      audio.setAttribute('controls', '');
      deleteButton.innerHTML = "Delete";
      clipLabel.innerHTML = clipName;

      clipContainer.appendChild(audio);
      clipContainer.appendChild(clipLabel);
      clipContainer.appendChild(deleteButton);
      clipsFullContainer.appendChild(clipContainer);

      var blob = new Blob(clipStream, {'type':'audio/ogg; codecs=opus'});
      clipStream= [];
      var audioURL = window.URL.createObjectURL(blob);
      audio.src = audioURL;

      deleteButton.onclick = function(e) {
        var eventTarget = e.target;
        eventTarget.parentNode.parentNode.removeChild(eventTarget.parentNode);

      }

    }
  })

  .catch(function(err){
    console.log('The following getUserMedia error occurred: ' + err);
    }
  );
} else{
  console.log('getUserMedia not supported on your browser!');
}
