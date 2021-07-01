import React from 'react'
import { Modal, Forms, Button } from 'react-bootstrap'
import FileUploadComponent from './FileUploadComponent'

function UploadModal(props) {
  return (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>{/*props.title*/ 'Title'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <FileUploadComponent />
      </Modal.Body>

      <Modal.Footer>
        <Button variant='secondary'>Close</Button>
      </Modal.Footer>
    </Modal.Dialog>
  )
}

export default UploadModal
