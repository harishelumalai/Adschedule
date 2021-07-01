import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import TextField from '@material-ui/core/TextField'

function AddSchedule(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Schedule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Select media file</Form.Label>
            <select id='ad-schedule-media'>
              {props.allmedia.map((media, index) => (
                <option key={index} name={media} value={media}>
                  {media}
                </option>
              ))}
            </select>
          </Form.Group>
          <Form.Group>
            <Form.Label>From</Form.Label>
            <br />
            <TextField
              id='add-from-date'
              type='datetime-local'
              className='datetimepicker'
              size='small'
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>To</Form.Label>
            <br />
            <TextField
              id='add-to-date'
              type='datetime-local'
              className='datetimepicker'
              size='small'
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Priority</Form.Label>
            <Form.Control
              type='text'
              id='add-priority-text'
              placeholder='Enter Priority'
              defaultValue='1'
            />
          </Form.Group>
          <Form.Group>
            <Form.Text id='add-status' className='text-danger'></Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={props.handleAddSchedule}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddSchedule
