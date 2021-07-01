import { React } from 'react'
import { Modal, Forms, Button } from 'react-bootstrap'
import config from './config.json'

function FileUploadComponent() {
  const handleProgress = (event) => {
    let progress_ele = document.getElementById('upload-progress')
    console.log('progres handle')

    let percent = Math.round((event.loaded / event.total) * 100)
    console.log(percent)

    progress_ele.style.width = percent + '%'
    progress_ele.innerText = percent + '%'
  }

  const uploadClicked = () => {
    let file_ele = document.getElementById('inputFile')
    let progress_ele = document.getElementById('upload-progress')
    let progress_cont_ele = document.getElementById('upload-progress-cont')
    let upload_file_ele = document.getElementById('upload-progress-filename')

    if (file_ele.files.length > 0) {
      let fd = new FormData()
      let f = {}
      f.name = file_ele.files[0].name
      upload_file_ele.innerText = f.name
      progress_ele.style.width = '0%'
      progress_ele.innerText = '0%'
      progress_cont_ele.style.display = 'block'
      progress_cont_ele.style.visibility = 'visible'
      f.progress = 0
      fd.append('inputFile', file_ele.files[0])
      console.log(file_ele.files)

      let xhr = new XMLHttpRequest()
      let url = config.SERVER_URL + 'upload_media.php'

      xhr.open('POST', url, true)

      xhr.upload.addEventListener('progress', handleProgress, false)

      xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let response = this.responseText
          if (response == 1) {
            let us = document.getElementById('uploadStatus')
            us.innerHTML = 'Uploaded successfully'
            //fetchMedia()
            us.className = 'text-success'
          } else {
            let us = document.getElementById('uploadStatus')
            us.innerText = 'Failed to upload file'
            us.className = 'text-danger'
          }
        }
      }
      xhr.send(fd)
    } else {
      alert('Please select a file.')
    }
  }

  return (
    <div className='upload-container'>
      <div className='dropfile'>
        <input type='file' id='inputFile' name='inputFile' />
        <Button onClick={uploadClicked}>Upload</Button>
        <div id='uploadStatus'></div>
      </div>
      <div
        className='filelist-container'
        id='upload-progress-cont'
        style={{ display: 'none' }}
      >
        <h6 id='upload-progress-filename'></h6>
        <div className='progress'>
          <div
            id='upload-progress'
            className='progress-bar'
            role='progressbar'
            style={{ width: '0%' }}
            aria-valuenow='25'
            aria-valuemin='0'
            aria-valuemax='100'
          >
            0%
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileUploadComponent
