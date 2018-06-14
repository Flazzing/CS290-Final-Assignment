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
