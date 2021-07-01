import React from 'react'
import { FcVideoFile } from 'react-icons/fc'
import { MdDelete } from 'react-icons/md'

function MediaCard(props) {
  return (
    <div id='upload_media_card' className='MediaCard'>
      <div className='CardContent'>
        <FcVideoFile className='Icon' />
        <section className='CardBody'>{props.data.name}</section>
      </div>
      <MdDelete
        className='Delete'
        onClick={() => props.deleteHandle(props.id)}
      />
    </div>
  )
}

export default MediaCard
