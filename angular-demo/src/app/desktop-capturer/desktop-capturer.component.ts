import { Component, OnInit } from '@angular/core';
import { IpcRenderer } from 'electron'

@Component({
  selector: 'app-desktop-capturer',
  templateUrl: './desktop-capturer.component.html',
  styleUrls: ['./desktop-capturer.component.css']
})
export class DesktopCapturerComponent implements OnInit {
  
  public _screens: any=[]
  public _selectScreen: String=""
  public _sourcesObject: any;
  public _isStreaming: boolean = true;
  private _ipc: IpcRenderer | undefined = void 0
  
  constructor() {
	this.fetchScreenAndWindowsList();
  }

  ngOnInit(): void {
  }
  
  fetchScreenAndWindowsList() {
	if ((<any>window).require) {
      try {
		let { desktopCapturer } = (<any>window).require('electron')
		desktopCapturer.getSources({ 
		  types: [ 
		    'window', 
			'screen' 
		  ], 
		  thumbnailSize: { 
		    width: 200, 
			height: 200 
		  }, 
		  fetchWindowIcons: true 
	    })
		.then( async sources => {
		  this._sourcesObject = sources;
		  // console.log("DesktopObj:getSources() ->", sources);
		  for (let source of sources) {
			let sourceThumbnail = source.thumbnail.toDataURL(),
			  browser = ( source.name.includes('Mozilla Firefox') ) ? 
			    'Mozilla Firefox' : 
			    ( source.name.includes('Google Chrome') ) ? 
			      'Google Chrome' : 
				  source.name,
			  screen = {
				id: source.id,
				name: browser,
				thumb: sourceThumbnail
			  };
			
			this._screens.push(screen)
		  }
		  // console.log("Source Names: ", this._screens)
		})
      } catch (e) {
        throw e
      }
    } else {
      console.warn('Electron\'s IPC was not loaded')
    }
  }
  
  showSelectedScreenAndWindow (e) {
	for (let source of this._sourcesObject) {
	  if (source.id === e.target.value) {
		try {
		  let constraints = {
			audio: false,
			video: {
			  mandatory: {
				chromeMediaSource: 'desktop',
				chromeMediaSourceId: source.id,
				maxWidth: 900,
				minWidth: 450,
				maxHeight: 410,
				minHeight: 200
			  }
			}
		  };
		  /*
		  let constraints = {
			audio: {
			  mandatory: {
				chromeMediaSource: 'desktop'
			  }
			},
			video: {
			  mandatory: {
				chromeMediaSource: 'desktop',
				maxWidth: 900,
				minWidth: 450,
				maxHeight: 410,
				minHeight: 200
			  }
			}
		  };
		  */
		  
		  (<any> navigator.mediaDevices).getUserMedia(constraints)
			.then( stream => {
			  console.log("getUserMedia() -> stream: ", stream)
			  this.handleStream(stream)
			})
			.catch( err => {
			  console.log("getUserMedia() -> err: ", err)
			  this.handleError(err)
			})
		} catch (err) {
		  this.handleError(err)
		}
		return
	  }
	}
  }
  
  handleStream (stream) {
	// console.log("Stream: ", stream)
	if ( (<any>window).require ) {
      try {
		this._ipc = (<any>window).require('electron').ipcRenderer
		let arg = {
		  type: `Screen Shared Stream:`,
		  shareScreen: stream
		}
		// console.log("ScreenSharedStream: ", arg)
		this._ipc.send("active-participate:stream", arg)
      } catch (e) {
        throw e
      }
    } else {
      console.warn('Electron\'s IPC was not loaded')
    }
	let video = document.querySelector('video')
	video.srcObject = stream
	video.onloadedmetadata = (e) => video.play()
  }

  handleError (err) {
	console.log(err)
  }

  pauseStream () {
	let video = document.querySelector('video')
	video.pause();
	this._isStreaming = false;
	console.log("<<< Display Pause >>>")
  }

  playStream () {
	let video = document.querySelector('video')
	video.play();
	this._isStreaming = true;
	console.log("<<< Display Play >>>")
  }
}
