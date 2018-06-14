navigator.getUserMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);

var record = document.querySelector('.record');
var stop = document.querySelector('.stop');
var clipContainer = document.querySelector('.clips-full-container');
var inputText = document.getElementById('input_text');
var contributorText = document.getElementById('contributor_text')

function insertNewClip(clipAuthor, clipComments) {

  var clipTemplate = Handlebars.templates.audioclip;
  var clipHTML = clipTemplate({
    author: clipAuthor,
    comments: clipComments
  });
  clipContainer.insertAdjacentHTML('beforeend', clipHTML);
};

function getUserMedia(){
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

    })

    .catch(function(err){
      console.log('The following getUserMedia error occurred: ' + err);
      }
    );
  } else{
    console.log('getUserMedia not supported on your browser!');
  }
};

function clearTextFields(){
  inputText.value = '';
  contributorText.value = '';
};

function handleModalUploadClick() {

  var clipName = document.getElementById('name-input').value;  //element located in modal
  var clipText = document.getElementById('clip-content').value;

  if(clipName && clipText) {
    allClips.push({
      text: clipText,
      author: clipName
    });
  } else{
    alert('You must specify both a username and a comment!');
  }
};

function recordClip(){
  record.addEventListener('click', function(){
    getUserMedia();
  });
};

/* Display modal when Upload clicked */
var upload = document.getElementById('upload-button');
upload.addEventListener('click', function() {
	display_modal();
});

var x_button = document.getElementsByClassName('modal_close')[0];
x_button.addEventListener('click', function() {
	hide_modal();
});

var cancel_button = document.getElementsByClassName('modal_cancel')[0];
cancel_button.addEventListener('click', function() {
	hide_modal();
});

var submit_button = document.getElementsByClassName('modal_submit')[0];
submit_button.addEventListener('click', function() {
	insertNewClip( inputText.value, contributorText.value);
	hide_modal();
  clearTextFields();
});


function display_modal(){
	var modal = document.getElementById('modal_container');
	var modal_backdrop = document.getElementById('modal_backdrop');
	modal.classList.remove('hide_modal');
	modal_backdrop.classList.remove('hide_modal');
  clearTextFields();
};

function hide_modal(){
	var modal = document.getElementById('modal_container');
	var modal_backdrop = document.getElementById('modal_backdrop');
	modal.classList.add('hide_modal');
	modal_backdrop.classList.add('hide_modal');
};
