import React from 'react'
import TextField from '@material-ui/core/TextField'
import { Button } from 'react-bootstrap'

function DatetimePickerWithExit() {
  return (
    <>
      <TextField
        id='add-from-date'
        type='datetime-local'
        className='datetimepicker'
        size='small'
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button variant='secondary' size='sm'>
        Exit
      </Button>
    </>
  )
}

export default DatetimePickerWithExit
