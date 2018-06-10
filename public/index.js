var allUsers = [];
var allClips = [];

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
}

//finish once modals are uploaded
function showUploadClipModal(){

  var modalBackdrop = document.getElementById('modal-backdrop');
  var createClipModal = document.getElementById('create-clip-modal');

  modalBackdrop.classList.remove('hidden');
  createTwitModal.classList.remove('hidden');
}

function clearClipInputValues(){
}

function hideCreateClipModal(){
}
