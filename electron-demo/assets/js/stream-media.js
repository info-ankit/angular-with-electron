var cameraStream;

function getUserStreamMedia () {
  var getMediaStream = navigator.mediaDevices.getUserMedia({audio: false, video: true});
  getMediaStream.then((response) => {
	cameraStream = response;
  }, (error)=> {
	console.log('errror ', error);
  });
}