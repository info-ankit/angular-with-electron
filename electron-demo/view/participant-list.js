const electron = require('electron')
const querystring = require('querystring')

let participantsObj, query = querystring.parse(global.location.search)

const { ipcRenderer } = electron,
  ul = document.querySelector('ul')

participantsObj = JSON.parse(query['?participants'])

// LOAD PARTICIPANTS OBJECT.
ipcRenderer.on("participants:list", (e, arg) => {
  participantsObj = arg
  displayJoindParticipants()
})
if (participantsObj !== null) {
  displayJoindParticipants()
}

// DISPLAY JOIND PARTICIPANTS. font-weight: bold;
function displayJoindParticipants () {
  ul.innerHTML = ''
  ul.className = 'collection'
  participantsObj.participants.forEach(e => {
	var li = document.createElement('li'),
	  iMic = document.createElement('i'),
	  iCam = document.createElement('i')
	
	li.className = 'collection-item'
	if (e.isHost) li.style.fontWeight = 'bold'
	li.appendChild(document.createTextNode(e.name))
	
	iMic.className = 'material-icons'
	iMic.style.paddingLeft = '9px'
	iMic.setAttribute('onClick', `myFunction('${e.id}')`)
	iMic.appendChild((e.isMute) ? document.createTextNode('mic_off') : document.createTextNode('mic'))
	li.appendChild(iMic)
	
	iCam.className = 'material-icons'
	iCam.style.paddingLeft = '3px'
	iCam.appendChild((e.isVideOn) ? document.createTextNode('videocam') : document.createTextNode('videocam_off'))
	li.appendChild(iCam)
	
	ul.appendChild(li)
  })
}

function myFunction(tmp) {
	console.log('Here......................', tmp);
}