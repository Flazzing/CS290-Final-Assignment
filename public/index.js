var record = document.querySelector('.record');
var stop = document.querySelector('.stop');
var profileContainer = document.querySelector('.creator-container');
var clipContainer = document.querySelector('.clips-full-container');
var authorText = document.getElementById('author_text');
var commentText = document.getElementById('comment_text');

var allClips = [];

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

function get_username(){
	var path = window.location.pathname;
	var pathParts = path.split('/');
	if (pathParts[1] === "users") {
		return pathParts[2];
	} 
	else {
    return null;
	}
}

function is_New(){
	var path = window.location.pathname;
	var pathParts = path.split('/');
	if (pathParts[1] === "users" && pathParts[3] === "addclip") {
		return true;
	}
	else{
		return false;
	}
}

////////////////////
//  Search update //
////////////////////
function doSearchUpdate() {
  var searchQuery = document.getElementById('navbar-search-input').value;

  if (clipContainer) {
    while (clipContainer.lastChild) {
      clipContainer.removeChild(clipContainer.lastChild);
    }
  }

  allClips.forEach(function (clip) {
    if (clipMatchesSearchQuery(clip, searchQuery)) {
      insertNewClip(clip.author, clip.audio, clip.comments);
    }
  });
}

//////////////////
//  search bool //
//////////////////
function clipMatchesSearchQuery(clip, searchQuery) {

  if (!searchQuery) {
    return true;
  }

  searchQuery = searchQuery.trim().toLowerCase();
  return (clip.author + " " + clip.comments).toLowerCase().indexOf(searchQuery) >= 0;
}

//////////////////////////////////////////////////
//  Conditional check on uploading clip         //
//    !!finds audio clip but type is incorrect  //
//////////////////////////////////////////////////
function handleModalUploadClick() {
  var clipAuthor = authorText.value;
  var clipComment = commentText.value;
  var clipAudio = document.querySelector('.modal-sound-clips').lastChild.firstChild.currentSrc;

  var request = new XMLHttpRequest();
  var username = get_username();
  var check_link = is_New();
  if(check_link == true){
	var url = "/people" + username + "/addClip";
	request.open("POST", url);
	clipAuthor = username;
	console.log("True");
  }
  else{
	request.open("POST", "/");  
  }
  
	if(clipAuthor && clipComment) {
		insertNewClip(clipAuthor, clipAudio, clipComment);
	
		var requestBody = JSON.stringify({
			clipComment: clipComment,
			clipAudio: clipAudio,
			clipAuthor: clipAuthor
		});
	
		request.setRequestHeader('Content-Type', 'application/json');
		request.send(requestBody);
	
		clearTextFields();
		clearClips();
		hide_modal();
	} 
	else{
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
});

var searchInput = document.getElementById('navbar-search-input');
if (searchInput) {
  searchInput.addEventListener('input', doSearchUpdate);
}
