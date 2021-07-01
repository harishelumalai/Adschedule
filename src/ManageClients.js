import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal, Table } from 'react-bootstrap'
import { MdDelete } from 'react-icons/md'
import Nav from './Nav'
import config from './config.json'

function ManageClients() {
  const [clients, setClients] = useState([])

  useEffect(() => {
    fetchClients()
  }, [])

  const [show, setShow] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [deleteClient, setDeleteClient] = useState('')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleDeleteClose = () => setShowConfirm(false)
  const handleDeleteShow = () => setShowConfirm(true)

  const handleAdd = (client) => {
    //console.log(client)
    //console.log(document.getElementById('client_id').value)
    //
    let fd = new FormData()
    fd.append('command', 'ADD')
    fd.append('client', client)

    let xhr = new XMLHttpRequest()
    let url = config.SERVER_URL + 'manage_clients.php'

    xhr.open('POST', url, true)

    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = this.responseText
        if (response == 1) {
          let us = document.getElementById('addStatus')
          us.innerHTML = 'Client added successfully'
          //console.log('Added client Successfully')
          us.className = 'text-success'
          fetchClients()
          handleClose()
        } else {
          let us = document.getElementById('addStatus')
          us.innerText = 'Failed to add client'
          us.className = 'text-danger'
          //console.log('Failed to add')
          fetchClients()
        }
      }
    }
    xhr.send(fd)
  }

  const handleConfirm = (client) => {
    //console.log(client)
    setDeleteClient(client)
    handleDeleteShow()
  }

  const handleDelete = (client) => {
    //console.log('requesting delete ')
    //console.log(client)
    //
    let fd = new FormData()
    fd.append('command', 'DEL')
    fd.append('client', client)

    let xhr = new XMLHttpRequest()
    let url = config.SERVER_URL + 'manage_clients.php'

    xhr.open('POST', url, true)

    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = this.responseText
        if (response == 1) {
          //console.log('Deleted Successfully')
          fetchClients()
          handleDeleteClose()
        } else {
          //console.log('Failed to delete client')
          fetchClients()
          handleDeleteClose()
        }
      }
    }
    xhr.send(fd)
  }

  const fetchClients = async () => {
    let url = config.SERVER_URL + 'list_clients.php'
    const data = await fetch(url)
    const data_clients = await data.json()

    setClients(data_clients.clients_list)
  }

  return (
    <div>
      <Nav />
      <h5>Manage Clients</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Client name</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client}>
              <td>
                <div className='media-card'>
                  <div>
                    <Link to={`/client_media/${client}`}>{client}</Link>
                  </div>
                  <div onClick={() => handleConfirm(client)}>
                    <MdDelete className='delete-icon text-danger' />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant='primary' onClick={handleShow}>
        Add new client
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type='text' id='client_id' name='client_id' />
          <button
            onClick={() =>
              handleAdd(document.getElementById('client_id').value)
            }
          >
            Add
          </button>
          <div id='addStatus'></div>
        </Modal.Body>
      </Modal>

      <Modal show={showConfirm} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Media</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete
          <span id='delete_client_name'> {deleteClient}</span>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleDeleteClose}>
            Close
          </Button>
          <Button variant='primary' onClick={() => handleDelete(deleteClient)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ManageClients
