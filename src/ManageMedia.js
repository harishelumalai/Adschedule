import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Modal, Table } from 'react-bootstrap'
import { MdDelete } from 'react-icons/md'
import Nav from './Nav'
import config from './config.json'

function ManageMedia() {
  useEffect(() => {
    fetchMedia()
  }, [])

  var uploadInProgress = false
  const [show, setShow] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [deleteFilename, setDeleteFilename] = useState('')

  const handleClose = () => {
    setShow(false)
    document.getElementById('upload-progress-cont').style.display = 'none'
  }
  const handleShow = () => setShow(true)
  //func for delete modal
  const handleDeleteClose = () => setShowConfirm(false)
  const handleDeleteShow = () => setShowConfirm(true)

  const handleProgress = (event) => {
    let progress_ele = document.getElementById('upload-progress')
    //console.log('progres handle')

    let percent = Math.round((event.loaded / event.total) * 100)
    //console.log(percent)

    progress_ele.style.width = percent + '%'
    progress_ele.innerText = percent + '%'
  }

  const confirmDelete = (media) => {
    setDeleteFilename(media)
    handleDeleteShow()
  }

  const handleDelete = (media) => {
    //console.log(media)
    //console.log('request to delete ' + media)
    //
    let fd = new FormData()
    fd.append('command', 'DEL')
    fd.append('media', media)

    let xhr = new XMLHttpRequest()
    let url = config.SERVER_URL + 'manage_media.php'

    xhr.open('POST', url, true)

    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = this.responseText
        if (response == 1) {
          //let us = document.getElementById('uploadStatus')
          //us.innerHTML = 'Uploaded successfully'
          //console.log('Deleted Successfully')
          fetchMedia()
          handleDeleteClose()
          //us.className = 'text-success'
          //us.style.visibility = 'visible'
          //config.logo = 'user-images/' + file_ele.files[0].name
        } else {
          //let us = document.getElementById('uploadStatus')
          //us.innerText = 'Failed to upload file'
          //us.className = 'text-danger'
          //us.style.visibility = 'visible'
          //console.log('Failed to delete')
          fetchMedia()
        }
      }
    }
    xhr.send(fd)
  }

  const uploadClicked = () => {
    let file_ele = document.getElementById('inputFile')
    let progress_ele = document.getElementById('upload-progress')
    let progress_cont_ele = document.getElementById('upload-progress-cont')
    let upload_file_ele = document.getElementById('upload-progress-filename')
    let addmore_ele = document.getElementById('addmore')
    if (uploadInProgress) {
      alert('Please wait while the file is uploading.')
      return
    }

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
      file_ele.value = ''
      //console.log(file_ele.files)
      uploadInProgress = true

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
            fetchMedia()
            us.className = 'text-success'
            uploadInProgress = false
          } else {
            let us = document.getElementById('uploadStatus')
            us.innerText = 'Failed to upload file'
            us.className = 'text-danger'
            uploadInProgress = false
          }
        }
      }
      xhr.send(fd)
    } else {
      alert('Please select a file.')
    }
  }

  const addmoreClicked = () => {
    //document.getElementById('addmore').style.display = 'none'
    //document.getElementById('dropfile').style.display = 'block'
    document.getElementById('addmore').style.visibility = 'visible'
    document.getElementById('dropfile').style.visibility = 'visible'
  }

  const [medias, setMedias] = useState([])

  const fetchMedia = async () => {
    let url = config.SERVER_URL + 'list_media.php'
    const data = await fetch(url)
    //console.log(data)
    const data_medias = await data.json()
    //console.log(medias)
    setMedias(data_medias.media_list)
  }

  return (
    <div>
      <Nav />
      <h5>Manage Medias</h5>
      <Table size='sm' responsive striped bordered hover>
        <thead>
          <tr>
            <th>Media name</th>
          </tr>
        </thead>
        <tbody>
          {medias.map((media) => (
            <tr key={media}>
              <td>
                <div className='media-card'>
                  <div>
                    <span>{media}</span>
                  </div>
                  <div onClick={() => confirmDelete(media)}>
                    <MdDelete className='delete-icon text-danger' />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant='primary' onClick={handleShow}>
        Add file
      </Button>

      {/*
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type='file' id='inputFile' name='inputFile' />
          <button onClick={uploadClicked}>Upload</button>
          <div id='uploadStatus'></div>
        </Modal.Body>
      </Modal>
       */}

      <Modal show={showConfirm} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Media</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete
          <span id='delete_media_name'> {deleteFilename}</span>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleDeleteClose}>
            Close
          </Button>
          <Button
            variant='primary'
            onClick={() => handleDelete(deleteFilename)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='upload-container'>
            <div id='addmore'>
              <center>
                <Button onClick={addmoreClicked} style={{ display: 'none' }}>
                  Add more
                </Button>
              </center>
            </div>
            <div id='dropfile' className='dropfile'>
              <input type='file' id='inputFile' name='inputFile' />
              <br />
              <Button onClick={uploadClicked}>Upload</Button>
            </div>
            <div id='uploadStatus' style={{ textAlign: 'center' }}></div>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ManageMedia
