import React from 'react'
import MediaCard from './MediaCard'
import { useEffect, useState } from 'react'
import Nav from './Nav'

function MediasList() {
  var [mediaList, setMediaList] = useState([
    { name: 'test 1' },
    { name: 'mediafile2' },
  ])

  const handleDelete = (index) => {
    var arr = [...mediaList]
    console.log('deletehandle')
    arr.splice(index, 1)
    console.log(arr)
    setMediaList(arr)
  }

  return (
    <>
      <Nav />
      <div className='LoginBG'>
        <div>
          <h5>Media List</h5>
          <div className='CardContainer'>
            {mediaList.map((media) => (
              <MediaCard
                data={media}
                key={media.id}
                id={media.id}
                deleteHandle={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default MediasList
