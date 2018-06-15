var record = document.querySelector('.record');
var stop = document.querySelector('.stop');
var profileContainer = document.querySelector('.creator-container');
var clipContainer = document.querySelector('.clips-full-container');
var authorText = document.getElementById('author_text');
var commentText = document.getElementById('comment_text');

/////////////////////////////////
//  Display or hide the modal  //
/////////////////////////////////
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

//////////////////////////////////////////////////////
//  Clears the Author and Comments fields in modal  //
//////////////////////////////////////////////////////
function clearTextFields(){
  authorText.value = '';
  commentText.value = '';
};

//////////////////////////////////////////////////
//  Conditional check on uploading clip         //
//    !!finds audio clip but type is incorrect  //
//////////////////////////////////////////////////
function handleModalUploadClick() {
  var clipAuthor = authorText.value;
  var clipComment = commentText.value;
  var clipAudio = document.querySelector('.modal-sound-clips').lastChild.firstChild.currentSrc;

  if(clipAuthor && clipComment) {
    insertNewClip(clipAuthor, clipAudio, clipComment);
    hide_modal();
  } else{
    alert('You must specify both a username and a comment!');
  }
};

/////////////////////////////////////////
//  Inserts the new clip into the DOM  //
//    input: string, string            //
/////////////////////////////////////////
function insertNewClip(clipAuthor, clipAudio, clipComments) {

  var clipTemplate = Handlebars.templates.audioclip;
  var clipHTML = clipTemplate({
    author: clipAuthor,
    clip: clipAudio,
    comments: clipComments

  });
  console.log(clipAudio);
  clipContainer.insertAdjacentHTML('beforeend', clipHTML);
};

/////////////////////////////////////////////////
//  Inserts the new user profile into the DOM  //
//    input: string, string                    //
//    CURRRENTLY UNUSED                        //
/////////////////////////////////////////////////
function insertNewProfile(profileAuthor, profileCount) {
  var clipTemplate = Handlebars.templates.profile;
  var clipHTML = clipTemplate({
    username: profileAuthor,
    count: profileCount
  });
  clipContainer.insertAdjacentHTML('beforeend', clipHTML);
};


/////////////////////////////////////////////////////////////
//  Function for removing clips in modal after submission  //
/////////////////////////////////////////////////////////////
function clearClips(){

}

//////////////
//  Events  //
//////////////
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
  handleModalUploadClick();
  clearTextFields();
  hide_modal();
});
