import React from 'react'
import { ProgressBar } from 'react-bootstrap'
import { FcVideoFile } from 'react-icons/fc'
import { MdDelete } from 'react-icons/md'

function FileItem(props) {
  const now = 45
  console.log('file comp')
  console.log(props)
  return (
    <div className={props.name == '' ? 'FileCard' : 'FileCard hidden'}>
      <div>
        <FcVideoFile className='Icon' />
      </div>

      <section className='CardBody'>
        {props.name}
        <ProgressBar now={props.progress} label={`${props.progress}%`} />
      </section>
    </div>
  )
}

export default FileItem
