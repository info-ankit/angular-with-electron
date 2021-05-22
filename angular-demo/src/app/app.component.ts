import { Component } from '@angular/core'
import { IpcRenderer } from 'electron'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public _cameraStream = null
  public _title = 'Angular/Electron'
  private _ipc: IpcRenderer | undefined = void 0
  public _participantsObj = [{
	"id": 1,
	"name": "Emma Williams",
	"isMute": true,
	"isHost": false,
	"isVideOn": false
  }, {
	"id": 2,
	"name": "David J. Malan",
	"isMute": false,
	"isHost": true,
	"isVideOn": true
  }, {
	"id": 3,
	"name": "Isabella Smith",
	"isMute": true,
	"isHost": false,
	"isVideOn": true
  }, {
	"id": 4,
	"name": "Benjamin Johnson",
	"isMute": true,
	"isHost": false,
	"isVideOn": false
  }, {
	"id": 5,
	"name": "Evelyn Miller",
	"isMute": true,
	"isHost": false,
	"isVideOn": true
  }, {
	"id": 6,
	"name": "Devid Jones",
	"isMute": true,
	"isHost": false,
	"isVideOn": false
  }, {
	"id": 7,
	"name": "Ella Jackson",
	"isMute": true,
	"isHost": false,
	"isVideOn": false
  }, {
	"id": 8,
	"name": "Jack Avery",
	"isMute": true,
	"isHost": false,
	"isVideOn": false
  }, {
	"id": 9,
	"name": "Evelyn Scarlett",
	"isMute": true,
	"isHost": false,
	"isVideOn": false
  }, {
	"id": 10,
	"name": "James Harper",
	"isMute": true,
	"isHost": false,
	"isVideOn": false
  }, {
	"id": 11,
	"name": "William Mason",
	"isMute": true,
	"isHost": false,
	"isVideOn": false
  }, {
	"id": 12,
	"name": "Madison Wyatt",
	"isMute": true,
	"isHost": false,
	"isVideOn": false
  }, {
	"id": 13,
	"name": "Lily Grayson",
	"isMute": true,
	"isHost": false,
	"isVideOn": false
  }, {
	"id": 14,
	"name": "Ellie Lillian",
	"isMute": true,
	"isHost": false,
	"isVideOn": false
  }, {
	"id": 15,
	"name": "Jaxon Lincoln",
	"isMute": true,
	"isHost": false,
	"isVideOn": false
  }, {
	"id": 16,
	"name": "Lucy Willow",
	"isMute": true,
	"isHost": false,
	"isVideOn": false
  }, {
	"id": 17,
	"name": "Audrey Hudson",
	"isMute": true,
	"isHost": false,
	"isVideOn": false
  }, {
	"id": 18,
	"name": "Christian W. Hudson",
	"isMute": true,
	"isHost": false,
	"isVideOn": false
  }, {
	"id": 19,
	"name": "Lvy Landon Hunter",
	"isMute": true,
	"isHost": false,
	"isVideOn": false
  }, {
	"id": 20,
	"name": "Miles R. Hailey",
	"isMute": true,
	"isHost": false,
	"isVideOn": false
  }]
  
  constructor() {
	if ( (<any>window).require && 0 ) {
	  console.log("...CODE STARTED HERE...")
      try {
		this._ipc = (<any>window).require('electron').ipcRenderer
		this._ipc.on("manageLounchApplication", (event, arg) => {
			console.log("AAA: ", arg)
		})

		navigator.mediaDevices.getUserMedia({ 
		  audio: false, 
		  video: true
		})
		.then( (response) => {
		  this._cameraStream = response
		  this.sendUserMediaStreamToElectron (response)
		}, 
		(err)=> {
		  console.warn('Errror ', err)
		})
      } catch (e) {
        throw e
      }
    } else {
      console.warn('Electron\'s IPC was not loaded')
    }
  }
  
  getParticipantsList(e) {
	if ( (<any>window).require ) {
      try {
		this._ipc = (<any>window).require('electron').ipcRenderer
		let arg = {
		  type: `Participants List(${ this._participantsObj.length })`,
		  participants: this._participantsObj
		}
		this._ipc.send("participants:list", arg)
      } catch (e) {
        throw e
      }
    } else {
      console.warn('Electron\'s IPC was not loaded')
    }
  }
  
  sendUserMediaStreamToElectron (res) {
	let arg = { type: 'Stream', video: res }
	console.log("Camera Stream On Angular: ", arg);
	this._ipc.send("active-participate:stream", arg)
  }
}
